<div align="center">

<br/>

<h1>✦ Lumiq · TextSense AI</h1>

---

## 🧠 What is Lumiq?

**Lumiq – TextSense AI** is a Chrome extension that brings a powerful AI assistant to **every webpage you visit**. No more copy-pasting into ChatGPT. No more switching tabs.

> Select any text → click **✦ AI** → choose from **9 instant AI actions** — all in under 2 seconds.

Powered by **Groq's ultra-fast LLaMA 3.3 70B** — the fastest AI inference available, with a completely free tier.

---

## ✨ Features

### 🔲 9 AI Actions in a 3×3 Grid

| | Action | What it does |
|--|--------|-------------|
| ✨ | **Explain** | Clear, simple 2–4 sentence explanation for anyone |
| 📋 | **Summarize** | Key bullet points extracted from any content |
| 🧒 | **Simplify** | ELI5 — explain like I'm 10, with a relatable analogy |
| 💡 | **Example** | Concrete real-world examples to make it click |
| 📊 | **Diagram** | ASCII flowchart that visualizes the concept |
| 🌐 | **Translate** | Translate into 9 languages (Hindi, Spanish, French…) |
| ✉️ | **Reply** | Professional, polite email or message reply |
| 💬 | **Comment** | Engaging social media comment, ready to post |
| 🧠 | **Quiz** | Multiple-choice question to test understanding |

---

### ⚡ Built for Scale

Lumiq handles many simultaneous users cleanly with no dropped requests:

- **Request Queue** — all requests processed in FIFO order
- **Rate Limiter** — auto-stays under Groq's 30 req/min cap (set to 25)
- **Auto-Retry** — exponential backoff: 2s → 4s → 8s on any failure
- **Overflow protection** — up to 50 requests queued; excess rejected gracefully
- **Token streaming** — words appear live as the AI generates them

### 🧩 Smart UX

| Feature | Description |
|---------|-------------|
| 💬 Floating **✦ AI** button | Appears automatically on any text selection |
| 🖱️ Draggable result panel | Drag anywhere on screen while reading |
| 🔄 Task pills | Switch all 9 actions without re-selecting text |
| 📊 Usage tracker | Today's count + remaining daily limit in popup |
| 👋 Onboarding tooltip | Guides new users on very first install |
| ⭐ Rating prompt | Appears after 5 uses — grows Chrome Web Store rank |
| 🖱️ Context menu | Right-click any selection for all AI actions |
| 🌐 Explain This Page | AI summary of the entire current webpage |
| 📋 One-click copy | Copy any result to clipboard instantly |

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+E` | Explain selected text |
| `Ctrl+Shift+S` | Summarize selected text |
| `Ctrl+Shift+V` | 🎤 Voice input |
| `Ctrl+Shift+P` | Explain current page |

> **Mac:** Replace `Ctrl` with `Command`

---

## 📦 Installation

### Option A — Download ZIP

1. Click **Code → Download ZIP** on this page and extract it
2. Open Chrome → go to `chrome://extensions/`
3. Enable **Developer mode** (toggle top-right)
4. Click **Load unpacked** → select the `lumiq-textsense-ai` folder
5. The **✦ Lumiq** icon will appear in your Chrome toolbar ✅

### Option B — Clone via Git

```bash
git clone https://github.com/yourusername/lumiq-textsense-ai.git
```
Then follow steps 2–5 above.

---

## 🚀 Quick Start

### 1. Get a Free Groq API Key

Go to **[console.groq.com/keys](https://console.groq.com/keys)** → sign up free (no credit card) → create a key and copy it.

### 2. Add Your Key

Open `background.js` in any text editor, find **line 10**, and replace the placeholder:

```js
// Before
apiKey: "YOUR_GROQ_API_KEY",

// After — paste your real key
apiKey: "gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
```

### 3. Reload

Go to `chrome://extensions/` → find **Lumiq – TextSense AI** → click **↺ Reload**.

### 4. Try It

1. Open any webpage
2. Select any text with your mouse
3. Click the **✦ AI** button that appears
4. Pick any action from the 3×3 grid — enjoy ✨

> **🎭 Demo Mode:** Without an API key the extension runs rich mock responses — explore all features with no signup.

---

## ⚙️ Configuration

Edit the `CONFIG` block at the top of `background.js`:

```js
const CONFIG = {
  apiKey:      "YOUR_GROQ_API_KEY",        // 🔑 Your key from console.groq.com
  model:       "llama-3.3-70b-versatile",  // See model table below
  maxTokens:   900,
  temperature: 0.7,                        // 0 = precise · 1 = creative

  rateLimit: {
    requestsPerMinute: 25,   // Groq free tier max: 30/min
    maxRetries:        3,    // Retry attempts on failure
    retryBaseDelay:    2000, // Backoff: 2s → 4s → 8s
    queueMax:          50    // Max queued requests before rejecting
  },

  usage: {
    freePerDay: 30           // Daily free limit per user
  }
};
```

### 🤖 Groq Models

| Model | Speed | Quality | Best For |
|-------|-------|---------|----------|
| `llama-3.3-70b-versatile` | ⚡ Fast | ⭐⭐⭐⭐⭐ | **Default** — best quality |
| `llama-3.1-8b-instant` | ⚡⚡ Fastest | ⭐⭐⭐ | High volume, ultra-low latency |
| `mixtral-8x7b-32768` | ⚡ Fast | ⭐⭐⭐⭐ | Long-context tasks |
| `gemma2-9b-it` | ⚡ Fast | ⭐⭐⭐ | Lightweight alternative |

---

## 🌐 Translate — Supported Languages

`Hindi` · `Spanish` · `French` · `German` · `Arabic` · `Chinese` · `Japanese` · `Portuguese` · `Russian`

---

## 📁 Project Structure

```
lumiq-textsense-ai/
│
├── manifest.json        ← Extension config (Manifest V3)
├── background.js        ← Service worker: queue, rate limit, API calls
├── content.js           ← Injected UI: button, 3×3 menu, panel, voice
├── styles.css           ← All styles for injected components
├── popup.html           ← Toolbar popup: voice, stats, shortcuts
├── popup.js             ← Popup logic: TTS, voice input, actions
│
├── assets/
│   └── screenshot-menu.png
│
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

---

## 🏗️ Architecture

```
User selects text on a webpage
            │
            ▼
   content.js detects selection
   → Floating ✦ AI button pops up
            │
   User picks an action
            │
            ▼
  Message sent to background.js
            │
            ▼
┌─────────────────────────────────┐
│         REQUEST QUEUE           │
│                                 │
│  ✔ FIFO order processing        │
│  ✔ Rate limit: 25 req/min       │
│  ✔ Max queue: 50 requests       │
│  ✔ Retry: 3× exponential        │
│  ✔ Daily usage tracking         │
└──────────────┬──────────────────┘
               │
               ▼
     Groq API — LLaMA 3.3 70B
               │
               ▼
  Words stream back to result panel
  token-by-token in real time ✨
```

---

## 🎤 Voice Flow

```
Ctrl+Shift+V ──► Mic overlay opens (pulsing rings)
                          │
               SpeechRecognition API listens
               Live transcript shown in real time
                          │
               Speech ends or "Stop" clicked
                          │
                 ┌─────────▼──────────┐
                 │   Action Picker    │
                 │   (3×3 mini grid)  │
                 └─────────┬──────────┘
                           │
               AI runs on your spoken words
                           │
               🔊 Read Aloud → SpeechSynthesis
```

---

## 🔒 Privacy

- ✅ **No external servers of ours** — text goes directly from your browser to Groq
- ✅ **Zero tracking** — no analytics, no telemetry, no beacons
- ✅ **Local storage only** — usage data stored in `chrome.storage.local`
- ✅ **API key stays on your machine** — never sent anywhere except Groq
- ✅ **Reads only what you select** — never passively monitors page content

---

## 🤝 Contributing

PRs are very welcome! Here's how:

```bash
# Fork this repo, then:
git clone https://github.com/YOUR-USERNAME/lumiq-textsense-ai.git
git checkout -b feature/my-feature
# make your changes
git commit -m "feat: describe your change"
git push origin feature/my-feature
# Open a Pull Request on GitHub
```

### 💡 Open Ideas

- [ ] Highlight mode — color-code text by sentiment
- [ ] Response history panel — save and browse past answers  
- [ ] Custom prompt builder — let users write their own AI actions
- [ ] Firefox port (Manifest V3 compatible)
- [ ] Pro tier with Stripe for unlimited daily requests
- [ ] More translate languages
- [ ] Persistent floating voice button on any page

---

## 📄 License

MIT License — free to use, fork, modify, and distribute.  
See [LICENSE](LICENSE) for the full text.

---

## 🙏 Credits

| | Tech | Role |
|--|------|------|
| 🤖 | [Groq](https://groq.com) — LLaMA 3.3 70B | AI inference engine |
| 🎙️ | Web Speech API | Voice input + TTS output |
| ✏️ | Inter + JetBrains Mono | UI typography |
| 🎨 | Custom inline SVG | Gradient icon set |
| ⚙️ | Chrome Manifest V3 | Extension platform |

---

<div align="center">

<br/>

**Found Lumiq useful? Drop a ⭐ — it genuinely helps!**

<br/>

[![GitHub stars](https://img.shields.io/github/stars/yourusername/lumiq-textsense-ai?style=social)](https://github.com/yourusername/lumiq-textsense-ai/stargazers)

<br/>

[🐛 Report a Bug](../../issues/new) · [💡 Request a Feature](../../issues/new) · [🌐 Chrome Web Store](#)

<br/>

<sub>Built with ❤️ · Powered by Groq ⚡</sub>

</div>
