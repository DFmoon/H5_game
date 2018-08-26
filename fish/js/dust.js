var dustObj=function(){
	this.x=[];
	this.y=[];
	this.amp=[];	//漂浮物随时间摆动的幅度大小
	this.NO=[];		//漂浮物的编号
	this.alpha;		//漂浮物摆动的角度，需要和海葵的角度保持一致
}

dustObj.prototype.num=30;

dustObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.x[i]=Math.random()*canvas_width;
		this.y[i]=Math.random()*canvas_height;
		this.amp[i]=25+Math.random()*15;
		this.NO[i]=Math.floor(Math.random()*7);
	}
	this.alpha=0;
}

dustObj.prototype.draw=function(){

	this.alpha+=deltaTime*0.0008;	//使正弦函数的角度随时间变化
	var s=Math.sin(this.alpha);		//求sin函数的值

	for(var i=0;i<this.num;i++){
		var NO=this.NO[i];
		context2.drawImage(dustPic[NO],this.x[i]+s*this.amp[i],this.y[i]);
	}
}