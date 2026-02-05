//Imports
const start = document.getElementById("start");
const pause = document.getElementById("pause")
const reset = document.getElementById("reset")
const timer = document.getElementById("timer")

//Timer Logic
let timeLeft = 25 * 60;
let interval;

const updateTimer = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = Math.floor(timeLeft % 60);

    timer.innerHTML = 
    `${minutes.toString().padStart(2, "0")} 
    : 
    ${seconds.toString().padStart(2, "0")}`;
};

const startTimer = () => {
    interval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if(timeLeft === 0) {
            clearInterval(interval);
            alert("Time's up!")
            timeLeft = 25 * 60;
            updateTimer();
        }

    }, 1000)

};

//Pause Timer Function
const pauseTimer = () => clearInterval(interval);

const resetTimer = () => {
    clearInterval(interval);
    timeLeft = 25 * 60;
    updateTimer();
}

//Event listener for each button
start.addEventListener("click", startTimer);
pause.addEventListener("click", pauseTimer);
reset.addEventListener("click", resetTimer);


