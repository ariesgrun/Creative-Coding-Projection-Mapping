
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

/////////////////Reference//////////////////
  // quadMap = pMapper.createQuadMap(400, 400, 20, 20);
  // squaresBuf = createGraphics(400, 400);
  // squaresBuf.background(200, 200, 0);


/////////////////Sandfall///////////////////////////////////
  quadMap2 = pMapper.createQuadMap(1000, 1000, 20, 20); //(map width, map height, columns/ rows)
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


//////////////////////////////////////////////////////////////////////
function sandFall(pg) {
  pg.background(0);
    totalSqauares = 0;
    //spawn logic
  if (random(0,100)<100) {//spawn at the top
        let i = floor(random(columns));
        if ( grid[i][0].fallState == false) {
            grid[i][0].fallState = true; //first row will spawn sand
            grid[i][0].color = random(100, 255) //arbitrary/placeholder
        }

    }

    for (let i = 0; i < columns; i++) { //
        for (let j = rows - 1; j >= 0; j--) { // check bottom to top for sand below staate
            let gridPosition = grid[i][j];
            if (j == rows - 1) {
                gridPosition.Sandbelow = true;
            } else {
                gridPosition.Sandbelow = grid[i][j + 1].fallState;
            }
        ///check if sand can fall then make it fall
        if (gridPosition.fallState == true && gridPosition.Sandbelow == false) {
        grid[i][j + 1].fallState = true;
        grid[i][j + 1].color = gridPosition.color;
        gridPosition.fallState = false;
            }
        }
    }
    //draw the sand
    for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j].fallState == true) {
        pg.fill(grid[i][j].color);
        pg.rect(10*i, 10*j, 10, 10);
        totalSqauares++;
      }
    }
  }

  ///reset when full
  if (totalSqauares == columns * rows) {
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j].fallState = false;
        grid[i][j].Sandbelow = false;
        grid[i][j].color = 255;
      }
    }
  }
}
/////////////////////////////////////////////////////////////////////






function keyPressed() {
  if (key === "c") pMapper.toggleCalibration();
  if (key === "s") pMapper.save("map.json");
  if (key === "l") pMapper.load("maps/map.json");
  if (key === "f") fullscreen(!fullscreen());
 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}