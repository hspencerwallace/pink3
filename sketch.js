let angle = 0;
let cameraAngle = 0.0;
let windowWidth = 1920;
let windowHeight = 1080;
let halfHeight = windowHeight/2;
let halfWidth = windowWidth/2;

let ocean;
let shells = [];
let shell;

let sculpture7;
let sculpture8;
let sculpture9;
let sculpture10;
let lineup;
let pinknoise;
let hah;

// the frame rate (frames per second)
var fps = 30;
// the canvas capturer instance
var capturer;
var startMillis; 

function preload() {

  shell = loadModel('Locust/Locust.obj', true);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  sculpture7 = loadImage('7.png');
  sculpture8 = loadImage('8.png');
  sculpture9 = loadImage('9.png');
  sculpture10 = loadImage('10.png');
  lineup = loadImage('lineup_pink3_pink_noise.png');
  pinknoise = loadImage('pink_noise_vi.png')
  hah = loadImage('hah.png')
  ocean = loadImage('Iraq.jpg');
  frameRate(fps);
  capturer = new CCapture({ format: 'png', framerate: fps, autoSaveTime: 30 });

  // Create objects
  for (let i = 0; i < 40; i++) {
    shells.push(new Shells());
  }
 
}

function draw() {
//
// start the recording on the first frame
// this avoids the code freeze which occurs if capturer.start is called
// in the setup, since v0.9 of p5.js
   if (frameCount === 1) {

    capturer.start();
  }

  if (startMillis == null) {
    startMillis = millis();
  }

  // duration in milliseconds
  var duration = 360000;

  // compute how far we are through the animation as a value 
  // between 0 and 1.
  var elapsed = millis() - startMillis;
  var t = map(elapsed, 0, duration, 0, 1);

  // if we have passed t=1 then end the animation.
  if (t > 1) {
    noLoop();
    console.log('finished recording.');
    capturer.stop();
    capturer.save();
    return;
  }
  //

  noStroke();
  background(150);


  // camera rotation 

  camera(0, 20 + sin(frameCount * (0.05)) * 10, 200 + sin(frameCount * 0.0015) * 3000, 0, 0, 0, 0, 1, 0);

//-z pink sky, second one you see
  push();
  imageMode(CENTER);
  translate(0, 0, -halfHeight*3.01);
  image(ocean, 0, 0, windowWidth*4.5, windowHeight*4.5);
  translate(0, 0, -300);

      push();
      rotateY(PI);
      translate(50, 0, 0);
      image(lineup, 0, 0);
      lineup.resize(0, halfHeight-100);
      pop();

      push();
      rotateY(PI);
      translate(0, 0, 0);
      image(hah, 25, 500);
      hah.resize(0, halfHeight-175);
      pop();

      push();
      translate(halfWidth/2, 0, 0);
      image(sculpture7, 0, 0);
      sculpture7.resize(0, halfHeight * 1.5);
      pop();

      push();
      translate(-halfWidth/2 - 40, -100, 1);
      image(sculpture8, 100, 100);
      sculpture8.resize(0, halfHeight * 1.5);
      pop();

    pop();

// +z pink sky, first one you see, 
  push();
  imageMode(CENTER);
  translate(0, 0, halfHeight*4.01);
  image(ocean, 0, 0, windowWidth*5.5, windowHeight*5.5);
  translate(0, 0, 300);

      push();
      translate(50, 0, 0);
      image(lineup, 0, 0);
      lineup.resize(0, halfHeight-100);
      pop();

      push();
      translate(0, 0, 0);
      image(hah, 25, 500);
      hah.resize(0, halfHeight-175);
      pop();

      push();
      translate(-halfWidth/2, 0, 0);
      image(sculpture9, 0, 0);
      sculpture9.resize(0, halfHeight * 1.5);
      pop();

      push();
      translate(halfWidth/2, 0, 0);
      image(sculpture10, -50, 0);
      sculpture10.resize(0, halfHeight * 1.5);
      pop();

    pop();

  //rectangles
  rectMode(CENTER);
  fill(0,0,0);

  rotateX(angle);

  // "white" rectangle
  //color formula: 
  //first side rectangle that is contrasting to the background
  //second side is contrasting color to the first side AND the background
  //centerpiece object also has two sides
  //first centerpiece side is lighter, second side is darker
  //one color, maybe a highlight, that is consistant with both sides
  //similar color needs to contrast with both rectangle colors
  //each side of each centerpiece object has a second color, and those colors
  //have to contrast with rectangle color 

    push();

    //first side "purple"
    directionalLight(176, 145, 230, -0.5, -0.5, -1);
    //second side "tomato"
    directionalLight(247, 113, 72, 0.5, 0.5, 5);

    pointLight(176, 145, 230, -0.5, -0.5, -1);
    pointLight(247, 113, 72, 0.5, 0.5, 5);
  
    translate(0, 0, -100);
    specularMaterial(255);
    shininess(20);
    plane(windowWidth-10, windowHeight-80);

    pop();
 
  //black window
  push();
  rect(0, -halfHeight+50, windowWidth, 100);
  rect(0, halfHeight-150, windowWidth, 300);
  rect(halfWidth-50, 0, 100, windowHeight);
  rect(-halfWidth +50, 0, 100, windowHeight);
    translate(100, 0, 100);
    image(pinknoise, -1000, 325);
    pinknoise.resize(0, halfHeight-300);
    pop();
  pop();

  angle += 0.00075;

  //lights on centerpiece
    //green on purple
    directionalLight(250, 234, 85, -1, 0, -1);
   
   //fuschia
    directionalLight(237, 52, 151, 1, 0, 0);

    //blue on tomato
    directionalLight(77, 52, 237, 0, 0, 1);


  //
  push();
   translate(0, 0, -100);
  for (let i = 0; i < shells.length; i++) {
    shells[i].move();
    shells[i].display();
  }
  pop();
  
// handle saving the frame
  console.log('capturing frame');
  capturer.capture(canvas);

}

// Hand class
class Shells {
  constructor() {

    this.x = random(windowWidth);
    this.y = random(windowHeight);
    this.z - random(windowWidth);
    this.random = random(1, 5);
  }

  move() {
    rotateX(frameCount * 0.0035);
    rotateY(frameCount * 0.0035);

  }

  display() {
  scale(1.042); 
  fill(255);
  model(shell);
  }
}
// pink3_tar_30fps_39sec_sin0015_angle_00075_rotate_0035 # 

// ffmpeg -r 30 -f image2 -s 1920x1080 -i "%07d.png" -vcodec libx264 -crf 17 -pix_fmt yuv420p output.mp4
