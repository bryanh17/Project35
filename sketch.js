var dog, dogImg, happyDog, happyDogImg;
var database;
var foodS, foodStock;

function preload(){
  dogImg = loadImage("Dog.png");
  happyDogImg = loadImage("happydog.png")
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);

  dog = createSprite(width/2,400,50,50);
  dog.addImage(dogImg);
  dog.scale = 0.25;
  
}


function draw() {  
  background(255/2);

  dog.display();

  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }
  drawSprites();
  textSize(15);
  text("Note: Press up arrow key to feed the dog milk!", width/2, 100);


}
function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if (x<=0){
    x = 0;
  } else {
    x = x-1;
  }
  
  database.ref('/').update({
    Food:x
  })
}