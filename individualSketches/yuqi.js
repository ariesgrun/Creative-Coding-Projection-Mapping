
let bg


async function setup(){
    createCanvas(600, 700)
    bg = await loadImage('../images/yuqiBackground.png');
}

function draw(){
    image(bg, 0, 0, 600, 700);

    for (let i = 0; i < 20; i++){
        let d = 220 - (i * 10);

        let wave = frameCount *0.1;
        let change = sin(wave - (20 - 1 - i)* 0.1);
        change = max (0, change)
        let weight = 1 + 2 * change;

        fill(0, 0, 0, 20);
        stroke(0, 0, 0, 80);
        strokeWeight(weight);

        circle(270, 250, d)
   }

   for (let j = 0; j < 15; j++){
        let d2 = 150 - (j * 10);

        let wave = frameCount * 0.2;
        let change = sin(wave - (20 - 1 - j)* 0.1);
        change = max (0, change)
        let weight = 1 + 2 * change;


        fill(0, 0, 0, 20);
        stroke(0, 0, 0, 80);
        strokeWeight(weight);

        circle(350, 550, d2)
   }

   let d6 = 70;
   let d7 = 120;
   let r1 = d7 / 2 - d6 / 2;
   let angle1 = frameCount * 0.01;
   let x1 = 375 + r1* cos(angle1); 
   let y1 = 360 + r1* sin(angle1); 


   noFill()
   strokeWeight(1)
   let d3 = 380
   circle(250, 240, d3)

   strokeWeight(1)
   let d4 = 320
   circle(275, 250, d4)

   strokeWeight(2)
   let d5 = 80
   circle(180, 180, d5)

   strokeWeight(2)
   circle(x1, y1, d6)

   strokeWeight(2)
   circle(375, 360, d7)

   strokeWeight(1)
   let d8 = 230
   circle(375, 450, d8)

   strokeWeight(0.7)
   let d9 = 800
   circle(-50, 400, d9)
   


   let linecount = 12;
   let r = 170;
   let centerx = 30;
   let centery = 650;

   for (let p = 0; p < linecount; p++){
    let angle = map(p, 0, linecount-1, -HALF_PI, 0);

    let x = centerx + r * cos(angle);
    let y = centery + r * sin(angle);

    push()
    translate(x, y);
    rotate(angle); 
    line(-15, 0, 15, 0);
    
    pop()
    stroke(0, 80);
    strokeWeight(1.5);
    

   }
   

}