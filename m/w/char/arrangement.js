 const canvasWidth = 960;
 const canvasHeight = 500;
 let curRandomSeed = 0;

 let lastSwapTime = 0;
 const millisPerSwap = 5000;

 function setup () {
  //create the drawing canvas, save the canvas element
  let main_canvas = createCanvas(canvasWidth, canvasHeight);
  main_canvas.parent('canvasContainer');

  curRandomSeed = int(focusedRandom(0, 1000));

  //mode setup
  angleMode(DEGREES);
  rectMode(CENTER);
}

function changeRandomSeed() {
  curRandomSeed = curRandomSeed + 1;
  lastSwapTime = millis();
}

//global variables for colors
const bg_color1 = [120];

function mouseClicked() {
  changeRandomSeed();
}

function draw () {
  if(millis() > lastSwapTime + millisPerSwap) {
    changeRandomSeed();
  }

  //reset the random number generator each time draw is called
  resetFocusedRandom(curRandomSeed);

  //clear screen
  background(bg_color1);
  noStroke();

  //shirt
  shirtR = focusedRandom(0,300,3);
  shirtG = focusedRandom(0,300,3);
  shirtB = focusedRandom(0,300,3);
  shirtR2 = focusedRandom(0,300,3);
  shirtG2 = focusedRandom(0,300,3);
  shirtB2 = focusedRandom(0,300,3);
  fill(shirtR, shirtG, shirtB);
  ellipse(canvasWidth/2, 430, 360,130);
  rect(canvasWidth/2, 480, 400,160, 60,60,0,0);
  fill(shirtR2, shirtG2, shirtB2);
  ellipse(canvasWidth/2, 380, 170,200);
  fill(50);
  rect(canvasWidth/14,canvasHeight/2, 100, 500);
  rect(canvasWidth/4.65,canvasHeight/2, 100, 500);
  rect(canvasWidth/14+canvasWidth/1.4,canvasHeight/2, 100, 500);
  rect(canvasWidth/4.65+canvasWidth/1.4,canvasHeight/2, 100, 500);


  //grid
  let w = canvasWidth / 7;
  let h = canvasHeight / 4;
  for(let i=0; i<4; i++) {
    for(let j=0; j<7; j++) {
      let y = h/2 + h*i;
      let x = w/2 + w*j;

      //left 2/4 grid
      if(j<2){
        push();
        translate(x, y);
        scale(w/25, h/25);
        mouthV = focusedRandom(0, 100, 0);
        eyeHV = focusedRandom(0, 100, 0);
        eyeWV = focusedRandom(0, 100, 0);
        faceWV = focusedRandom(0, 100, 0);
        jawV = focusedRandom(0, 100, 0);
        eyeSV = focusedRandom(0, 100, 0);
        faceCV = focusedRandom(0, 100, 0);
        eyeCV = focusedRandom(-30, 100, 3);
        noseV = focusedRandom(0, 100, 0);
        noseBV = focusedRandom(0, 100, 0);
        hairCV = focusedRandom(0, 100, 3);
        hairV = focusedRandom(0, 100, 0);
        mouthHV = focusedRandom(0,100,0);
        eyeRV = focusedRandom(0,100,0);
        beardV = focusedRandom(0,100,0);
        eyeBV = focusedRandom(0,100,0);
        drawFace4(mouthV, eyeHV, eyeWV, faceWV, jawV, eyeSV, faceCV, eyeCV, noseV, noseBV, hairCV, hairV, mouthHV, eyeRV, beardV, eyeBV);
        pop();
      }

      //feature face
      if(j==3){
        if(i==2){
          push();
          translate(x, y-y/5);
          scale(w/6, h/6);
          mouthV = focusedRandom(0, 100, 0);
          eyeHV = focusedRandom(0, 100, 0);
          eyeWV = focusedRandom(0, 100, 0);
          faceWV = focusedRandom(0, 100, 0);
          jawV = focusedRandom(0, 100, 0);
          eyeSV = focusedRandom(0, 100, 0);
          faceCV = focusedRandom(0, 100, 0);
          eyeCV = focusedRandom(-30, 100, 3);
          noseV = focusedRandom(0, 100, 0);
          noseBV = focusedRandom(0, 100, 0);
          hairCV = focusedRandom(0, 100, 3);
          hairV = focusedRandom(0, 100, 0);
          mouthHV = focusedRandom(0,100,0);
          eyeRV = focusedRandom(0,100,0);
          beardV = focusedRandom(0,100,0);
          eyeBV = focusedRandom(0,100,0);
          neckV = focusedRandom(0,100,10);
          drawFace4(mouthV, eyeHV, eyeWV, faceWV, jawV, eyeSV, faceCV, eyeCV, noseV, noseBV, hairCV, hairV, mouthHV, eyeRV, beardV, eyeBV, neckV);
          pop();
        }
      }

      //right 2/4 grid
      if(j>4){
        push();
        translate(x, y);
        scale(w/25, h/25);
        mouthV = focusedRandom(0, 100, 0);
        eyeHV = focusedRandom(0, 100, 0);
        eyeWV = focusedRandom(0, 100, 0);
        faceWV = focusedRandom(0, 100, 0);
        jawV = focusedRandom(0, 100, 0);
        eyeSV = focusedRandom(0, 100, 0);
        faceCV = focusedRandom(0, 100, 0);
        eyeCV = focusedRandom(-30, 100, 3);
        noseV = focusedRandom(0, 100, 0);
        noseBV = focusedRandom(0, 100, 0);
        hairCV = focusedRandom(0, 100, 3);
        hairV = focusedRandom(0, 100, 0);
        mouthHV = focusedRandom(0,100,0);
        eyeRV = focusedRandom(0,100,0);
        beardV = focusedRandom(0,100,0);
        eyeBV = focusedRandom(0,100,0);
        drawFace4(mouthV, eyeHV, eyeWV, faceWV, jawV, eyeSV, faceCV, eyeCV, noseV, noseBV, hairCV, hairV, mouthHV, eyeRV, beardV, eyeBV);
        pop();
      }
    }
  }

}

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
  else if (key == '@') {
    saveBlocksImages(true);
  }
}
