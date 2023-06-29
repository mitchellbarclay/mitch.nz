function drawFace4(mouthV, eyeHV, eyeWV, faceWV, jawV, eyeSV, faceCV, eyeCV, noseV, noseBV, hairCV, hairV, mouthHV, eyeRV, beardV, eyeBV, neckV) {

  //mode setup
  rectMode(CENTER);
  angleMode(DEGREES);
  noStroke();
  
  //slider maps
  let mouth_size = map(mouthV, 0, 100, 0.5, 2.3);
  let eyeH = map(eyeHV, 0, 100, 0, 1);
  let eyeW = map(eyeWV, 0, 100, -0.4, 1);
  let faceW = map(faceWV, 0, 100, 0, 3,5);
  let jaw = map(jawV, 0, 100, 1, 7);
  let eyeS = map(eyeSV, 0, 100, 1, 2);
  let faceR = map(faceCV, 0, 100, 0, 30);
  let faceG = map(faceCV, 0, 100, 0, 53);
  let faceB = map(faceCV, 0, 100, 0, 70);
  let noseR = map(faceCV, 0, 100, 0, 66);
  let noseG = map(faceCV, 0, 100, 0, 54);
  let noseB = map(faceCV, 0, 100, 0, 48);
  let browR = map(faceCV, 0, 100, 0, 82);
  let browG = map(faceCV, 0, 100, 0, 42);
  let browB = map(faceCV, 0, 100, 0, 12);
  let lipsR = map(faceCV, 0, 100, 0, 54);
  let lipsG = map(faceCV, 0, 100, 0, 28);
  let lipsB = map(faceCV, 0, 100, 0, 23);
  let eyeR = map(eyeCV, 0, 100, 0, -21);
  let eyeG = map(eyeCV, 0, 100, 0, 181);
  let eyeB = map(eyeCV, 0, 100, 0, 248);
  let nose1 = map(noseV, 0, 100, -0.1, 1);
  let nose2 = map(noseV, 0, 100, 0.6, 1.3);
  let nose3 = map(noseBV, 0, 100, 1.2, 2);
  let nose4 = map(noseBV, 0, 100, 0, 1);
  let hairR = map(hairCV, 0, 100, 0, 255);
  let hairG = map(hairCV, 0, 100, 0, 153);
  let hairB = map(hairCV, 0, 100, 0, 0);
  let hairCut = map(hairV, 0, 100, 0, 6);
  let mouthH = map(mouthHV, 0, 100, -1, 1);
  let eyeRot = map(eyeRV, 0, 100, -5, 5);
  let beardW = map(jawV, 0, 100, 1, -5);
  let beardCut = map(beardV, 0, 100, 0, 10);
  let eyeBag = map(eyeBV, 0, 100, 0, 10);
  let neck = map(neckV, 0,100, 0,1);

  //neck (for feature face)
  if (neckV >= 0.000000001){
    fill(191+faceR, 122+faceG, 71+faceB);
    ellipse(0,5,7.5,11);
  }

  // head
  fill(207+faceR, 138+faceG, 87+faceB);
  rect(0, 0, 9.5+faceW, 18, 10,10,jaw,jaw);

  //eyebrows
  fill(0+browR, 0+browG, 0+browB);
  rect(-2.5-eyeW, -3.1+eyeH/2, 2.5+eyeW, 0.7, 0, 1,0,0);
  rect( 2.5+eyeW, -3.1+eyeH/2, 2.5+eyeW, 0.7, 1, 0,0,0);

  //hair
  fill(0+hairR, 0+hairG, 0+hairB);
  if (hairCut >= 1){
    rect(-4.5-faceW/2,-3,1,5, 1);
    rect(4.5+faceW/2,-3,1,5, 1);
  }
  if (hairCut >= 2){
    rect(-4.5-faceW/2,-3,1,5, 1);
    rect(4.5+faceW/2,-3,1,5, 1);
    ellipse(0,-8,4+faceW,3);
  }  
  if (hairCut >=3){
    rect(-4.5-faceW/2,-3,1,7, 1);
    rect(4.5+faceW/2,-3,1,7, 1);
    ellipse(0,-7,9+faceW,5);

  }
  if (hairCut >=4){
    rect(-4.5-faceW/2,-3,1.5,7, 1);
    rect(4.5+faceW/2,-3,1.5,7, 1);
    ellipse(0,-7,10+faceW,5);
    ellipse(2,-5,5+faceW,3);
  }
  if (hairCut >=5){
    rect(-4.5-faceW/2,-2.5,1.5,10, 1);
    rect(4.5+faceW/2,-2.5,1.5,10, 1);
    ellipse(0,-7,10+faceW,5);
    ellipse(2,-5,5+faceW,5);
  }

  //ears
  fill(207+faceR, 138+faceG, 87+faceB);
  ellipse(-5-faceW/2, 0, 2, 2.3);
  ellipse(-4.8-faceW/2, 0.8, 1.5, 2);
  ellipse(5+faceW/2, 0, 2, 2.3);
  ellipse(4.8+faceW/2, 0.8, 1.5, 2);
  fill(176+noseR, 94+noseG, 56+noseB);
  ellipse(5+faceW/2, 0.3, 0.6,1.5);
  ellipse(-5-faceW/2, 0.3, 0.6,1.5);
  
  // eyes
  if(eyeBag >= 8){
    fill(176+noseR, 94+noseG, 56+noseB);
    ellipse(-2.5-eyeW, -1+eyeH, 2, 3);
    ellipse(2.5+eyeW, -1+eyeH, 2, 3);
  }
  fill(207+faceR, 138+faceG, 87+faceB);
  ellipse(-2.5-eyeW, -1.2+eyeH, 2, 3);
  ellipse(2.5+eyeW, -1.2+eyeH, 2, 3);
  fill(201+lipsR, 90+lipsG, 64+lipsB);
  ellipse(-2.5-eyeW, -1.7+eyeH, 2, 2);
  ellipse( 2.5+eyeW, -1.7+eyeH, 2, 2);
  fill(240);
  push();
  rotate(eyeRot);
  ellipse(-2.5-eyeW, -1.7+eyeH, 2, eyeS);
  pop();
  push();
  rotate(-eyeRot);
  ellipse( 2.5+eyeW, -1.7+eyeH, 2, eyeS);
  pop();
  fill(54+eyeR, 22+eyeG, 7+eyeB);
  ellipse(-2.5-eyeW, -1.7+eyeH, 1.1, 1.1);
  ellipse( 2.5+eyeW, -1.7+eyeH, 1.1, 1.1);


  //beard
  if (beardCut >= 5){
    fill(198+faceR, 129+faceG, 78+faceB);
    rect(0,6,8.5+faceW+beardW,6,jaw);
  }
  if (beardCut >= 6){
   fill(hairR-10, hairG-10, hairB-10);
   rect(0,4,6+faceW+beardW,2,jaw);
  }
  if (beardCut >= 8){
   fill(hairR-10, hairG-10, hairB-10);
   rect(0,6,8.5+faceW+beardW,6,jaw);
  }
  if (beardCut >= 9){
  fill(hairR-10, hairG-10, hairB-10);
  rect(0,6,8.5+faceW+beardW,8,jaw+5);
  }
  fill(207+faceR, 138+faceG, 87+faceB);
  rect(0,5+mouthH,4.5,mouth_size+0.5,2);


  // nose
  fill(176+noseR, 94+noseG, 56+noseB);
  rect(0,0.4, nose3,4+nose4);
  rect(0, 2.2, 2.95, nose2, 0.2);
  ellipse(0, 2.1, 2+nose1,2.2);

  //mouth 
  fill(201+lipsR, 90+lipsG, 64+lipsB);
  rect(0, 5+mouthH, 4, mouth_size, 1);
  fill(0);
  rect(0, 5+mouthH, 3.4,0.1,0.6);

}
