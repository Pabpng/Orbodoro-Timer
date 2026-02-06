//Imports
const start = document.getElementById("start");
const pause = document.getElementById("pause");
const reset = document.getElementById("reset");
const shortBreak = document.getElementById("shortBreak");
const longBreak = document.getElementById("longBreak");
const timer = document.getElementById("timer");
const pomodoroTimer = document.getElementById("pomodoro");

//Timer Logic
let timeLeft = 0;
let interval;
let selectedTime = 0;

const updateTimer = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = Math.floor(timeLeft % 60);

    timer.innerHTML = 
    `${minutes.toString().padStart(2, "0")} 
    : 
    ${seconds.toString().padStart(2, "0")}`;
};

const startTimer = () => {
    if (timeLeft === 0){
        alert("Time needs to be selected!")
    } else {

        interval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if(timeLeft < 0) {
            clearInterval(interval);
            alert("Time's up!")
            timeLeft = selectedTime;
            updateTimer();
        }
    }, 1000)
    }
};

//Pause Timer Function
const pauseTimer = () => clearInterval(interval);

const resetTimer = () => {
    clearInterval(interval);
    timeLeft = selectedTime;
    updateTimer();
}

const Pomodoro = () => {
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

const longTimer = () => {
    clearInterval(interval);
    timeLeft = 10 * 60;
    selectedTime = 10 * 60;
    updateTimer();
}

//Event listener for each button
start.addEventListener("click", startTimer);
pause.addEventListener("click", pauseTimer);
reset.addEventListener("click", resetTimer);
shortBreak.addEventListener("click", shortTimer);
longBreak.addEventListener("click", longTimer);
pomodoroTimer.addEventListener("click", Pomodoro);


