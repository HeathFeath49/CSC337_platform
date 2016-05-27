//Heather C. Starkie
//Platformer.js


//global variables//
var myGamePiece;
var netforce;
var gravity = 0.1;
var speedLimit = 3;
var friction = 0.8;
var delta = 1/30;
var initialJumpForce = 9;
var keys = [];
////////////////////

function startGame(){
	gameArea.start();
	myGamePiece = new gamePiece(30,30,100,80,'red');
	myObstacle = new obstacle(60,50,280,120,'green');
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

///PLAYER CLASS////
function gamePiece(width,height,x,y,color){
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.gravitySpeed = 0;
	this.speedX = 0;
	this.speedY = 0;
	this.canJump = false;
	this.isJumping = false;
	this.jumpVelocity = 0;
	//boundaries
	this.bounds = {
		ground: gameArea.canvas.height - this.height,
		leftWall: 0,
		rightWall: gameArea.canvas.width - this.width
	}
	//input buttons
	this.btnToMoveLeft = 65; //Key: A
	this.btnToMoveRight = 68; //Key: D
	this.btnToJump = 32; //Key: SPACE
	
	/////METHODS////
	
	
	this.update = function(){
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

			
			/*while(!(this.isJumping)){
				this.isJumping = true;
				this.jumpVelocity = initialJumpForce;
				this.speedY -= this.jumpVelocity;
				this.jumpVelocity -= gravity;
				if(this.jumpVelocity <= 0){
					this.isJumping = false;
				}
			}*/
		}
		
		ctx = gameArea.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x,this.y,this.width,this.height);
		
	}
	
	this.newPos = function(){
		this.gravitySpeed += gravity;
		this.x += this.speedX;
		this.y += this.speedY + this.gravitySpeed;
		this.collisionDetection();
	}
	//////////////CLEAN UP REPEATED CODE!////////////////////////
	//CD stands for collision detection
	this.collisionDetection = function(){
		//check ground collision
		if(this.y > this.bounds.ground){
			this.y = this.bounds.ground;
			this.isJumping = false;
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

//OBSTACLE CLASS//
function obstacle(width,height,x,y,color){
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.gravitySpeed = 0;
	this.speedX = 0;
	this.speedY = 0;
	this.bounds = {
		ground: gameArea.canvas.height - this.height
	}

	this.collisionDetection = function(player){
		//check ground collision
		if(this.y > this.bounds.ground){
			this.y = this.bounds.ground;
		}
		var j = player.x + player.width;
		var i = this.x + this.width;
		//check for player collision of obstacle's left wall
		if(j > this.x && player.x < this.x){
			if(player.y+player.height > this.y){
				player.x = this.x - player.width;
			}
			else{
				player.y = this.y-this.height;
				this.canJump = true;
				gravity = 0;
			}
		}
		//right wall
		if(player.x < i && player.x > this.x){
			if(player.y+player.height > this.y){
				player.x = i;
			}
			else{
				player.y = this.y-this.height;
				this.canJump = true;
				gravity = 0;
			}
		}
		

	/*	if((player.x >= this.x && player.x <= this.x+this.width)||(player.x+player.width > this.x && player.x+player.width< this.x+this.width)){
			
			if(player.y+player.height > this.y){

				console.log('hello');
			}
		}*/



		//check for player collision of obstacle's right wall
		/*if(player.x < i && player.x > this.x && player.y+player.height > this.y){
			player.x = this.x + this.width;
		}*/
		
		//check for collision of top of obstacle
		//if(player.y+player.height < this.y && player.y+player.height > this.y-1){
			//if((player.x >= this.x && player.x <= this.x+this.width)||(player.x+player.width > this.x && player.x+player.width< this.x+this.width)){
				/*player.y = this.y-this.height;*/
				//console.log('top collision!');
			//}
		//}


	}
	///////REPEATED CODE FROM PLAYER CLASS! CLEAN UP LATER!///////
	this.update = function(){
		ctx = gameArea.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x,this.y,this.width,this.height);
	}
	this.newPos = function(player){
		this.gravitySpeed += gravity;
		this.x += this.speedX;
		this.y += this.speedY + this.gravitySpeed;
		this.collisionDetection(player);
	}
}


function updateGame(){
	gameArea.clear();
	//player updates
	myGamePiece.newPos();
	myGamePiece.update();
	//obstacle updates
	myObstacle.newPos(myGamePiece);
	myObstacle.update();
}

function stopCharacter(e){
	this.myGamePiece.speedX = 0
	this.myGamePiece.speedY = 0;
	this.myGamePiece.gravitySpeed = 2;
	this.myGamePiece.jumping = false;
}


