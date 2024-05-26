const input = document.querySelector(".timer-controls input");
const button = document.querySelector(".timer-controls button");
const countdown = document.querySelector(".countdown");
let counter = 0;
let countdownInterval;

// Event listener for clicking the button
button.addEventListener("click", (e)=>{
    // Clear any existing interval
    beginCountdown();
});

// Event listener for pressing "Enter" in the input box
input.addEventListener("keypress", (e)=>{
    if(e.key === "Enter"){
        beginCountdown();
    }
})




function beginCountdown(){
    clearInterval(countdownInterval);

    // Validate and convert input
    let timeInSeconds = -1;
    if(isCorrectTime(input.value)){
        timeInSeconds = convertToSeconds(input.value);
    }
    else{
        return;
    }

    // Disable input and start button
    input.disabled = true;
    button.disabled = true;

    // Display the initial time
    countdown.textContent = timeInSeconds;

    // Start the countdown
    countdownInterval = setInterval(() => {
        if (timeInSeconds > 0) {
            timeInSeconds--;
            countdown.textContent = timeInSeconds;
        } else {
            clearInterval(countdownInterval);
            alert('Time is up!');
            // Optionally, reset input and buttons
            input.disabled = false;
            button.disabled = false;
        }
    }, 1000);
}

// Checks that the time is valid
// time will be input.value
// returns true if the time parameter is valid, false otherwise
function isCorrectTime(time){
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



