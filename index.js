//Heather C. Starkie
//Platformer.js

//global variables//
var myGamePiece;
var speed = 3;
var friction = 0.8;
var keys = [];
////////////////////

function startGame(){
	gameArea.start();
	myGamePiece = new gamePiece(30,30,'red',10,120);
}

var gameArea = {
	canvas: document.createElement('canvas'),
	start: function(){
		this.canvas.width = 480;
		this.canvas.height = 270;
		this.context = this.canvas.getContext('2d');
		document.body.insertBefore(this.canvas,document.body.childNodes[0]);
		this.interval = setInterval(updateGame,20);
	},
	clear: function() {
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	}

}


function gamePiece(width,height,color,x,y){
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.gravity = 0.05;
	this.gravitySpeed = 0;
	this.speedX = 0;
	this.speedY = 0;
	this.jumping = false;

	this.update = function(){
		ctx = gameArea.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x,this.y,this.width,this.height);
	}
	this.newPos = function(){
		this.gravitySpeed += this.gravity;
		this.x += this.speedX;
		this.y += this.speedY + this.gravitySpeed;
		this.collisionDetection();
	}
	//CD stands for collision detection
	this.collisionDetection = function(){
 		//variables holding positions of boundaries
		var ground = gameArea.canvas.height - this.height;
		/*var rightWall = gameArea.canvas.width - this.width;*/
		//check ground
		if(this.y > ground){
			this.y = ground;
		}
		//check left wall
		if(this.x < 0){
			this.x = 0;
		}

	}
}

function updateGame(){
	gameArea.clear();
	myGamePiece.newPos ();
	myGamePiece.update();

}



function moveCharacter(){
	var ground = gameArea.canvas.height - this.myGamePiece.height;
	/*console.log("X:" + this.myGamePiece.x);
	console.log("Y:" + this.myGamePiece.y);*/
	//'spacebar'
	if(keys[32]){
		if(this.myGamePiece.jumping === false && this.myGamePiece.y === ground){
			this.myGamePiece.jumping = true;
			this.myGamePiece.speedY -= speed*3;
		}
	}
	//'A'
	if(keys[65]){
		if(this.myGamePiece.speedX > -speed){
			this.myGamePiece.speedX -= 1;
		}
	}
	//'D'
	if(keys[68]){
		if(this.myGamePiece.speedX < speed){
			this.myGamePiece.speedX += 1;
		}
	}
}

function stopCharacter(e){
	//console.log(e.keycode);
	this.myGamePiece.speedX = 0
	this.myGamePiece.speedY = 0;
	this.myGamePiece.gravitySpeed = 2;
	this.myGamePiece.jumping = false;
}


