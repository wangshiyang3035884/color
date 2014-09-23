(function($){
	function Game(){
		var that = this;
		
		that.oBox = $('#box');
		that.bColor = $('#bgcolor');
		that.showStep = $('#show_step');
		that.result = $('#result');
		that.title = $('#title');
		that.timer = null;

		that.lightness_a = 8,
		//方块的个数
		that.box_n = 4;

		//倒计时 时间
		this.maxtime = 60;
	};

	Game.prototype = {
		init : function(guan){
			var that = this;
				//不同色块随机出现的位置
			var pos = parseInt(Math.random()*(that.box_n-1)+1),
				// HSL 色相(H)、饱和度(S)、明度(L)
				// 颜色值第一位
				hue = parseInt(Math.random()*90+1)*4,
				//颜色值第三位
				lightness_b = 100 - that.lightness_a;

			//游戏开始
			that.gameStart(guan,pos,hue,lightness_b);

			

			//方块选择
			this.fnClick(guan);
		},
		gameStart : function(guan,pos,hue,lightness_b){
			 var that = this;

			 //关数
			 if(guan <= 2){
			 	that.lightness_a += 5;
			 }
			 else if(guan < 5){
			 	that.box_n = 9;
			 	that.oBox.attr('class','box1');
			 }
			 else if(guan <= 9){
				that.lightness_a += 3;
				that.box_n = 25;
				that.oBox.attr('class','box2');
			 }
			 else if(guan<=15){
			 	that.lightness_a += 2;
				that.box_n = 42;
				that.oBox.attr('class','box3');
			 }
			 else if(guan<=25){
				that.box_n = 56;
				that.oBox.attr('class','box4');
			 }
			 else if(guan<=30){
				that.box_n = 100;
				that.oBox.attr('class','box5');
			 }

			 var htmls =  "<style>span {background-color: hsl(" + hue + " ,100% ," + that.lightness_a +"%);} input {background-color: hsl(" + hue + " ,100% ," + lightness_b +"%);}</style>";

			 that.bColor.html(htmls);

			 for(var i=1;i<that.box_n;i++){
			 	//颜色不同的方块
				if (i == pos) {
					that.oBox.html(that.oBox.html() + "<input type='radio' id='chk' />");
				};

				that.oBox.html(that.oBox.html()+ "<span></span> ");
			 }

			 //显示的关数
			 that.showStep.val(guan-1);
			 that.result.html(guan-1);
			 that.guan = guan;
		},
		//方块选择
		fnClick : function(guan){
			var that = this;

			$('#chk').on('click', function(){
				that.bColor.html('');
				that.oBox.html('');
				that.init(guan+1);
			});
		},
		//倒计时
		countdown : function(){
			var timer = null,
				that = this;

			//倒计时开始
			that.timer = setInterval(function(){

				if(that.maxtime >= 0){
					$('#timer').html('距离结束还有'+that.maxtime+'秒');
					that.maxtime --;
				}
				else{
					clearInterval(that.timer);
					that.title.html("一分钟内我在相近的色块中找到了 " + (that.guan - 1) + " 个不同的颜色，你呢！？");
					$('#mask').show();
				}	
			}, 1000);	
		}	
	};


	var Game = new Game();

	//游戏开始
	Game.init(1);
	//倒计时开始
	Game.countdown();
	

})($);