var waveObj=function(){
	this.x=[];
	this.y=[];
	this.r=[];
	this.alive=[];
}

waveObj.prototype.num=10;

waveObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.alive[i]=false;
		this.r[i]=0;
		this.x[i]=0;
		this.y[i]=0;
	}
}

waveObj.prototype.draw=function(){
	
	context1.save();
	context1.lineWidth=2;
	context1.shadowBlur=10;
	context1.shadowBlurColor="white";
	for(var i=0;i<this.num;i++){
		if(this.alive[i]){
			this.r[i]+=deltaTime*0.05;
			if(this.r[i]>40){
				this.alive[i]=false;
				break;
			}
			var alpha=1-this.r[i]/40;

			context1.beginPath();
			context1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2);
			context1.closePath();
			context1.strokeStyle="rgba(255,255,255,"+alpha+")";
			context1.stroke();
		}
	}
	context1.restore();
}

waveObj.prototype.born=function(x,y){
	for(var i=0;i<this.num;i++){
		if(!this.alive[i]){
			this.alive[i]=true;
			this.x[i]=x;
			this.y[i]=y;
			this.r[i]=10;
			return;
		}
	}
}