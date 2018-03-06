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
		
		if (body[i].front == "right") {body[i].lie++;}
		if (body[i].front == "left") {body[i].lie--;}
		if (body[i].front == "up") {body[i].hang--;}
		if (body[i].front == "down") {body[i].hang++;}
		
	}

	for (var i = 0; i < body.length; i++) {
		//每格颜色改变颜色
		var bodyCell=document.getElementById(body[i].hang+""+body[i].lie);
		bodyCell.style.backgroundColor = "blue";
	}
	movement = setTimeout("main()",1000);
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
		if(e && e.keyCode==65){body[0].perFront = "left";}
		if(e && e.keyCode==68){body[0].perFront = "right";}
	}
	if(body[0].front == "down"){
		if(e && e.keyCode==65){body[0].perFront = "left";}
		if(e && e.keyCode==68){body[0].perFront = "right";}
	}
	if(body[0].front == "left"){
		if(e && e.keyCode==87){body[0].perFront = "up";}
		if(e && e.keyCode==83){body[0].perFront = "down";}
	}
	if(body[0].front == "right"){
		if(e && e.keyCode==87){body[0].perFront = "up";}
		if(e && e.keyCode==83){body[0].perFront = "down";}
	}
 }
 