var momObj=function(){
	this.x;
	this.y;
	this.angle;		//大鱼自身的角度，极坐标系

	this.momTailTimer=0;		//设定尾巴摆动计时器
	this.momTailCount=0;		//保存当前显示的尾巴图片序号

	this.momEyeTimer=0;			//保存眨眼睛的计时器
	this.momEyeCount=0;			//保存当前显示的眼睛图片序号
	this.momEyeInterval=1000;	//设置眨眼睛的时间间隔

	this.momBodyCount=0;
}

momObj.prototype.init=function(){
	this.x=canvas_width*0.5;
	this.y=canvas_height*0.5;
	this.angle=0;
}

momObj.prototype.draw=function(){

	//使大鱼的坐标一直跟随鼠标
	this.x=lerpDistance(mx,this.x,0.9);
	this.y=lerpDistance(my,this.y,0.9);

	//计算大鱼和鼠标的角度差
	var deltaY=my-this.y;
	var deltaX=mx-this.x;
	var deltaA=Math.atan2(deltaY,deltaX)+Math.PI;

	//使大鱼的角度和鼠标的角度保持一致
	this.angle=lerpAngle(deltaA,this.angle,0.6);

	//大鱼尾巴的摆动
	this.momTailTimer+=deltaTime;
	if(this.momTailTimer>50){
		this.momTailCount=(this.momTailCount+1)%8;	//计时器大于50ms时执行下一图片，图片总数不超过7张
		this.momTailTimer%=50;		//复原计时器
	}

	//大鱼眨眼睛
	this.momEyeTimer+=deltaTime;
	if(this.momEyeTimer>this.momEyeInterval){
		this.momEyeCount=(this.momEyeCount+1)%2;
		this.momEyeTimer%=this.momEyeInterval;
		if(this.momEyeCount==0){
			this.momEyeInterval=Math.random()*1500+2000;
		}else{
			this.momEyeInterval=200;
		}
	}

	context1.save();						//在save和restore之间的语句效果只对其中的对象起作用
	context1.translate(this.x,this.y);		//将（this.x,this.y）作为绘制的原点，以下皆以该点为参考
	context1.rotate(this.angle);			//大鱼旋转
	var momTailCount=this.momTailCount;
	var momEyeCount=this.momEyeCount;
	context1.drawImage(momTail[momTailCount],-momTail[momTailCount].width*0.5+30,-momTail[momTailCount].height*0.5);
	var momBodyCount=this.momBodyCount;
	if(data.double==1){
		context1.drawImage(momBody1[momBodyCount],-momBody1[momBodyCount].width*0.5,-momBody1[momBodyCount].height*0.5);
	}else{
		context1.drawImage(momBody2[momBodyCount],-momBody2[momBodyCount].width*0.5,-momBody2[momBodyCount].height*0.5);
	}

	context1.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width*0.5,-momEye[momEyeCount].height*0.5);
	context1.restore();
}