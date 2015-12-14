
<template>
	<div class="block_wrap">
		<div class="block_title"><h2>房源类型</h2></div>
		<div class="block_content">
			<div class="rows_wrap clearfix">
				<div class="rows_content">
					<div class="tip" style="display: none;"></div>
						<div class="radio_wrap clearfix success" id="divhousetype">
							<div v-repeat="houseType" v-class="radio:true,focus:htype==text" v-on="click:change(text,'htype'),click:changeLocal()" data-value="{{text}}">
								<i></i>
								<label>{{text}}</label>
							</div>
						</div>
					</div>
				<div class="rows_title"><span><span class="rows_title_star">*</span>房源类型</span></div>
			</div>
			<div class="rows_wrap clearfix" v-if="htype=='住宅'||htype=='别墅'">
				<div class="rows_content">
					<div class="tip" style="display: none;"></div>
						<div class="radio_wrap clearfix success" id="divrenttype">
							<div v-repeat="rentType" v-class="radio:true,focus:rtype==text" v-on="click:change(text,'rtype')" data-value="{{text}}">
								<i></i>
								<label>{{text}}</label>
							</div>
						</div>
					</div>
				<div class="rows_title"><span><span class="rows_title_star">*</span>出租方式</span></div>
			</div>
		</div>
	</div>
	<!--content-->
	<div class="block_wrap block_content">
        <div class="block_title">
            <h2>基础信息</h2>
        </div>
		 <div class="block_content"> 
		 	<div class="rows_wrap clearfix custom_name" style="z-index: 1600;">
                <div class="rows_content">
                    <div v-class="tip:true,												
						validate_error:validation.projname.invalid					
								">
                        <span v-show="validation.projname.required">请填写小区名称</span>
                        <span v-show="validation.projname.maxLength||validation.projname.maxLength">小区名称限1-30个字符</span>
                        
                    </div>
                    <div v-class="input_text_wrap:true,
								  error:validation.projname.invalid&&validation.projname.dirty,
								  success:validation.projname.valid
							">
                        <input type="autoComplete" autocomplete="off" disableautocomplete="true" maxlength="30" placeholder="请输入小区名称" style="width: 395px;" v-model="projname" v-on="keyup:getProjname($event)" v-validate="required,maxLength:30,minLength:1">
                        <div class="tooltip" v-show="hits.length" style="margin: 1px 0 0 -10px; overflow-y: auto; overflow-x: hidden; border: 1px solid #ccc; position: absolute; z-index: 497;">
                            <ul class="autoCompleteul" style="margin: 0; padding: 0; display: block; width: 100%; border: 0; background: #fff" v-on="click:clickFunc($event),mouseover:changeClass($event,'over'),mouseout:changeClass($event,'over')">
                                <li v-repeat="item in hits" k="{{item.projname}}" newcode="{{item.newcode}}" district="{{item.district}}" comarea="{{item.comarea}}" class="">{{item.projname}}<cite>{{item.address}}</cite></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="rows_title"><span><span class="rows_title_star">*</span>小区名称</span></div>
        	</div>
        	<!--命中楼盘 start-->
            <div class="rows_wrap clearfix custom_name" v-show="projcode!=''">
                <div class="rows_content">
                    <div class="tip"></div>
                    <div class="textshow clearfix">
                        <span type="textShow">
                            <span class="ico"></span>
                            <span class="textcon textclass">{{district}}-{{comarea}} {{address}}</span>
                        </span>
                    </div>
                </div>
                <div class="rows_title"><span>位置</span></div>
			</div>
			<!--命中楼盘 end-->
			<!--未命中楼盘 start-->
		    <div class="rows_wrap clearfix custom_name" v-show="projname!='' && hits.length == 0&& projcode ==''">
		        <div class="rows_content">
		            <div v-class="tip:true,												
						validate_error:validation.address.invalid
						">
		                <span v-show="validation.address.required||validation.address.minLength||validation.address.maxLength">请输入小区正确地址，2-50个字</span>
		            </div>
		            <div class="selectordef" id="divarea" style="z-index: 1495; width: 150px;" v-on="click:select($event,'divarea','district')">
		                <div class="title">
		                    <span class="seled">{{district}}</span><div class="arrow"></div>
		                </div>
		                <div class="optiondef" style="width: 147px; display: none;">
		                    <ul style="width: 147px;" v-on="mouseover:changeClass($event,'sel'),mouseout:changeClass($event,'sel')">
		                        <li v-repeat="localArea" index={{index}} v-on="click:getcomarea(index)">{{name}}</li>
		                    </ul>
		                </div>
		            </div>
		            <div class="selectordef" id="divcoma" style="z-index: 1494; width: 150px;" v-on="click:select($event,'divcoma','comarea')">
		                <div class="title">
		                    <span class="seled">{{comarea}}</span><div class="arrow"></div>
		                </div>
		                <div class="optiondef" style="width: 147px; display: none;">
		                    <ul style="width: 147px;" v-on="mouseover:changeClass($event,'sel'),mouseout:changeClass($event,'sel')">
		                        <li v-repeat="localComaItem">{{text}}</li>
		                    </ul>
		                </div>
		            </div>
		            <div v-class="input_text_wrap:true, error:validation.address.invalid&&validation.address.dirty,success:validation.address.valid" style="position: relative;">
		                <input type="inputText" placeholder="请输入具体的地址" style="width: 277px;" v-model="address" v-validate="required,minLength:2,maxLength:50">
		            </div>
		        </div>
		        <div class="rows_title"><span>位置</span></div>
		    </div>
		    <!--未命中楼盘 end-->
		    <shop></shop>
        	<office></office>
        	<rent></rent>            	
		 </div>
     </div>    
	<!--content-->
	<!--details-->
	<details></details>
	<!--details-->
	<!--other-->
	<other></other>
	<!--other-->
	<!--submit-->
	<div class="block_wrap">
		<div class="block_title" style="display: none;"><h2></h2></div>
		<div class="block_content">
			<div class="rows_wrap clearfix">
				<div class="rows_content"><div class="tip"></div>
				<div class="submit_wrap" v-on="click:submit" v-if="valid"><span>发布</span></div></div>
				<div class="rows_title"><span></span></div>
			</div>
		</div>
	</div>
	<!--submit-->	
</template>
<script>
	var Vue = require('vue')
	    ,data = require('./components/data').data
	    ,validates = require('./components/validate').validates
	    ,savePage = require('./components/savePage').savePage
	    ,editPage = require('./components/editPage').editPage	    
		,compA = require('./components/other.vue')
	    ,compB = require('./components/details.vue')
	    ,compC = require('./components/content.vue')
	    ,compD = require('./components/office.vue')
	    ,compE = require('./components/shop.vue');	

	Vue.use(require('vue-resource'));	
	Vue.use(require('./components/vue-validator.min.js'));    	
	module.exports = {
		data:function(){
			return data
		},	
		validator: {
		    validates: validates
  		},	
		methods:{
			// 设置位置信息
			setValue:function(obj){
				var self = this
					, projname = obj.getAttribute("k")
					, projcode = obj.getAttribute("newcode")
					, district = obj.getAttribute("district")
					, comarea = obj.getAttribute("comarea");

				self.projname = projname;
				self.projcode = projcode;	
				self.district = district;
				self.comarea = comarea;
				self.address = obj.querySelector("cite").innerHTML;
				self.hits = [];
    		},    		
    		// 重置位置信息
    		resetValue:function(){    			
				this.projcode = '';    			
				this.address = '';
    		},
    		clickFunc:function(e){
    			if (e.target.tagName.toLowerCase() == "li") {
                    this.setValue(e.target);                                 
                }                 
                return false;
    		},
			changeClass:function(e,className){
				if (e.type === "mouseover") {
					if (e.target.tagName.toLowerCase() === "li") {
						var lis = e.target.parentNode.querySelectorAll("li");
						for (var i = 0; i >= lis.length; i++) {
							lis[i].className = "";
						};
						e.target.className = className;
					};
				}else{
					if (e.target.tagName.toLowerCase() === "li") {						
						e.target.className = "";
					};
				}				
			},			
  			getProjname:function(e){	
				var self = this
					, key = e.target.value
					, tooltip = e.target.parentNode.querySelector("div")
					, content = "";
				if (!key) { self.hits = [];; self.resetValue();return;}
				if (e.keyCode === 38) {
					// up
					var lis = tooltip.querySelectorAll("li");
					if (tooltip.style.display !== "none" && lis.length > 0) {                       
                        var curli = tooltip.querySelector("li.over")
                        	, prevli = self.prevSibling(curli);

                        if (curli === null) {
                            lis[lis.length - 1].className = "over";
                        } else if (prevli) {
                            prevli.className = "over";
                            curli.className = "";
                        } else {
                            lis[lis.length - 1].className = "over";
                            curli.className = "";
                        }
                    }
				}else if(e.keyCode === 40){
					// down
					var lis = tooltip.querySelectorAll("li");
					if (tooltip.style.display !== "none" && lis.length > 0) {                       
                        var curli = tooltip.querySelector("li.over")
                        	, nextli = self.nextSibling(curli);

                        if (curli === null) {
                            lis[0].className = "over";
                        } else if (nextli) {
                            nextli.className = "over";
                            curli.className = "";
                        } else {
                            lis[0].className = "over";
                            curli.className = "";
                        }
                    }
				}else if(e.keyCode === 13){
					 var curli = tooltip.querySelector("li.over");
					 if (curli === null && lis.length  && lis[0]) {
					 	self.setValue(lis[0]);
					 }else{
					 	self.setValue(curli);
					 }
					 self.hits = [];
					 return false;
				}else if(e.keyCode === 37 || e.keyCode === 39){

				}
				else{
					self.$http.get('getnewdictlist',{
						'key':encodeURIComponent(key),
						'purpose':encodeURIComponent(self.htype)
					}, function (data, status, request) {
						self.hits = data.hits;
						tooltip.style.width = "411px";
						if (self.hits.length === 0) {self.resetValue();};													
	      			}).error(function (data, status, request) {
	        			self.hits = [];
	        			self.resetValue();
	      			})					
				}
			},
    		nextSibling : function(elem){
    			if (!elem) {return null};
                while ((elem = elem.nextSibling)){
                    if(elem.nodeType === 1){
                        return elem;
                        break;
                    }
                }                   
            },
        	// 上一个相邻元素
	        prevSibling: function (elem) {  
	        	if (!elem) {return null};                   
	            while ((elem = elem.previousSibling)) {
	                if (elem.nodeType === 1) {
	                     return elem;
	                     break;
	                }
	            }
	        },
	        select:function(e,id,p){
				var div = document.getElementById(id)
					, divselector = div.querySelector("ul").parentNode;

				divselector.style.display = "block";
				if (e.target.nodeName==="LI") {
					this[p] = e.target.innerHTML;
					divselector.style.display = "none";
				};
			},
			change:function(t,p){				
				var arr = document.getElementsByClassName("radio");
				if (p=='htype'&&houseid) { return false};
				this[p] = t;
			},			
    		submit:function(){
    			// 房源描述
    			var desc = document.getElementById("desc").value;
    			if (desc.length < 5|| desc.length > 5000) { return};
    			this.description = desc;
    			// 房源图片
    			var imgarr = document.getElementById("fileList").querySelectorAll("li");
    			for (var i = 0; i < imgarr.length; i++) {
    				if (imgarr[i].getAttribute("data-url")) {
    					this.imgurl.push(imgarr[i].getAttribute("data-url"));
    				};    				
    			};
    			this.titleimg = imgarr.length > 0?imgarr[0].getAttribute("data-url"):'';
    			// 房源配套
    			var eqarr = [],
    				tempEquitments = [];
    			if (this.htype=='住宅') {
    				tempEquitments = this.equitments.rent;
    			}else if(this.htype=='别墅'){
    				tempEquitments = this.equitments.villa;
    			}else if(this.htype=='商铺'){
    				tempEquitments = this.equitments.shop;
    			}
    			for (var i = 0; i < tempEquitments.length; i++) {
    				if (tempEquitments[i].done) {
    					eqarr.push(tempEquitments[i].text);		
    				};
    			};
    			this.equitment = eqarr.toString();

    			// 可经营类别
    			var mcarr = [];
    			for (var i = 0; i < this.manageCategorys.length; i++) {
    				if (this.manageCategorys[i].done) {
    					mcarr.push(this.manageCategorys[i].text);		
    				};
    			};
    			this.manageCategory = mcarr.toString();

    			var data = this.$data;
    			this.$http.post('saveHouse',savePage(data,houseid), function (data, status, request) {
						if (data && data.code && data.code==100) {
							window.location.href = data.url+"?url="+data.para;
						};											
	      			}).error(function (data, status, request) {	        			
	      		})    			
    		},
    		changeLocal:function(){
    			switch(this.htype){
					case '住宅':
						this.localArea = Districts;
						this.localComa = Area;
					break;
					case '别墅':
						this.localArea = Districts_b;
						this.localComa = Area_b;
					break;
					case '写字楼':
						this.localArea = Districts_xz;
						this.localComa = Area_xz;
					break;
					case '商铺':
						this.localArea = Districts_sp;
						this.localComa = Area_sp;
					break;
				}
    		},
    		getcomarea:function(index){
    			// 选择区县
    			if (index >= 0) {
    				this.localComaItem = [];
    				var temp = this.localComa[index];
    				for (var i = 0; i < temp.length; i++) {
    					this.localComaItem.push({text:temp[i].split(',')[1]});
    				};
    			};
    			// 重置comarea值
    			this.comarea = '请选择商圈';   			
    		}
		},				
		created:function(){
			var self = this;
			self.changeLocal();			
			if (houseid) {
				self.$http.get('./EditPage',{'houseid':houseid}, function (data, status, request) {
					editPage.call(self,data.entity);
					var desc = document.getElementById("desc");
					if (desc) {desc.value = self.description};						         
			     }).error(function (data, status, request) {
			          // handle error
			     })
			};			
		},		
		components:{
			"other":compA,
			"details":compB,
			"rent":compC,
			"office":compD,
			"shop":compE			
		}
	}
</script>
		