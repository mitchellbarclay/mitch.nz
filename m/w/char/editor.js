let canvas;
let canvasContainer;
let sliders = [];
let toggleButton; // This will replace slider16
let bg_color = [230];

function setup() {
  // Get the container element
  canvasContainer = document.querySelector('#canvasContainer');
  resizeCanvasToMatchContainer();

  // Create and parent sliders
  for (let i = 1; i < 16; i++) { // only create sliders up to 15
    let slider = createSlider(0, 100, 50);
    slider.parent('slider' + i + 'Container');
    sliders.push(slider);
  }
  
  // Create and parent the toggle button
  toggleButton = createCheckbox();
  toggleButton.parent('toggleButtonContainer'); // you'll need to provide this container in your HTML
}


function draw() {
  strokeWeight(0.2);
  background(bg_color);

  // Use array map to get values from sliders
  let sliderValues = sliders.map(slider => slider.value());

  // Get the value from the toggle button
  let toggleValue = toggleButton.checked() ? 100 : 0; // assuming the toggle value should be either 0 or 100

  // Set the face size and scale relative to the canvas size
  let face_size = Math.min(width, height) / 2;
  let face_scale = face_size / 10;
  let face_y = height / 2;
  let face_x = width / 2;

  translate(face_x, face_y);
  scale(face_scale);

  // Pass sliderValues and toggleValue to your drawFace function
  drawFace4(...sliderValues, toggleValue); // put the toggleValue last to replace slider16
}


function windowResized() {
  resizeCanvasToMatchContainer();
}

function resizeCanvasToMatchContainer() {
  let containerWidth = canvasContainer.clientWidth;
  let containerHeight = canvasContainer.clientHeight;
  let viewportHeight = window.innerHeight;

  let newHeight = Math.min(containerHeight, viewportHeight);
  
  // Create the canvas and attach it to the container
  if (canvas) {
    resizeCanvas(containerWidth, newHeight);
  } else {
    canvas = createCanvas(containerWidth, newHeight);
    canvas.parent('canvasContainer');
  }
}
