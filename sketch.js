//Create variables here
var dog,dogImg,happydog,database,foodS,foodStock;

function preload()
{
  //load images here
  dogImg   = loadImage("images/dogImg.png")
  happydog = loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale=0.1
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
  
}


function draw() {  
  background(46,139,87)

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happydog)
  }
  
  drawSprites();
  fill("Yellow")
  text("Note:Press UP_ARROW to feed drago milk", 130,20)

  textSize(18)
  fill("CYAN")
  text("food remaining=" +foodS, 170,125)
  
  //add styles here

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref("/").update({
    Food:x
  })
}
