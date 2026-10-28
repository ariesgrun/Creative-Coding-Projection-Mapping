
let aquariumVideo;

let fishX = [];
let fishY = [];
let fishSpeed = [];
let fishSize = [];
let fishDirection = [];
let fishTurn = [];

let numFish = 8;

function setup() {
  createCanvas(1000, 700);

  // Video
  aquariumVideo = createVideo('42696-432087106_medium.mp4');
  aquariumVideo.hide();
  aquariumVideo.volume(0);
  aquariumVideo.loop();
  aquariumVideo.speed(10);

  // Fish
  for (let i = 0; i < numFish; i++) {
    fishX[i] = random(150, width - 150);
    fishY[i] = random(100, height - 100);
    fishSpeed[i] = random(0.5, 2);
    fishSize[i] = random(0.4, 0.6);
    fishDirection[i] = 1;
    fishTurn[i] = 1;
  }
}

function draw() {
  background(0, 0, 6);

  drawScreen();

  for (let i = 0; i < numFish; i++) {

    fishTurn[i] = lerp(
      fishTurn[i],
      fishDirection[i],
      0.08
    );

    fishX[i] += fishSpeed[i] * fishTurn[i];

    if (fishX[i] > width - 150) {
      fishDirection[i] = -1;
    }

    if (fishX[i] < 150) {
      fishDirection[i] = 1;
    }

    let swimY = fishY[i] +
      sin(frameCount * 0.03 + i) * 10;

    push();

    translate(fishX[i], swimY);
    scale(fishTurn[i], 1);

    drawFish(0, 0, fishSize[i]);

    pop();
  }
}


function drawScreen() {
  push();

  drawingContext.filter = 'blur(10px)';
  noStroke();

  // Blue screen background
  fill(3, 0, 209);
  rect(50, 150, 900, 400);

  // White window bar
  fill(245);
  rect(50, 150, 900, 50);

  // Red button
  fill(255, 80, 75);
  circle(80, 175, 16);

  // Yellow button
  fill(255, 190, 45);
  circle(106, 175, 16);

  // Green button
  fill(60, 200, 95);
  circle(132, 175, 16);

  tint(255, 115);
  image(aquariumVideo, 50, 150, 900, 400);
  noTint();

  drawingContext.filter = 'none';

  pop();
}


function drawFish(x, y, s) {
  push();

  translate(x, y);
  scale(s);
  translate(-250, -250);

  // Argami hair
  fill(190, 5, 45);
  noStroke();
  quad(190, 160, 110, 229, 180, 280, 240, 240);

  // Head
  fill(255, 20, 56);
  stroke(117, 1, 252);
  strokeWeight(3);
  ellipse(250, 250, 150, 80);

  // Body
  noStroke();
  fill(210, 19, 230);
  ellipse(196, 260, 130, 120);

  fill(255, 20, 56);
  ellipse(196, 266, 130, 120);

  // Tail
  fill(255, 20, 56);
  triangle(30, 350, 170, 280, 80, 260);

  stroke(196, 20, 120);
  triangle(30, 220, 90, 280, 180, 260);

  // Argami hand
  fill(242, 99, 80);
  stroke(255, 30, 60);
  triangle(190, 280, 260, 280, 150, 320);

  // Eye outside
  fill(227, 146, 80);
  stroke(255, 80, 51);
  strokeWeight(1);
  ellipse(290, 250, 30, 30);

  // Eye
  fill(0);
  stroke(233, 207, 151);
  strokeWeight(1);
  ellipse(290, 250, 20, 20);

  pop();
}

function mousePressed() {
  aquariumVideo.loop();
}
