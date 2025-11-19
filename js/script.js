// Scroll suave hasta instrucciones
const showInstructionsBtn = document.getElementById("showInstructions");
const instructionsSection = document.getElementById("instructions");

if (showInstructionsBtn && instructionsSection) {
  showInstructionsBtn.addEventListener("click", () => {
    instructionsSection.scrollIntoView({ behavior: "smooth" });
  });
}

// Barra de progreso: porcentaje numérico retro
const percentElement = document.getElementById("loadingPercent");
let percent = 0;

function updatePercent() {
  percent = (percent + 1) % 101; // 0–100 y vuelve a empezar
  if (percentElement) {
    const padded = String(percent).padStart(3, "0");
    percentElement.textContent = `LOADING ${padded}%`;
  }
}

setInterval(updatePercent, 80); // velocidad retro

// Botón "retry scan" resetea porcentaje visual (para sensación de acción)
const retryScanBtn = document.getElementById("retryScan");
if (retryScanBtn) {
  retryScanBtn.addEventListener("click", (e) => {
    e.preventDefault();
    percent = 0;
  });
}

// Terminal de log en vivo
const terminal = document.getElementById("terminalLog");

const logMessages = [
  "Initializing navigation systems...",
  "Attempting to triangulate Mars coordinates...",
  "Signal lost. Retrying uplink with Earth...",
  "Re-routing through deep space relay station...",
  "Gravitational anomaly detected near asteroid belt.",
  "Warning: Mars not found in expected orbit.",
  "Deploying backup star charts...",
  "404: Destination planet not in database.",
  "Suggesting manual course correction...",
];

let logIndex = 0;

function addLogLine() {
  if (!terminal) return;

  const line = document.createElement("div");
  line.className = "terminal-line";
  const prefixSpan = document.createElement("span");
  prefixSpan.className = "terminal-line-prefix";
  const messageSpan = document.createElement("span");

  const timestamp = new Date().toISOString().split("T")[1].slice(0, 8);

  prefixSpan.textContent = `[${timestamp}] > `;
  messageSpan.textContent = logMessages[logIndex];

  line.appendChild(prefixSpan);
  line.appendChild(messageSpan);
  terminal.appendChild(line);

  terminal.scrollTop = terminal.scrollHeight;

  logIndex = (logIndex + 1) % logMessages.length;
}

setInterval(addLogLine, 2500); // añade mensaje cada 2.5s
addLogLine(); // uno inicial