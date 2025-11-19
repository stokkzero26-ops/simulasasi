// Simulasi Lockscreen Edukasi (aman)
// PIN default: 159753
// Emergency Exit tersedia -> pengguna selalu bisa keluar

const START_PIN = "159753";

// DOM
const startBtn = document.getElementById('startBtn');
const lockOverlay = document.getElementById('lockOverlay');
const pinInput = document.getElementById('pinInput');
const unlockBtn = document.getElementById('unlockBtn');
const encBar = document.querySelector('#encBar i');
const countdownEl = document.getElementById('countdown');
const lockMsg = document.getElementById('lockMsg');
const emergencyExit = document.getElementById('emergencyExit');
const contactBtn = document.getElementById('contactBtn');
const sfxGlitch = document.getElementById('sfxGlitch');
const sfxSuccess = document.getElementById('sfxSuccess');

let timers = [];
function addTimer(t){ timers.push(t); }
function clearAll(){ timers.forEach(t=>clearTimeout(t)); timers = []; }

// small helpers
function rand(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }
function setEncPct(p){ encBar.style.width = p + '%'; }

// open overlay (20-second fast flow)
startBtn.addEventListener('click', async () => {
  // reset
  pinInput.value = '';
  lockMsg.textContent = '';
  setEncPct(0);
  countdownEl.textContent = '00:20';

  // show overlay
  lockOverlay.style.display = 'flex';
  lockOverlay.setAttribute('aria-hidden','false');

  // dramatic: fast progress + countdown 20s
  let remaining = 20;
  countdownEl.textContent = `00:${String(remaining).padStart(2,'0')}`;

  // start small glitch sound occasionally
  const glitchLoop = setInterval(()=>{ try{ sfxGlitch.currentTime=0; sfxGlitch.play().catch(()=>{}); }catch(e){} }, 1800);
  addTimer(glitchLoop);

  // encryption visual progressive
  let enc = 0;
  const encInterval = setInterval(()=>{
    enc = Math.min(100, enc + rand(6,14));
    setEncPct(enc);
    if(enc >= 100) clearInterval(encInterval);
  }, 700);
  addTimer(encInterval);

  // countdown timer
  const cd = setInterval(()=>{
    remaining--;
    countdownEl.textContent = `00:${String(Math.max(0,remaining)).padStart(2,'0')}`;

    // every few seconds add small fake leak message
    if(Math.random() > 0.6){
      const m = document.createElement('div');
      m.style.color = '#ffd1d1';
      m.style.fontSize = '13px';
      m.textContent = `Found: /home/user/secret_${rand(1,99)}.txt`;
      document.getElementById('leakContent').appendChild(m);
      // auto scroll
      const lc = document.getElementById('leakContent'); lc.scrollTop = lc.scrollHeight;
    }

    // if time up -> escalate
    if(remaining <= 0){
      clearInterval(cd);
      escalateFailure();
    }
  }, 1000);
  addTimer(cd);
});

// unlock button behavior
unlockBtn.addEventListener('click', ()=>{
  const val = (pinInput.value || '').trim();
  if(val === START_PIN){
    // success
    lockMsg.style.color = '#bfffcf';
    lockMsg.textContent = 'PIN benar — proses decrypt (simulasi)...';
    try{ sfxSuccess.currentTime = 0; sfxSuccess.play().catch(()=>{}); }catch(e){}
    // little confetti & cleanup
    spawnConfetti(30);
    // close overlay shortly
    const t = setTimeout(()=> {
      closeOverlay();
    }, 900);
    addTimer(t);
  } else {
    // wrong
    lockMsg.style.color = '#ffb3b3';
    lockMsg.textContent = 'PIN salah — TOLOL.';
    // shake input
    pinInput.style.animation = 'shakeX 420ms';
    setTimeout(()=> pinInput.style.animation = '', 420);
    // small penalty visual
    try{ sfxGlitch.currentTime = 0; sfxGlitch.play().catch(()=>{}); }catch(e){}
  }
});

// Emergency Exit (visible & intentional)
emergencyExit.addEventListener('click', ()=>{
  // confirmation (demo safety)
  const ok = confirm('Emergency Exit (Demo): Tutup lockscreen?');
  if(ok) closeOverlay();
});

// Contact button (demo) — we do not include extortion instructions
contactBtn.addEventListener('click', ()=>{
  alert('Kontak ADMIN (demo): +62-815-7468-4348\nIni hanya contoh teks. Jangan gunakan untuk pemerasan.');
});

// escalate failure (time out)
function escalateFailure(){
  // heavy visual: flash + message
  const big = document.createElement('div');
  big.style.position = 'fixed'; big.style.inset = 0; big.style.zIndex = 11000;
  big.style.display = 'flex'; big.style.alignItems='center'; big.style.justifyContent='center';
  big.style.background = '#001a1a';
  big.style.color = '#ffdcdc';
  big.style.fontFamily = 'monospace';
  big.innerHTML = `<div style="text-align:center"><h2>GAGAL — WAKTU HABIS</h2><p>Ini demo: tidak ada data yang diubah.</p></div>`;
  document.body.appendChild(big);

  // small flashes
  const flash1 = setTimeout(()=> big.style.background = '#150000', 300);
  const flash2 = setTimeout(()=> big.style.background = '#001a1a', 600);
  addTimer(flash1); addTimer(flash2);

  // auto remove after short time, keep overlay to allow emergency exit
  const rm = setTimeout(()=> {
    try{ big.remove(); }catch(e){}
    // leave overlay visible so user must use Emergency Exit or PIN
  }, 1600);
  addTimer(rm);
}

// close overlay & cleanup
function closeOverlay(){
  // clear timers and sounds
  clearAll();
  try{ sfxGlitch.pause(); sfxGlitch.currentTime = 0; }catch(e){}
  lockOverlay.style.display = 'none';
  lockOverlay.setAttribute('aria-hidden','true');
  // reset UI
  pinInput.value = '';
  lockMsg.textContent = '';
  setEncPct(0);
  countdownEl.textContent = '00:20';
  // clear leakContent demo lines
  const lc = document.getElementById('leakContent');
  if(lc) lc.innerHTML = '';
}

// confetti for success
function spawnConfetti(count=24){
  for(let i=0;i<count;i++){
    const el = document.createElement('div');
    el.className = 'confettiPiece';
    el.style.left = (Math.random()*100) + 'vw';
    el.style.background = ['#ff6b6b','#ffd93d','#6bcBff','#8affb4','#d08aff'][Math.floor(Math.random()*5)];
    document.body.appendChild(el);
    // fall
    setTimeout(()=> el.style.top = (100 + Math.random()*20) + 'vh', 30);
    setTimeout(()=> el.remove(), 3500);
  }
}

// utility: set enc bar
function setEncPct(p=0){ const bar = document.querySelector('#encBar i'); if(bar) bar.style.width = p + '%'; }

// basic accessibility: trap focus inside overlay when open
document.addEventListener('focus', function(ev){
  if(lockOverlay.style.display === 'flex'){
    if(!lockOverlay.contains(ev.target)){
      ev.preventDefault();
      document.querySelector('.lockInner')?.focus();
    }
  }
}, true);

// ensure overlay hidden at start
lockOverlay.style.display = 'none';
