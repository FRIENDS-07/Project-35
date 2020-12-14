var dog,dogImage,dogHappyImage;
var dataBase,position;

function preload(){

  dogImage = loadImage("images/dogImg.png");
  dogHappyImage = loadImage("images/dogImg1.png");

}

function setup(){

  createCanvas(500,500);

  dataBase = firebase.database();
  
  dog = createSprite(250,250,20,20);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  var dogRef = dataBase.ref('Food');
  dogRef.on("value",readStock);
  
}

function draw(){  

  background("white");
  drawSprites();

  if(keyWentDown(UP_ARROW)){
    writeStock(position);
    dog.addImage(dogHappyImage);
  }

  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImage);
  }

  textSize(30);
  fill("red");
  text("Food remaining: " + position,100,100);

}

function writeStock(x){

  if(x <= 0){
    x = 0;
  }else{
    x = x - 1;
  } 

  dataBase.ref('/').update({
    'Food':x
  })

}

function readStock(data){
  position = data.val();
}

