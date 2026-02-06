//Imports
const start = document.getElementById("start");
const reset = document.getElementById("reset");
const shortBreak = document.getElementById("shortBreak");
const timer = document.getElementById("timer");
const pomodoroTimer = document.getElementById("pomodoro");

//Timer Logic
let timeLeft = 25 * 60;
let selectedTime = 25 * 60;
let interval;
let isRunning = false;

const updateTimer = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = Math.floor(timeLeft % 60);

    timer.innerHTML = 
    `${minutes.toString().padStart(2, "0")} 
    : 
    ${seconds.toString().padStart(2, "0")}`;
};

const startTimer = () => {
    if(isRunning) return;

    isRunning = true;

    interval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if(timeLeft < 0) {
            clearInterval(interval);
            alert("Good Work!");
            timeLeft = selectedTime;
            updateTimer();
        }
    }, 1000)
};

//Pause Timer Function
const pauseTimer = () => {
    clearInterval(interval);
}

const resetTimer = () => {
    clearInterval(interval);
    timeLeft = selectedTime;
    updateTimer();
}

const pomodoro = () => {
    clearInterval(interval);
    timeLeft = 25 * 60;
    selectedTime = 25 * 60;
    updateTimer();
}

const shortTimer = () => {
    clearInterval(interval);
    timeLeft = 5 * 60;
    selectedTime = 5 * 60;
    updateTimer();
}

//Event listener for each button
start.addEventListener("click", () => {
    if(!isRunning){
        startTimer();
        start.textContent = "Pause";
        isRunning = true;
    } else {
        pauseTimer();
        start.textContent = "Start";
        isRunning = false;
    }
});
// reset.addEventListener("click", resetTimer);
reset.addEventListener("click", () => {
    start.textContent = "Start";
    isRunning = false;
    resetTimer();
});

//shortBreak.addEventListener("click", shortTimer);

shortBreak.addEventListener("click", () => {
    start.textContent = "Start";
    isRunning = false;
    shortTimer();
});

//pomodoroTimer.addEventListener("click", pomodoro);

pomodoroTimer.addEventListener("click", () => {
    start.textContent = "Start";
    isRunning = false;
    pomodoro();
})


