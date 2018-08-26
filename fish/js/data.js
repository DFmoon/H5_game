var dataObj=function(){
	this.fruitNum=0;	//大鱼吃到的果实数量
	this.double=1;		//吃到黄色果实值为1，吃到蓝色果实值为2
	this.score=0;
	this.gameover=false;
	this.alpha=0;
}

dataObj.prototype.draw=function(){
	
	var w=canvas1.width;
	var h=canvas1.height;

	context1.save();
	context1.fillStyle="white";
	context1.font="20px Verdana";
	context1.textAlign="center";
	//context1.fillText("num:"+this.fruitNum,w*0.5,h-50);
	//context1.fillText("double:"+this.double,w*0.5,h-80);
	context1.fillText("SCORE:"+this.score,w*0.5,h-20);
	if(this.gameover){
		this.alpha+=deltaTime*0.001;
		if(this.alpha>1)
		{
			this.alpha=1;
		}
		context1.fillStyle="rgba(255,255,255,"+this.alpha+")";
		context1.shadowBlur=10;
		context1.shadowColor="white";
		context1.fillText("GAMEOVER",w*0.5,h*0.5);
	}
	context1.restore();
}

//分值的增加
dataObj.prototype.addScore=function(){
	this.score+=this.fruitNum*100*this.double;
	this.fruitNum=0;
	this.double=1;
}