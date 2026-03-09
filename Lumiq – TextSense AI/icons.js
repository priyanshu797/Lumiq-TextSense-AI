const EAI_ICONS = {

  // Main floating button — Gemini-style 4-point star sparkle (Image 1)
  main: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C12 2 13.5 7.5 18 9C13.5 10.5 12 16 12 16C12 16 10.5 10.5 6 9C10.5 7.5 12 2 12 2Z" fill="url(#star-grad-main)"/>
    <path d="M19 2C19 2 19.8 4.5 22 5.5C19.8 6.5 19 9 19 9C19 9 18.2 6.5 16 5.5C18.2 4.5 19 2 19 2Z" fill="url(#star-grad-main)" opacity="0.7"/>
    <path d="M5 14C5 14 5.8 16.5 8 17.5C5.8 18.5 5 21 5 21C5 21 4.2 18.5 2 17.5C4.2 16.5 5 14 5 14Z" fill="url(#star-grad-main)" opacity="0.5"/>
    <defs>
      <linearGradient id="star-grad-main" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#a78bfa"/>
        <stop offset="100%" stop-color="#00d4aa"/>
      </linearGradient>
    </defs>
  </svg>`,

  // Explain — Audio waveform + sparkle (Image 2)
  explain: `<svg width="22" height="22" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="12" width="4" height="18" rx="2" fill="url(#exp-grad)"/>
    <rect x="9" y="7" width="4" height="24" rx="2" fill="url(#exp-grad)"/>
    <rect x="16" y="10" width="4" height="20" rx="2" fill="url(#exp-grad)"/>
    <rect x="23" y="15" width="4" height="12" rx="2" fill="url(#exp-grad)"/>
    <path d="M30 4C30 4 31 7 33.5 8C31 9 30 12 30 12C30 12 29 9 26.5 8C29 7 30 4 30 4Z" fill="url(#exp-grad)"/>
    <defs>
      <linearGradient id="exp-grad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#7c3aed"/>
        <stop offset="100%" stop-color="#a855f7"/>
      </linearGradient>
    </defs>
  </svg>`,

  // Summarize — Neural network nodes (Image 3)
  summarize: `<svg width="22" height="22" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="14" r="4" stroke="url(#sum-grad)" stroke-width="2.5" fill="none"/>
    <circle cx="8" cy="28" r="4" stroke="url(#sum-grad)" stroke-width="2.5" fill="none"/>
    <circle cx="20" cy="8" r="4" stroke="url(#sum-grad)" stroke-width="2.5" fill="none"/>
    <circle cx="20" cy="21" r="4" stroke="url(#sum-grad)" stroke-width="2.5" fill="none"/>
    <circle cx="20" cy="34" r="4" stroke="url(#sum-grad)" stroke-width="2.5" fill="none"/>
    <circle cx="32" cy="21" r="4" stroke="url(#sum-grad)" stroke-width="2.5" fill="none"/>
    <line x1="12" y1="14" x2="16" y2="10" stroke="url(#sum-grad)" stroke-width="2" stroke-linecap="round"/>
    <line x1="12" y1="16" x2="16" y2="21" stroke="url(#sum-grad)" stroke-width="2" stroke-linecap="round"/>
    <line x1="12" y1="26" x2="16" y2="21" stroke="url(#sum-grad)" stroke-width="2" stroke-linecap="round"/>
    <line x1="12" y1="28" x2="16" y2="33" stroke="url(#sum-grad)" stroke-width="2" stroke-linecap="round"/>
    <line x1="24" y1="21" x2="28" y2="21" stroke="url(#sum-grad)" stroke-width="2" stroke-linecap="round"/>
    <line x1="24" y1="10" x2="28" y2="19" stroke="url(#sum-grad)" stroke-width="2" stroke-linecap="round"/>
    <line x1="24" y1="33" x2="28" y2="23" stroke="url(#sum-grad)" stroke-width="2" stroke-linecap="round"/>
    <defs>
      <linearGradient id="sum-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#06b6d4"/>
        <stop offset="100%" stop-color="#3b82f6"/>
      </linearGradient>
    </defs>
  </svg>`,

  // Example — Hand holding molecule/nodes (Image 4)
  example: `<svg width="22" height="22" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="8" r="3.5" stroke="url(#ex-grad)" stroke-width="2.2" fill="none"/>
    <circle cx="11" cy="20" r="3" stroke="url(#ex-grad)" stroke-width="2.2" fill="none"/>
    <circle cx="29" cy="20" r="3" stroke="url(#ex-grad)" stroke-width="2.2" fill="none"/>
    <line x1="20" y1="11.5" x2="13" y2="18" stroke="url(#ex-grad)" stroke-width="2" stroke-linecap="round"/>
    <line x1="20" y1="11.5" x2="27" y2="18" stroke="url(#ex-grad)" stroke-width="2" stroke-linecap="round"/>
    <line x1="27" y1="9" x2="33" y2="9" stroke="url(#ex-grad)" stroke-width="2" stroke-linecap="round"/>
    <line x1="27" y1="6" x2="33" y2="6" stroke="url(#ex-grad)" stroke-width="2" stroke-linecap="round"/>
    <path d="M6 28 Q10 25 16 26 Q22 27 28 26 Q34 25 36 27" stroke="url(#ex-grad)" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <path d="M6 28 Q4 30 5 32 Q18 31 36 27" stroke="url(#ex-grad)" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <defs>
      <linearGradient id="ex-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#f59e0b"/>
        <stop offset="100%" stop-color="#ef4444"/>
      </linearGradient>
    </defs>
  </svg>`,

  // Diagram — Two speech bubbles with reply arrow (Image 5)
  diagram: `<svg width="22" height="22" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="22" cy="16" r="13" fill="url(#diag-grad1)" opacity="0.3"/>
    <circle cx="22" cy="16" r="13" fill="url(#diag-grad2)"/>
    <path d="M16 36 L20 26 L8 26 Q4 26 4 22 L4 10 Q4 6 8 6 L22 6" stroke="url(#diag-grad1)" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M19 20 L15 16 L19 12" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15 16 L24 16" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
    <defs>
      <linearGradient id="diag-grad1" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#60a5fa"/>
        <stop offset="100%" stop-color="#818cf8"/>
      </linearGradient>
      <linearGradient id="diag-grad2" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#3b82f6"/>
        <stop offset="100%" stop-color="#6366f1"/>
      </linearGradient>
    </defs>
  </svg>`,

  // Reply — Chat bubble with three dots (Image 6)
  reply: `<svg width="22" height="22" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="34" height="25" rx="6" stroke="url(#rep-grad)" stroke-width="2.5" fill="none"/>
    <path d="M10 35 L14 30 L8 30" stroke="url(#rep-grad)" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="13" cy="17.5" r="2.5" fill="url(#rep-grad)"/>
    <circle cx="20" cy="17.5" r="2.5" fill="url(#rep-grad)"/>
    <circle cx="27" cy="17.5" r="2.5" fill="url(#rep-grad)"/>
    <defs>
      <linearGradient id="rep-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#34d399"/>
        <stop offset="100%" stop-color="#059669"/>
      </linearGradient>
    </defs>
  </svg>`,

  // Comment — same chat bubble style for comment (Image 7 / variation)
  comment: `<svg width="22" height="22" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="34" height="25" rx="6" stroke="url(#com-grad)" stroke-width="2.5" fill="none"/>
    <path d="M28 35 L24 30 L30 30" stroke="url(#com-grad)" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="10" y1="14" x2="30" y2="14" stroke="url(#com-grad)" stroke-width="2.2" stroke-linecap="round"/>
    <line x1="10" y1="20" x2="24" y2="20" stroke="url(#com-grad)" stroke-width="2.2" stroke-linecap="round"/>
    <defs>
      <linearGradient id="com-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#f472b6"/>
        <stop offset="100%" stop-color="#ec4899"/>
      </linearGradient>
    </defs>
  </svg>`,

  // Hindi — Devanagari "अ" letter icon
  hindi: `<svg width="22" height="22" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-size="24" font-weight="bold" fill="url(#hin-grad)" font-family="serif">अ</text>
    <line x1="6" y1="10" x2="34" y2="10" stroke="url(#hin-grad)" stroke-width="2.5" stroke-linecap="round"/>
    <defs>
      <linearGradient id="hin-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#fb923c"/>
        <stop offset="100%" stop-color="#f97316"/>
      </linearGradient>
    </defs>
  </svg>`
};
