/*
 * This editor shows the possible faces that can be created
 */

 const canvasWidth = 960;
 const canvasHeight = 500;
 let slider1, slider2, slider3, slider4, slider5, slider6, slider7, slider8, slider9, slider10, slider11, slider12, slider13, slider14, slider15, slider16, slider17;
 let faceSelector;
 let faceGuideCheckbox;

 function setup () {
  // create the drawing canvas, save the canvas element
  let main_canvas = createCanvas(canvasWidth, canvasHeight);
  main_canvas.parent('canvasContainer');

  // create sliders
  slider1 = createSlider(0, 100, 50);
  slider2 = createSlider(0, 100, 50);
  slider3 = createSlider(0, 100, 50);
  slider4 = createSlider(0, 100, 50);
  slider5 = createSlider(0, 100, 50);
  slider6 = createSlider(0, 100, 50);
  slider7 = createSlider(0, 100, 50);
  slider8 = createSlider(0, 100, 50);
  slider9 = createSlider(0, 100, 50);
  slider10 = createSlider(0, 100, 50);
  slider11 = createSlider(0, 100, 50);
  slider12 = createSlider(0, 100, 50);
  slider13 = createSlider(0, 100, 50);
  slider14 = createSlider(0, 100, 50);
  slider15 = createSlider(0, 100, 50);
  slider16 = createSlider(0, 100, 50);
  slider17 = createSlider(0, 100, 0);

  slider1.parent('slider1Container');
  slider2.parent('slider2Container');
  slider3.parent('slider3Container');
  slider4.parent('slider4Container');
  slider5.parent('slider5Container');
  slider6.parent('slider6Container');
  slider7.parent('slider7Container');
  slider8.parent('slider8Container');
  slider9.parent('slider9Container');
  slider10.parent('slider10Container');
  slider11.parent('slider11Container');
  slider12.parent('slider12Container');
  slider13.parent('slider13Container');
  slider14.parent('slider14Container');
  slider15.parent('slider15Container');
  slider16.parent('slider16Container');
  slider17.parent('slider17Container');

  faceGuideCheckbox = createCheckbox('', true);
  faceGuideCheckbox.parent('checkbox1Container');

  faceSelector = createSelect();
  faceSelector.option('4');
  faceSelector.value('4');
  faceSelector.parent('selector1Container');
}

const bg_color = [50];

function draw () {
  strokeWeight(0.2);

  let mode = faceSelector.value();

  background(bg_color);

  let s1 = slider1.value();
  let s2 = slider2.value();
  let s3 = slider3.value();
  let s4 = slider4.value();
  let s5 = slider5.value();
  let s6 = slider6.value();
  let s7 = slider7.value();
  let s8 = slider8.value();
  let s9 = slider9.value();
  let s10 = slider10.value();
  let s11 = slider11.value();
  let s12 = slider12.value();
  let s13 = slider13.value();
  let s14 = slider14.value();
  let s15 = slider15.value();
  let s16 = slider16.value();
  let s17 = slider17.value();

  let show_face_guide = faceGuideCheckbox.checked();

  // use same size / y_pos for all faces
  let face_size = canvasWidth / 5;
  let face_scale = face_size / 10;
  let face_y = height / 2;
  let face_x = width / 2;

  push();
  translate(face_x, face_y);
  scale(face_scale);

  push();
  if (mode == '4') {
    drawFace4(s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16, s17);
  }
  pop();

  if(show_face_guide) {
    strokeWeight(0.1);
    rectMode(CORNER); 
    noFill()
    stroke(0, 0, 255);
    // ellipse(0, 0, 20, 20);
    rect(-10, -10, 20, 20);
    line(  0, -11,  0, -10);
    line(  0,  10,  0, 11);
    line(-11,   0,-10,  0);
    line( 11,   0, 10,  0);

  }

  pop();
}



function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
  else if (key == '@') {
    saveBlocksImages(true);
  }
}
