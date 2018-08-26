var fruitObj=function(){
	this.alive=[];
	this.x=[];
	this.y=[];
	this.l=[];		//果实的大小
	this.speed=[];
	this.fruitType=[];
	this.aneNo=[];	//果实对应的海葵编号

	this.orange=new Image();
	this.blue=new Image();
}
fruitObj.prototype.num=30;

//果实的初始化
fruitObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.alive[i]=false;
		this.x[i]=0;
		this.y[i]=0;
		this.speed[i]=Math.random()*0.017+0.003;
		this.fruitType[i]="";
		this.aneNo[i]=0;

	}
	this.orange.src="./src/fruit.png";
	this.blue.src="./src/blue.png";
}

//果实被吃掉
fruitObj.prototype.dead=function(i){
	this.alive[i]=false;
}

//画出果实
fruitObj.prototype.draw=function(){
	for(var i=0;i<this.num;i++){
		if(this.alive[i]){

			//判断果实的颜色
			if(this.fruitType[i]=="blue"){
				var pic=this.blue;
			}else if(this.fruitType[i]=="orange"){
				var pic=this.orange;
			}

			//判断果实是否成熟，并始终依附于出生时的那个海葵
			if(this.l[i]<=14){
				this.l[i]+=this.speed[i]*deltaTime;
				this.x[i]=ane.headx[this.aneNo[i]];
				this.y[i]=ane.heady[this.aneNo[i]];
				context2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
			}else{
				this.y[i]-=this.speed[i]*7*deltaTime;
				context2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
			}
			if(this.y[i]<10){
				this.alive[i]=false;
			}
		}
	}
}

//随机位置诞生一个果实
fruitObj.prototype.born=function(i){
	this.aneNo[i]=Math.floor(Math.random()*ane.num);		//记录果实出生在哪个海葵上
	this.l[i]=0;
	this.alive[i]=true;
	var ran=Math.random();
	if(ran<0.2){
		this.fruitType[i]="blue";
	}else{
		this.fruitType[i]="orange";
	}
}

//果实监视器，当屏幕中果实数量小于15时，born一个alive为false的果实
function fruitMonitor(){
	var num=0;
	for(var i=0;i<fruit.num;i++){
		if(fruit.alive[i]) num++;
	}
	if(num<15){
		sendFruit();
		return;
	}
}

//诞生一个alive为false的果实
function sendFruit(){
	for(i=0;i<fruit.num;i++){
		if(!fruit.alive[i]){
			fruit.born(i);
			return;
		}
	}
}
