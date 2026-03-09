(function () {
  "use strict";
  // Kill any previous version and take over
  if (window.__explainAIv5) return;
  if (window.__explainAIv4) {
    // Remove any old FAB/menu injected by v4
    document.querySelectorAll('.eai-fab,.eai-menu,.eai-panel,.eai-toast,.eai-onboard,.eai-rating').forEach(el=>el.remove());
  }
  window.__explainAIv4 = true; // claim v4 flag too so v4 won't re-init
  window.__explainAIv5 = true;
  const IC = {
    main:      `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2c0 0 1.5 5.5 6 7-4.5 1.5-6 7-6 7s-1.5-5.5-6-7c4.5-1.5 6-7 6-7Z" fill="url(#gm)"/><path d="M19.5 2c0 0 .8 2.5 2.5 3.5-1.7 1-2.5 3.5-2.5 3.5s-.8-2.5-2.5-3.5c1.7-1 2.5-3.5 2.5-3.5Z" fill="url(#gm)" opacity=".7"/><path d="M5 15c0 0 .8 2 2.5 3-1.7 1-2.5 3-2.5 3s-.8-2-2.5-3c1.7-1 2.5-3 2.5-3Z" fill="url(#gm)" opacity=".5"/><defs><linearGradient id="gm" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse"><stop stop-color="#a78bfa"/><stop offset="1" stop-color="#00d4aa"/></linearGradient></defs></svg>`,
    explain:   `<svg viewBox="0 0 36 36" fill="none"><rect x="2" y="12" width="4" height="18" rx="2" fill="url(#ge)"/><rect x="9" y="7" width="4" height="24" rx="2" fill="url(#ge)"/><rect x="16" y="10" width="4" height="20" rx="2" fill="url(#ge)"/><rect x="23" y="15" width="4" height="12" rx="2" fill="url(#ge)"/><path d="M30 3c0 0 1.2 3.5 4 4.5-2.8 1-4 4.5-4 4.5s-1.2-3.5-4-4.5c2.8-1 4-4.5 4-4.5Z" fill="url(#ge)"/><defs><linearGradient id="ge" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse"><stop stop-color="#7c3aed"/><stop offset="1" stop-color="#c084fc"/></linearGradient></defs></svg>`,
    summarize: `<svg viewBox="0 0 40 40" fill="none"><circle cx="8" cy="13" r="4" stroke="url(#gs)" stroke-width="2.5" fill="none"/><circle cx="8" cy="27" r="4" stroke="url(#gs)" stroke-width="2.5" fill="none"/><circle cx="20" cy="7" r="4" stroke="url(#gs)" stroke-width="2.5" fill="none"/><circle cx="20" cy="20" r="4" stroke="url(#gs)" stroke-width="2.5" fill="none"/><circle cx="20" cy="33" r="4" stroke="url(#gs)" stroke-width="2.5" fill="none"/><circle cx="32" cy="20" r="4" stroke="url(#gs)" stroke-width="2.5" fill="none"/><line x1="12" y1="13" x2="16" y2="9" stroke="url(#gs)" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="15" x2="16" y2="20" stroke="url(#gs)" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="25" x2="16" y2="20" stroke="url(#gs)" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="27" x2="16" y2="32" stroke="url(#gs)" stroke-width="2" stroke-linecap="round"/><line x1="24" y1="20" x2="28" y2="20" stroke="url(#gs)" stroke-width="2" stroke-linecap="round"/><line x1="24" y1="9" x2="28" y2="18" stroke="url(#gs)" stroke-width="2" stroke-linecap="round"/><line x1="24" y1="32" x2="28" y2="22" stroke="url(#gs)" stroke-width="2" stroke-linecap="round"/><defs><linearGradient id="gs" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse"><stop stop-color="#06b6d4"/><stop offset="1" stop-color="#3b82f6"/></linearGradient></defs></svg>`,
    simplify:  `<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="14" r="9" stroke="url(#gsi)" stroke-width="2.5" fill="none"/><path d="M17 12c0-1.7 1.3-3 3-3s3 1.3 3 3c0 1.5-1.5 2.5-3 3v2" stroke="url(#gsi)" stroke-width="2.5" stroke-linecap="round"/><circle cx="20" cy="20" r="1.5" fill="url(#gsi)"/><path d="M13 28h14M15 33h10" stroke="url(#gsi)" stroke-width="2.5" stroke-linecap="round"/><defs><linearGradient id="gsi" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse"><stop stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b"/></linearGradient></defs></svg>`,
    example:   `<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="8" r="3.5" stroke="url(#gex)" stroke-width="2.2" fill="none"/><circle cx="11" cy="20" r="3" stroke="url(#gex)" stroke-width="2.2" fill="none"/><circle cx="29" cy="20" r="3" stroke="url(#gex)" stroke-width="2.2" fill="none"/><line x1="18" y1="11" x2="13" y2="17" stroke="url(#gex)" stroke-width="2" stroke-linecap="round"/><line x1="22" y1="11" x2="27" y2="17" stroke="url(#gex)" stroke-width="2" stroke-linecap="round"/><path d="M6 28Q12 24 20 26Q28 28 34 25" stroke="url(#gex)" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M6 28Q4 31 6 33Q18 32 34 25" stroke="url(#gex)" stroke-width="2.2" fill="none" stroke-linecap="round"/><defs><linearGradient id="gex" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse"><stop stop-color="#f59e0b"/><stop offset="1" stop-color="#ef4444"/></linearGradient></defs></svg>`,
    diagram:   `<svg viewBox="0 0 40 40" fill="none"><path d="M8 34L13 26H6Q2 26 2 22V10Q2 6 6 6H28Q32 6 32 10V22Q32 26 28 26H13" stroke="url(#gd)" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 19L14 16L18 13" stroke="url(#gd)" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 16H22" stroke="url(#gd)" stroke-width="2.5" stroke-linecap="round"/><defs><linearGradient id="gd" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse"><stop stop-color="#60a5fa"/><stop offset="1" stop-color="#818cf8"/></linearGradient></defs></svg>`,
    translate: `<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="14" stroke="url(#gt)" stroke-width="2.5" fill="none"/><ellipse cx="20" cy="20" rx="7" ry="14" stroke="url(#gt)" stroke-width="2" fill="none"/><line x1="6" y1="20" x2="34" y2="20" stroke="url(#gt)" stroke-width="2" stroke-linecap="round"/><line x1="8" y1="13" x2="32" y2="13" stroke="url(#gt)" stroke-width="1.5" stroke-linecap="round" opacity=".5"/><line x1="8" y1="27" x2="32" y2="27" stroke="url(#gt)" stroke-width="1.5" stroke-linecap="round" opacity=".5"/><defs><linearGradient id="gt" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse"><stop stop-color="#22d3ee"/><stop offset="1" stop-color="#0ea5e9"/></linearGradient></defs></svg>`,
    reply:     `<svg viewBox="0 0 40 40" fill="none"><rect x="3" y="5" width="34" height="25" rx="6" stroke="url(#gr)" stroke-width="2.5" fill="none"/><path d="M10 34L14 29H8" stroke="url(#gr)" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="13" cy="17.5" r="2.5" fill="url(#gr)"/><circle cx="20" cy="17.5" r="2.5" fill="url(#gr)"/><circle cx="27" cy="17.5" r="2.5" fill="url(#gr)"/><defs><linearGradient id="gr" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse"><stop stop-color="#34d399"/><stop offset="1" stop-color="#059669"/></linearGradient></defs></svg>`,
    comment:   `<svg viewBox="0 0 40 40" fill="none"><rect x="3" y="5" width="34" height="25" rx="6" stroke="url(#gc)" stroke-width="2.5" fill="none"/><path d="M30 34L26 29H32" stroke="url(#gc)" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><line x1="10" y1="14" x2="30" y2="14" stroke="url(#gc)" stroke-width="2.2" stroke-linecap="round"/><line x1="10" y1="21" x2="23" y2="21" stroke="url(#gc)" stroke-width="2.2" stroke-linecap="round"/><defs><linearGradient id="gc" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse"><stop stop-color="#f472b6"/><stop offset="1" stop-color="#ec4899"/></linearGradient></defs></svg>`,
    quiz:      `<svg viewBox="0 0 40 40" fill="none"><rect x="4" y="4" width="32" height="32" rx="8" stroke="url(#gq)" stroke-width="2.5" fill="none"/><path d="M16 16c0-2.2 1.8-4 4-4s4 1.8 4 4c0 2-2 3-4 4v1.5" stroke="url(#gq)" stroke-width="2.5" stroke-linecap="round"/><circle cx="20" cy="27" r="1.8" fill="url(#gq)"/><defs><linearGradient id="gq" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse"><stop stop-color="#a78bfa"/><stop offset="1" stop-color="#7c3aed"/></linearGradient></defs></svg>`
  };

  const ACTIONS = [
    { task:"explain",   icon:"explain",   label:"Explain",   color:"#7c3aed" },
    { task:"summarize", icon:"summarize", label:"Summarize", color:"#06b6d4" },
    { task:"simplify",  icon:"simplify",  label:"Simplify",  color:"#f59e0b" },
    { task:"example",   icon:"example",   label:"Example",   color:"#ef4444" },
    { task:"diagram",   icon:"diagram",   label:"Diagram",   color:"#3b82f6" },
    { task:"translate", icon:"translate", label:"Translate", color:"#0ea5e9" },
    { task:"reply",     icon:"reply",     label:"Reply",     color:"#34d399" },
    { task:"comment",   icon:"comment",   label:"Comment",   color:"#ec4899" },
    { task:"quiz",      icon:"quiz",      label:"Quiz",      color:"#a78bfa" }
  ];

  const LABELS = {
    explain:"Explanation", summarize:"Summary", simplify:"Simplified (ELI5)",
    example:"Example", diagram:"Diagram", translate:"Translation",
    reply:"Reply Draft", comment:"Comment", quiz:"Quiz",
    "explain-page":"Page Summary"
  };

  let floatBtn=null, menu=null, panel=null;
  let selTimer=null, lastText="", dragging=false, streamTimer=null;

  function init() {
    document.addEventListener("mouseup",         onUp,         true);
    document.addEventListener("mousedown",       onDown,       true);
    document.addEventListener("keyup",           onKey,        true);
    document.addEventListener("selectionchange", onSelChange);
    chrome.runtime.onMessage.addListener(onMsg);
  }

  function onUp(e) {
    if (isOurs(e.target)) return;
    clearTimeout(selTimer);
    selTimer = setTimeout(() => {
      const sel = window.getSelection();
      const txt = sel?.toString().trim() || "";
      if (txt.length > 5) { lastText = txt; showFab(sel); }
      else { hideFab(); hideMenu(); }
    }, 180);
  }
  function onDown(e) { if (!isOurs(e.target)) hideMenu(); }
  function onKey(e) {
    if (isOurs(e.target)) return;
    const txt = window.getSelection()?.toString().trim() || "";
    if (txt.length > 5) lastText = txt;
    else if (!txt) { hideFab(); hideMenu(); }
  }
  function onSelChange() {
    if (!window.getSelection()?.toString().trim()) {
      clearTimeout(selTimer);
      setTimeout(() => { if (!window.getSelection()?.toString().trim()) { hideFab(); hideMenu(); } }, 250);
    }
  }
  function onMsg(msg) {
    if (msg.action === "run-task")     { const t=msg.text||lastText||window.getSelection()?.toString().trim(); t?runTask(msg.task,t):toast("Select text first","warn"); }
    if (msg.action === "explain-page") doExplainPage();
  }

  function showFab(sel) {
    rm(floatBtn);
    const rect = sel.getRangeAt(0).getBoundingClientRect();
    floatBtn = mk("div","eai-fab");
    floatBtn.innerHTML = `<span class="eai-fab-ico">${IC.main}</span><span class="eai-fab-lbl">AI</span>`;
    // Use viewport coords (position:fixed) — place just above/right of selection
    const vx = Math.min(rect.right + 8, innerWidth - 90);
    const vy = Math.max(rect.top - 44, 8);
    floatBtn.style.left = Math.max(vx, 8) + "px";
    floatBtn.style.top  = vy + "px";
    floatBtn.addEventListener("click",e=>{ e.stopPropagation(); toggleMenu(floatBtn); });
    document.body.appendChild(floatBtn);
    raf(()=>floatBtn.classList.add("eai-vis"));
  }

  function hideFab() {
    if(!floatBtn) return;
    floatBtn.classList.remove("eai-vis");
    setTimeout(()=>rm(floatBtn),200); floatBtn=null;
  }

  function toggleMenu(anchor) {
    if (menu) { hideMenu(); return; }
    menu = mk("div","eai-menu");
    menu.innerHTML = `
      <div class="eai-mhdr">
        <span class="eai-mhdr-ico">${IC.main}</span>
        <div>
          <div class="eai-mhdr-title">Explain Anything AI</div>
          <div class="eai-mhdr-sub" id="eai-usageline">Loading…</div>
        </div>
      </div>
      <div class="eai-grid33" id="eai-mgrid"></div>
      <div class="eai-mftr">Powered by Groq</div>
    `;

    const grid = menu.querySelector("#eai-mgrid");
    ACTIONS.forEach(({ task, icon, label, color }) => {
      const b = mk("button","eai-mbtn");
      b.style.setProperty("--c", color);
      b.innerHTML = `<span class="eai-mbtn-ico">${IC[icon]}</span><span class="eai-mbtn-lbl">${label}</span>`;
      b.addEventListener("click", e => { e.stopPropagation(); addRipple(b,e); hideMenu(); hideFab(); runTask(task, lastText); });
      grid.appendChild(b);
    });

    chrome.runtime.sendMessage({ action:"get-usage" }).then(u=>{
      const el = menu?.querySelector("#eai-usageline");
      if (el && u) el.textContent = `${u.count}/${u.limit} today`;
    }).catch(()=>{});

    const ar = anchor.getBoundingClientRect();
    const mx = Math.min(ar.left, innerWidth - 280);
    const my = Math.min(ar.bottom + 8, innerHeight - 420);
    menu.style.left = Math.max(mx, 8) + "px";
    menu.style.top  = Math.max(my, 8) + "px";
    document.body.appendChild(menu);
    raf(()=>menu.classList.add("eai-vis"));
    setTimeout(()=>document.addEventListener("click", menuOut, { once:true }), 100);
  }

  function menuOut(e) { if (menu && !isOurs(e.target)) hideMenu(); }
  function hideMenu() { if(!menu) return; menu.classList.remove("eai-vis"); setTimeout(()=>rm(menu),200); menu=null; }
  async function runTask(task, text) {
    if (!text?.trim()) { toast("Select some text first","warn"); return; }
    showPanel(task, text);
    try {
      const res = await chrome.runtime.sendMessage({ action:"call-api", task, text });
      if (res.ok) streamIn(task, res.result, text);
      else setErr(res.error || "Something went wrong.");
    } catch(e) { setErr("Error: " + e.message); }
  }

  async function doExplainPage() {
    let txt = "";
    for (const s of ["article","main","[role='main']",".content","#content"]) {
      const el = document.querySelector(s); if (el) { txt = el.innerText; break; }
    }
    if (!txt) {
      const b = document.body.cloneNode(true);
      ["script","style","nav","header","footer","aside"].forEach(s=>b.querySelectorAll(s).forEach(e=>e.remove()));
      txt = b.innerText;
    }
    await runTask("explain-page", txt.replace(/\s+/g," ").trim().substring(0,3000));
  }

  function showPanel(task, selText) {
    rm(panel);
    const ac = ACTIONS.find(a=>a.task===task) || { color:"#6c63ff", icon:"explain" };
    panel = mk("div","eai-panel");
    panel.style.setProperty("--tc", ac.color);

    panel.innerHTML = `
      <div class="eai-phdr">
        <div class="eai-phdr-l">
          <span class="eai-phdr-ico">${IC[ac.icon]||IC.explain}</span>
          <div>
            <div class="eai-ptitle">${LABELS[task]||"AI Response"}</div>
            ${selText.length<85?`<div class="eai-psub">"${esc(selText)}"</div>`:""}
          </div>
        </div>
        <div class="eai-phdr-r">
          <button class="eai-icobtn eai-cpybtn" title="Copy">
            <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><rect x="7" y="7" width="11" height="11" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M4 13H3a2 2 0 01-2-2V3a2 2 0 012-2h8a2 2 0 012 2v1" stroke="currentColor" stroke-width="1.8"/></svg>
          </button>
          <button class="eai-icobtn eai-clsbtn" title="Close">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          </button>
        </div>
      </div>
      <div class="eai-pbody"><div class="eai-pcontent">
        <div class="eai-loading"><div class="eai-dots"><span></span><span></span><span></span></div><span>Generating…</span></div>
      </div></div>
      <div class="eai-pftr">
        <div class="eai-ppills">
          ${ACTIONS.map(a=>`<button class="eai-pill${a.task===task?" on":""}" data-t="${a.task}" style="--pc:${a.color}"><span class="eai-pill-ic">${IC[a.icon]}</span>${a.label}</button>`).join("")}
        </div>
        <div class="eai-pmeta"><span class="eai-toks" id="eai-toks">● 0 tokens</span><span class="eai-pwrd">✦ LUMIQ AI</span></div>
      </div>
    `;

    panel.style.cssText += `right:20px;top:80px`;
    document.body.appendChild(panel);
    raf(()=>panel.classList.add("eai-vis"));

    // Close
    panel.querySelector(".eai-clsbtn").addEventListener("click",()=>{
      clearInterval(streamTimer);
      panel.classList.remove("eai-vis"); setTimeout(()=>rm(panel),300); panel=null;
    });

    // Copy
    panel.querySelector(".eai-cpybtn").addEventListener("click",()=>{
      copy(panel.querySelector(".eai-pcontent")?.innerText||"");
    });

    // Task pills
    panel.querySelectorAll(".eai-pill").forEach(pill=>{
      pill.addEventListener("click",()=>{
        const nt = pill.dataset.t;
        panel.querySelectorAll(".eai-pill").forEach(p=>p.classList.remove("on"));
        pill.classList.add("on");
        const na = ACTIONS.find(a=>a.task===nt);
        if (na) { panel.style.setProperty("--tc",na.color); panel.querySelector(".eai-phdr-ico").innerHTML=IC[na.icon]; panel.querySelector(".eai-ptitle").textContent=LABELS[nt]||"AI Response"; }
        const c = panel.querySelector(".eai-pcontent");
        c.innerHTML=`<div class="eai-loading"><div class="eai-dots"><span></span><span></span><span></span></div><span>Generating…</span></div>`;
        clearInterval(streamTimer);
        chrome.runtime.sendMessage({ action:"call-api", task:nt, text:selText })
          .then(r=>r.ok?streamIn(nt,r.result,selText):setErr(r.error));
      });
    });

    dragify(panel, panel.querySelector(".eai-phdr"));
  }
  function streamIn(task, full, selText) {
    if (!panel) return;
    clearInterval(streamTimer);
    const el  = panel.querySelector(".eai-pcontent");
    const tok = panel.querySelector("#eai-toks");
    el.innerHTML = "";
    const out = mk("div","eai-stream"); el.appendChild(out);
    const cur = mk("span","eai-cur"); cur.textContent="▌"; el.appendChild(cur);
    const words = full.split(/(\s+)/);
    let i=0, shown="", count=0;
    streamTimer = setInterval(()=>{
      if (i >= words.length) { clearInterval(streamTimer); cur.remove(); renderFinal(task,full,el); return; }
      const batch = Math.min(Math.floor(Math.random()*3)+1, words.length-i);
      for (let b=0;b<batch;b++) { shown+=(words[i]||""); if((words[i]||"").trim())count++; i++; }
      out.textContent = shown;
      if (tok) tok.textContent = `● ${count} tokens`;
      const body = panel.querySelector(".eai-pbody");
      if (body) body.scrollTop = body.scrollHeight;
    }, 26);
  }

  function renderFinal(task, text, el) {
    el.innerHTML = "";
    let html = "";
    if      (task==="summarize") { const ls=text.split("\n").filter(l=>l.trim()); html=`<ul class="eai-blist">${ls.map(l=>`<li>${esc(l.replace(/^[•\-\*\d\.]\s*/,""))}</li>`).join("")}</ul>`; }
    else if (task==="diagram")   { html=`<pre class="eai-diag">${esc(text)}</pre>`; }
    else if (task==="reply")     { html=`<div class="eai-reply">${esc(text).replace(/\n/g,"<br>")}</div>`; }
    else if (task==="quiz")      { html=`<div class="eai-quiz">${esc(text).replace(/\n/g,"<br>")}</div>`; }
    else if (task==="translate") { const ls=text.split("\n").filter(l=>l.trim()); html=ls.length>3?`<ul class="eai-blist eai-blist-trans">${ls.map(l=>`<li>${esc(l.replace(/^[•\-\*\d\.]\s*/,""))}</li>`).join("")}</ul>`:`<div class="eai-trans">${esc(text).replace(/\n/g,"<br>")}</div>`; }
    else                         { html=`<p class="eai-ans">${esc(text).replace(/\n/g,"<br>")}</p>`; }
    el.innerHTML = html;
    el.style.opacity="0"; raf(()=>{ el.style.transition="opacity .3s"; el.style.opacity="1"; });
  }

  function setErr(msg) { if(!panel)return; panel.querySelector(".eai-pcontent").innerHTML=`<div class="eai-err"><span>⚠️</span><span>${esc(msg)}</span></div>`; }
  function dragify(el, handle) {
    let sx,sy,sl,st;
    handle.style.cursor="grab";
    handle.addEventListener("mousedown",e=>{ if(e.target.closest(".eai-icobtn"))return; dragging=true;sx=e.clientX;sy=e.clientY;sl=el.offsetLeft;st=el.offsetTop;handle.style.cursor="grabbing";e.preventDefault(); });
    document.addEventListener("mousemove",e=>{ if(!dragging)return; el.style.left=`${sl+e.clientX-sx}px`;el.style.top=`${st+e.clientY-sy}px`;el.style.right="auto"; });
    document.addEventListener("mouseup",()=>{ if(dragging){dragging=false;handle.style.cursor="grab";} });
  }

  function toast(msg, type="info") {
    const t=mk("div",`eai-toast eai-toast-${type}`); t.textContent=msg; document.body.appendChild(t);
    raf(()=>t.classList.add("eai-vis"));
    setTimeout(()=>{ t.classList.remove("eai-vis"); setTimeout(()=>rm(t),300); },3000);
  }

  function isOurs(el) { return el?.closest?.(".eai-fab,.eai-menu,.eai-panel,.eai-toast"); }
  function mk(tag,cls) { const e=document.createElement(tag); if(cls)e.className=cls; return e; }
  function rm(el) { el?.parentNode?.removeChild(el); }
  function raf(fn) { requestAnimationFrame(fn); }
  function esc(s) { const d=document.createElement("div"); d.appendChild(document.createTextNode(s)); return d.innerHTML; }
  function addRipple(btn) { const r=mk("span","eai-ripple"); btn.appendChild(r); setTimeout(()=>r.remove(),600); }
  function copy(text) {
    navigator.clipboard.writeText(text).then(()=>toast("✓ Copied!","success")).catch(()=>{
      const ta=mk("textarea"); ta.value=text; ta.style.cssText="position:fixed;opacity:0"; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); rm(ta); toast("✓ Copied!","success");
    });
  }

  init();
})();