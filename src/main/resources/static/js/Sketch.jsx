var circulos = [];
var canvas;
var r = Math.floor(Math.random()*240)+10;          // Random between 0-255
var g = Math.floor(Math.random()*240)+10;          // Random between 0-255
var b = Math.floor(Math.random()*240)+10;
class Circle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r= r;
    this.g= g;
    this.b=b;
  } 
}

function vaciar(){
    noLoop();
    circulos=[];
    clear();
    consolecircles();
    loop();
}

function circles(){
    var ans="";      
    for (var i=0; i<circulos.length-1; i++){        
        ans+=JSON.stringify(circulos[i])+",";
    }  
    if(circulos.length>0){
        ans+=JSON.stringify(circulos[circulos.length-1]);
    }    
    ans="{circulos :["+ans+"]}";     
    return ans;
}


function consolecircles(){
    console.log(circulos);
    
}
function setup() { 
  canvas=createCanvas(640, 480);   
  canvas.parent('recuadro');
} 


function addCirculos(json){
    json.forEach( function (c) {
       var nuevoCirculoJson =JSON.parse(c);
       addCircle(new Circle(nuevoCirculoJson.x,nuevoCirculoJson.y,nuevoCirculoJson.r,nuevoCirculoJson.g,nuevoCirculoJson.b));
        
    });    
}

function addCircle(circle){
    var contain = false;

     for (var i=0; i< circulos.length; i++){
         if(circulos[i].x === circle.x && circulos[i].y === circle.y){
             contain = true;
         }
     }  
    if(!contain){
        circulos.push(circle);
    }
    
}

function draw() {     
    for(var i=0;i<circulos.length ;i++){
        fill(circulos[i].r,circulos[i].g,circulos[i].g);         
        ellipse(circulos[i].x, circulos[i].y, 20, 20);
        noStroke();
    }
     
    if (mouseIsPressed === true) {       
        addCircle(new Circle(mouseX, mouseY,r,g,b));
    }   
    if (mouseIsPressed === false) {   
        fill(255,255,255);
    }    
}
//export {circulos};

