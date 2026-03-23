// find our elements
const stageContainer = document.getElementById("stage-container");
const circleButton = document.getElementById("circle-button");
const hueSlider = document.getElementById("hue-slider");
const hueValue = document.getElementById("hue-value");

// find stage width
let stageContainerWidth = stageContainer.offsetWidth;
// find stage height
let stageContainerHeight = stageContainer.offsetHeight;

// set default circle colour using HSL
// HSL format: hsl(hue, saturation%, lightness%)
// hue: 0-360, saturation: 0-100%, lightness: 0-100%
let circleColour = "hsl(0, 100%, 50%)"; // default red

// create the konva stage
const stage = new Konva.Stage({
    container: "konva-stage",
    width: stageContainerWidth,
    height: stageContainerHeight
});

// create our layer
const firstLayer = new Konva.Layer();

// add the layer to our stage
stage.add(firstLayer);

// MAPPING LOGIC :
// The range input value (0-360) directly maps to HSL hue (0-360 degrees)
// This is a 1:1 mapping since both use the same range
// HSL was chosen because it provides a perceptually uniform color spectrum
// compared to RGB, making the color change feel more natural to users

// Function to update circle color based on slider value
function updateCircleColour() {
    // Get slider value (0-360)
    const hue = hueSlider.value;
    
    // Update the displayed value
    hueValue.textContent = hue;
    
    // Create HSL color string
    // Saturation and lightness fixed at 100% and 50% for vibrant colors
    circleColour = `hsl(${hue}, 100%, 50%)`;
}

// Add event listener for slider input
// "input" event fires continuously while dragging
hueSlider.addEventListener("input", updateCircleColour);

// Initialize color
updateCircleColour();

// add interaction to button
function drawNewCircle(){
    const circle = new Konva.Circle({
        x: stage.width() * Math.random(),
        y: stage.height() * Math.random(),
        radius: 50 * Math.random(),
        fill: circleColour
    });
    // add the circle to our first layer
    firstLayer.add(circle);
}

circleButton.addEventListener("click", drawNewCircle);

// VALIDATION :
// The range input has min="0" and max="360" attributes
// This ensures the value is always between 0-360
// HSL hue values outside 0-360 would still work (they wrap around)
// but keep it constrained for clarity
