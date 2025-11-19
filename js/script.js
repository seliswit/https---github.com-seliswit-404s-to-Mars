// ====== RETRO SOUND SYSTEM ======
const sounds = {
  click: new Audio("assets/audio/beep-click.mp3"),
  hover: new Audio("assets/audio/beep-hover.mp3"),
  glitch: new Audio("assets/audio/glitch.mp3"),
  alert: new Audio("assets/audio/alert.mp3"),
  static: new Audio("assets/audio/static.mp3")
};

function playSound(name) {
  const audio = sounds[name];
  if (!audio) return;
  audio.currentTime = 0;
  audio.volume = 0.25;
  audio.play().catch(() => {});
}

// Play ambience static at start
setTimeout(() => playSound("static"), 250);


// ====== TERMINAL LOG ======
const terminal = document.getElementById("terminalLog");

function addLog(msg) {
  const line = document.createElement("div");
  line.className = "terminal-line";

  const time = new Date().toISOString().split("T")[1].slice(0, 8);

  line.innerHTML = `<span style="color:#66ff99">[${time}] ></span> ${msg}`;
  terminal.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;
}

const autoMsgs = [
  "Initializing deep-space antennas...",
  "Recalibrating star tracker...",
  "Fetching last known Mars orbit...",
  "Error: orbit mismatch detected.",
  "Comparing results with NASA database...",
  "Gravity anomaly detected.",
  "404: Planet not found.",
  "Attempting multiverse re-alignment...",
];
let logIndex = 0;

setInterval(() => {
  addLog(autoMsgs[logIndex]);
  logIndex = (logIndex + 1) % autoMsgs.length;
}, 3500);


// ====== SYSTEM SCAN ======
const bar = document.getElementById("loadingBar");
const percentTxt = document.getElementById("loadingPercent");
const statusTxt = document.getElementById("loadingStatus");

let pct = 0;
let dir = 1;
let scanning = null;

function updateScan() {
  pct += 0.35 * dir;

  if (pct >= 100) {
    pct = 100;
    completeScan();
    return;
  }

  if (pct > 85) dir = dir * -1;
  if (pct < 60) dir = 1;

  percentTxt.textContent = `LOADING ${String(Math.round(pct)).padStart(3,"0")}%`;
  bar.style.width = pct + "%";
}

function startScan() {
  clearInterval(scanning);
  pct = 0;
  dir = 1;
  statusTxt.textContent = "STATUS: RUNNING SCAN SEQUENCE...";
  scanning = setInterval(updateScan, 200);
}

function completeScan() {
  clearInterval(scanning);
  statusTxt.textContent = "STATUS: SCAN COMPLETE – TARGET NOT FOUND";
  addLog("Scan complete. Mars not detected in this universe.");

  playSound("alert");
  triggerAlertEffect();

  setTimeout(() => startScan(), 6000);
}

startScan();


// ====== ALERT EFFECT ======
function triggerAlertEffect() {
  document.body.classList.add("alert");
  setTimeout(() => document.body.classList.remove("alert"), 700);
}


// ====== CONSOLE MENU ======
document.querySelectorAll(".console-btn").forEach(btn => {
  btn.addEventListener("mouseenter", () => playSound("hover"));

  btn.addEventListener("click", (e) => {
    if (!btn.classList.contains("console-link")) e.preventDefault();
    playSound("click");

    const cmd = btn.dataset.command;
    runCommand(cmd);
  });
});

function runCommand(cmd) {
  if (cmd === "reboot") {
    addLog("Rebooting navigation system...");
    triggerAlertEffect();
    startScan();
  }

  if (cmd === "scan") {
    addLog("Manual scan initiated...");
    startScan();
  }

  if (cmd === "logs") {
    addLog("Dumping extended mission logs...");
    [
      "--- EXTENDED LOG ---",
      "Multiverse breach possibility: 0.006%",
      "Crew status: uncertain but hopeful",
      "Suggested action: accept the 404"
    ].forEach((l, i) => setTimeout(() => addLog(l), i * 500));
  }

  if (cmd === "home") {
    addLog("Attempting to route user home...");
  }
}