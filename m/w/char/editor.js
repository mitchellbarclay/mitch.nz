let canvas;
let canvasContainer;
let sliders = [];
let targetValues = [];
let toggleButton;
let bg_color = [0];
let shirtR, shirtG, shirtB;

const startSyllables = [
'Be', 'Ne', 'Ab', 
'Del', 'Sh', 'Go', 
'Ke', 'Sin', 'Mon', 
'Zan', 'Fli', 'Gro', 
'Han', 'Micro ', 'Daddy ', 
'The ', 'Lil ', 'Baby ', 
'King ', 'Man', 'Microsoft ',
'Big ', 'Mr ', 'Uncle ',
'Professor ', 'Money '
];

const middleSyllables = [
  'bra', 'na', 'ga', 
  'di', 'so', 're', 
  'ki', 'li', 'a', 
  'cha', 'do', 'fer', 
  'gle', 'shaka', 'man',
  'gob', 'u', 'i',
  'e', 'o', ' hot '
  ];

const endSyllables = [
  'ne', 'ly', 'vis', 
  'sa', 'ri', 'ro', 
  'ko', 'me', 'ton', 
  'ster', 'ron', 'ko', 
  'bi', 'bo', 'pasta', 
  'bing', 'lin',
  'a', 'e', 'u', 'i',
  'top', 'chip ',
  'man'
  ];

const extraSyllables = [
  'cust', 'heet', 'low', 
  'adar', 'chi', 'bon', 
  'big', 'do', 'fan', 
  'cul', 'flan', 'nos', 
  'chi', ' Turbo', ' Stevens',
  ' Micro', ' Nano', 
  ' Pro Max', ' 9000', 'man',
  ' Smith'
  ];


let randomNameEl;

function setup() {
  canvasContainer = document.querySelector('#canvasContainer');
  resizeCanvasToMatchContainer();

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

randomNameEl = createP(''); // This creates a new p5 paragraph element (<p>)
randomNameEl.parent('name-container'); // This will append our p element to the div with id 'name-container'
setRandomName();

targetValues = sliders.map(slider => random(slider.elt.min, slider.elt.max)); 

// Create and parent the toggle button
toggleButton = createCheckbox();
toggleButton.parent('toggleButtonContainer'); 

// Create and parent the randomizer button
let randomizeButton = createButton('Generate');
randomizeButton.parent('randomizeButtonContainer'); 

// Add an event listener to the randomize button
randomizeButton.mousePressed(() => {
  targetValues = sliders.map(slider => random(slider.elt.min, slider.elt.max)); 

setRandomName();

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

function drawFace4(mouthV, eyeHV, eyeWV, faceWV, jawV, eyeSV, faceCV, eyeCV, noseV, noseBV, hairCV, hairV, mouthHV, eyeRV, beardV, eyeBV) {

//mode setup
  rectMode(CENTER);
  angleMode(DEGREES);
  noStroke();
  colorMode(HSB);

//slider maps
  let mouth_size = map(mouthV, 0, 100, 0.5, 2.3);
  let eyeY = map(eyeHV, 0, 100, 0, 1.5);
  let eyeX = map(eyeWV, 0, 100, -0.4, 1);
  let faceX = map(faceWV, 0, 100, 0, 3.5);
  let jaw = map(jawV, 0, 100, 1, 7);
  let eyeSize = map(eyeSV, 0, 100, 1, 2);
  let faceHue = map(faceCV, 0, 100, 0, 15); 
  let faceHue2 = 5; 
  let faceSaturation = map(faceCV, 0, 100, 30, 20);
  let faceSaturation2 =  20; 
  let faceBrightness = map(faceCV, 0, 100, 20, 70);
  let faceBrightness2 = 50;
  let noseHue = map(faceCV, 0, 100, 0, 10);
  let noseHue2 = faceHue; 
  let noseSaturation = map(faceCV, 0, 100, 0, 10);
  let noseSaturation2 = faceSaturation + 50; 
  let noseBrightness = map(faceCV, 0, 100, 0, 70);
  let noseBrightness2 = faceBrightness + 50;
  let browHue = map(faceCV, 0, 100, 0, 10);
  let browSaturation = map(faceCV, 0, 100, 0, 10);
  let browBrightness = map(faceCV, 0, 100, 0, 12);
  let lipsHue = map(faceCV, 0, 100, 0, 10);
  let lipsHue2 = faceHue; 
  let lipsSaturation = map(faceCV, 0, 100, 0, 10);
  let lipsSaturation2 = faceSaturation + 30; 
  let lipsBrightness = map(faceCV, 0, 100, 0, 23);
  let lipsBrightness2 = faceBrightness + 40;
  let eyeHue = map(eyeCV, 0, 50, 10, 150);
  let eyeSaturation = map(eyeCV, 0, 100, 80, 100);
  let eyeBrightness = map(eyeCV, 20, 100, 40, 100);
  let hairHue = map(hairCV, 0, 80, 0, 40);
  let hairSaturation = map(hairCV, 0, 100, 0, 300);
  let hairBrightness = map(hairCV, 0, 100, 0, 190);
  let nose1 = map(noseV, 0, 100, -1, 2);
  let nose2 = map(noseV, 0, 100, 0.6, 1.3);
  let nose3 = map(noseBV, 0, 100, 1.2, 2);
  let nose4 = map(noseBV, 0, 100, 0, 1);
  let hairCut = map(hairV, 0, 100, 0, 6);
  let mouthH = map(mouthHV, 0, 100, -1, 1);
  let eyeRotate = map(eyeRV, 0, 100, -5, 5);
  let beardW = map(jawV, 0, 100, 1, -5);
  let beardCut = map(beardV, 0, 100, 0, 10);
  let eyeBag = map(eyeBV, 0, 100, 0, 10);


  push();
  colorMode(RGB);
  fill(shirtR-80, shirtG-80, shirtB-80);
  rect(0,13,faceX*5 + 10,15,10);
  rect(0,20,faceX*5 + 10,15);
  pop();
  fill(faceHue2+faceHue, faceSaturation2+faceSaturation, faceBrightness2+faceBrightness);
  rect(0,22,faceX*5 + 10,15);
  push();
  colorMode(RGB);
  fill(shirtR-80, shirtG-80, shirtB-80);
  rect(0,20,faceX*2 + 10,19);
  pop();

  fill(faceHue2-20+faceHue, faceSaturation2-20+faceSaturation, faceBrightness2-20+faceBrightness);
  ellipse(0,5,7.5,11);

// head
  fill(faceHue2+faceHue, faceSaturation2+faceSaturation, faceBrightness2+faceBrightness);
  rect(0, 0, 9.5+faceX, 18, 10,10,jaw,jaw);

//hair
  fill(0+hairHue, 0+hairSaturation, 0+hairBrightness);
  if (hairCut >= 1){
    rect(-5-faceX/2,-2,2,4, 1);
    rect(5+faceX/2,-2,2,4, 1);
  }
  if (hairCut >= 2){
    ellipse(-5-faceX/2,-3,2,4, 1);
    ellipse(5+faceX/2,-3,2,4, 1);
    ellipse(0,-8.2,4+faceX,3);
  }  
  if (hairCut >=3){
    ellipse(-4.75-faceX/2,-5,3,6, 1);
    ellipse(4.75+faceX/2,-5,3,6, 1);
    ellipse(0,-7.2,11+faceX,5);

  }
  if (hairCut >=4){
    rect(-4.5-faceX/2,-3,1.5,7, 1);
    rect(4.5+faceX/2,-3,1.5,7, 1);
    ellipse(2,-5,5+faceX,3);
  }
  if (hairCut >=5){
    rect(-4.5-faceX/2,-2.5,1.5,10, 1);
    rect(4.5+faceX/2,-2.5,1.5,10, 1);
    ellipse(-5,-6.5,3+faceX,3+faceX);
    ellipse(5,-6.5,3+faceX,3+faceX);
    ellipse(4,-7.5,3+faceX,3+faceX);
    ellipse(-4,-7.5,3+faceX,3+faceX);
    ellipse(0,-8,5+faceX,5+faceX);
  }

//eyebrows
  fill(0+browHue, 0+browSaturation, 0+browBrightness);
  rect(-2.5-eyeX, -3.1+eyeY/2, 2.5+eyeX, 0.7, 0, 1,0,0);
  rect( 2.5+eyeX, -3.1+eyeY/2, 2.5+eyeX, 0.7, 1, 0,0,0);

//ears
  fill(faceHue2+faceHue, faceSaturation2+faceSaturation, faceBrightness2+faceBrightness);
  ellipse(-5.2-faceX/2, 0, 2, 2.3);
  ellipse(-5-faceX/2, 0.8, 1.5, 2);
  ellipse(5.2+faceX/2, 0, 2, 2.3);
  ellipse(5+faceX/2, 0.8, 1.5, 2);
  fill(noseHue2+noseHue, noseSaturation2+noseSaturation, noseBrightness2+noseBrightness);
  ellipse(5.2+faceX/2, 0.3, 0.6,1.5);
  ellipse(-5.2-faceX/2, 0.3, 0.6,1.5);

// eyes
  if(eyeBag >= 8){
    fill(noseHue2+noseHue, noseSaturation2+noseSaturation, noseBrightness2+noseBrightness);
    ellipse(-2.5-eyeX, -1+eyeY, 2, 3);
    ellipse(2.5+eyeX, -1+eyeY, 2, 3);
  }
  fill(faceHue2+faceHue, faceSaturation2+faceSaturation, faceBrightness2+faceBrightness);
  ellipse(-2.5-eyeX, -1.2+eyeY, 2, 3);
  ellipse(2.5+eyeX, -1.2+eyeY, 2, 3);
  fill(lipsHue2+lipsHue, lipsSaturation2+lipsSaturation, lipsBrightness2+lipsBrightness); 
  ellipse(-2.5-eyeX, -1.7+eyeY, 2, 2);
  ellipse( 2.5+eyeX, -1.7+eyeY, 2, 2);
  fill(240);
  push();
  rotate(eyeRotate);
  rect(-2.5-eyeX, -1.7+eyeY, 2, eyeSize, eyeSize);
  pop();
  push();
  rotate(-eyeRotate);
  rect( 2.5+eyeX, -1.7+eyeY, 2, eyeSize, eyeSize);
  pop();
  fill(eyeHue, eyeSaturation, eyeBrightness);
  ellipse(-2.5-eyeX, -1.7+eyeY, 1.1, 1.1);
  ellipse( 2.5+eyeX, -1.7+eyeY, 1.1, 1.1);


//beard
  if (beardCut >= 2){
    push();
    colorMode(RGB);
    fill(0,0,0,40);
    rect(0,6+(mouthH/2),8.5+faceX+beardW,6-mouthH,jaw);
    pop();
  }
  if (beardCut >= 4){
    fill(hairHue-10, hairSaturation-10, hairBrightness-10);
    rect(0,mouthH+4,6+faceX+(beardW/1.5),2,jaw);
  }
  if (beardCut >= 6){
    fill(hairHue-10, hairSaturation-10, hairBrightness-10);
    rect(0,6+(mouthH/2),8.5+faceX+beardW,6-mouthH,jaw);
  }
  if (beardCut >= 8){
    fill(hairHue-10, hairSaturation-10, hairBrightness-10);
    rect(0,6+(mouthH/4),9.5+faceX,6-(mouthH/2),jaw+2);
  } 
  fill(faceHue2+faceHue, faceSaturation2+faceSaturation, faceBrightness2+faceBrightness);
  rect(0,5+mouthH,4.5,mouth_size+0.5,2);

// nose
  fill(noseHue2+noseHue, noseSaturation2+noseSaturation, noseBrightness2+noseBrightness);
  rect(0,0.4, nose3,3+nose4);
  rect(0, 2.35, 2.95, nose2, 1);
  ellipse(0, 2.1, 2+nose1,2.2);

//mouth 
  fill(lipsHue2+lipsHue, lipsSaturation2+lipsSaturation, lipsBrightness2+lipsBrightness);
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

function setRandomName() {
  const syllables = [startSyllables, middleSyllables, endSyllables, extraSyllables];
  
  let numSyllables = Math.floor(Math.random() * 3) + 2; // Choose two to four syllables

  let name = '';
  for (let i = 0; i < numSyllables; i++) {
    let syllableList = syllables[i];
    let syllable = syllableList[Math.floor(Math.random() * syllableList.length)];
    name += syllable;
  }

  randomNameEl.html(`${name}`);
}



