/* ==========================================================
   AUDIO SYSTEM
========================================================== */
const sounds = {
  click: new Audio("assets/audio/beep-click.mp3"),
  hover: new Audio("assets/audio/beep-hover.mp3"),
  glitch: new Audio("assets/audio/glitch.mp3"),
  alert: new Audio("assets/audio/alert.mp3"),
  static: new Audio("assets/audio/static.mp3"),
  warp: new Audio("assets/audio/warp.mp3"),
  critical: new Audio("assets/audio/critical.mp3")
};

function playSound(name) {
  const a = sounds[name];
  if (!a) return;
  a.currentTime = 0;
  a.volume = 0.25;
  a.play().catch(() => {});
}

setTimeout(() => playSound("static"), 200);


/* ==========================================================
   TERMINAL LOG SYSTEM
========================================================== */
const terminal = document.getElementById("terminalLog");

function addLog(msg) {
  const t = new Date().toISOString().split("T")[1].slice(0, 8);
  const line = document.createElement("div");
  line.className = "terminal-line";
  line.innerHTML = `<span style="color:#66ff99">[${t}] ></span> ${msg}`;
  terminal.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;
}

const autoMsgs = [
  "Calibrating quantum sensors...",
  "Verifying multiverse boundaries...",
  "Searching for Mars in timeline variant B-22...",
  "Error: timeline divergence detected.",
  "Continuum instability rising...",
  "Gravitational echoes mismatch...",
  "404 anomaly persists.",
  "Attempting cross-reality alignment..."
];
let autoIndex = 0;

setInterval(() => {
  addLog(autoMsgs[autoIndex]);
  autoIndex = (autoIndex + 1) % autoMsgs.length;
}, 3500);


/* ==========================================================
   SYSTEM SCAN BAR (retro loading)
========================================================== */
const bar = document.getElementById("loadingBar");
const pctTxt = document.getElementById("loadingPercent");
const statusTxt = document.getElementById("loadingStatus");

let pct = 0;
let dir = 1;
let scanLoop;

function scanUpdate() {
  pct += 0.35 * dir;

  if (pct >= 100) {
    pct = 100;
    completeScan();
    return;
  }

  if (pct > 85) dir = -1;
  if (pct < 50) dir = 1;

  pctTxt.textContent = `LOADING ${String(Math.round(pct)).padStart(3,"0")}%`;
  bar.style.width = pct + "%";
}

function startScan() {
  clearInterval(scanLoop);
  pct = 0; 
  dir = 1;
  statusTxt.textContent = "STATUS: RUNNING SCAN SEQUENCE...";
  scanLoop = setInterval(scanUpdate, 200);
}

startScan();

function completeScan() {
  clearInterval(scanLoop);
  statusTxt.textContent = "STATUS: TARGET NOT FOUND";
  addLog("Scan complete. Target missing across all universes.");

  playSound("alert");
  triggerCriticalMode();

  setTimeout(() => startScan(), 6000);
}


/* ==========================================================
   CRITICAL SYSTEM MODE
========================================================== */
function triggerCriticalMode() {
  document.body.classList.add("critical");
  playSound("critical");

  addLog("CRITICAL SYSTEM ERROR: Universe instability rising.");

  setTimeout(() => {
    document.body.classList.remove("critical");
  }, 1500);
}


/* ==========================================================
   MULTIVERSE MODE (random)
========================================================== */
setInterval(() => {
  if (Math.random() < 0.05) {
    document.body.classList.add("multiverse");
    playSound("glitch");
    addLog("MULTIVERSE SHIFT DETECTED...");
    setTimeout(() => document.body.classList.remove("multiverse"), 900);
  }
}, 8000);


/* ==========================================================
   MENU BUTTON (REBOOT)
========================================================== */
const rebootBtn = document.querySelector(".console-btn");

rebootBtn.addEventListener("mouseenter", () => playSound("hover"));

rebootBtn.addEventListener("click", () => {
  playSound("click");
  addLog("Rebooting navigation system...");
  screenOff();
});


/* ==========================================================
   SCREEN-OFF EFFECT (shutdown)
========================================================== */
function screenOff() {
  playSound("warp");
  document.body.classList.add("screen-off");
  setTimeout(() => location.reload(), 900);
}


/* ==========================================================
   TERMINAL INPUT (MINIGAME + COMMANDS)
========================================================== */
const terminalInput = document.getElementById("terminalInput");

terminalInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleCommand(terminalInput.value.trim());
    terminalInput.value = "";
  }
});

function handleCommand(cmd) {
  addLog("> " + cmd);

  if (cmd === "run-game") startMiniGame();
  else if (cmd === "help") addLog("Commands: help, run-game");
  else addLog("Unknown command.");
}


/* ==========================================================
   MINIGAME: ASTEROID EVADE (ASCII)
========================================================== */
let gameActive = false;
let gameInterval;
let player = { x: 5, y: 5 };
let obstacles = [];
let gameWidth = 20;
let gameHeight = 10;

function startMiniGame() {
  if (gameActive) return;

  addLog("Starting mini-game: ASTEROID EVADE...");
  gameActive = true;
  obstacles = [];
  player = { x: 2, y: 5 };

  gameInterval = setInterval(gameTick, 250);
}

function gameTick() {
  // move obstacles
  obstacles.forEach(o => o.x--);
  obstacles = obstacles.filter(o => o.x >= 0);

  // generate new obstacles
  if (Math.random() < 0.3) {
    obstacles.push({ x: gameWidth-1, y: Math.floor(Math.random() * gameHeight) });
  }

  // detect collision
  for (let o of obstacles) {
    if (o.x === player.x && o.y === player.y) {
      gameOver();
      return;
    }
  }

  renderGame();
}

function renderGame() {
  let grid = [];

  for (let y = 0; y < gameHeight; y++) {
    let row = "";
    for (let x = 0; x < gameWidth; x++) {
      if (player.x === x && player.y === y) row += "▲";
      else if (obstacles.some(o => o.x === x && o.y === y)) row += "■";
      else row += ".";
    }
    grid.push(row);
  }

  addLog(grid.join(" "));
}

function gameOver() {
  clearInterval(gameInterval);
  addLog("GAME OVER — You were hit by an asteroid.");
  gameActive = false;
}

/* player movement */
document.addEventListener("keydown", (e) => {
  if (!gameActive) return;

  if (e.key === "ArrowUp" && player.y > 0) player.y--;
  if (e.key === "ArrowDown" && player.y < gameHeight-1) player.y++;
  if (e.key === "ArrowLeft" && player.x > 0) player.x--;
  if (e.key === "ArrowRight" && player.x < gameWidth-1) player.x++;
});


/* ==========================================================
   KONAMI CODE (Easter Egg)
========================================================== */
let konami = [];
const konamiCode = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

document.addEventListener("keydown", (e) => {
  konami.push(e.key);

  if (konami.length > 10) konami.shift();

  if (konami.join("") === konamiCode.join("")) {
    addLog("EASTER EGG DETECTED: MULTIVERSE PORTAL OPENED.");
    document.body.classList.add("multiverse");
    playSound("warp");
    setTimeout(() => document.body.classList.remove("multiverse"), 3000);
  }
});