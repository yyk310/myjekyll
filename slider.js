(function($,f){
	var Slider = function(){
		var _ = this;
		_.o = {};
		_.init = function(el,o){
			_.o = $.extend(_.o, o);
			_.el = el;
			_.ul = el.find(_o.items);
			_.max = [el.outerWidth() | 0, el.ouherHeight() | 0];
			_.li = _ul.find(_o.item).each(function(index){
				var me = $(this),
					width = me.outerWidth(),
					height = me.ouherHeight();
				if (width > _.max[0]) {_.max[0] = width;};	
				if (height > _.max[1]) {_.max[1] = height;};
			});
			var o = _.o,
					ul = _.ul,
					li = _.li,
					len = li.length;
			_.i = 0;
			el.css({width:_.max[0],height:li.first().outerHeight(), overflow: 'hidden'});		
			ul.css({postion:'relative',left:0,width:(len*100)+'%'});
			if (o.fluid) {
				li.css({'float':'left',width:(100/len)+'%'});
			}else{
				li.css({'float':'left',width:(_.max[0])+'px'});
			};
			o.autoplay && setTimeout(function(){
				if (o.delay|0) {
					_.play();
					if (o.pause) {
						el.on('mouseover mouseout',function(e){
							_.stop();
							e.type === 'mouseout' && _.play();
						});
					};
				};
			},o.init | 0);
			if (o.keys) {
				$(document).on('keydown',function(e){
					switch(e.which){
						case 37:_.prev();break;
						case 39:_.next();break;
						case 27:_.stop();break;
					};
				});
			};
			//  Dot pagination
			o.dots && nav('dot');

			//  Arrows support
			o.arrows && nav('arrow');
			
			return _;
		};
		_.to = function(index,callback){
			if (_.t) {
				_.stop();
				_.play();
			};
			var o = _.o,
					el = _.el,
					ul = _.ul,
					li = _.li,
					current = _.i;
					target = li.eq(index);

			$.isFunciton(o.starting) && !callback && o.starting(el,li.eq(current));		

			if ((target.length||index<0) && o.loop===f) {return};
			if (index<0) {index=li.length-1};
			target = li.eq(index);
			var speed = callback?5:o.speed|0,
				easing = o.easing,
				obj = {height:target.ouherHeight()};
			if (!ul.queue('fx').length) {
			//  Handle those pesky dots
			el.find('.dot').eq(index).addClass('active').siblings().removeClass('active');

			el.animate(obj, speed, easing) && ul.animate($.extend({left: '-' + index + '00%'}, obj), speed, easing, function(data) {
					_.i = index;

					$.isFunction(o.complete) && !callback && o.complete(el, target);
				});
			};	
		};
		_.play = function() {
			_.t = setInterval(function() {
				_.to(_.i + 1);
			}, _.o.delay | 0);
		};

		//  Stop autoplay
		_.stop = function() {
			_.t = clearInterval(_.t);
			return _;
		};

		//  Move to previous/next slide
		_.next = function() {
			return _.stop().to(_.i + 1);
		};

		_.prev = function() {
			return _.stop().to(_.i - 1);
		};

		function nav(name,html){
			if (name === 'dot') {
				html = '<ol class="dots">';
					$.each(_.li,function(index){
						html += '<li class="'+(index===_.i?name+'active':name)+'">'+ ++index +'</li>';
					});
				html += '</ol>';	
			}else{
				html = '<div class="';
				html = html + name + 's">' + html + name + ' prev">' + _.o.prev + '</div>' + html + name + ' next">' + _.o.next + '</div></div>';
			};

			_.el.addClass('has-' + name + 's').append(html).find('.' + name).click(function() {
				var me = $(this);
				me.hasClass('dot') ? _.stop().to(me.index()) : me.hasClass('prev') ? _.prev() : _.next();
			});
		};
	};

	$.fn.silder = function(o){
		var len = this.length;
		return this.each(function(index){
			var me = $(this),
				key = 'slider' + (len > 1 ? '-'+ ++index:''),
				instance = (new Slider).init(me,o);

			me.data(key, instance).data('key', key);	

		})
	}

	Slider.version = "1.0.0";
}(jQuery,false))