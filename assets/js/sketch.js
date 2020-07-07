let elipses=[];
function setup() {
  createCanvas(400, 400);
  textSize(15);
  strokeWeight(3);
  for(i=0;i<1;i++){
   elipses[i]=new elipse(width/2,height/2);
  }
}

function draw() {
  background(0);
  noFill();
  stroke(255);
  //ellipse(width/2,height/2,50,50);
  for(i in elipses){
    elipses[i].dibujar();
    elipses[i].mover();
  }
  //frameRate(1);
}

function mousePressed(){
  var aux=new elipse(mouseX,mouseY);
  elipses.push(aux);
}

function elipse(x,y){
  this.x=x;
  this.y=y;
  this.sizeOne=random(20,80);
  this.sizeTwo=random(20,80);
  this.dibujar=function(){
    ellipse(this.x,this.y,this.sizeOne,this.sizeOne); 
  }
  this.mover=function(){
   this.x+=random(-5,5);
    this.y+=random(-5,5);
  }
}