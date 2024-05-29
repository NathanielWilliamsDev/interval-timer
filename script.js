const inputTimer = document.querySelector(".input-timer");
const inputLabel = document.querySelector(".input-label");
const startButton = document.querySelector(".start-button");
const resetButton = document.querySelector(".reset-button");
const timerDisplay = document.querySelector(".timer");
const timerLabel = document.querySelector(".timer-label");
const addButton = document.querySelector(".add-button");
const ulList = document.querySelector(".ul-list");

const endingBeep = document.querySelector(".ending-beep");
const finalBeep = document.querySelector(".final-beep");

const popup = document.querySelector(".popup");
const popupClose = document.querySelector(".popup-close");


let countdownInterval;

// array containing workout/rest objects
let timerSequence = [];


// Event listener for clicking the start button
startButton.addEventListener("click", (e)=>{
    // Clear any existing interval
    clearInterval(countdownInterval);
    inputTimer.value = "" // clear the input field
    inputTimer.disabled = true;
    startButton.disabled = true;
    startTimerSequence(timerSequence); // when clicked, startTimerSequence with the array of timers
});

resetButton.addEventListener("click", ()=>{
    timerSequence = [];
    let ulLis = document.querySelectorAll(".ul-list div");
    for(let i = 0; i < ulLis.length; i++){
        ulLis[i].remove();
    }
});

// Event listener for pressing "Enter" in the input box
inputTimer.addEventListener("keypress", (e)=>{
    if(e.key === "Enter"){
        addButton.click();
    }
});

inputTimer.addEventListener("input", formatInput);

addButton.addEventListener("click", addTimer);

popupClose.addEventListener("click", ()=>{
    popup.style.display = "none";
});

// timers input is the array of timers [workout, rest]
function startTimerSequence(timers){
    let currentIndex = 0;

    function runNextTimer(){ //WHY NOT A LOOP?
        if(currentIndex < timers.length){ // checks if there are more timers
            let currentTimer = timers[currentIndex];

            let liList = document.querySelectorAll(".li-wrapper");
            liList.forEach(li => li.classList.remove("active-timer")); // Remove active class from all list items
            
            liList[currentIndex].classList.add("active-timer");

            beginCountdown(currentTimer.duration, currentTimer.label, runNextTimer); // perform countdown on current timer
            currentIndex++; // increment to the next timer
        }
        else{ // no more timer's left
            // alert("All timers completed");
            inputTimer.disabled = false;
            startButton.disabled = false;
            showWorkoutComplete();

            // All timer's finished, remove .active-timer from all li's
            let liList = document.querySelectorAll(".li-wrapper");
            liList.forEach(li => li.classList.remove("active-timer"));
        }
    }
    
    runNextTimer();
}

function beginCountdown(duration, label, callback){
    clearInterval(countdownInterval); // clears any existing interval

    // Validate and convert input
    let timeInSeconds = duration; //currentTimer.duration
    timerLabel.textContent = label; //currentTimer.label
    timerDisplay.textContent = formatTime(timeInSeconds);

    // Start the countdown
    countdownInterval = setInterval(() => {
        if (timeInSeconds > 0) { // still time left to decrease
            timeInSeconds--; // decrease
            if(timeInSeconds <= 2){
                endingBeep.play();
            }
            timerDisplay.textContent = formatTime(timeInSeconds); // update timerElement on DOM
        } 
        else { // this means timer is finished
            finalBeep.play();
            clearInterval(countdownInterval); // stops any  existing interval to ensure no overlapping intervals
            callback(); // move to the next timer
        }
    }, 1000);
}

// converts seconds into 'mm:ss'
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Checks that the time is valid
// time will be input.value
// returns true if the time parameter is valid, false otherwise
function isValidTime(time){
    if(time.length != 5){ // user is forced to use mm:ss formatting
        return(false);
    }
    else{
        let minutesSeconds = time.split(":"); // splitting minutes and seconds
        if(isNaN(Number(minutesSeconds[0])) || isNaN(Number(minutesSeconds[1]))){ // if either are NaN, then they weren't a number
            return(false);
        }
        else if(minutesSeconds[0] < 0 || minutesSeconds[1] < 0){
            return(false);
        }
        return(true); // both minute's and seconds must be a number, return them
    }
}

// Convert 'mm:ss' format into seconds
function convertToSeconds(time){
    let minutesSeconds = time.split(":"); // split minutes from seconds
    let seconds = Number(minutesSeconds[1]); // store the number of seconds in a variable
    seconds += (Number(minutesSeconds[0])*60); // convert minutes to seconds, add it to the seconds variable
    return seconds;
}

// Adds a timer to the timerSequence array
// Timer duration is taken from the input box when addButton is clicked
function addTimer(){
    //if isValidTime -> convertToSeconds -> timerSequence.push({label: test, duration:inputTime})
    if(isValidTime(inputTimer.value)){ 
        let inputTime = convertToSeconds(inputTimer.value);
        if(inputLabel !== ""){
            // push the timer object to the array
            timerSequence.push({label:inputLabel.value, duration: inputTime});
            
            //create new li
            let liWrapper = document.createElement("div");
            liWrapper.classList.add("li-wrapper");
            let liLabel = document.createElement("li");
            liLabel.classList.add("li-label");
            let liTime = document.createElement("li")
            liTime.classList.add("li-time");
            
            liLabel.textContent = inputLabel.value; // set its text content
            liTime.textContent = inputTimer.value;

            liWrapper.appendChild(liLabel);
            liWrapper.appendChild(liTime);
            ulList.appendChild(liWrapper); // append it to the ul
        }
        else{
            alert("Please provide a valid label and time");
        }
    }
}

function showWorkoutComplete(){
    popup.style.display = "flex";
}

function formatInput(e){
    let input = e.target.value.replace(/[^0-9]/g, '');
    if(input.length > 4){
        input = input.slice(0, 4);
    }
    if(input.length >= 3){
        e.target.value = `${input.slice(0, -2)}:${input.slice(-2)}`;
    }else if (input.length >= 2) {
        e.target.value = `${input.slice(0, -2)}:${input.slice(-2)}`;
    } else {
        e.target.value = input;
    }
}
