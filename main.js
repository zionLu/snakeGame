var body = new Array();
//注意单个对象定义的写法！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
body[0] = {
	hang : 6,
	lie : 2,
	front : "right",
	perFront:"right"
}
body[1] = {
	hang : 6,
	lie : 1,
	front : "right"
}
body[2] = {
	hang : 6,
	lie : 0,
	front : "right"
}
var time = 500;
var zhanting = false;
var haveeat = 3;
window.onload = function(){
	
	setFood();
	
	main();
}

function firstFill(){
	for (var i = 0; i < body.length; i++) {
		//每格颜色改变颜色
		var bodyCell=document.getElementById(body[i].hang+""+body[i].lie);
		bodyCell.style.backgroundColor = "blue";
	}
}


function main(){
	var everyCell = document.getElementsByClassName("cell");//不要再把Name漏掉了！！！！！！！！！！！！！！
	for (var i = 0; i < everyCell.length; i++) {
		everyCell[i].style.backgroundColor = "white";
	}
	
	document.getElementById(foodHang+""+foodLie).style.backgroundColor = "red";



	for (var i = 0; i < body.length; i++) {
		//改变每格方向
		if (i==0) {body[i].front = body[i].perFront;}
		if (i>0) {
			if (body[i-1].lie == body[i].lie&&body[i].hang == body[i-1].hang+1) {
				body[i].front = "up";
			}

			if (body[i-1].lie == body[i].lie&&body[i].hang == body[i-1].hang-1) {
				body[i].front = "down";
			}

			if (body[i-1].lie+1 == body[i].lie&&body[i].hang == body[i-1].hang) {
				body[i].front = "left";
			}

			if (body[i-1].lie-1 == body[i].lie&&body[i].hang == body[i-1].hang) {
				body[i].front = "right";
			}
		}
	}
		//下一秒
	for (var i = 0; i < body.length; i++) {
		
		if (body[i].front == "right") {
			body[i].lie++;
			//if (body[i].lie>13) {body[i].lie =0;}
		}
		if (body[i].front == "left") {
			body[i].lie--;
			//if (body[i].lie<0) {body[i].lie =13;}
		}
		if (body[i].front == "up") {
			body[i].hang--;
			//if (body[i].hang<0) {body[i].hang = 6;}
		}
		if (body[i].front == "down") {
			body[i].hang++;
			//if (body[i].hang>6) {body[i].hang = 0;}
		}
		
	}

	//检测吃的东西（食物，墙，自己）
	if (body[0].hang == foodHang&&body[0].lie == foodLie) {
		var lastHang = body[body.length-1].hang;
		var lastLie = body[body.length-1].lie;
		haveeat++;
		if (body[body.length-1].front == "up") {
			body[body.length] = {
				hang:lastHang+1,
				lie:lastLie,
				front:"up"
			}
		}

		if (body[body.length-1].front == "down") {
			body[body.length] = {
				hang:lastHang-1,
				lie:lastLie,
				front:"down"
			}
		}

		if (body[body.length-1].front == "left") {
			body[body.length] = {
				hang:lastHang,
				lie:lastLie+1,
				front:"left"
			}
		}

		if (body[body.length-1].front == "right") {
			body[body.length] = {
				hang:lastHang,
				lie:lastLie-1,
				front:"right"
			}
		}
		setFood();
	}

	if (haveeat ==7) {
		time/=1.3;
		haveeat = 0;
	}

	




	die();
	//每格颜色改变颜色
	for (var i = 0; i < body.length; i++) {
		var bodyCell=document.getElementById(body[i].hang+""+body[i].lie);
		bodyCell.style.backgroundColor = "blue";
	}
	movement = setTimeout("main()",time);
}

var foodHang;
var foodLie;

function setFood(){
	while(true){
		 foodHang = Math.round(Math.random()*6);
		 foodLie = Math.round(Math.random()*13);
		var foodGet = true;
		for (var i = 0; i < body.length; i++) {
			if (foodHang == body[i].hang&&foodLie == body[i].lie) {foodGet = false;}
		}
		if (foodGet == true) {break;}
		document.getElementById(foodHang+""+foodLie).style.backgroundColor = "red";
	}
	
}

document.onkeydown = function(event){
	/*键码：
	keyCode 37 = Left 
	keyCode 38 = Up 
	keyCode 39 = Right 
	keyCode 40 = Down
	keyCode 87 = w W
	keyCode 65 = a A
	keyCode 83 = s S
	keyCode 68 = d D*/
	var e = event || window.event;
	if(body[0].front == "up"){
		if(e && e.keyCode==65||e && e.keyCode==37){body[0].perFront = "left";}
		if(e && e.keyCode==68||e && e.keyCode==39){body[0].perFront = "right";}
	}
	if(body[0].front == "down"){
		if(e && e.keyCode==65||e && e.keyCode==37){body[0].perFront = "left";}
		if(e && e.keyCode==68||e && e.keyCode==39){body[0].perFront = "right";}
	}
	if(body[0].front == "left"){
		if(e && e.keyCode==87||e && e.keyCode==38){body[0].perFront = "up";}
		if(e && e.keyCode==83||e && e.keyCode==40){body[0].perFront = "down";}
	}
	if(body[0].front == "right"){
		if(e && e.keyCode==87||e && e.keyCode==38){body[0].perFront = "up";}
		if(e && e.keyCode==83||e && e.keyCode==40){body[0].perFront = "down";}
	}

 }
 
 //死亡判定
 function die(){
 	var dieFlag = false;
 	if (body[0].hang<0||body[0].hang>6||body[0].lie<0||body[0].lie>13) {dieFlag = true;}
 	for (var i = 1; i < body.length; i++) {
 		if (body[0].hang == body[i].hang&&body[0].lie==body[i].lie) {dieFlag = true;}
 	}
 	 if (dieFlag == true) {location.reload();}
 }