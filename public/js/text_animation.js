const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
vw=canvas.width;
vh=canvas.height;
let particleArray=[];
let particleArray2=[];
let particleArray3=[];
let textScale = window.innerWidth/300 +2;
let textScale2=window.innerWidth/600  +1;
let whr=vw/vh;
if  (textScale2 > 7) {textScale2 =7};
if  (textScale > 8) {textScale =8};
 let adjustX=0;
let adjustY=-0;
let adjustX2=0;
let adjustY2=0;
adjustX = (window.innerWidth/(2*textScale))-52;
adjustY = (window.innerHeight/(2*textScale))-50;
adjustX2= (window.innerWidth/(2*textScale2))-79;
if(vh>600){
    adjustY2 = (window.innerHeight/(2*textScale))+67 + 26/whr;
}
else{
    adjustY2 = (window.innerHeight/(2*textScale))+57+22.1/whr;
}

console.log(vh);
console.log(vw);
if(whr<1.5){
    adjustY2 = (window.innerHeight/(2*textScale))+63+22.1/whr;
}
if(vh>vw){
    adjustY2 = (window.innerHeight/(2*textScale))+100+22.1/whr;
}
//handle mouse
const mouse={
    x:null,
    y:null,
    radius:100
}
canvas.addEventListener('mousemove',function(event){
    mouse.x=event.x;
    mouse.y=event.y;
   // console.log(mouse.x,mouse.y);
    
});
ctx.fillStyle='white';
ctx.font='30px Georgia';
ctx.fillText('TRAC',10,60);
ctx.fillStyle='white';
ctx.font='20px 	georgia';
ctx.fillText('BITS Pilani',22,80);
ctx.strokeStyle='white';
ctx.strokeRect(0,0,100,100);
const textCoordinates=ctx.getImageData(0,0,250,60);
const textCoordinates2=ctx.getImageData(0,62,300,70);
class Particle {
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.size = 2;
        this.BaseX=this.x;
        this.BaseY=this.y;
        this.density=(Math.random()*400)+1;
    }
        draw()
        {
            ctx.fillStyle='white';
            //ctx.fillStyle='rgb(32, 5, 41)';
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.size,0,Math.PI*2)
            ctx.closePath();
            ctx.fill();
            
            
        }
        draw3(){
            this.size=1.5;
        ctx.fillStyle='rgb(22,124,155)';
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.size,0,Math.PI*2)
            ctx.closePath();
            ctx.fill();

        }
           draw2()
        {
            ctx2.fillStyle='white';
            ctx2.beginPath();
            ctx2.arc(this.x,this.y,this.size,0,Math.PI*2)
            ctx2.closePath();
            ctx2.fill();
            
            
        }
       
        update()
        {
            let dx =mouse.x-this.x;
            let dy =mouse.y-this.y;
            let distance=Math.sqrt(dx*dx+dy*dy);
            let forceDirectionX=dx/distance;
            let forceDirectionY=dy/distance;
            let maxDistance=mouse.radius;
            let force=(maxDistance-distance)/maxDistance;
            let directionX=force*this.density*forceDirectionX;
            let directionY=force*this.density*forceDirectionY;
            if (distance<mouse.radius){
                  this.x -= directionX;
                  this.y -=directionY;
            }else{
              if(this.x !== this.BaseX){
                  let dx =this.x-this.BaseX;
                  this.x-=dx/10;
                              }
             if(this.y !== this.BaseY){
                  let dy=this.y-this.BaseY;
                  this.y -=dy/10;
                              }
                
            }
            
        }update2(){
           
            //this.size=3*Math.random();
           //this.y=this.y-1/3;
          // this.size=Math.random()*3;
          
            
        } 

}
class Stars{constructor(x,y){
        this.x=x;
        this.y=y;
       
        this.BaseX=this.x;
        this.BaseY=this.y;
        this.density=(Math.random()*1.60);
        this.size=this.density;
    }
     draw2()
        {
            ctx2.fillStyle='white';
            ctx2.beginPath();
            ctx2.arc(this.x,this.y,this.size,0,Math.PI*2)
            ctx2.closePath();
            ctx2.fill();
            
            
        }
        update2(){
            //this.size=3*Math.random();
           //this.y=this.y-1/3;
          // this.size=Math.random()*3;
          this.y-=0.12;
          this.size=this.density*(1-(this.y/1000));
          this.size=Math.random()*0.54+this.size;
          if (this.y<0){
              this.y=canvas.height;
          }
          
         
            
        } 

}
function Init(){
    particleArray=[];
    particelArray3=[];
    for(let y=0,y2=textCoordinates.height;y<y2;y++){
        for(let x=0,x2=textCoordinates.width;x<x2;x++){
            if(textCoordinates.data[(y*4*textCoordinates.width)+(x*4)+3]>128){
                let positionX=x+adjustX;
                let positionY=y+adjustY;
                particleArray.push(new Particle(positionX*textScale,positionY*textScale))
        
            }
        }

    }
     for(let m=0,m2=textCoordinates2.height;m<m2;m++){
        for(let n=0,n2=textCoordinates2.width;n<n2;n++){
            if(textCoordinates2.data[(m*4*textCoordinates2.width)+(n*4)+3]>128){
                let positionX2=n+adjustX2;
                let positionY2=m+adjustY2;
                particleArray3.push(new Particle(positionX2*textScale2,positionY2*textScale2));
            }
        }
    }
}
Init();
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<particleArray.length;i++){
        particleArray[i].draw();
        particleArray[i].update();
    }
    for(let i=0;i<particleArray3.length;i++){
       particleArray3[i].draw3();
        particleArray3[i].update();
    }
    requestAnimationFrame(animate);
}
animate();
function connect(){
    let opacityValue=1;
    for(let a=0;a<particleArray.length;a++){
         for(let b=a;b<particleArray.length;b++){
             let dx=particleArray[a].x-particleArray[b].x;
             let dy=particleArray[a].y-particleArray[b].y;
             let distance=Math.sqrt(dx*dx+dy*dy);
             if(distance<15){
                 opacityValue=1-distance/15;
                 ctx.strokeStyle=" rgb(255,255,255," + opacityValue +")";
                 ctx.lineWidth=2;
                 ctx.beginPath();
                 ctx.moveTo(particleArray[a].x,particleArray[a].y);
                 ctx.lineTo(particleArray[b].x,particleArray[b].y);
                 ctx.stroke();
         }
    }
}
}
const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');
canvas2.width=window.innerWidth;
canvas2.height=window.innerHeight;
function init(){
    particleArray2=[];
    for(let i=0;i<600;i++){
            let x=Math.random()*canvas2.width;
        let y=Math.random()*canvas2.height;
             particleArray2.push(new Stars(x,y));
        }
    }
init();
function animate2(){
    ctx2.clearRect(0,0,canvas2.width,canvas2.height);
     for(let i=0;i<particleArray2.length;i++){
        particleArray2[i].draw2();
         particleArray2[i].update2();
        }
    requestAnimationFrame(animate2);
}
animate2();




