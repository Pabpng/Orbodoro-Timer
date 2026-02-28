/* ======================= 
   TIMER IMPORTS!
======================== */
const start = document.getElementById("start");
const reset = document.getElementById("reset");
const timer = document.getElementById("timer");
const timerTitle = document.getElementById("timertitle");



/* ======================= 
   WINDOW TAB IMPORTS!
======================== */
const minimizeBtn = document.getElementById("minimizeBtn");
const closeBtn = document.getElementById("closeBtn");
const backWin = document.getElementById("backWindow");



/* ======================= 
   START MENU IMPORTS!
======================== */
const playBtn = document.getElementById("play");



/* ======================= 
   MAIN MENU IMPORTS!
======================== */
const orbTimerBtn = document.getElementById("orbTimer");
const settingBtn = document.getElementById("settings");
const galleryBtn = document.getElementById("gallery");
const musicBtn = document.getElementById("music");



/* ======================= 
   AUDIO IMPORTS!
======================== */
const startAudio = document.getElementById("startMusic");
const timerAudio = document.getElementById("timerMusic");



/* ======================= 
   SETTINGS IMPORTS!
======================== */
const timerSlider = document.getElementById("timerSlider");
const breakSlider = document.getElementById("breakSlider");



/* ======================= 
   TIMER LOGIC STARTS!
======================== */
let timeLeft = 25 * 60;
let breakTime = 5 * 60;
let selectedPomodoroTime = 25 * 60;
let selectedBreakTime = 5 * 60;
let interval;
let isRunning = false;
let intermission = false;

const updateTimer = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = Math.floor(timeLeft % 60);

    timer.innerHTML = 
    `${minutes.toString().padStart(2, "0")} 
    : 
    ${seconds.toString().padStart(2, "0")}`;
};

// const startTimer = () => {
//     if(isRunning) return;

//     isRunning = true;

//     interval = setInterval(() => {
//         timeLeft--;
//         updateTimer();

//         if(timeLeft < 0) {
//             clearInterval(interval);
//             alert("Good Work!");
//             timeLeft = selectedPomodoroTime;
//             updateTimer();
//         }
//     }, 1000)
// };

let timerStage = "Pomodoro"; // Pomodoro and Rest

const startTimer = () => {
    if(isRunning) return;

    isRunning = true;

    interval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if(timeLeft < 0) {
            clearInterval(interval);
            //Depending on Timer Stage, we switch the clock!
            if(timerStage === "Pomodoro" && timeLeft < 0) {
                timerStage = "Rest";
                timeLeft = selectedBreakTime;
                updateTimer();
                start.textContent = "Start";
                timerTitle.textContent = "Resting...";
                alert("Orbodoro Completed! Time to Rest!")
            } else if (timerStage === "Rest" && timeLeft < 0) {
                timerStage = "Pomodoro";
                timeLeft = selectedPomodoroTime;
                updateTimer();
                start.textContent = "Start";
                timerTitle.textContent = "Orbodoro!"
                alert("Rest completed! Switching to Orbodoro!")
            }
        }
    }, 1000)
};
/* ======================= 
   TIMER LOGIC ENDS!
======================== */



/* ======================= 
   START TIMER LOGIC!
======================== */
start.addEventListener("click", () => {
    if(!isRunning){
        startTimer();
        start.textContent = "Pause";
        isRunning = true;
        timerAudio.muted = false;
        timerAudio.play()
    } else {
        pauseTimer();
        start.textContent = "Start";
        isRunning = false;
        timerAudio.muted = true;
        timerAudio.pause();
        timerAudio.currentTime = 0;
    }
});



/* ======================= 
   PAUSE TIMER LOGIC!
======================== */
const pauseTimer = () => {
    clearInterval(interval);
}



/* ======================= 
   RESET TIMER LOGIC!
======================== */
reset.addEventListener("click", () => {
    start.textContent = "Start";
    isRunning = false;
    resetTimer();
});

const resetTimer = () => {
    clearInterval(interval);
    timeLeft = selectedPomodoroTime;
    updateTimer();
}



/* ======================= 
   TIMER SLIDERS!
======================== */
timerSlider.addEventListener("input", (e) => {
    let minutes = parseInt(e.target.value);
    timeLeft = minutes * 60;
    selectedPomodoroTime = minutes * 60;
    updateTimer();
})

breakSlider.addEventListener("input", (e) => {
    let minutes = parseInt(e.target.value);
    breakTime = minutes * 60;
    selectedBreakTime = minutes * 60;
    updateTimer();
    //restUpdateTimer();
})



/* ======================= 
   WINDOW SCREEN LOGIC!
======================== */

minimizeBtn.addEventListener("click", () => {
    window.windowAPI.minimize();
});

closeBtn.addEventListener("click", () => {
    window.windowAPI.close();
});

function show(button) {
    button.style.display = "flex";
}

function hide(button) {
    button.style.display = "none";
}

function showScreen(name) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    document.querySelector(`.${name}`).classList.add("active");
}


/* ======================= 
   BACK BUTTON LOGIC!
======================== */
let currentScreen = "start";

backWin.addEventListener("click", () => {
    if(currentScreen === "menu"){
        showScreen("startScreen");
        hide(backWin);
        currentScreen = "start";
        startAudio.muted = false;
        startAudio.play();
    } else if (currentScreen === "timer") {
        showScreen("menuScreen");
        currentScreen = "menu";
        isRunning = false;
        resetTimer();
        start.textContent = "Start";
    } else if (currentScreen === "settings") {
        showScreen("menuScreen");
        currentScreen = "menu";
    } else if (currentScreen === "gallery") {
        showScreen("menuScreen");
        currentScreen = "menu";
    } else if (currentScreen === "music") {
        showScreen("menuScreen");
        currentScreen = "menu";
    } else {
        return;
    }
});


/* ======================= 
   PLAY BUTTON LOGIC!
======================== */
playBtn.addEventListener("click", () => {
    showScreen("menuScreen");
    show(backWin);
    currentScreen = "menu";
    startAudio.muted = true;
    startAudio.pause();
    startAudio.currentTime = 0;
})



/* ======================= 
   MAIN MENU BUTTON LOGIC!
======================== */
orbTimerBtn.addEventListener("click", () => {
    showScreen("timerScreen");
    show(backWin);
    currentScreen = "timer";
})

settingBtn.addEventListener("click", () => {
    showScreen("settingScreen");
    show(backWin);
    currentScreen = "settings";
})

galleryBtn.addEventListener("click", () => {
    showScreen("galleryScreen");
    show(backWin);
    currentScreen = "gallery";
})

musicBtn.addEventListener("click", () => {
    showScreen("musicScreen");
    show(backWin);
    currentScreen = "music";
})



/* ======================= 
   TODO LIST!
======================== */
/* 
    1. When the "Study Timer" has completed - Switch to the "Rest Timer" logic and allow them to start the break manually.
    2. If the attempt to leave the page before the timer has been completed, send a confirmation window before canceling progress.
    3. Add music that loops for both the "Study Timer", "Rest Timer" and the "Main Menu" Screen.
    4. Modify the "Music Volume Slider" in the settings page to have an affect on the music.
    5. Add sfx to button presses.
    6. Modify the "SFX Volume Slider" in the seetings page to have an affect on the sfx.

    TO BE CONTINUED.
*/
/* ======================= 
   END OF TODO LIST!
======================== */