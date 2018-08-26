var babyObj=function(){
	this.x;
	this.y;
	this.angle;

	this.babyTailTimer=0;		//设定尾巴摆动计时器
	this.babyTailCount=0;		//保存当前显示的尾巴图片序号

	this.babyEyeTimer=0;		//保存眨眼睛的计时器
	this.babyEyeCount=0;		//保存当前显示的眼睛图片序号
	this.babyEyeInterval=1000;	//设置眨眼睛的时间间隔

	this.babyBodyTimer=0;	//保存身体变白的计时器
	this.babyBodyCount=0;
}

babyObj.prototype.init=function(){
	this.x=canvas_width*0.5-50;
	this.y=canvas_height*0.5+50;
	this.angle=0;
}
babyObj.prototype.draw=function(){

	//使小鱼跟随大鱼
	this.x=lerpDistance(mom.x,this.x,0.98);
	this.y=lerpDistance(mom.y,this.y,0.98);
	//计算大鱼和小鱼的角度差
	var deltay=mom.y-this.y;
	var deltax=mom.x-this.x;
	var deltaa=Math.atan2(deltay,deltax)+Math.PI;
	//使大鱼的角度和小鱼的角度保持一致
	this.angle=lerpAngle(deltaa,this.angle,0.6);

	//小鱼尾巴的摆动
	this.babyTailTimer+=deltaTime;
	if(this.babyTailTimer>50){
		this.babyTailCount=(this.babyTailCount+1)%8;	//计时器大于50ms时执行下一图片，图片总数不超过7张
		this.babyTailTimer%=50;		//复原计时器
	}

	//小鱼眨眼睛
	this.babyEyeTimer+=deltaTime;
	if(this.babyEyeTimer>this.babyEyeInterval){
		this.babyEyeCount=(this.babyEyeCount+1)%2;
		this.babyEyeTimer%=this.babyEyeInterval;
		if(this.babyEyeCount==0){
			this.babyEyeInterval=Math.random()*1500+2000;
		}else{
			this.babyEyeInterval=200;
		}
	}

	//小鱼身体变白
	this.babyBodyTimer+=deltaTime;
	if(this.babyBodyTimer>300){
		this.babyBodyCount=(this.babyBodyCount+1);
		this.babyBodyTimer%=300;
		if(this.babyBodyCount>19){
			this.babyBodyCount=19;		//当小鱼的身体完全变白时，游戏结束
			data.gameover=true;
		}
	}

	context1.save();
	context1.translate(this.x,this.y);
	context1.rotate(this.angle);
	var babyTailCount=this.babyTailCount;
	var babyEyeCount=this.babyEyeCount;
	var babyBodyCount=this.babyBodyCount;
	context1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width*0.5+25,-babyTail[babyTailCount].height*0.5);
	context1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width*0.5,-babyBody[babyBodyCount].height*0.5);
	context1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width*0.5,-babyEye[babyEyeCount].height*0.5);
	
	context1.restore();
}