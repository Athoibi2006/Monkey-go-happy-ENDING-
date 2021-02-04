var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodgroup, obstaclegroup;
var jungle,jungleImage;
var score;
var edges;

function preload(){
  
  jungleImage = loadImage("jungle.jpg")
  
  monkey_running =  loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
 
}



function setup() {
  createCanvas(600,600);
  
  jungle = createSprite(400,100)
  jungle.addImage(jungleImage);
  jungle.velocityX = -2;
  jungle.scale = 3;
  
  monkey = createSprite(80,515,20,20);
  monkey.addAnimation("moving",monkey_running); 
  monkey.scale = 0.1;
  monkey.velocityX = 2;
  
  ground = createSprite(400,550,15000,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  ground.visible = false;

  console.log(ground.x);
  
  foodgroup = new Group();
  obstaclegroup = new Group();
  
  score = 0;
  
}


function draw() {
  background("white");

  if(jungle.x<0){
    jungle.x = jungle.width/2;
  }
  
  if(foodgroup.isTouching(monkey)){
    foodgroup.destroyEach();
    score = score + 2;
  }
  
  switch(score){
    case 10 : monkey.scale = 0.12;
              break;
    case 20 : monkey.scale = 0.14;          
              break;
    case 30 : monkey.scale = 0.16;
              break;
    case 40 : monkey.scale = 0.18;
              break;
    default : break;
  }
  
  if(ground.x<0){
    ground.x = ground.width/2;
  }
    if(keyDown("space")){
      monkey.velocityY = -12;
    }
  if(keyDown("RIGHT_ARROW")){
    monkey.velocityX = 2;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;

  monkey.collide(ground);
  
  obstacles();
  food();
  
  drawSprites();


  if(obstaclegroup.isTouching(monkey)){
    monkey.destroy();
    obstaclegroup.setLifetimeEach(-1);
    jungle.velocityX = 0;
    textSize(30);
    text("Game Over", obstacle.x, obstacle.y);
  }
  
  
  camera.position.x = monkey.x;
  camera.position.y = displayHeight/2; 

  textSize(20);
  fill("white")
  text("score : " + score, monkey.x + 300, 50);
  
}

function obstacles(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(monkey.x + 400, 515, 10, 40); 
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.lifetime = 200;
    obstaclegroup.add(obstacle);
    
  }
}
function food(){
  if(frameCount % 150 === 0){
    banana = createSprite(monkey.x + 400, 450, 40, 10);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.y = Math.round(random(120,200));
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    foodgroup.add(banana);
  }
}



