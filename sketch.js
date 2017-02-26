var pics = [];
var selector = 0;
var testo = ['Well I know, that less is more but try to click me', 'that is something..', 'THIS IS MORE COLORFUL!', 'THIS IS MARVELOUS'];

function preload() {
	pics[0] = loadImage("assets/quadrante_null.png");
	pics[1] = loadImage("assets/quadrante1.png");
	pics[2] = loadImage("assets/quadrante2.png");
	pics[3] = loadImage("assets/quadrante3.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  	background(50);
//	image(pics[1], 0, 0, windowWidth, windowHeight)
	backgroundImage(pics[selector]);
	
	
// centramento orologio	
  translate(width/2, height/2);
  
  // seconds
  clockHand(second(), 60, 2, 120, [100]);
  
  // minutes
  clockHand(minute(), 60, 4, 90, [180]);
  
  // hours
  if (hour() > 12) {
    var hour12 = hour() - 12;
  } else {
    var hour12 = hour();
  }
  clockHand(hour12, 12, 6, 60, [220])

// aggiunta testo
  
  textFont('Helvetica');
    fill(220);
    textSize(22);
    textAlign(CENTER);
    text(testo[selector], 0-140, 260, 300);
}

function clockHand(timeValue, range, size, radius, color) {
  push();
  var angle = map(timeValue, 0, range, -90, 270);
  noFill();
  noStroke();
  strokeWeight(size);
  stroke(color);
  line(0,0,radius*cos(angle),radius*sin(angle));
  pop();
}

function mousePressed () {
  selector++;
  if(selector > 3){
   selector = 0; 
  }
	redraw();
}
	
function backgroundImage(img) {
    
    var x = 0;
    var y = 0;
    var w = width;
    var h = height;
    // default offset is center
    var offsetX = 0.5;
    var offsetY = 0.5;

    var iw = img.width,
        ih = img.height,
        r = Math.min(w / iw, h / ih),
        nw = iw * r,   // new prop. width
        nh = ih * r,   // new prop. height
        cx, cy, cw, ch, ar = 1;

    // decide which gap to fill    
    if (nw < w) ar = w / nw;                             
    if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
    nw *= ar;
    nh *= ar;

    // calc source rectangle
    cw = iw / (nw / w);
    ch = ih / (nh / h);

    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;

    // make sure source rectangle is valid
    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > iw) cw = iw;
    if (ch > ih) ch = ih;

    // fill image in dest. rectangle
    image(img, cx, cy, cw, ch,  x, y, w, h);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}