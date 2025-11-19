:root{
  --bg:#000;
  --panel:#0b0b0b;
  --accent:#ff4b4b;
  --muted:#999;
  --success:#6fe1a6;
  --text:#e8fff0;
  --glass: rgba(255,255,255,0.03);
}

*{box-sizing:border-box}
html,body{height:100%;margin:0;background:var(--bg);color:var(--text);font-family: "Segoe UI", Roboto, "Lucida Console", monospace;}
#app{display:flex;align-items:center;justify-content:center;height:100%;padding:24px}
#content{max-width:760px;text-align:center}
h1{margin:0 0 8px 0;font-size:30px}
p.note{color:var(--muted);font-size:13px;margin-top:12px}

/* buttons */
.btn{padding:10px 14px;border-radius:8px;border:0;cursor:pointer;font-weight:700}
.btn.primary{background:var(--accent);color:#111}
.btn.ghost{background:transparent;border:1px solid rgba(255,255,255,0.06);color:var(--text)}
.btn.danger{background:#ff6b6b;color:#111}

/* LOCKSCREEN overlay */
#lockOverlay{
  position:fixed;inset:0;display:none;align-items:center;justify-content:center;
  background:linear-gradient(180deg, rgba(0,0,0,0.86), rgba(10,0,0,0.95));
  z-index:9999;padding:20px;
}

/* inner panel */
.lockInner{
  width:100%;max-width:720px;background:linear-gradient(180deg,#080808,#0b0b0b);
  border-radius:12px;padding:20px;border:1px solid rgba(255,0,0,0.06);
  box-shadow:0 30px 80px rgba(0,0,0,0.8);
  text-align:center;outline:none;
}

.lockTitle{color:var(--accent);margin:0 0 6px 0;font-size:22px}
.lockDesc{color:#ffdede;margin:0 0 12px 0;font-size:14px}

/* meters */
.lockMeters{display:flex;gap:14px;align-items:center;justify-content:center;margin:10px 0 14px 0}
.meter{min-width:220px}
.meterLabel{font-size:12px;color:var(--muted);margin-bottom:6px;text-align:left}
.meterBar{height:12px;background:#0b0b0b;border-radius:8px;border:1px solid rgba(255,255,255,0.03);overflow:hidden}
.meterBar i{display:block;height:100%;background:linear-gradient(90deg,#ff4b4b,#ffb3b3);width:0%;transition:width 300ms linear}

/* countdown */
#countdown{font-family:monospace;font-weight:700;color:#ffd1d1}

/* pin row */
.pinRow{display:flex;gap:8px;align-items:center;justify-content:center;margin-top:10px}
#pinInput{padding:10px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.04);background:transparent;color:var(--text);width:180px;font-family:monospace;font-size:16px}
#unlockBtn{background:#fff;color:#111}

/* messages */
#lockMsg{min-height:28px;margin-top:8px;font-size:14px;color:#ffdcdc}

/* actions */
.lockActions{display:flex;gap:10px;justify-content:center;margin-top:12px}
.small{font-size:12px;color:var(--muted);margin-top:10px}

/* shake animation for wrong PIN */
@keyframes shakeX{0%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-6px)}80%{transform:translateX(6px)}100%{transform:translateX(0)}}

/* confetti pieces (created by JS) */
.confettiPiece{position:fixed;width:8px;height:12px;z-index:10000;pointer-events:none;opacity:0.95;border-radius:2px;transform:translateY(-50vh);}

/* responsive */
@media (max-width:680px){
  .lockMeters{flex-direction:column}
  .pinRow{flex-direction:column}
  #pinInput{width:100%}
}
