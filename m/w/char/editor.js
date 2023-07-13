let canvas;
let canvasContainer;
let sliders = [];
let targetValues = [];
let toggleButton; // This will replace slider16
let bg_color = [0];
let shirtR, shirtG, shirtB;

function setup() {
// Get the container element
  canvasContainer = document.querySelector('#canvasContainer');
  resizeCanvasToMatchContainer();

// Initialize the shirt color components
  shirtR = random(0, 300);
  shirtG = random(0, 300);
  shirtB = random(0, 300);
  shirtR2 = random(0, 300);
  shirtG2 = random(0, 300);
  shirtB2 = random(0, 300);

// Create and parent sliders
for (let i = 1; i < 16; i++) { // only create sliders up to 15
  let slider = createSlider(0, 100, 50);
  slider.parent('slider' + i + 'Container');
  sliders.push(slider);
  targetValues.push(slider.value());

// Add an event listener to the slider that updates the corresponding targetValue
  slider.input(() => {
    targetValues[i - 1] = slider.value();
  });
}

// Create and parent the toggle button
toggleButton = createCheckbox();
toggleButton.parent('toggleButtonContainer'); 

// Create and parent the randomizer button
let randomizeButton = createButton('Randomise');
randomizeButton.parent('randomizeButtonContainer'); 

// Add an event listener to the randomize button
  randomizeButton.mousePressed(() => {
  targetValues = sliders.map(slider => random(slider.elt.min, slider.elt.max)); 

// Also generate random colors for the shirt

  shirtR = random(0, 300);
  shirtG = random(0, 300);
  shirtB = random(0, 300);

  // Randomize the state of the toggleButton
  toggleButton.checked(random() > 0.5);


});
}

function draw() {
  strokeWeight(0.2);
  push();
  colorMode(RGB);
  background(shirtR-60, shirtB-60, shirtG-60);
  pop();

// Smoothly change slider values towards the target values
  for (let i = 0; i < sliders.length; i++) {
    let currentValue = sliders[i].value();
    let targetValue = targetValues[i];
let newValue = lerp(currentValue, targetValue, 0.2); // The last parameter is the speed of the transition
sliders[i].value(newValue);
}


// Then apply translate and scale transformations for the face
let face_size = Math.min(width, height) / 2.5;
let face_scale = face_size / 10;

translate(width / 2, height / 2);
scale(face_scale);

// Get slider and toggle values
let sliderValues = sliders.map(slider => slider.value());
let toggleValue = toggleButton.checked() ? 100 : 0;


// Pass sliderValues and toggleValue to your drawFace function
drawFace4(...sliderValues, toggleValue);
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


function drawFace4(mouthV, eyeHV, eyeWV, faceWV, jawV, eyeSV, faceCV, eyeCV, noseV, noseBV, hairCV, hairV, mouthHV, eyeRV, beardV, eyeBV, neckV) {

//mode setup
  rectMode(CENTER);
  angleMode(DEGREES);
  noStroke();
  colorMode(HSB);

//slider maps
  let mouth_size = map(mouthV, 0, 100, 0.5, 2.3);
  let eyeH = map(eyeHV, 0, 100, 0, 1.5);
  let eyeW = map(eyeWV, 0, 100, -0.4, 1);
  let faceW = map(faceWV, 0, 100, 0, 3.5);
  let jaw = map(jawV, 0, 100, 1, 7);
  let eyeS = map(eyeSV, 0, 100, 1, 2);

  let faceR = map(faceCV, 0, 100, 0, 15);
  let faceG = map(faceCV, 0, 100, 30, 20);
  let faceB = map(faceCV, 0, 100, 20, 70);

  let faceR2 = 5; let faceG2 =  20; let faceB2 = 50;

  let noseR = map(faceCV, 0, 100, 0, 10);
  let noseG = map(faceCV, 0, 100, 0, 10);
  let noseB = map(faceCV, 0, 100, 0, 70);

  let noseR2 = faceR; let noseG2 = faceG + 50; let noseB2 = faceB + 50;

  let browR = map(faceCV, 0, 100, 0, 10);
  let browG = map(faceCV, 0, 100, 0, 10);
  let browB = map(faceCV, 0, 100, 0, 12);

  let lipsR = map(faceCV, 0, 100, 0, 10);
  let lipsG = map(faceCV, 0, 100, 0, 10);
  let lipsB = map(faceCV, 0, 100, 0, 23);
  let lipsR2 = faceR; let lipsG2 = faceG + 30; let lipsB2 = faceB + 40;

  let eyeR = map(eyeCV, 0, 100, 40, 200);
  let eyeG = map(eyeCV, 0, 100, 80, 100);
  let eyeB = map(eyeCV, 0, 100, 40, 100);


  let hairR = map(hairCV, 0, 100, 0, 40);
  let hairG = map(hairCV, 0, 100, 0, 200);
  let hairB = map(hairCV, 0, 100, 0, 190);



  let nose1 = map(noseV, 0, 100, -1, 2);
  let nose2 = map(noseV, 0, 100, 0.6, 1.3);
  let nose3 = map(noseBV, 0, 100, 1.2, 2);
  let nose4 = map(noseBV, 0, 100, 0, 1);

  let hairCut = map(hairV, 0, 100, 0, 6);
  let mouthH = map(mouthHV, 0, 100, -1, 1);
  let eyeRot = map(eyeRV, 0, 100, -5, 5);
  let beardW = map(jawV, 0, 100, 1, -5);
  let beardCut = map(beardV, 0, 100, 0, 10);
  let eyeBag = map(eyeBV, 0, 100, 0, 10);
  let neck = map(neckV, 0,100, 0,1);


  push();
  colorMode(RGB);
  fill(shirtR-80, shirtG-80, shirtB-80);
  rect(0,13,faceW*5 + 10,15,10);
  pop();

  fill(faceR2-20+faceR, faceG2-20+faceG, faceB2-20+faceB);
  ellipse(0,5,7.5,11);

// head
  fill(faceR2+faceR, faceG2+faceG, faceB2+faceB);
  rect(0, 0, 9.5+faceW, 18, 10,10,jaw,jaw);



//hair
  fill(0+hairR, 0+hairG, 0+hairB);
  if (hairCut >= 1){
    rect(-5-faceW/2,-2,2,4, 1);
    rect(5+faceW/2,-2,2,4, 1);
  }
  if (hairCut >= 2){
    ellipse(-5-faceW/2,-3,2,4, 1);
    ellipse(5+faceW/2,-3,2,4, 1);
    ellipse(0,-8.2,4+faceW,3);
  }  
  if (hairCut >=3){
    ellipse(-4.75-faceW/2,-5,3,6, 1);
    ellipse(4.75+faceW/2,-5,3,6, 1);
    ellipse(0,-7.2,11+faceW,5);

  }
  if (hairCut >=4){
    rect(-4.5-faceW/2,-3,1.5,7, 1);
    rect(4.5+faceW/2,-3,1.5,7, 1);
    ellipse(2,-5,5+faceW,3);
  }
  if (hairCut >=5){
    rect(-4.5-faceW/2,-2.5,1.5,10, 1);
    rect(4.5+faceW/2,-2.5,1.5,10, 1);
    ellipse(-5,-6.5,3+faceW,3+faceW);
    ellipse(5,-6.5,3+faceW,3+faceW);
    ellipse(4,-7.5,3+faceW,3+faceW);
    ellipse(-4,-7.5,3+faceW,3+faceW);
    ellipse(0,-8,5+faceW,5+faceW);

  }

//eyebrows
  fill(0+browR, 0+browG, 0+browB);
  rect(-2.5-eyeW, -3.1+eyeH/2, 2.5+eyeW, 0.7, 0, 1,0,0);
  rect( 2.5+eyeW, -3.1+eyeH/2, 2.5+eyeW, 0.7, 1, 0,0,0);

//ears
  fill(faceR2+faceR, faceG2+faceG, faceB2+faceB);
  ellipse(-5.2-faceW/2, 0, 2, 2.3);
  ellipse(-5-faceW/2, 0.8, 1.5, 2);
  ellipse(5.2+faceW/2, 0, 2, 2.3);
  ellipse(5+faceW/2, 0.8, 1.5, 2);
  fill(noseR2+noseR, noseG2+noseG, noseB2+noseB);
  ellipse(5.2+faceW/2, 0.3, 0.6,1.5);
  ellipse(-5.2-faceW/2, 0.3, 0.6,1.5);

// eyes
  if(eyeBag >= 8){
    fill(noseR2+noseR, noseG2+noseG, noseB2+noseB);
    ellipse(-2.5-eyeW, -1+eyeH, 2, 3);
    ellipse(2.5+eyeW, -1+eyeH, 2, 3);
  }
  fill(faceR2+faceR, faceG2+faceG, faceB2+faceB);
  ellipse(-2.5-eyeW, -1.2+eyeH, 2, 3);
  ellipse(2.5+eyeW, -1.2+eyeH, 2, 3);
  fill(lipsR2+lipsR, lipsG2+lipsG, lipsB2+lipsB); 
  ellipse(-2.5-eyeW, -1.7+eyeH, 2, 2);
  ellipse( 2.5+eyeW, -1.7+eyeH, 2, 2);
  fill(240);
  push();
  rotate(eyeRot);
  rect(-2.5-eyeW, -1.7+eyeH, 2, eyeS, eyeS);
  pop();
  push();
  rotate(-eyeRot);
  rect( 2.5+eyeW, -1.7+eyeH, 2, eyeS, eyeS);
  pop();
  fill(eyeR, eyeG, eyeB);
  ellipse(-2.5-eyeW, -1.7+eyeH, 1.1, 1.1);
  ellipse( 2.5+eyeW, -1.7+eyeH, 1.1, 1.1);


//beard
  if (beardCut >= 2){
    push();
    colorMode(RGB);
    fill(0,0,0,40);
    rect(0,6+(mouthH/2),8.5+faceW+beardW,6-mouthH,jaw);
    pop();
  }
  if (beardCut >= 4){
    fill(hairR-10, hairG-10, hairB-10);
    rect(0,mouthH+4,6+faceW+(beardW/1.5),2,jaw);
  }
  if (beardCut >= 6){
    fill(hairR-10, hairG-10, hairB-10);
    rect(0,6+(mouthH/2),8.5+faceW+beardW,6-mouthH,jaw);
  }
  if (beardCut >= 8){
    fill(hairR-10, hairG-10, hairB-10);
    rect(0,6+(mouthH/4),9.5+faceW,6-(mouthH/2),jaw+2);
  } 
  fill(faceR2+faceR, faceG2+faceG, faceB2+faceB);
  rect(0,5+mouthH,4.5,mouth_size+0.5,2);



// nose
  fill(noseR2+noseR, noseG2+noseG, noseB2+noseB);
  rect(0,0.4, nose3,3+nose4);
  rect(0, 2.35, 2.95, nose2, 1);
  ellipse(0, 2.1, 2+nose1,2.2);

//mouth 
  fill(lipsR2+lipsR, lipsG2+lipsG, lipsB2+lipsB);
  rect(0, 5+mouthH, 4, mouth_size, 1);
  fill(0);
  rect(0, 5+mouthH, 3.4,0.1,0.6);

}

function resetFocusedRandom() {
  return Math.seedrandom(arguments);
}

function focusedRandom(min, max, focus, mean) {
// console.log("hello")
  if(max === undefined) {
    max = min;
    min = 0;
  }
  if(focus === undefined) {
    focus = 1.0;
  }
  if(mean === undefined) {
    mean = (min + max) / 2.0;
  }
  if(focus == 0) {
    return d3.randomUniform(min, max)();
  }
  else if(focus < 0) {
    focus = -1 / focus;
  }
  let sigma = (max - min) / (2 * focus);
  let val = d3.randomNormal(mean, sigma)();
  if (val >= min && val < max) {
    return val;
  }
  return d3.randomUniform(min, max)();
}


