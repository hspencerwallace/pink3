let angle = 0;
let cameraAngle = 0.0;
let windowWidth = 1920;
let windowHeight = 1080;
let halfHeight = windowHeight/2;
let halfWidth = windowWidth/2;
// let leaves;
let ocean;
let shells = [];
let shell;

// the frame rate (frames per second)
var fps = 30;
// the canvas capturer instance
var capturer;
var startMillis; 

function preload() {
  // female_leg = loadModel('femaleleg/femaleleg.obj');
  shell = loadModel('Locust/Locust.obj', true);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  leaves = loadImage('GreenLeaves2.jpg');
  ocean = loadImage('mars.jpg');
  frameRate(fps);
  // capturer = new CCapture({ format: 'png', framerate: fps });

  // Create objects
  for (let i = 0; i < 40; i++) {
    shells.push(new Shells());
  }
 
}

function draw() {

  //

  //  if (frameCount === 1) {
  //   // start the recording on the first frame
  //   // this avoids the code freeze which occurs if capturer.start is called
  //   // in the setup, since v0.9 of p5.js
  //   capturer.start();
  // }

  // if (startMillis == null) {
  //   startMillis = millis();
  // }

  // duration in milliseconds
  var duration = 10000;

  // compute how far we are through the animation as a value 
  // between 0 and 1.
  var elapsed = millis() - startMillis;
  var t = map(elapsed, 0, duration, 0, 1);

  // if we have passed t=1 then end the animation.
  // if (t > 1) {
  //   noLoop();
  //   console.log('finished recording.');
  //   capturer.stop();
  //   capturer.save();
  //   return;
  // }
  //

  noStroke();
  background(150);


  // camera rotation 

  camera(0, 20 + sin(frameCount * (0.05)) * 10, 200 + sin(frameCount * 0.01) * 3000, 0, 0, 0, 0, 1, 0);

  // -z pink sky
  push();
  imageMode(CENTER);
  translate(0, 0, -halfHeight*3.01);
  image(ocean, 0, 0, windowWidth*4.5, windowHeight*4.5);
  pop();

  // +z pink sky
  push();
  imageMode(CENTER);
  translate(0, 0, halfHeight*4.01);
  image(ocean, 0, 0, windowWidth*5.5, windowHeight*5.5);
  pop();

  //rectangles
  rectMode(CENTER);
  fill(0,0,0);

  rotateX(angle);

  // "white" rectangle
    push();

    //first side pink
    directionalLight(255, 156, 192, -0.5, -0.5, -1);
    //second side teal
    directionalLight(231, 255, 150, 0.5, 0.5, 5);

    pointLight(255, 156, 192, -0.5, -0.5, -1);
    pointLight(231, 255, 150, 0.5, 0.5, 5);
  
    translate(0, -100, -100);
    specularMaterial(255);
    shininess(20);
    plane(windowWidth-10, windowHeight-80);

    // rect(0, -100, windowWidth-10, windowHeight-80);
      //leaves
      // push();
      // translate(0, 0, -1);
      // imageMode(CENTER);
      // // image(leaves, 0, -100, windowWidth-10, windowHeight-80);
      // pop();

    pop();
 
  //black window
  push();
  rect(0, -halfHeight+50, windowWidth, 100);
  rect(0, halfHeight-150, windowWidth, 300);
  rect(halfWidth-50, 0, 100, windowHeight);
  rect(-halfWidth +50, 0, 100, windowHeight);
  pop();

  angle += 0.0025;

  //lights on centerpiece
    //yellow/green
    directionalLight(229, 255, 41, -1, 0, -1);
   
   //purple
    directionalLight(183, 0, 255, 1, 0, 0);
    //red
    
    directionalLight(252, 48, 48, 0, 0, 1);


  //
  push();
   translate(0, 0, -100);
  for (let i = 0; i < shells.length; i++) {
    shells[i].move();
    shells[i].display();
  pop();
  }
// handle saving the frame
  // console.log('capturing frame');
  // capturer.capture(canvas);

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
    rotateX(frameCount * 0.0055);
    rotateY(frameCount * 0.0055);

  }

  display() {
  scale(1.042); 
  fill(250, 175, 230);
  model(shell);
  }
}

// ffmpeg -r 30 -f image2 -s 1920x1080 -i "%07d.png" -vcodec libx264 -crf 17 -pix_fmt yuv420p output.mp4
