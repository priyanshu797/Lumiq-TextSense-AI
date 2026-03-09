# Lumiq - TextSense AI

A Chrome extension that brings an AI assistant to every webpage you visit. Select any text, click the AI button, and choose from nine instant AI actions — all without switching tabs.

Powered by Groq's LLaMA 3.3 70B inference engine.

---

## What is Lumiq?

Lumiq eliminates the need to copy-paste content into external AI tools. Highlight any text on any webpage, trigger the floating button, and get instant AI-powered results in under two seconds — directly in your browser.

---

## Features

### Nine AI Actions

| Action     | Description                                                  |
|------------|--------------------------------------------------------------|
| Explain    | Clear, simple 2-4 sentence explanation for any audience      |
| Summarize  | Key bullet points extracted from any content                 |
| Simplify   | ELI5 — explain like I'm 10, with a relatable analogy         |
| Example    | Concrete real-world examples to make concepts click          |
| Diagram    | ASCII flowchart that visualizes the concept                  |
| Translate  | Translate into 9 languages (Hindi, Spanish, French, and more)|
| Reply      | Professional, polite email or message reply                  |
| Comment    | Engaging social media comment, ready to post                 |
| Quiz       | Multiple-choice question to test understanding               |

---

### Request Handling

Lumiq handles many simultaneous users cleanly with no dropped requests:

- **Request Queue** — all requests processed in FIFO order
- **Rate Limiter** — auto-stays under Groq's 30 req/min cap (set to 25)
- **Auto-Retry** — exponential backoff: 2s, 4s, 8s on any failure
- **Overflow Protection** — up to 50 requests queued; excess rejected gracefully
- **Token Streaming** — words appear live as the AI generates them

---

### User Interface

| Feature                    | Description                                                 |
|----------------------------|-------------------------------------------------------------|
| Floating AI button         | Appears automatically on any text selection                 |
| Draggable result panel     | Drag anywhere on screen while reading                       |
| Task pills                 | Switch between all 9 actions without re-selecting text      |
| Usage tracker              | Today's count and remaining daily limit shown in popup      |
| Onboarding tooltip         | Guides new users on first install                           |
| Rating prompt              | Appears after 5 uses to help grow Chrome Web Store rank     |
| Context menu               | Right-click any selection for all AI actions                |
| Explain This Page          | AI summary of the entire current webpage                    |
| One-click copy             | Copy any result to clipboard instantly                      |

---

## Keyboard Shortcuts

| Shortcut       | Action                   |
|----------------|--------------------------|
| Ctrl+Shift+E   | Explain selected text    |
| Ctrl+Shift+S   | Summarize selected text  |
| Ctrl+Shift+V   | Voice input              |
| Ctrl+Shift+P   | Explain current page     |

On Mac, replace Ctrl with Command.

---

## Installation

### Option A — Download ZIP

1. Click **Code > Download ZIP** on this page and extract it.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked** and select the `lumiq-textsense-ai` folder.
5. The Lumiq icon will appear in your Chrome toolbar.

### Option B — Clone via Git

```bash
git clone https://github.com/yourusername/lumiq-textsense-ai.git
```

Then follow steps 2-5 above.

---

## Quick Start

### 1. Get a Free Groq API Key

Go to [console.groq.com/keys](https://console.groq.com/keys), sign up for free (no credit card required), create a key, and copy it.

### 2. Add Your Key

Open `background.js` in any text editor, find line 10, and replace the placeholder:

```js
// Before
apiKey: "YOUR_GROQ_API_KEY",

// After — paste your real key
apiKey: "gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
```

### 3. Reload the Extension

Go to `chrome://extensions/`, find **Lumiq - TextSense AI**, and click Reload.

### 4. Try It

1. Open any webpage.
2. Select any text with your mouse.
3. Click the AI button that appears.
4. Pick any action from the 3x3 grid.

**Demo Mode:** Without an API key, the extension runs rich mock responses so you can explore all features with no signup required.

---

## Configuration

Edit the `CONFIG` block at the top of `background.js`:

```js
const CONFIG = {
  apiKey:      "YOUR_GROQ_API_KEY",        // Your key from console.groq.com
  model:       "llama-3.3-70b-versatile",  // See model table below
  maxTokens:   900,
  temperature: 0.7,                        // 0 = precise, 1 = creative

  rateLimit: {
    requestsPerMinute: 25,   // Groq free tier max: 30/min
    maxRetries:        3,    // Retry attempts on failure
    retryBaseDelay:    2000, // Backoff: 2s, 4s, 8s
    queueMax:          50    // Max queued requests before rejecting
  },

  usage: {
    freePerDay: 30           // Daily free limit per user
  }
};
```

### Groq Models

| Model                      | Speed    | Quality | Best For                          |
|----------------------------|----------|---------|-----------------------------------|
| llama-3.3-70b-versatile    | Fast     | 5/5     | Default — best quality            |
| llama-3.1-8b-instant       | Fastest  | 3/5     | High volume, ultra-low latency    |
| mixtral-8x7b-32768         | Fast     | 4/5     | Long-context tasks                |
| gemma2-9b-it               | Fast     | 3/5     | Lightweight alternative           |

---

## Supported Translation Languages

Hindi, Spanish, French, German, Arabic, Chinese, Japanese, Portuguese, Russian

---

## Project Structure

```
lumiq-textsense-ai/
|
+-- manifest.json        Extension config (Manifest V3)
+-- background.js        Service worker: queue, rate limit, API calls
+-- content.js           Injected UI: button, 3x3 menu, panel, voice
+-- styles.css           All styles for injected components
+-- popup.html           Toolbar popup: voice, stats, shortcuts
+-- popup.js             Popup logic: TTS, voice input, actions
|
+-- assets/
|   +-- screenshot-menu.png
|
+-- icons/
    +-- icon16.png
    +-- icon48.png
    +-- icon128.png
```

---

## Architecture

```
User selects text on a webpage
            |
            v
   content.js detects selection
   Floating AI button appears
            |
   User picks an action
            |
            v
  Message sent to background.js
            |
            v
+-----------------------------------+
|          REQUEST QUEUE            |
|                                   |
|  - FIFO order processing          |
|  - Rate limit: 25 req/min         |
|  - Max queue: 50 requests         |
|  - Retry: 3x exponential backoff  |
|  - Daily usage tracking           |
+----------------+------------------+
                 |
                 v
     Groq API — LLaMA 3.3 70B
                 |
                 v
  Words stream back to result panel
  token-by-token in real time
```

---

## Voice Flow

```
Ctrl+Shift+V --> Mic overlay opens
                          |
               SpeechRecognition API listens
               Live transcript shown in real time
                          |
               Speech ends or Stop clicked
                          |
                 +---------v----------+
                 |    Action Picker   |
                 |   (3x3 mini grid)  |
                 +---------+----------+
                           |
               AI runs on your spoken words
                           |
               Read Aloud via SpeechSynthesis
```

---

## Privacy

- No external servers — text goes directly from your browser to Groq
- Zero tracking — no analytics, no telemetry, no beacons
- Local storage only — usage data stored in `chrome.storage.local`
- API key stays on your machine — never sent anywhere except Groq
- Reads only what you select — never passively monitors page content

---

## Contributing

Pull requests are welcome. Here is how to get started:

```bash
# Fork this repo, then:
git clone https://github.com/YOUR-USERNAME/lumiq-textsense-ai.git
git checkout -b feature/my-feature
# make your changes
git commit -m "feat: describe your change"
git push origin feature/my-feature
# Open a Pull Request on GitHub
```

### Open Ideas

- Highlight mode — color-code text by sentiment
- Response history panel — save and browse past answers
- Custom prompt builder — let users write their own AI actions
- Firefox port (Manifest V3 compatible)
- Pro tier with Stripe for unlimited daily requests
- Additional translation languages
- Persistent floating voice button on any page

---

## License

MIT License — free to use, fork, modify, and distribute. See [LICENSE](LICENSE) for the full text.

---

## Credits

| Technology            | Role                        |
|-----------------------|-----------------------------|
| Groq — LLaMA 3.3 70B  | AI inference engine         |
| Web Speech API        | Voice input and TTS output  |
| Inter + JetBrains Mono| UI typography               |
| Custom inline SVG     | Gradient icon set           |
| Chrome Manifest V3    | Extension platform          |

---

## Links

- [Report a Bug](../../issues/new)
- [Request a Feature](../../issues/new)
- [Chrome Web Store](#)

---

*Built with care. Powered by Groq.*
