
///////REFERENCE///////////////////////
let pMapper;
let quadMap;
let squaresBuf; 
//////////////////////////

//Lawrence's
let quadMap2;
let sandFallBuf;

let columns;
let rows;
let grid = [];
let totalSqauares = 0;

//////////////////////////////////////////////////////////////////////
//Yuqi's

let bg;
let quadMap3;
let YuqiBuf;



//////////////////////////////////////////////////////////////////////
async function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pMapper = createProjectionMapper(this);


  ///////////Yuqi/////////////////////
bg = await loadImage('../images/yuqiBackground.png');
/////////////////////////////////////////////


/////////////////Reference//////////////////
  // quadMap = pMapper.createQuadMap(400, 400, 20, 20);
  // squaresBuf = createGraphics(400, 400);
  // squaresBuf.background(200, 200, 0);


/////////////////Lawrence Sandfall///////////////////////////////////
  quadMap2 = pMapper.createQuadMap(500, 500, 20, 20); //(map width, map height, columns/ rows)
  sandFallBuf = createGraphics(500, 500);
  sandFallBuf.background(0);


  columns = ceil(500 / 10);
    rows = ceil(500 / 10);
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
///////////Yuqi//////////////////////

quadMap3 = pMapper.createQuadMap(600,700,20,20);
YuqiBuf = createGraphics(600,700);



  // pMapper.load("maps/map.json");
}

function draw() {
  background(0);

//////////Lawrence Sandfall////////////////////////////
  sandFall(sandFallBuf);
  quadMap2.displayTexture(sandFallBuf);



  /////////Yuqi/////////////////////////
  yuqi(YuqiBuf);
  quadMap3.displayTexture(YuqiBuf);



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




/////////////////yuqi////////////////////////////////////////////////////
function yuqi(pg){
pg.image(bg, 0, 0, 600, 700);

    for (let i = 0; i < 20; i++){
        let d = 220 - (i * 10);

        let wave = frameCount *0.1;
        let change = sin(wave - (20 - 1 - i)* 0.1);
        change = max (0, change)
        let weight = 1 + 2 * change;

        pg.fill(0, 0, 0, 20);
        pg.stroke(0, 0, 0, 80);
        pg.strokeWeight(weight);

        pg.circle(270, 250, d)
   }

   for (let j = 0; j < 15; j++){
        let d2 = 150 - (j * 10);

        let wave = frameCount * 0.2;
        let change = sin(wave - (20 - 1 - j)* 0.1);
        change = max (0, change)
        let weight = 1 + 2 * change;


        pg.fill(0, 0, 0, 20);
        pg.stroke(0, 0, 0, 80);
        pg.strokeWeight(weight);

        pg.circle(350, 550, d2)
   }

   let d6 = 70;
   let d7 = 120;
   let r1 = d7 / 2 - d6 / 2;
   let angle1 = frameCount * 0.01;
   let x1 = 375 + r1* cos(angle1); 
   let y1 = 360 + r1* sin(angle1); 


   pg.noFill()
   pg.strokeWeight(1)
   let d3 = 380
   pg.circle(250, 240, d3)

   pg.strokeWeight(1)
   let d4 = 320
   pg.circle(275, 250, d4)

   pg.strokeWeight(2)
   let d5 = 80
   pg.circle(180, 180, d5)

   pg.strokeWeight(2)
   pg.circle(x1, y1, d6)

   pg.strokeWeight(2)
   pg.circle(375, 360, d7)

   pg.strokeWeight(1)
   let d8 = 230
   pg.circle(375, 450, d8)

   pg.strokeWeight(0.7)
   let d9 = 800
   pg.circle(-50, 400, d9)
   


   let linecount = 12;
   let r = 170;
   let centerx = 30;
   let centery = 650;

   for (let p = 0; p < linecount; p++){
    let angle = map(p, 0, linecount-1, -HALF_PI, 0);

    let x = centerx + r * cos(angle);
    let y = centery + r * sin(angle);

    pg.push()
    pg.translate(x, y);
    pg.rotate(angle); 
    pg.line(-15, 0, 15, 0);
    
    pg.pop()
    pg.stroke(0, 80);
    pg.strokeWeight(1.5);
    

   }

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