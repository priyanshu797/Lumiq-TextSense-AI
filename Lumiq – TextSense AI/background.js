const CONFIG = {
  endpoint:    "https://api.groq.com/openai/v1/chat/completions",
  apiKey:      "Enter your API Key",
  model:       "llama-3.3-70b-versatile",
  maxTokens:   900,
  temperature: 0.7,
  rateLimit: {
    requestsPerMinute: 25, 
    maxRetries:        3,
    retryBaseDelay:    2000, 
    queueMax:          50
  },
  usage: { freePerDay: 30 }
};
const Queue = {
  items:         [],
  running:       false,
  reqThisMinute: 0,
  windowStart:   Date.now(),

  push(payload) {
    return new Promise((resolve, reject) => {
      if (this.items.length >= CONFIG.rateLimit.queueMax)
        return reject(new Error("Server busy. Please wait a moment."));
      this.items.push({ ...payload, resolve, reject, tries: 0 });
      if (!this.running) this.drain();
    });
  },

  async drain() {
    this.running = true;
    while (this.items.length > 0) {
      const now = Date.now();
      if (now - this.windowStart >= 60000) {
        this.windowStart = now; this.reqThisMinute = 0;
      }
      if (this.reqThisMinute >= CONFIG.rateLimit.requestsPerMinute) {
        const wait = 60000 - (Date.now() - this.windowStart) + 300;
        await delay(wait);
        this.windowStart = Date.now(); this.reqThisMinute = 0;
      }
      const job = this.items.shift();
      if (!job) break;
      try {
        this.reqThisMinute++;
        job.resolve(await callGroq(job.text, job.task, job.language));
      } catch (err) {
        const retryable = /429|503|timeout/i.test(err.message);
        if (job.tries < CONFIG.rateLimit.maxRetries && retryable) {
          const w = CONFIG.rateLimit.retryBaseDelay * Math.pow(2, job.tries);
          job.tries++; this.reqThisMinute--;
          await delay(w);
          this.items.unshift(job);
        } else { job.reject(err); }
      }
      if (this.items.length > 0) await delay(80);
    }
    this.running = false;
  }
};

const delay = ms => new Promise(r => setTimeout(r, ms));

async function checkLimit() {
  const today = new Date().toDateString();
  const d = await chrome.storage.local.get(["usageDate","usageCount","isPro"]);
  if (d.usageDate !== today) {
    await chrome.storage.local.set({ usageDate: today, usageCount: 0 });
    return { ok: true, count: 0, limit: CONFIG.usage.freePerDay };
  }
  const count = d.usageCount || 0;
  const limit = d.isPro ? 99999 : CONFIG.usage.freePerDay;
  return { ok: count < limit, count, limit };
}

async function bumpUsage() {
  const d = await chrome.storage.local.get(["usageCount","totalAll"]);
  await chrome.storage.local.set({
    usageCount: (d.usageCount || 0) + 1,
    totalAll:   (d.totalAll   || 0) + 1,
    lastUsed:   Date.now()
  });
}

chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason === "install") {
    await chrome.storage.local.set({
      installed: Date.now(), onboarded: false,
      usageCount: 0, totalAll: 0, isPro: false, language: "Hindi"
    });
  }
  buildMenus();
});

function buildMenus() {
  chrome.contextMenus.removeAll(() => {
    [
      { id: "explain",      title: "✨ Explain"          },
      { id: "summarize",    title: "📋 Summarize"        },
      { id: "simplify",     title: "🧒 Simplify (ELI5)"  },
      { id: "example",      title: "💡 Example"          },
      { id: "diagram",      title: "📊 Diagram"          },
      { id: "translate",    title: "🌐 Translate"        },
      { id: "reply",        title: "✉️ Write Reply"      },
      { id: "comment",      title: "💬 Comment"          },
      { id: "quiz",         title: "🧠 Quiz"             },
      { id: "_sep", title:"---", type:"separator"        },
      { id: "explain-page", title:"🌐 Explain This Page", ctx:["page"] }
    ].forEach(m => chrome.contextMenus.create({
      id: m.id, title: m.title, type: m.type||"normal", contexts: m.ctx||["selection"]
    }));
  });
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "explain-page") {
    chrome.tabs.sendMessage(tab.id, { action: "explain-page" });
  } else if (info.selectionText) {
    chrome.tabs.sendMessage(tab.id, { action: "run-task", task: info.menuItemId, text: info.selectionText });
  }
});

chrome.commands.onCommand.addListener((cmd, tab) => {
  const map = {
    "explain-selection":   { action: "run-task",    task: "explain"   },
    "summarize-selection": { action: "run-task",    task: "summarize" },
    "voice-input":         { action: "voice-input"                    },
    "explain-page":        { action: "explain-page"                   }
  };
  const msg = map[cmd];
  if (msg) chrome.tabs.sendMessage(tab.id, msg);
});

chrome.runtime.onMessage.addListener((msg, _sender, reply) => {
  if (msg.action === "call-api") {
    handleRequest(msg.text, msg.task, msg.language)
      .then(r  => reply({ ok: true,  result: r }))
      .catch(e => reply({ ok: false, error:  e.message }));
    return true;
  }
  if (msg.action === "get-usage") {
    checkLimit().then(reply); return true;
  }
  if (msg.action === "get-stats") {
    chrome.storage.local.get(["totalAll","usageCount","isPro","language","onboarded"]).then(reply);
    return true;
  }
  if (msg.action === "set-pref") {
    chrome.storage.local.set(msg.data).then(() => reply({ ok: true })); return true;
  }
  if (msg.action === "queue-status") {
    reply({ size: Queue.items.length, running: Queue.running });
  }
});

async function handleRequest(text, task, language) {
  const lim = await checkLimit();
  if (!lim.ok) throw new Error(`Daily limit reached (${lim.limit}/day). Upgrade to Pro for unlimited. 🚀`);

  if (!CONFIG.apiKey || CONFIG.apiKey === "YOUR_GROQ_API_KEY") {
    await delay(700);
    return getMock(text, task);
  }

  const stored = await chrome.storage.local.get(["language"]);
  const lang = language || stored.language || "Hindi";

  const result = await Queue.push({ text, task, language: lang });
  await bumpUsage();

  return result;
}

async function callGroq(text, task, language) {
  const { system, user } = makePrompt(text, task, language);
  const res = await fetch(CONFIG.endpoint, {
    method: "POST",
    headers: { "Content-Type":"application/json", "Authorization":`Bearer ${CONFIG.apiKey}` },
    body: JSON.stringify({
      model: CONFIG.model, max_tokens: CONFIG.maxTokens, temperature: CONFIG.temperature,
      messages: [{ role:"system", content:system }, { role:"user", content:user }]
    })
  });
  if (!res.ok) {
    const b = await res.json().catch(() => ({}));
    if (res.status === 401) throw new Error("Invalid Groq API key. Open background.js and update apiKey.");
    if (res.status === 429) throw new Error("429: Rate limit");
    if (res.status === 503) throw new Error("503: Unavailable");
    throw new Error(b?.error?.message || `Error ${res.status}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() || "";
}

function makePrompt(text, task, language = "Hindi") {
  const system = "You are a helpful, concise AI. Be direct. No filler phrases. Get straight to the answer.";
  const t = `"${text}"`;
  const map = {
    explain:      `Explain this in simple, clear language anyone can understand. 2-4 sentences:\n\n${t}`,
    summarize:    `Summarize into 3-5 clear bullet points. Each = one key idea:\n\n${t}`,
    simplify:     `Explain this like I'm 10 years old. Simple words, short analogy, max 3 sentences:\n\n${t}`,
    example:      `Give 1-2 concrete real-world examples illustrating this. Be specific:\n\n${t}`,
    diagram:      `Create a clean ASCII diagram or flowchart explaining this. Use boxes, arrows (→ ←):\n\n${t}`,
    translate:    `Translate into ${language}. Return ONLY the translation:\n\n${t}`,
    reply:        `Write a professional, polite reply to this message. Be concise:\n\n${t}`,
    comment:      `Write an insightful social media comment for this. Genuine, value-adding, under 3 sentences:\n\n${t}`,
    quiz:         `Generate 1 multiple-choice quiz question from this. 4 options (A–D), mark correct with ✓:\n\n${t}`,
    "explain-page": `Summarize this webpage content in 3-5 simple sentences:\n\n${t}`
  };
  return { system, user: map[task] || map.explain };
}

function getMock(text, task) {
  const p = text.length > 55 ? text.substring(0, 55) + "…" : text;
  const m = {
    explain:   `"${p}" — At its core, this describes how components connect to produce a meaningful outcome. Understanding this opens a broader picture of how the whole system works.`,
    summarize: `• Introduces the concept of "${p}"\n• Explains the core mechanism in practice\n• Key implications affect everyday use cases\n• Multiple perspectives are worth considering\n• Main takeaway has wide real-world applications`,
    simplify:  `Think of "${p}" like LEGO. Each piece is simple on its own, but click them together the right way and you get something amazing. That's exactly this concept — simple parts making something bigger!`,
    example:   `Real example: "${p}" is like GPS navigation. Takes location (input), finds best route (process), gives directions (output). Simple, but powerful in practice.`,
    diagram:   `┌──────────────────────────┐\n│     CONCEPT OVERVIEW     │\n└────────────┬─────────────┘\n             │\n    ┌────────▼────────┐\n    │  Process Input  │\n    └────┬───────┬────┘\n         ▼       ▼\n  ┌──────────┐ ┌──────────┐\n  │  Part A  │ │  Part B  │\n  └────┬─────┘ └────┬─────┘\n       └──────┬──────┘\n              ▼\n       ┌─────────────┐\n       │   RESULT    │\n       └─────────────┘`,
    translate: `[Demo: Translation of "${p}" in your chosen language would appear here]`,
    reply:     `Thank you for your message about "${p}". I've reviewed the details carefully.\n\nI'd be happy to discuss this further. Please let me know your availability.\n\nBest regards`,
    comment:   `Great insight on "${p}" — this is exactly the kind of perspective that doesn't get discussed enough. Sharing this! 🙌`,
    quiz:      `**Quiz: "${p.substring(0,30)}…"**\n\nWhat best describes this concept?\n\nA) A natural physical phenomenon\nB) An interconnected system ✓\nC) A historical event\nD) A mathematical formula\n\n**Answer: B**`,
    "explain-page": `This page covers "${p}". It presents information in a structured way, walking through key concepts and practical implications. Aimed at anyone wanting a clear overview.`
  };
  return m[task] || m.explain;
}
