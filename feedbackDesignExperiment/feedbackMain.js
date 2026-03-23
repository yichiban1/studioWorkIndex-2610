// find elements to use
const introDialog = document.getElementById("intro-dialog");
const dialogCloseButton = document.getElementById("dialog-close-button");
const playButton = document.getElementById("play-button");

// intro dialog setup
introDialog.showModal();

dialogCloseButton.addEventListener("click", closeDialog);

function closeDialog(){
    introDialog.close();
    Tone.start();
}

// tone synth init
const synth = new Tone.Synth().toDestination();

// play sound with tone
function playNote(){
    synth.triggerAttackRelease("C4", "8n");
}

//playButton.addEventListener("click", playNote);

function startNote(){
    synth.triggerAttack("C4");
}

function endNote(){
    synth.triggerRelease();
}

// Mouse event listeners for button feedback
// mousedown triggers the note immediately for responsive feel
playButton.addEventListener("mousedown", startNote);

// mouseup releases the note when user lets go
playButton.addEventListener("mouseup", endNote);

// mouseenter provides visual feedback when cursor enters button
// Added console log for debugging/learning purposes
playButton.addEventListener("mouseenter", () => {
    console.log("Mouse entered button area");
});

// mouseleave ensures note stops if user drags off button while holding
playButton.addEventListener("mouseleave", () => {
    // Only release if mouse is being held down (button is active)
    if (synth.triggerRelease) {
        endNote();
    }
});

// click event for additional feedback
// Used to trigger a visual effect or secondary action
playButton.addEventListener("click", () => {
    console.log("Button clicked");
});

// doubleclick event - provides different feedback for double clicks
playButton.addEventListener("dblclick", () => {
    console.log("Button double-clicked");
    // Double click plays a higher note for variety
    synth.triggerAttackRelease("E4", "8n");
});
