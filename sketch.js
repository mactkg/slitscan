var capture;
var graphics;
var cnt;
var speed;
var speedSlider;
var togglePlay;
var bPlay = true;
var firstDraw = true;
var firstFrame = 0;

function preload() {
  capture = createCapture(VIDEO);

  // graphic to store webcam image
  graphics = [];
  for(var i=0; i<100; i++) {
    graphics[i] = createGraphics(400, 300);
  }
  console.log(graphics.length);
}

function setup() {
  createCanvas(400, 300);
  frameRate(30);

  // webcam
  capture.size(width, height);
  //capture.hide();

  // settings
  cnt = 0;
  speed = 5;

  // UI
  speedSlider = createSlider(1, 20, speed);
  togglePlay = createButton("stop");
  togglePlay.mousePressed(function() {
    if(bPlay) {
      togglePlay.html("restart");
    } else {
      togglePlay.html("start");
    }
    bPlay = !bPlay;
  });
}

function draw() {
  speed = speedSlider.value();

  // grab an image
  graphics[firstFrame].background(255);
  graphics[firstFrame].image(capture, 0, 0, capture.width, capture.height);

  if(bPlay) {
    if(firstDraw && capture.loadedmetadata) {
      image(graphics[firstFrame], 0, 0);
      firstDraw = false;
    } else {
      loadPixels();

      for(var t=0; t<graphics.length; t++) {
        var tt = (t+firstFrame) % graphics.length;
        graphics[tt].loadPixels();

        // frame group
        var a = height/graphics.length;
        for(var w=0; w<a; w++) {
          var y = (t*a + w) % height;

          // copy the line
          var d = pixelDensity;
          for(var x=0; x<width; x++) {
            for(var i=0; i<d; i++) {
              for(var j=0; j<d; j++) {
                var idx = 4*((y * d + j) * width * d + (x * d + i));
                pixels[idx] = graphics[tt].pixels[idx];
                pixels[idx+1] = graphics[tt].pixels[idx+1];
                pixels[idx+2] = graphics[tt].pixels[idx+2];
                pixels[idx+3] = graphics[tt].pixels[idx+3];
              }
            }
          }
        }
      }

      updatePixels();
      text(speed, 10, 10);
    }
  }

  firstFrame = (firstFrame+1)%graphics.length;
}
