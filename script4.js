let scoreHome = 12;
let scoreGuest = 5;
let period = 1;
let fouls = 3;
let msElapsed = 0;
let timerInterval = null;
let timerStart = null;

function pad(n) {
  return String(n).padStart(2, "0");
}
function formatTimeMS(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const msPart = ms % 1000;
  return `${pad(h)}:${pad(m)}:${pad(s)}.${String(msPart).padStart(3, "0")}`;
}

function updateDisplay() {
  const elHome = document.getElementById("scoreHome");
  const elGuest = document.getElementById("scoreGuest");
  const elPeriod = document.getElementById("period-value");
  const elFouls = document.getElementById("fouls-value");
  const elTime = document.getElementById("time-value");

  if (elHome) elHome.textContent = scoreHome;
  if (elGuest) elGuest.textContent = scoreGuest;
  if (elPeriod) elPeriod.textContent = period;
  if (elFouls) elFouls.textContent = fouls;
  if (elTime) elTime.textContent = formatTimeMS(msElapsed);

  highlightBorder();
}

document.addEventListener("DOMContentLoaded", () => {
  updateDisplay();
});

function addOneHome() {
  scoreHome++;
  updateDisplay();
}

function addTwoHome() {
  scoreHome += 2;
  updateDisplay();
}

function addThreeHome() {
  scoreHome += 3;
  updateDisplay();
}

function addOneGuest() {
  scoreGuest++;
  updateDisplay();
}

function addTwoGuest() {
  scoreGuest += 2;
  updateDisplay();
}

function addThreeGuest() {
  scoreGuest += 3;
  updateDisplay();
}

function resetScores() {
  scoreHome = 0;
  scoreGuest = 0;
  period = 1;
  fouls = 0;
  resetTimer();
  startTimer();
  updateDisplay();
}

function highlightBorder() {
  const borderHome = document.getElementById("backgroundBorderHome");
  const borderGuest = document.getElementById("backgroundBorderGuest");
  if (!borderHome && !borderGuest) return;

  if (scoreHome > scoreGuest) {
    if (borderHome) borderHome.style.border = "2px solid green";
    if (borderGuest) borderGuest.style.border = "none";
  } else if (scoreHome === scoreGuest) {
    if (borderHome) borderHome.style.border = "none";
    if (borderGuest) borderGuest.style.border = "none";
  } else {
    if (borderGuest) borderGuest.style.border = "2px solid green";
    if (borderHome) borderHome.style.border = "none";
  }
}

function nextPeriod() {
  if (period < 4) {
    period++;
    document.getElementById("period-value").textContent = period;
  }
}

function nextFoul() {
  fouls++;
  document.getElementById("fouls-value").textContent = fouls;
}

function startTimer() {
  if (timerInterval) return;
  timerStart = performance.now() - msElapsed;
  timerInterval = setInterval(() => {
    msElapsed = Math.floor(performance.now() - timerStart);

    if (msElapsed >= 3600000) {
      msElapsed = 3600000;
      const elTime = document.getElementById("time-value");
      if (elTime) elTime.textContent = formatTimeMS(msElapsed);
      stopTimer();
      return;
    }

    const elTime = document.getElementById("time-value");
    if (elTime) elTime.textContent = formatTimeMS(msElapsed);
  }, 100);
}

function stopTimer() {
  if (!timerInterval) return;
  clearInterval(timerInterval);
  timerInterval = null;
  timerStart = null;
}

function resetTimer() {
  stopTimer();
  msElapsed = 0;
  const elTime = document.getElementById("time-value");
  if (elTime) elTime.textContent = formatTimeMS(msElapsed);
}
