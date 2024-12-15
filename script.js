let timerInterval;
let elapsedTime = 0;
let lapCount = 0;

const display = document.querySelector('.display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const lapButton = document.getElementById('lap');
const resetButton = document.getElementById('reset');
const lapsList = document.querySelector('.laps');

function formatTime(ms) {
    const seconds = Math.floor(ms / 1000) % 60;
    const minutes = Math.floor(ms / 60000) % 60;
    const hours = Math.floor(ms / 3600000);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

function addLap() {
    lapCount++;
    const lapItem = document.createElement('li');
    lapItem.innerHTML = `<span>Lap ${lapCount}</span> <span>${formatTime(elapsedTime)}</span>`;
    lapsList.appendChild(lapItem);
    lapsList.scrollTop = lapsList.scrollHeight; // Scroll to the latest lap
}

function clearLaps() {
    lapsList.innerHTML = '';
    lapCount = 0;
}

startButton.addEventListener('click', () => {
    if (!timerInterval) {
        const startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 100);
    }
});

stopButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
});

lapButton.addEventListener('click', () => {
    if (elapsedTime > 0) {
        addLap();
    }
});

resetButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    updateDisplay();
    clearLaps();
});

updateDisplay();
