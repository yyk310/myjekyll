(function($){
	var defaults = {
		postUrl:"http://img1u.soufun.com/upload/rent?isflash=y&channel=self.houseinfo&city={city}&kind=houseinfo&sid=" + Math.random(),
		loadingUrl:"http://img.soufun.com/secondhouse/image/loading100_75.gif",
		className: {
            li: "img_box",
            toolbar: "toolbar_wrap",
            prev: "prev_pos",
            next: "next_pos",
            del: "delete"           
        }
	}

	var pcupload = (function(){
		var pcUpload = function(options){
			return new pcUpload.fnStart.init(options);
		}

		pcUpload.fnStart = pcUpload.prototype = {
			init:function(options){
				// 
				$(options.el).warp('<div class="imgbar_wrap">
						<ul class="clearfix img_list">
							<li class="first_icon"><i></i></li>							
						</ul>
						<div class="upload_wrap">	
							<div class="upload">
								<div class="localUpload">	
									<div id="imgUpload">
										<div class="html5"><input id="img_upload" name="img_upload" type="file" multiple="true"></div>
									</div>		
									<div id="maxlength_cover">10</div>		
								</div>					
							</div>
							<div class="info">添加几张照片，让您的信息更受欢迎（最多上传<span>10</span>张，每张最大<span>5M</span>）</div>
						</div>
					</div>');
				this.el = options.el;
				this.trigger()
			},
			trigger:function(){
				 var _self = this;	
				$("#img_upload").uploadify({
					overrideEvents:['onSelect']
			        auto:false,
			        height: 96,
			        swf: 'http://esf.js.soufunimg.com/esf/zu/js/libs/uploadify.swf',
			        uploader:''
			        fileType: 'image/*',           
			        width: 90,            
			        onSelect: function (file) {
			            alert(file.name)
			        },
			        uploadLimit: 10,
			        onComplete: function () {
			        	_self.crel();
			        }
			    })
			},
			crel:function(){
				var classObj = defaults.className;
		        var container = $(tihs.el).find("ul");
		        var li = $("<li>").addClass(classObj.li);
		        var img = $("<img>").attr("src", defaults.loadingUrl);
		        li.append(img);
		        var htmlStr = '<div class="' + classObj.toolbar + '">' + '	<div class="opacity"></div>' + '	<div class="toolbar">' + '		<a href="javascript:;" class="' + classObj.prev + '"></a>' + '		<a href="javascript:;" class="' + classObj.next + '"></a>' + '		<a href="javascript:;" class="' + classObj.del + '"></a>' + "	</div>" + "</div>"
		        container.append(htmlStr);
			}
		}
		pcUpload.fnStart.init.prototype = pcUpload.prototype;
        return pcUpload;
	}())
		
	pcUpload({
		el:'#imgwarp'
	})

}(jQuery))