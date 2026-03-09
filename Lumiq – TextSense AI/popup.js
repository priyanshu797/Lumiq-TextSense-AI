const LABELS = {
  explain:"Explanation", summarize:"Summary", simplify:"Simplified (ELI5)",
  example:"Example", diagram:"Diagram", translate:"Translation",
  reply:"Reply Draft", comment:"Comment", quiz:"Quiz Question",
  "explain-page":"Page Summary"
};

const $        = id => document.getElementById(id);
const inputTxt   = $("inputTxt");
const resultArea = $("resultArea");
const resultBox  = $("resultBox");
const resultTitle= $("resultTitle");
const copyBtn    = $("copyBtn");
const pageBtn    = $("pageBtn");
const langSel    = $("langSel");
const qDot       = $("qDot");
const qText      = $("qText");
const qSize      = $("qSize");

async function loadStats() {
  const [d, u] = await Promise.all([
    chrome.runtime.sendMessage({ action:"get-stats" }),
    chrome.runtime.sendMessage({ action:"get-usage" })
  ]);
  if (d) {
    $("s-today").textContent = d.usageCount || 0;
    $("s-total").textContent = d.totalAll   || 0;
    if (u) $("s-left").textContent = Math.max(0, (u.limit||30) - (u.count||0));
    if (d.language) langSel.value = d.language;
  }
}

function pollQueue() {
  chrome.runtime.sendMessage({ action:"queue-status" }).then(r => {
    if (!r) return;
    qDot.classList.toggle("busy", r.running);
    qText.textContent = r.running ? "Processing…" : "Ready";
    qSize.textContent = r.size > 0 ? `${r.size} queued` : "";
  }).catch(()=>{});
}

loadStats();
pollQueue();
setInterval(pollQueue, 1500);

langSel.addEventListener("change", () =>
  chrome.runtime.sendMessage({ action:"set-pref", data:{ language: langSel.value } })
);

// ── Auto-fill selected text ───────────────────────────────
(async () => {
  try {
    const [tab] = await chrome.tabs.query({ active:true, currentWindow:true });
    if (!tab?.url?.startsWith("http")) return;
    const res = await chrome.scripting.executeScript({
      target:{tabId:tab.id}, func:()=>window.getSelection()?.toString().trim()
    });
    const sel = res?.[0]?.result;
    if (sel?.length > 3) {
      inputTxt.value = sel;
      inputTxt.style.borderColor = "rgba(108,99,255,.6)";
    }
  } catch {}
})();

let activeBtn = null;

document.querySelectorAll(".act-btn").forEach(btn => {
  btn.addEventListener("click", async () => {
    if (btn.classList.contains("loading")) return;

    const task = btn.dataset.task;
    let text = inputTxt.value.trim();

    if (!text) {
      try {
        const [tab] = await chrome.tabs.query({ active:true, currentWindow:true });
        const res = await chrome.scripting.executeScript({
          target:{tabId:tab.id}, func:()=>window.getSelection()?.toString().trim()
        });
        text = res?.[0]?.result || "";
        if (text) inputTxt.value = text;
      } catch {}
    }

    if (!text) {
      showResult("error", task, "Please enter, paste, or select some text first.");
      return;
    }

    if (activeBtn && activeBtn !== btn) setLoading(activeBtn, false);
    activeBtn = btn;
    setLoading(btn, true);
    showResult("loading", task, "");

    try {
      const res = await chrome.runtime.sendMessage({ action:"call-api", task, text, language:langSel.value });
      showResult(res.ok ? "ok" : "error", task, res.ok ? res.result : res.error);
    } catch(e) {
      showResult("error", task, "Extension error: " + e.message);
    } finally {
      setLoading(btn, false);
      activeBtn = null;
      loadStats();
    }
  });
});

pageBtn.addEventListener("click", async () => {
  pageBtn.textContent = "⏳ Analyzing…";
  pageBtn.disabled = true;
  try {
    const [tab] = await chrome.tabs.query({ active:true, currentWindow:true });
    await chrome.tabs.sendMessage(tab.id, { action:"explain-page" });
    window.close();
  } catch(e) {
    showResult("error","explain-page","Cannot access this tab. Try refreshing the page.");
    pageBtn.textContent = "🌐 Explain This Page";
    pageBtn.disabled = false;
  }
});

copyBtn.addEventListener("click", () => {
  const t = resultBox.innerText || "";
  if (!t) return;
  navigator.clipboard.writeText(t).then(() => {
    copyBtn.textContent = "✓ Copied!";
    copyBtn.style.borderColor = "var(--tl)";
    copyBtn.style.color = "var(--tl)";
    setTimeout(() => {
      copyBtn.textContent = "⎘ Copy";
      copyBtn.style.borderColor = "";
      copyBtn.style.color = "";
    }, 2000);
  });
});

function showResult(type, task, content) {
  resultArea.classList.add("show");
  resultTitle.textContent = LABELS[task] || "Result";
  copyBtn.style.display = type === "loading" ? "none" : "";

  if (type === "loading") {
    resultBox.innerHTML = `<div class="spin"><div class="spinner"></div><span>Generating…</span></div>`;
    return;
  }

  resultBox.style.opacity = "0";

  if (type === "error") {
    resultBox.innerHTML = `<span style="color:#fca5a5">⚠️ ${esc(content)}</span>`;
  } else {
    resultBox.style.fontFamily = task === "diagram" ? "'JetBrains Mono',monospace" : "";
    resultBox.style.fontSize   = task === "diagram" ? "10.5px" : "";
    resultBox.style.color      = task === "diagram" ? "#00d4aa" : task === "translate" ? "#fed7aa" : "";
    resultBox.textContent = content;
  }

  requestAnimationFrame(() => {
    resultBox.style.transition = "opacity .22s ease";
    resultBox.style.opacity = "1";
  });

  setTimeout(() => resultArea.scrollIntoView({ behavior:"smooth", block:"nearest" }), 60);
}
function setLoading(btn, on) {
  btn.classList.toggle("loading", on);
  const lbl = btn.querySelector(".act-lbl");
  if (on) { btn.dataset.prev = lbl.textContent; lbl.textContent = "…"; }
  else    { lbl.textContent = btn.dataset.prev || ""; }
}

function esc(s) {
  const d = document.createElement("div");
  d.appendChild(document.createTextNode(s));
  return d.innerHTML;
}
