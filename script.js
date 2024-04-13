const timeElement = document.getElementById('time');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsElement = document.getElementById('laps');

let intervalId;
let time = 0;
let lapTime = 0;
let laps = [];
let isRunning = false;

// Format time as MM:SS:MS
function formatTime(time) {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = time % 1000;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

// Start the stopwatch
function start() {
  if (!isRunning) {
    intervalId = setInterval(() => {
      time += 10;
      timeElement.textContent = formatTime(time);
    }, 10);
    isRunning = true;
  }
}

// Pause the stopwatch
function pause() {
  if (isRunning) {
    clearInterval(intervalId);
    isRunning = false;
  }
}

// Reset the stopwatch
function reset() {
  clearInterval(intervalId);
  time = 0;
  lapTime = 0;
  laps = [];
  timeElement.textContent = formatTime(time);
  lapsElement.innerHTML = '';
}

// Record a lap time
function lap() {
  if (isRunning) {
    laps.push(formatTime(time));
    let html = '';
    for (let i = 0; i < laps.length; i++) {
      html += `<p>${i + 1}. ${laps[i]}</p>`;
    }
    lapsElement.innerHTML = html;
  }
}

// Add event listeners to buttons
startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);