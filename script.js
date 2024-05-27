const input = document.querySelector(".timer-controls input");
const startButton = document.querySelector(".start-button");
const timerDisplay = document.querySelector(".timer");
const timerLabel = document.querySelector(".timer-label");
const addButton = document.querySelector(".add-button");
let countdownInterval;

// workout and rest objects
let workoutTimer = {label: "Workout", duration: 10}; //create these, put them into array, run array loop
let restTimer = {label: "Rest", duration: 5};
// array containing workout/rest objects
let timerSequence = [];


// Event listener for clicking the start button
startButton.addEventListener("click", (e)=>{
    // Clear any existing interval
    clearInterval(countdownInterval);
    input.value = "" // clear the input field
    input.disabled = true;
    startButton.disabled = true;
    startTimerSequence(timerSequence); // when clicked, startTimerSequence with the array of timers
});

// Event listener for pressing "Enter" in the input box
input.addEventListener("keypress", (e)=>{
    if(e.key === "Enter"){
        startButton.click();
    }
});

addButton.addEventListener("click", () =>{
    addTimer();
});

// timers input is the array of timers [workout, rest]
function startTimerSequence(timers){
    let currentIndex = 0;

    function runNextTimer(){ //WHY NOT A LOOP?
        if(currentIndex < timers.length){ // checks if there are more timers
            let currentTimer = timers[currentIndex];
            beginCountdown(currentTimer.duration, currentTimer.label, runNextTimer); // perform countdown on current timer
            currentIndex++; // increment to the next timer
        }
        else{ // no more timer's left
            alert("All timers completed");
            input.disabled = false;
            startButton.disabled = false;
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
            timerDisplay.textContent = formatTime(timeInSeconds); // update timerElement on DOM
        } 
        else { // this means timer is finished
            clearInterval(countdownInterval); // stops any  existing interval to ensure no overlapping intervals
            alert(`${label} is done`);
            callback(); // move to the next timer
        }
    }, 1000);
}

// converts seconds in 'mm:ss'
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

// Concert time parameter into seconds
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
    if(isValidTime(input.value)){ 
        let inputTime = convertToSeconds(input.value);
        timerSequence.push({label:"swag", duration: inputTime});
        // NEED TO ADD ANOTHER INPUT FIELD BEFORE THE TIME ONE FOR LABEL
        // PROBABLY NEED TO PUT SOMETHING ON THE SCREEN SHOWING WHAT HAS BEEN ADDED
    }
}


