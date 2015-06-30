var capture;
var graphic;
var cnt;
var speed;
var firstDraw = true;

function preload() {
  capture = createCapture(VIDEO);
}

function setup() {
  createCanvas(800, 600);

  // webcam
  capture.size(width, height);
  capture.hide();

  // graphic to store webcam image
  graphic = createGraphics(width, height);

  // settings
  cnt = 0;
  speed = 5;
}

function draw() {
  // grab an image
  graphic.background(255);
  graphic.image(capture, 0, 0, capture.width, capture.height);

  if(firstDraw && capture.loadedmetadata) {
    image(graphic, 0, 0);
    firstDraw = false;
  } else {
    graphic.loadPixels();
    loadPixels();

    var d = pixelDensity;
    for(var dy=0; dy<speed; dy++) {
      for(var x=0; x<width; x++) {
        for(var i=0; i<d; i++) {
          for(var j=0; j<d; j++) {
            var idx = 4*((cnt * d + j) * width * d + (x * d + i));
            pixels[idx] = graphic.pixels[idx];
            pixels[idx+1] = graphic.pixels[idx+1];
            pixels[idx+2] = graphic.pixels[idx+2];
            pixels[idx+3] = graphic.pixels[idx+3];
          }
        }
      }
      cnt = (cnt+1)%height;
    }

    updatePixels();
  }
}
