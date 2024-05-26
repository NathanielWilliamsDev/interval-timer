const input = document.querySelector(".timer-controls input");
const button = document.querySelector(".timer-controls button");
let counter = 0;
button.addEventListener("click", ()=>{
    counter = input.value;
    console.log(counter);
    input.value = "";
});

input.addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
        counter = input.value;
        console.log(counter);
        input.value = "";
    }
});


// Checks that the time is valid
function isCorrectTime(time){

}

// Concert time parameter into seconds
// split on ":"
// if produced list from split is > 1 (then you have minutes to convert)
// otherwise if < 1, return the seconds
function convertToSeconds(time){

}