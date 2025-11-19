// ==============================
//  script.js — FULL (HARDCORE) EDITION
//  Paste langsung menggantikan script.js lama
//  SAFE: purely visual. No file access or encryption.
// ==============================

// ==============================
//  MASTER CONFIG
// ==============================
const PIN_CODE = '159753';

const startBtn = document.getElementById('startBtn');
const hum = document.getElementById('hum');
const bios = document.getElementById('bios');
const biosText = document.getElementById('biosText');
const term = document.getElementById('term');
const termText = document.getElementById('termText');
const panic = document.getElementById('panic');
const leakContent = document.getElementById('leakContent');

const panicS = document.getElementById('panicS');
const biosBeep = document.getElementById('biosBeep');
const glitchLayer = document.getElementById('glitch');
const glitchS = document.getElementById('glitchS');
const emergency = document.getElementById('emergency');
const unlockBtn = document.getElementById('unlockBtn');

let sequenceTimers = [];
let hardcoreTimers = []; // timers for hardcore effects to clear on unlock

// ==============================
//  UTILITIES
// ==============================
function q(ms){
  return new Promise(res=>{
    const t = setTimeout(res, ms);
    sequenceTimers.push(t);
  });
}

function pushHardcoreTimer(t){
  hardcoreTimers.push(t);
}

function clearAllHardcoreTimers(){
  hardcoreTimers.forEach(t => clearInterval(t));
  hardcoreTimers = [];
}

function clearSequence(){
  sequenceTimers.forEach(t => clearTimeout(t));
  sequenceTimers = [];
  clearAllHardcoreTimers();
}

function safeFullscreen(){
  try{ document.documentElement.requestFullscreen?.(); }catch(e){}
}

function typeTo(el, text, speed=24){
  return new Promise(res=>{
    let i=0;
    const t = setInterval(()=>{
      el.textContent += text.charAt(i++) || '';
      el.scrollTop = el.scrollHeight;
      if(i>text.length){ clearInterval(t); res(); }
    }, speed);
    sequenceTimers.push(t);
  });
}

function escapeHtml(s){
  return String(s || '')
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;');
}

// ==============================
//  BASIC EFFECTS (existing + upgraded)
// ==============================

// SCREEN SHAKE
function shakeScreen(duration = 600){
  const body = document.body;
  body.style.transition = "transform 0.03s";
  let elapsed = 0;
  const step = 30;
  const t = setInterval(()=>{
    const x = Math.random()*12 - 6;
    const y = Math.random()*12 - 6;
    body.style.transform = `translate(${x}px, ${y}px)`;
    elapsed += step;
    if(elapsed >= duration){
      clearInterval(t); body.style.transform='translate(0,0)';
    }
  }, step);
  pushHardcoreTimer(t);
}

// FLASH WHITE
function flashWhite(ms=120){
  const f = document.createElement('div');
  f.style.position='fixed'; f.style.inset='0';
  f.style.background='white'; f.style.opacity='0.95';
  f.style.zIndex='99999';
  document.body.appendChild(f);
  setTimeout(()=> f.remove(), ms);
}

// FAKE BSOD (bigger & longer)
function showFakeBSOD(duration = 4000){
  const bs = document.createElement("div");
  bs.id = '__fake_bsod';
  bs.style.position="fixed";
  bs.style.inset="0";
  bs.style.background="#001ebb";
  bs.style.color="#fff";
  bs.style.fontFamily="Consolas, monospace";
  bs.style.padding="40px";
  bs.style.zIndex="999999";
  bs.style.display="flex";
  bs.style.flexDirection="column";
  bs.style.justifyContent="center";
  bs.style.alignItems="center";
  bs.innerHTML = `
    <div style="text-align:center;max-width:800px">
      <h1 style="font-size:96px;margin:0">:(</h1>
      <p style="font-size:20px">Your PC ran into a problem and needs to restart. We're just collecting some error info, and then we'll restart for you.</p>
      <p style="margin-top:18px">ERROR CODE: FAKE_RANSOM_0xDEAD</p>
    </div>
  `;
  document.body.appendChild(bs);
  const t = setTimeout(()=>{ bs.remove(); }, duration);
  pushHardcoreTimer(t);
}

// RANDOM ERROR POPUP (many)
function spawnErrorPopup(message){
  const box = document.createElement("div");
  box.className = "__hc_popup";
  box.style.position = "fixed";
  box.style.left = (10 + Math.random()*70) + "%";
  box.style.top = (10 + Math.random()*60) + "%";
  box.style.background = "#0f0f0f";
  box.style.color = "#ff7b7b";
  box.style.padding = "8px 12px";
  box.style.border = "1px solid rgba(255,80,80,0.9)";
  box.style.zIndex = 999999;
  box.style.fontFamily = "monospace";
  box.style.fontSize = "13px";
  box.style.boxShadow = "0 6px 18px rgba(0,0,0,0.6)";
  box.innerHTML = `<strong>ERROR</strong><div style="font-size:12px;margin-top:6px">${escapeHtml(message)}</div>`;
  document.body.appendChild(box);
  const t = setTimeout(()=> box.remove(), 2500 + Math.random()*2000);
  pushHardcoreTimer(t);
}

// many popups spawn
function spawnPopupStorm(count = 14){
  for(let i=0;i<count;i++){
    setTimeout(()=> spawnErrorPopup("system32 corrupted - access denied"), i*120);
  }
}

// FAKE DECRYPT BAR (visual)
function showDecryptBarSmall(){
  const id = '__small_decrypt';
  if(document.getElementById(id)) return;
  const wrap = document.createElement("div");
  wrap.id = id;
  wrap.style.position = "fixed";
  wrap.style.left = "50%";
  wrap.style.bottom = "16px";
  wrap.style.transform = "translateX(-50%)";
  wrap.style.width = "320px";
  wrap.style.background = "rgba(0,0,0,0.85)";
  wrap.style.color = "#fdd";
  wrap.style.border = "1px solid rgba(255,0,0,0.12)";
  wrap.style.padding = "8px";
  wrap.style.zIndex = 99999;
  wrap.innerHTML = `<div style="font-family:monospace;font-size:13px">Encrypting files... <span id="__dbg_pct">0%</span></div>
    <div style="height:8px;background:#200;border-radius:6px;margin-top:6px;overflow:hidden"><div id="__dbg_bar" style="height:100%;width:0%;background:linear-gradient(90deg,#ff4b4b,#ffb3b3)"></div></div>`;
  document.body.appendChild(wrap);
  let p=0;
  const t = setInterval(()=>{
    p += Math.floor(Math.random()*6);
    document.getElementById('__dbg_bar').style.width = Math.min(100,p) + '%';
    document.getElementById('__dbg_pct').textContent = Math.min(100,p) + '%';
    if(p >= 100){ clearInterval(t); setTimeout(()=> wrap.remove(), 900); }
  }, 300);
  pushHardcoreTimer(t);
}

// HACKER CHAT (bigger)
async function hackerChatPopup(){
  const chat = document.createElement("div");
  chat.style.position="fixed";
  chat.style.left="18px";
  chat.style.bottom="18px";
  chat.style.width="320px";
  chat.style.maxHeight="260px";
  chat.style.overflow="auto";
  chat.style.background="#020";
  chat.style.border="1px solid #0c0";
  chat.style.color="#0f0";
  chat.style.zIndex=999999;
  chat.style.padding="8px";
  chat.style.fontFamily="monospace";
  document.body.appendChild(chat);

  const msgs = [
    "establishing tunnel...",
    "dropping rootkit...",
    "enumerating home directory...",
    "found wallet_seed.txt - copying...",
    "uploading to remote storage...",
    "encryption key generated"
  ];

  for(const m of msgs){
    const d = document.createElement('div');
    chat.appendChild(d);
    await typeTo(d, m, 12);
    await q(500 + Math.random()*900);
  }

  const t = setTimeout(()=> chat.remove(), 7000);
  pushHardcoreTimer(t);
}

// TERMINAL AUTOTYPE overlay (full-screen fake terminal)
function spawnLiveTerminal(lines=8){
  const twrap = document.createElement('div');
  twrap.style.position='fixed'; twrap.style.inset='0'; twrap.style.zIndex=900001;
  twrap.style.background='#000'; twrap.style.color='#0f0'; twrap.style.fontFamily='monospace';
  twrap.style.padding='20px'; twrap.style.overflow='hidden';
  document.body.appendChild(twrap);
  const pre = document.createElement('pre');
  pre.style.fontSize='14px';
  pre.textContent = '';
  twrap.appendChild(pre);

  let counter = 0;
  const sample = [
    'Initializing secure erase module...',
    'Connecting to 88.132.45.12:443 ...',
    'Bypassing 3 firewall layers...',
    'Dumping /home/* to remote...',
    'Encrypting: Photos/holiday_2025.jpg',
    'Encrypting: Documents/Tax_return_2025.docx',
    'Encrypting: Wallets/wallet_seed.txt',
    'Done.'
  ];
  const t = setInterval(()=>{
    if(counter < sample.length){
      typeTo(pre, sample[counter] + '\n', 12);
      counter++;
    } else {
      // random additional noise lines
      const noise = '>' + Math.random().toString(36).slice(2,12);
      typeTo(pre, noise + '\n', 8);
    }
  }, 600);
  pushHardcoreTimer(t);

  // auto remove after a while
  const rm = setTimeout(()=> twrap.remove(), 14000);
  pushHardcoreTimer(rm);
}

// CPU / RAM fake meter
function spawnFakeCPUMeter(){
  const meter = document.createElement('div');
  meter.id = '__hc_cpu';
  meter.style.position='fixed';
  meter.style.left='10px';
  meter.style.top='10px';
  meter.style.zIndex='999999';
  meter.style.background='rgba(0,0,0,0.7)';
  meter.style.color='#fff';
  meter.style.padding='8px';
  meter.style.border='1px solid rgba(255,0,0,0.12)';
  meter.style.fontFamily='monospace';
  meter.style.fontSize='13px';
  meter.innerHTML = `CPU: <span id="__cpu_pct">0</span>% <br> RAM: <span id="__ram_pct">0</span>%`;
  document.body.appendChild(meter);

  const t = setInterval(()=>{
    const c = 80 + Math.floor(Math.random()*19); // 80-98
    const r = 70 + Math.floor(Math.random()*25);
    document.getElementById('__cpu_pct').textContent = c;
    document.getElementById('__ram_pct').textContent = r;
    // if very high, play alarm occasionally
    if(c > 95 && Math.random() > 0.6){
      try{ new Audio('https://assets.mixkit.co/sfx/preview/mixkit-retro-arcade-alarm-992.wav').play().catch(()=>{}); }catch(e){}
    }
  }, 900);
  pushHardcoreTimer(t);
  // remove later with unlock
}

// DESTRUCTION COUNTDOWN (big dramatic)
function showDestructionCountdown(seconds = 10){
  const overlay = document.createElement('div');
  overlay.id='__hc_countdown';
  overlay.style.position='fixed';
  overlay.style.inset='0';
  overlay.style.display='flex';
  overlay.style.alignItems='center';
  overlay.style.justifyContent='center';
  overlay.style.zIndex='999999';
  overlay.style.background='radial-gradient(circle, rgba(40,0,0,0.6), rgba(0,0,0,0.9))';
  overlay.innerHTML = `<div style="text-align:center;color:#ffb3b3;font-family:monospace">
    <div style="font-size:18px;margin-bottom:6px">SYSTEM SELF-DESTRUCT</div>
    <div id="__hc_count_num" style="font-size:140px;font-weight:800">` + seconds + `</div>
    <div style="margin-top:8px;font-size:14px">This is visual only — no files are harmed.</div>
  </div>`;
  document.body.appendChild(overlay);

  let s = seconds;
  const t = setInterval(()=>{
    s--;
    const el = document.getElementById('__hc_count_num');
    if(el) el.textContent = s;
    flashWhite(80);
    shakeScreen(140);
    if(s <= 0){
      clearInterval(t);
      // simulate big static then remove
      spawnStaticNoise(1200);
      setTimeout(()=> overlay.remove(), 1300);
    }
  }, 1000);
  pushHardcoreTimer(t);
}

// STATIC / TV NOISE overlay
function spawnStaticNoise(duration = 1000){
  const canv = document.createElement('canvas');
  canv.id='__hc_static';
  canv.style.position='fixed'; canv.style.inset='0';
  canv.style.zIndex='999998';
  canv.style.opacity = '1';
  document.body.appendChild(canv);
  canv.width = window.innerWidth;
  canv.height = window.innerHeight;
  const ctx = canv.getContext('2d');

  let running = true;
  function draw(){
    const imageData = ctx.createImageData(canv.width, canv.height);
    const buffer = new Uint32Array(imageData.data.buffer);
    for(let i=0;i<buffer.length;i++){
      const v = Math.random() > 0.5 ? 0xffffffff : 0xff000000;
      buffer[i] = v;
    }
    ctx.putImageData(imageData, 0, 0);
  }
  draw();
  const t = setInterval(draw, 80);
  pushHardcoreTimer(t);
  // auto remove
  setTimeout(()=>{ clearInterval(t); try{canv.remove();}catch(e){} }, duration);
}

// POPUP TOWER — spawn many popup windows
function spawnPopupTower(total = 20){
  const boxes = [];
  for(let i=0;i<total;i++){
    const b = document.createElement('div');
    b.className = '__hc_tower';
    b.style.position='fixed';
    b.style.left = (5 + Math.random()*80) + '%';
    b.style.top = (5 + Math.random()*80) + '%';
    b.style.background = '#111';
    b.style.color = '#ffdcdc';
    b.style.padding = '10px';
    b.style.border = '1px solid rgba(255,0,0,0.2)';
    b.style.zIndex = 999990 + i;
    b.style.fontFamily = 'monospace';
    b.style.fontSize = '12px';
    b.innerHTML = `<strong>Attention</strong><div style="font-size:12px;margin-top:6px">Critical system error: ${Math.random().toString(36).slice(2,8)}</div>`;
    document.body.appendChild(b);
    boxes.push(b);
  }
  // remove all after some time
  const t = setTimeout(()=> boxes.forEach(x=>x.remove()), 11000 + Math.random()*6000);
  pushHardcoreTimer(t);
}

// LOCKDOWN MODE — disable interactions except unlock modal
let _lockdownActive = false;
function enterLockdown(){
  if(_lockdownActive) return;
  _lockdownActive = true;
  // overlay blocking input
  const overlay = document.createElement('div');
  overlay.id = '__hc_lockdown';
  overlay.style.position='fixed';
  overlay.style.inset='0';
  overlay.style.zIndex='999997';
  overlay.style.background = 'rgba(0,0,0,0.6)';
  overlay.style.display='flex';
  overlay.style.alignItems='center';
  overlay.style.justifyContent='center';
  overlay.innerHTML = `<div style="background:#140000;border:2px solid #5a0000;padding:18px;border-radius:8px;color:#ffdcdc;font-family:monospace;text-align:center">
    SYSTEM LOCKED<br><small>Enter PIN to regain control</small>
    <div style="margin-top:12px"><button id="__hc_unlock_btn" style="padding:8px 12px;border-radius:6px;background:#fff;color:#000;border:none;cursor:pointer">ENTER PIN</button></div>
  </div>`;
  document.body.appendChild(overlay);
  // disable page interactions (pointer-events blocked by overlay)
  // add event to open prompt
  document.getElementById('__hc_unlock_btn').addEventListener('click', ()=>{
    const p = prompt('Masukkan PIN untuk unlock (hard lockdown):');
    if(p === PIN_CODE){
      exitLockdown(true);
    } else {
      alert('PIN salah!');
      try{ navigator.vibrate && navigator.vibrate([200,80,200]); }catch(e){}
    }
  });
  // auto-try spawn more popups while in lockdown
  const t = setInterval(()=>{ spawnErrorPopup('lockdown enforced - kernel panic'); spawnPopupStorm(2); }, 1800);
  pushHardcoreTimer(t);
}

function exitLockdown(success){
  _lockdownActive = false;
  const el = document.getElementById('__hc_lockdown');
  if(el) el.remove();
  clearAllHardcoreTimers();
  // nice success: confetti
  spawnConfetti(40);
  try{ new Audio('https://assets.mixkit.co/sfx/preview/mixkit-quick-win-video-game-notification-269.wav').play().catch(()=>{}); }catch(e){}
}

// CONFETTI (reused)
function spawnConfetti(count=30){
  for(let i=0;i<count;i++){
    const el = document.createElement('div');
    el.className = 'hc-confetti';
    el.style.position='fixed';
    el.style.left = (Math.random()*100) + 'vw';
    el.style.top = (-10 - Math.random()*30) + 'vh';
    el.style.width = '8px';
    el.style.height = '12px';
    el.style.zIndex = 999999;
    el.style.background = ['#ff6b6b','#ffd93d','#6bcBff','#8affb4','#d08aff'][Math.floor(Math.random()*5)];
    el.style.opacity = '0.95';
    el.style.transform = `rotate(${Math.random()*360}deg)`;
    el.style.transition = 'transform 3s linear, top 3s linear';
    document.body.appendChild(el);
    setTimeout(()=>{ el.style.top = '110vh'; el.style.transform = 'rotate(720deg)'; }, 50);
    setTimeout(()=> el.remove(), 3500);
  }
}

// AUDIO / ALARM (short)
function playAlarm(){
  try{
    const s = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-retro-arcade-alarm-992.wav');
    s.volume = 0.6; s.play().catch(()=>{});
  }catch(e){}
}

// AUTO-RESTART LOOP (visual): briefly hide then show panic, repeat limited times
function autoRestartLoop(times = 2, intervalSec = 4){
  let count = 0;
  const t = setInterval(()=>{
    // simulate restart flicker
    panic.style.display = 'none';
    glitchLayer.style.opacity = 0;
    setTimeout(()=>{
      panic.style.display = 'flex';
      glitchLayer.style.opacity = 0.6;
      playAlarm();
    }, 600);
    count++;
    if(count >= times){
      clearInterval(t);
    }
  }, intervalSec * 1000);
  pushHardcoreTimer(t);
}

// ==============================
//  MAIN START FLOW (upgraded)
// ==============================
startBtn.addEventListener('click', async ()=>{
  document.getElementById('startBox')?.remove();
  safeFullscreen();

  hum.volume = 0.5;
  hum.play().catch(()=>{});
  biosBeep.play().catch(()=>{});

  document.body.style.transition = 'background 1s ease';
  document.body.style.background = '#050505';
  await q(700);
  document.body.style.background = '#000';

  // pre-attack theatrics
  showDestructionCountdown(6); // short dramatic countdown before sequence
  shakeScreen(900);
  flashWhite(140);
  spawnStaticNoise(700);

  await q(1800);

  bios.style.display = 'block';
  biosText.textContent = '';

  const lines = [
    "PhoenixBIOS v3.14.7 initializing...",
    "CPU: Secure Core Boot [OK]",
    "Memory check: 8192MB [OK]",
    "Disk controller: RAID-0 [OK]",
    "S.M.A.R.T. Unknown sectors found... [!]",
    "Attempting low-level repair...",
    "Permission escalation: SUCCESS",
    "Mounting user partitions...",
    "Accessing /home/* user directories...",
    ""
  ];

  for(const ln of lines){
    await typeTo(biosText, ln + '\n', 22);
    if(Math.random()>0.6){
      glitchLayer.style.opacity = 0.35;
      glitchS.currentTime = 0;
      glitchS.play().catch(()=>{});
    }
    if(Math.random()>0.6) spawnErrorPopup("driver load failed");
    if(Math.random()>0.7) showDecryptBarSmall();
    if(Math.random()>0.7) hackerChatPopup();
    await q(300 + Math.random()*400);
    glitchLayer.style.opacity = 0;
  }

  bios.style.display='none';
  term.style.display='block';
  termText.textContent='';

  const fakeFiles = [
    "/home/user/Documents/Tax_2025.pdf",
    "/home/user/Photos/family_birthday.jpg",
    "/home/user/wallets/wallet_backup.dat",
    "/home/user/Work/project_secret.ai",
    "/home/user/Notes/passwords.txt",
    "/mnt/usb/backup/system.img",
    "/var/lib/mailbox/attachments.zip",
    "/home/user/Videos/fun.mp4",
    "/home/user/Archives/important.zip"
  ];

  for(let f of fakeFiles){
    await typeTo(termText, `scanning ${f} ... `, 8);
    const ok = Math.random() > 0.35;
    await typeTo(termText, ok ? "OK\n" : "ERROR (locked)\n", 10);

    // random hardcore triggers
    if(Math.random()>0.7) spawnLiveTerminal(6);
    if(Math.random()>0.72) spawnPopupStorm(3);
    if(Math.random()>0.74) spawnFakeCPUMeter();
    if(Math.random()>0.8) showFakeBSOD(2200 + Math.random()*1800);
    if(Math.random()>0.78) spawnPopupTower(6);
    if(Math.random()>0.75) showDecryptBarSmall();

    await q(300 + Math.random()*600);
  }

  await q(800);
  term.style.display='none';

  // final panic screen
  panic.style.display='flex';
  panicS.currentTime=0;
  panicS.play().catch(()=>{});
  glitchLayer.style.opacity=0.7;

  const ua = navigator.userAgent || 'Unknown';
  const locale = navigator.language || 'id-ID';
  const now = new Date();

  leakContent.innerHTML = `
    <div><strong>Device Info:</strong></div>
    <div>User Agent: ${escapeHtml(ua)}</div>
    <div>Locale: ${escapeHtml(locale)}</div>
    <div>Local time: ${escapeHtml(now.toString())}</div>

    <div style="margin-top:10px"><strong>Leaked sample file list (visual):</strong></div>
    <ul>
      <li>Contacts_backup.csv</li>
      <li>Photos/Picture.jpg</li>
      <li>Password_You.txt</li>
    </ul>
  `;

  // Start hardcore visual effects
  spawnPopupStorm(6);
  spawnPopupTower(10);
  spawnLiveTerminal(12);
  spawnFakeCPUMeter();
  spawnStaticNoise(1200);
  spawnErrorPopup('ransom module activated');
  spawnErrorPopup('encryption key delivered');
  hackerChatPopup();
  showDecryptBarSmall();

  // Enter lockdown after short delay
  setTimeout(()=> enterLockdown(), 2500);

  // start auto restart loop for drama
  autoRestartLoop(2, 5);

  // heavy popup generator (repeated)
  const heavy = setInterval(()=>{
    spawnPopupStorm(4);
    spawnPopupTower(3);
    if(Math.random()>0.6) spawnLiveTerminal();
  }, 3200);
  pushHardcoreTimer(heavy);

  // set eventual big destruction countdown (visual only)
  const bigDestroyTimer = setTimeout(()=> showDestructionCountdown(8), 14000);
  pushHardcoreTimer(bigDestroyTimer);
});

// ==============================
//  UNLOCK (PIN) — restores everything
// ==============================
unlockBtn.addEventListener('click', ()=>{
  let userPin = prompt("Masukkan PIN untuk UNLOCK:");

  if(userPin === PIN_CODE){
    // stop audio
    try{ hum.pause(); }catch(e){}
    try{ panicS.pause(); }catch(e){}
    try{ glitchS.pause(); }catch(e){}
    // clear timers & overlays
    clearSequence();
    // remove generated elements
    document.querySelectorAll('.__hc_popup, .__hc_tower, .hc-confetti, .__hc_unlock').forEach(el=>el.remove());
    document.querySelectorAll('#__fake_bsod, #__hc_static, #__hc_countdown, #__hc_lockdown, #__small_decrypt, #__dbg_bar, #__hc_cpu').forEach(el=>el.remove());
    // remove generic popup classes
    document.querySelectorAll('div').forEach(d=>{
      if(d.className && d.className.indexOf('__hc')!==-1) d.remove();
    });

    panic.style.display='none';
    term.style.display='none';
    bios.style.display='none';
    glitchLayer.style.opacity=0;
    emergency.style.display='none';

    // success reveal
    const s = document.createElement('div');
    s.style.position='fixed'; s.style.inset='0'; s.style.zIndex='999999';
    s.style.display='flex'; s.style.alignItems='center'; s.style.justifyContent='center';
    s.style.background='rgba(0,0,0,0.9)';
    s.innerHTML = `
      <div style="max-width:820px;padding:18px;background:#062;border-radius:12px;color:#def;text-align:center;font-family:monospace">
        <h2>PRANK BERAKHIR — Aman!</h2>
        <p>Simulasi ransomware selesai. Tidak ada data yang diubah.</p>
        <button id="__close_final" style="margin-top:12px;padding:10px 14px;border-radius:8px;background:#0c8;border:none;cursor:pointer">Tutup</button>
      </div>
    `;
    document.body.appendChild(s);
    document.getElementById('__close_final').addEventListener('click', ()=>{ s.remove(); location.reload(); });
    // positive vibration
    try{ navigator.vibrate && navigator.vibrate([100,50,120]); }catch(e){}
  } else {
    alert("PIN salah! Unlock dibatalkan.");
    playAlarm();
  }
});

// ESC → tampilkan emergency unlock
window.addEventListener('keydown', e=>{
  if(e.key === 'Escape'){
    emergency.style.display='block';
  }
});

// initial fade
setTimeout(()=>{
  if(document.getElementById('startBox')) document.getElementById('startBox').style.opacity=1;
},1000);
