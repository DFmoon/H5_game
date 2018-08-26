var waveFishObj=function(){
	this.x=[];
	this.y=[];
	this.r=[];
	this.alive=[];
}

waveFishObj.prototype.num=5;

waveFishObj.prototype.init=function(){
 	for(var i=0;i<this.num;i++){
		this.alive[i]=false;
		this.r[i]=0;
		this.x[i]=0;
		this.y[i]=0;
	}
}

waveFishObj.prototype.draw=function(){
	context1.save();
	context1.lineWidth=1;
	context1.shadowBlur=5;
	context1.shadowBlurColor="rgba(255,69,0)";
	for(var i=0;i<this.num;i++){
		if(this.alive[i]){
			this.r[i]+=deltaTime*0.05;
			if(this.r[i]>30){
				this.alive[i]=false;
				break;
			}
			var alpha=1-this.r[i]/30;

			context1.beginPath();
			context1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2);
			context1.closePath();
			context1.strokeStyle="rgba(255,69,0"+alpha+")";
			context1.stroke();
		}
	}
	context1.restore();
}

waveFishObj.prototype.born=function(x,y){
	for(var i=0;i<this.num;i++){
		if(!this.alive[i]){
			this.alive[i]=true;
			this.x[i]=x;
			this.y[i]=y;
			this.r[i]=10;
		}
	}
}