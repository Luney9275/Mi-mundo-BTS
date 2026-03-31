let timeLeft;
let timerId = null;
let isWorking = true;

const btsQuotes = [
  "Tu presencia puede dar felicidad. Espero que lo recuerdes. - Jin",
  "Incluso si no eres perfecto, eres una edición limitada. - RM",
  "Si no puedes volar, corre. Si no puedes correr, camina. - BTS",
  "Cree en ti mismo. - Suga",
  "I purple you. 💜 - V"
];

function getTimes() {
  let work = Math.min(parseInt(document.getElementById('workInput').value) || 25, 60);
  let rest = Math.min(parseInt(document.getElementById('breakInput').value) || 5, 25);
  return { work, rest };
}

function updateDisplay() {
  const timerDisplay = document.getElementById('timer');
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function toggleTimer() {
  const btn = document.getElementById('btnStart');
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
    btn.textContent = "Reanudar";
  } else {
    if (timeLeft === undefined) timeLeft = getTimes().work * 60;
    timerId = setInterval(countDown, 1000);
    btn.textContent = "Pausa";
  }
}

function countDown() {
  timeLeft--;
  updateDisplay();
  if (timeLeft <= 0) {
    document.getElementById('alarm-sound').play();
    switchMode();
  }
}

function switchMode() {
  isWorking = !isWorking;
  const times = getTimes();
  const label = document.getElementById('timer-label');
  
  if (isWorking) {
    timeLeft = times.work * 60;
    label.textContent = "¡A estudiar con Bangtan!";
  } else {
    timeLeft = times.rest * 60;
    label.textContent = "¡Descanso! Mira un video de V 🐯";
  }
  
  const randomIndex = Math.floor(Math.random() * btsQuotes.length);
  document.getElementById('quote-display').textContent = btsQuotes[randomIndex];
  updateDisplay();
}

function resetTimer() {
  clearInterval(timerId);
  timerId = null;
  isWorking = true;
  timeLeft = getTimes().work * 60;
  document.getElementById('btnStart').textContent = "Empezar";
  updateDisplay();
}

// Iniciar visualización
timeLeft = 25 * 60;
updateDisplay();