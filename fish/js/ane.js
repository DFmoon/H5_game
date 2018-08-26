var aneObj=function(){
	//使用贝赛尔曲线和正弦函数来控制海葵的摆动，起始点为root，终点为head，控制点同起始点
	this.rootx=[];
	this.headx=[];
	this.heady=[];
	this.alpha=0;		//正弦函数的角度
	this.amp=[];		//海葵的摆动幅度大小
}
aneObj.prototype.num=50;
aneObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.rootx[i]=i*16+Math.random()*20;
		this.headx[i]=this.rootx[i];
		this.heady[i]=canvas_height-250+Math.random()*50;
		this.amp[i]=Math.random()*50+50;
	}
}
aneObj.prototype.draw=function(){
	
	this.alpha+=deltaTime*0.0008;	//使正弦函数的角度随时间变化
	var s=Math.sin(this.alpha);		//求sin函数的值


	context2.save();
	context2.globalAlpha=0.6;
	context2.lineWidth=20;
	context2.lineCap="round";
	context2.strokeStyle="#3b154e";
	for(var i=0;i<this.num;i++){
		context2.beginPath();		//绘制开始
		context2.moveTo(this.rootx[i],canvas_height);		//开始点坐标
		this.headx[i]=this.rootx[i]+s*this.amp[i];			//经过正弦函数之后的终点X坐标
		context2.quadraticCurveTo(this.rootx[i],canvas_height-100,this.headx[i],this.heady[i]);
		context2.stroke();
	}
	context2.restore();			//表明该样式只在上述区域内起作用
}