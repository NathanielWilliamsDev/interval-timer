## Add an input for label
- [x] To the left of the current input, add an input for label so that the user can name the timer

## Reset button next to the start button
- [x] When clicked, will remove all items from the timerSequence array

## Displaying added time's
- [x] Move the input to the top of the page
- [x] Each time add is clicked, add a list item (paragraph) that shows label and time
    - [x] create a new HTML element (li) with the text content of label/duration and append it to an ul

## Removing added time's
- [ ] Have an 'x' next to each of the li's
    - [ ] When clicked,
        - [ ] Remove that object from the timerSequence array
        - [ ] Delete the li

## Highlighting the ul
- [x] As the timer's execute, highlight which li item is currently counting down

## Sets
- Create a way for the user to choose how many sets they want to do
    - Something involving loops I think? where the number of sets becomes the 'i' of the loop

## Save workouts
- Using local storage to save workouts

## Audio cue that a timer is finishing soon
- [x] a beep on each of the last 3 seconds

## Transition the current executing li
- Have the li transition to the larger font size, and back out again

## mm:ss input field
- [x] Rather than having to type the colon (:), each number typed should:
    - Start in the rightmost seconds mm:s(s)
    - And as you type, be shifted across one place
        - Therefore typing '120' will show as '01:20'

## Total remaining time
- Under the timer have a 'Total Remaining: 16:34'

## Pause, Play, Skip, Go Back Buttons
- Allow the user the pause, skip, etc.

## Fix the styling of li
- [x] Make it more like the Workout Timer app

## A pop up saying workout complete
- [x] Not just an alert, but an actual HTML element that sits on top of the rest
    - centered on the screen
    - with an x in the top right corner to close it out