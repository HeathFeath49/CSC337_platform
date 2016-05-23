//Heather C. Starkie
//Platformer.js


//global variables//
var myGamePiece;
var speedLimit = 3;
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

	this.bounds = {
		ground: gameArea.canvas.height - this.height,
		leftWall: 0,
		rightWall: gameArea.canvas.width
	}

	this.btnToMoveLeft = 65; //Key: A
	this.btnToMoveRight = 68; //Key: D
	this.btnToJump = 32; //Key: SPACE
	
	/////METHODS////
	this.checkInput = function(){
		//button to move left
		if(keys[this.btnToMoveLeft]){
			if(this.speedX > -speedLimit){
				this.speedX -= 0.1;
			}
		}
		//button to move right
		if(keys[this.btnToMoveRight]){
			if(this.speedX < speedLimit){
				this.speedX += 0.1;
			}
		}
		//button to jump
		if(keys[this.btnToJump]){
			this.jumping = true;
		}
	}
	
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
		//check ground collision
		if(this.y > this.bounds.ground){
			this.y = this.bounds.ground;
		}
		//check left wall collision 
		if(this.x < this.bounds.leftWall){
			this.x = this.bounds.leftWall;
		}
		//check right wall collision
		if(this.x > this.bounds.rightWall){
			this.x = this.bounds.rightWall;
		} 
	}
}


function updateGame(){
	gameArea.clear();
	myGamePiece.newPos ();
	myGamePiece.update();
	myGamePiece.checkInput();

}

function stopCharacter(e){
	//console.log(e.keycode);
	this.myGamePiece.speedX = 0
	this.myGamePiece.speedY = 0;
	this.myGamePiece.gravitySpeed = 2;
	this.myGamePiece.jumping = false;
}


