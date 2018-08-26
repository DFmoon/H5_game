//大鱼和果实的碰撞
function momFruits(){
	if(!data.gameover){
		for(var i=0;i<fruit.num;i++){
			if(fruit.alive[i]){

				//计算两个坐标的距离平方
				var l=calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
				if(fruit.l[i]>14){		//判断果实是否成熟，果实成熟时，和大鱼的碰撞才会有效
					if(l<900){
						fruit.dead(i);
						data.fruitNum++;
						mom.momBodyCount++;
						if(mom.momBodyCount>7){
							mom.momBodyCount=7
						}
						if(fruit.fruitType[i]=="blue"){
							data.double=2;
						}else{
							data.double=1;
						}
						wave.born(fruit.x[i],fruit.y[i]);
					}
				}
			}
		}
	}
}

//大鱼和小鱼的碰撞
function momBaby(){
	if(data.fruitNum>0 && !data.gameover){		//当大鱼有果实时才是有效碰撞
		var l=calLength2(mom.x,mom.y,baby.x,baby.y);
		if(l<900){
			baby.babyBodyCount=0;
			mom.momBodyCount=0;

			data.addScore();//计算分值
			waveFish.born(baby.x,baby.y);
		}
	}	
}