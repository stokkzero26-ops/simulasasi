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

// ==============================
//  HELPER FUNCTIONS
// ==============================
function q(el, ms){
  return new Promise(res => {
    const t = setTimeout(() => res(), ms);
    sequenceTimers.push(t);
  });
}

function clearSequence(){
  sequenceTimers.forEach(t => clearTimeout(t));
  sequenceTimers = [];
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
      if(i>text.length) { clearInterval(t); res(); }
    }, speed);
    sequenceTimers.push(t);
  });
}

function escapeHtml(s){
  return String(s)
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;');
}



// ===================================================================
// 🔥🔥🔥 FITUR BARU — EFFECT AMAZING 🔥🔥🔥
// ===================================================================

// 1. SCREEN SHAKE (GEMPA)
function shakeScreen(duration = 500){
  const body = document.body;
  body.style.transition = "transform 0.05s";
  let count = 0;

  const interval = setInterval(()=>{
    const x = Math.random()*10 - 5;
    const y = Math.random()*10 - 5;
    body.style.transform = `translate(${x}px, ${y}px)`;
    count += 50;
    if(count >= duration){
      clearInterval(interval);
      body.style.transform = "translate(0,0)";
    }
  }, 50);
}

// 2. BLUE SCREEN OF DEATH PRANK
function showFakeBSOD(){
  const bs = document.createElement("div");
  bs.style.position = "fixed";
  bs.style.inset = "0";
  bs.style.background = "#001ebb";
  bs.style.color = "#fff";
  bs.style.fontFamily = "Consolas";
  bs.style.padding = "40px";
  bs.style.zIndex = "9999";
  bs.innerHTML = `
    <h1>:(</h1>
    <p>Komputer Anda mengalami masalah dan harus di-restart.</p>
    <p>Kami hanya mengumpulkan beberapa info error...</p>
    <p>ERROR CODE: FAKE_RANSOM_001</p>
  `;
  document.body.appendChild(bs);

  setTimeout(()=>bs.remove(), 2500);
}

// 3. RANDOM ERROR POPUP
function spawnErrorPopup(){
  const box = document.createElement("div");
  box.style.position = "fixed";
  box.style.left = Math.random()*70 + "%";
  box.style.top = Math.random()*70 + "%";
  box.style.background = "#111";
  box.style.color = "red";
  box.style.padding = "10px 14px";
  box.style.border = "1px solid red";
  box.style.zIndex = 9999;
  box.style.fontSize = "12px";
  box.innerHTML = "⚠ VIRUS DETECTED — system32 corrupted";
  document.body.appendChild(box);

  setTimeout(()=>box.remove(), 1800);
}

setInterval(()=>{
  if(Math.random()>0.6) spawnErrorPopup();
}, 2000 + Math.random()*2000);


// 4. FAKE DECRYPT PROGRESS
function showDecryptBar(){
  const wrap = document.createElement("div");
  wrap.style.position = "fixed";
  wrap.style.bottom = "20px";
  wrap.style.left = "50%";
  wrap.style.transform = "translateX(-50%)";
  wrap.style.width = "260px";
  wrap.style.padding = "10px";
  wrap.style.background = "#000";
  wrap.style.border = "1px solid #0f0";
  wrap.style.color = "#0f0";
  wrap.style.fontSize = "12px";
  wrap.style.zIndex = "9000";

  const bar = document.createElement("div");
  bar.style.height = "8px";
  bar.style.background = "#060";
  bar.style.width = "0%";
  wrap.append("Decrypting...", document.createElement("br"), bar);
  document.body.appendChild(wrap);

  let p = 0;
  const timer = setInterval(()=>{
    p += Math.random()*8;
    bar.style.width = p+"%";
    if(p >= 100){
      clearInterval(timer);
      wrap.remove();
    }
  }, 200);
}


// 5. CHAT HACKER (auto typing)
async function hackerChat(){
  const chat = document.createElement("div");
  chat.style.position="fixed";
  chat.style.right="20px";
  chat.style.top="20px";
  chat.style.width="260px";
  chat.style.background="#000";
  chat.style.border="1px solid #0f0";
  chat.style.padding="10px";
  chat.style.zIndex="9999";
  chat.style.fontSize="12px";
  chat.style.color="#0f0";

  document.body.appendChild(chat);

  const msgs = [
    "Access granted...",
    "Decrypting security layers...",
    "Found user data...",
    "Uploading to remote server...",
    "Wait...",
    "HAHAHAHA! ☠"
  ];

  for(const m of msgs){
    const line = document.createElement("div");
    chat.appendChild(line);
    await typeTo(line, m, 20);
    await q(null, 500);
  }

  setTimeout(()=>chat.remove(), 3000);
}


// 6. COUNTDOWN TIMER
function startCountdown(){
  const cd = document.createElement("div");
  cd.style.position="fixed";
  cd.style.left="50%";
  cd.style.top="20px";
  cd.style.transform="translateX(-50%)";
  cd.style.padding="10px 18px";
  cd.style.background="#000";
  cd.style.border="1px solid red";
  cd.style.color="red";
  cd.style.fontSize="20px";
  cd.style.zIndex="9000";

  document.body.appendChild(cd);

  let t = 5;
  cd.textContent = "WARNING: " + t;

  const timer = setInterval(()=>{
    t--;
    cd.textContent = "WARNING: " + t;
    if(t <= 0){
      clearInterval(timer);
      cd.remove();
    }
  }, 1000);
}


// 7. FREEZE SCREEN
function freezeScreen(){
  document.body.style.pointerEvents="none";
  document.body.style.filter="grayscale(100%)";

  setTimeout(()=>{
    document.body.style.pointerEvents="auto";
    document.body.style.filter="none";
  }, 3000);
}


// 8. FLASH EFFECT
function flashWhite(){
  const f = document.createElement("div");
  f.style.position="fixed";
  f.style.inset="0";
  f.style.background="white";
  f.style.opacity="0.9";
  f.style.zIndex="99999";
  document.body.appendChild(f);
  setTimeout(()=>f.remove(), 120);
}


// ==============================
//  MAIN START BUTTON ACTION
// ==============================
startBtn.addEventListener('click', async ()=>{
  document.getElementById('startBox').remove();
  safeFullscreen();

  hum.volume = 0.5;
  hum.play().catch(()=>{});
  biosBeep.play().catch(()=>{});

  document.body.style.transition = 'background 1s ease';
  document.body.style.background = '#050505';
  await q(null, 700);
  document.body.style.background = '#000';

  // efek baru
  startCountdown();
  shakeScreen(700);
  flashWhite();

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
    await typeTo(biosText, ln + '\n', 24);
    if(Math.random()>0.6){
      glitchLayer.style.opacity=0.35;
      glitchS.currentTime=0;
      glitchS.play().catch(()=>{});
    }
    await q(null, 350 + Math.random()*350);
    glitchLayer.style.opacity=0;

    if(Math.random()>0.7) freezeScreen();
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

    // efek baru
    if(Math.random()>0.8) showDecryptBar();
    if(Math.random()>0.8) hackerChat();
    if(Math.random()>0.85) shakeScreen(400);
    if(Math.random()>0.9) showFakeBSOD();
    if(Math.random()>0.85) flashWhite();

    await q(null, 350 + Math.random()*500);
  }

  await q(null, 800);
  term.style.display='none';

  panic.style.display='flex';
  panicS.currentTime=0;
  panicS.play().catch(()=>{});
  glitchLayer.style.opacity=0.6;

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

  await q(null, 4000);
  emergency.style.display='block';
});

// ==============================
// UNLOCK (PIN)
// ==============================
unlockBtn.addEventListener('click', ()=>{
  let userPin = prompt("Masukkan PIN untuk UNLOCK:");

  if(userPin === PIN_CODE){
    hum.pause(); biosBeep.pause(); panicS.pause(); glitchS.pause();
    clearSequence();

    panic.style.display='none';
    term.style.display='none';
    bios.style.display='none';
    glitchLayer.style.opacity=0;
    emergency.style.display='none';

    const s=document.createElement('div');
    s.style.position='fixed';
    s.style.inset='0';
    s.style.zIndex='99999';
    s.style.display='flex';
    s.style.alignItems='center';
    s.style.justifyContent='center';
    s.style.background='rgba(0,0,0,0.9)';

    s.innerHTML = `
      <div style="max-width:800px;padding:20px;background:#061;
      border-radius:10px;color:#dff;text-align:center">
        <h2>PRANK BERAKHIR — Aman!</h2>
        <p>Data aman karena PIN benar.</p>
        <button id="closeReveal"
        style="margin-top:12px;padding:10px 14px;border-radius:8px;
        background:#0c8;border:none;cursor:pointer">Tutup</button>
      </div>
    `;

    document.body.appendChild(s);

    document.getElementById('closeReveal').addEventListener('click', ()=>{
      s.remove();
      location.reload();
    });

  } else {
    alert("PIN salah! Unlock dibatalkan.");
  }
});


// ESC → tampilkan emergency unlock
window.addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    emergency.style.display='block';
  }
});

// Fade start button
setTimeout(()=>{
  if(document.getElementById('startBox'))
    document.getElementById('startBox').style.opacity=1;
},1000);
