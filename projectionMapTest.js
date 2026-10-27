
///////REFERENCE///////////////////////
let pMapper;
let quadMap;
let squaresBuf; 
//////////////////////////

//Falling sand
let quadMap2;
let sandFallBuf;

let columns;
let rows;
let grid = [];
let totalSqauares = 0;



//////////////////////////////////////////////////////////////////////



async function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pMapper = createProjectionMapper(this);

  quadMap = pMapper.createQuadMap(400, 400, 20, 20);
  squaresBuf = createGraphics(400, 400);
  squaresBuf.background(200, 200, 0);


/////////////////Sandfall///////////////////////////////////
  quadMap2 = pMapper.createQuadMap(1000, 1000, 20, 20);
  sandFallBuf = createGraphics(1000, 1000);
  sandFallBuf.background(0);


  columns = ceil(width / 10);
    rows = ceil(height / 10);
  for(let i = 0; i < columns ; i++) {
        grid[i] = [];
        for (let j = 0; j < rows; j++) {
            grid [i][j] = {//each is object with values
                Sandbelow: false,
                color : 255,
                fallState: false
            };
        }
    }



/////////////////////////////////




  // pMapper.load("maps/map.json");
}

function draw() {
  background(0);

//////////Sandfall////////////////////////////
  sandFall(sandFallBuf);
  quadMap2.displayTexture(sandFallBuf);
  //////////////////////////////////
}





function sandFall(pg) {




}







function keyPressed() {
  if (key === "c") pMapper.toggleCalibration();
  if (key === "s") pMapper.save("map.json");
  if (key === "l") pMapper.load("maps/map.json");
  if (key === "f") fullscreen(!fullscreen());
 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}