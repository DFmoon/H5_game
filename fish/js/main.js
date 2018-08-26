var canvas1;
var canvas2;
var context1;
var context2;

var canvas_width;		//获取画布的尺寸
var canvas_height;

var lastTime;	//上一帧被执行的时间
var deltaTime;	//两帧的时间差

var bgpic=new Image();		//定义背景图片

var ane;		//海葵
var fruit;		//海葵的果实

var mom;		//大鱼
var	baby;		//小鱼

var mx;			//鼠标的位置
var my;

var babyTail=[];//小鱼尾巴的数组
var babyEye=[];	//小鱼眼睛的数组
var babyBody=[];//小鱼身体变化的数组

var momTail=[];
var momEye=[];
var momBody1=[];	//大鱼黄色身体的数组
var momBody2=[];	//大鱼蓝色身体的数组

var data;			//计算分值

var wave;			//大鱼和果实碰撞时产生的涟漪
var waveFish;		//大鱼和小鱼碰撞时产生的涟漪

var dust;			//随时间（波浪）摆动的漂浮物
var dustPic=[];		//存放一组漂浮物图片

document.body.onload=game;
function game(){
	init();
	lastTime=Date.now();
	deltaTime=0;
	gameloop();
}

//canvas的初始化
function init(){
	canvas1=document.getElementById("canvas1");		//fishes,dust,UI,circle
	context1=canvas1.getContext("2d");
	canvas2=document.getElementById("canvas2");		//background,ane,fruits
	context2=canvas2.getContext("2d");

	canvas1.addEventListener('mousemove',onMouseMove,false);		//监测鼠标的移动，触发函数onMouseMove()
	
	bgpic.src="./src/background.jpg";
	
	canvas_width=canvas1.width;
	canvas_height=canvas1.height;

	ane=new aneObj();
	ane.init();
	fruit=new fruitObj();
	fruit.init();

	mom=new momObj();
	mom.init();
	baby=new babyObj();
	baby.init();

	mx=canvas_width*0.5;
	my=canvas_height*0.5;

	for(var i=0;i<8;i++){
		babyTail[i]=new Image();
		babyTail[i].src="./src/babyTail"+i+".png";
	}
	for(var i=0;i<2;i++){
		babyEye[i]=new Image();
		babyEye[i].src="./src/babyEye"+i+".png";
	}
	for(var i=0;i<20;i++){
		babyBody[i]=new Image();
		babyBody[i].src="./src/babyFade"+i+".png";
	}
	for(var i=0;i<8;i++){
		momTail[i]=new Image();
		momTail[i].src="./src/bigTail"+i+".png";
	}
	for(var i=0;i<2;i++){
		momEye[i]=new Image();
		momEye[i].src="./src/bigEye"+i+".png";
	}
	for(var i=0;i<8;i++){
		momBody1[i]=new Image();
		momBody2[i]=new Image();
		momBody1[i].src="./src/bigSwim"+i+".png";
		momBody2[i].src="./src/bigSwimBlue"+i+".png";
	}

	data=new dataObj();

	wave=new waveObj();
	wave.init();
	waveFish=new waveFishObj();
	waveFish.init();

	dust=new dustObj();
	dust.init();
	for(var i=0;i<7;i++){
		dustPic[i]=new Image();
		dustPic[i].src="./src/dust"+i+".png";
	}
}

//鼠标移动时触发的函数
function onMouseMove(e){
	if(!data.gameover)
	{
		if(e.offSetX || e.layerX){
			mx=e.offSetX==undefined?e.layerX:e.offSetX;
			my=e.offSetY==undefined?e.layerY:e.offSetY;
		}
	}
}

//循环绘制动画
function gameloop(){
	window.requestAnimFrame(gameloop);		//循环绘制，但帧与帧之间的时间间隔不固定，该函数能够实现随机速度的运动
	var now=Date.now();
	deltaTime=now-lastTime;
	lastTime=now;
	//长时间不激活窗口时，deltaTime就会变得很大，解决这一问题
	if(deltaTime>40){deltaTime=40}

	drawbg();
	ane.draw();
	dust.draw();
	fruitMonitor();
	fruit.draw();
	context1.clearRect(0,0,canvas_width,canvas_height);
	mom.draw();
	baby.draw();
	momFruits();
	wave.draw();
	momBaby();
	waveFish.draw();
	data.draw();

	//console.log(deltaTime);
}
