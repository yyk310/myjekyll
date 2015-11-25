<template>
	<div v-if="htype=='住宅'||htype=='别墅'"></div>
	<div v-if="htype=='商铺'">
		<div class="rows_wrap clearfix custom_name">
			<div class="rows_content">
	            <div v-class="tip:true,												
							validate_error:validation.shopType.invalid
							">
	                <span v-show="validation.shopType.notdefault">请选择类型</span>
	                <span v-show="validation.shopGrade.notdefault">请选择类别</span>
	            </div>
	            <div class="selectordef" id="divshopType" style="z-index: 1493; width: 128px;" v-on="click:select($event,'divshopType','shopType')">
	                <div class="title">
	                    <span class="seled">{{shopType}}</span>
	                    <div class="arrow"></div>
	                    <input type="hidden" v-validate="notdefault:'请选择类型'" v-model="shopType" />
	                </div>
	                <div class="optiondef" style="width: 125px; display: none;">
	                    <ul style="width: 125px;" v-on="mouseover:changeClass($event,'sel'),mouseout:changeClass($event,'sel')">
	                        <li v-repeat="shopTypes">{{text}}</li>
	                    </ul>
	                </div>
	            </div>
	            <div class="selectordef" id="divshopGrade" style="z-index: 1492; width: 148px;" v-on="click:select($event,'divshopGrade','shopGrade')">
	                <div class="title">
	                    <span class="seled">{{shopGrade}}</span>
	                    <div class="arrow"></div>
	                    <input type="hidden" v-validate="notdefault:'请选择级别'" v-model="shopGrade" />
	                </div>
	                <div class="optiondef" style="width: 125px; display: none;">
	                    <ul style="width: 125px;" v-on="mouseover:changeClass($event,'sel'),mouseout:changeClass($event,'sel')">
	                        <li v-repeat="shopGrades">{{text}}</li>
	                    </ul>
	                </div>
	            </div>           
	        </div>
	        <div class="rows_title"><span><span class="rows_title_star">*</span>类型/类别</span></div>
		</div>	
		<div class="rows_wrap clearfix custom_name">
	        <div class="rows_content">
	            <div class="radio_wrap clearfix success">
	                <div v-repeat="shopStates" v-class="radio:true,focus:shopState==value"  v-on="click:change(value,'shopState')">
	                    <i></i>
	                    <label>{{text}}</label>
	                </div>
	            </div>
	        </div>
	        <div class="rows_title"><span><span class="rows_title_star"></span>当前状态</span></div>
    	</div>
    	<div class="rows_wrap clearfix custom_name">
        <div class="rows_content">
            <div class="tip" style="display: none;"></div>
            <div class="checkbox_wrap clearfix">
                <div style="width: 95px;" v-repeat="item in manageCategorys" v-on="click:toggle(item)" v-class="checkbox:true,focus:item.done"><i></i>
                    <label>{{item.text}}</label></div>
                <div class="select_all"><span v-on="click:checkAll($event,manageCategorys)">全选</span></div>
            </div>
        </div>
        <div class="rows_title"><span>可经营类别</span></div>
    </div>
		<div class="rows_wrap clearfix custom_name">
	        <div class="rows_content">
	            <div class="radio_wrap clearfix success">
	                <div v-repeat="fitments" v-class="radio:true,focus:fitment==text" data-value="{{text}}" v-on="click:change(text,'fitment')">
	                    <i></i>
	                    <label>{{text}}</label>
	                </div>
	            </div>
	        </div>
	        <div class="rows_title"><span><span class="rows_title_star"></span>装修程度</span></div>
    	</div>
		<div class="rows_wrap clearfix custom_name">
	        <div class="rows_content">
	            <div v-class="tip:true,												
					validate_error:validation.sfloor.invalid||validation.stotalFloor.invalid||validation.sarea.invalid
					">
	                <span v-show="(validation.sfloor.required||validation.stotalFloor.required)">请填写数字</span>
	                <span v-show="(validation.sfloor.numeric||validation.stotalFloor.numeric)&&validation.sfloor.dirty">楼层只能为数字</span>
	                <span v-show="(validation.sfloor.less_than||validation.sfloor.greater_than)&&validation.sfloor.dirty">楼层不能大于总楼层</span>
	                <span v-show="validation.sarea.float&&validation.sarea.dirty">面积只能为数字，允许两位小数</span>
	                <span v-show="validation.sarea.min&&validation.sarea.dirty">面积不能小于1</span>
	                <span v-show="validation.sarea.max&&validation.sarea.dirty">面积不能大于1000000</span>
	            </div>
	            <div v-class="input_text_wrap:true, clearfix:true, error:validation.sfloor.invalid&&validation.sfloor.dirty,success:validation.sfloor.valid" style="position: relative;">
	                <span>第</span><input type="inputText" maxlength="2" style="width: 95px;" v-model="sfloor" v-validate="required,numeric,less_than:stotalFloor"><span>层</span>
	            </div>
	            <div v-class="input_text_wrap:true, clearfix:true, error:validation.stotalFloor.invalid&&validation.stotalFloor.dirty,success:validation.stotalFloor.valid" style="position: relative;">
	                <span>共</span><input type="inputText" maxlength="2" style="width: 95px;" v-model="stotalFloor" v-validate="required,numeric,greater_than:sfloor"><span>层</span>
	            </div>
	            <div v-class="input_text_wrap:true, clearfix:true, error:validation.sarea.invalid&&validation.sarea.dirty,success:validation.sarea.valid" style="position: relative;">
	                <span>共</span><input type="inputText" style="width: 95px;" v-model="sarea" v-validate="required,float,min:1,max:1000000"><span>㎡</span>
	            </div>
	        </div>
	        <div class="rows_title"><span><span class="rows_title_star">*</span>楼层</span></div>
	    </div>
	    <div class="rows_wrap clearfix custom_name">
	        <div class="rows_content">
	            <div v-class="tip:true,												
					validate_error:validation.sprice.invalid
					">
	                <span v-show="validation.sprice.required">请填写数字</span>
	                <span v-show="validation.sprice.float&&validation.sprice.dirty">租金只能为数字，允许两位小数</span>
	                <span v-show="validation.sprice.min&&validation.sprice.dirty">租金不能小于1</span>
	                <span v-show="validation.sprice.max&&validation.sprice.dirty">租金不能大于3000000</span>
	            </div>
	            <div v-class="input_text_wrap:true, clearfix:true, error:validation.sprice.invalid&&validation.sprice.dirty,success:validation.sprice.valid" style="position: relative;">
	                <input type="inputText" style="width: 128px;" v-model="sprice" v-validate="required,float,min:1,max:3000000"><span>{{priceType}}</span>
	            </div>
	             <div class="selectordef success" id="divpriceType" style="z-index: 1481; width: 128px;" v-on="click:select($event,'divpriceType','priceType')">
	                <div class="title">
	                    <span class="seled">{{priceType}}</span>
	                    <div class="arrow"></div>
	                </div>
	                <div class="optiondef" style="width: 125px; display: none;">
	                    <ul style="width: 125px;" v-on="mouseover:changeClass($event,'sel'),mouseout:changeClass($event,'sel')">
	                        <li v-repeat="priceTypes">{{text}}</li>
	                    </ul>
	                </div>
	            </div>
	            <div class="selectordef success" id="divspayinfo" style="z-index: 1481; width: 128px;" v-on="click:select($event,'divspayinfo','payinfo')">
	                <div class="title">
	                    <span class="seled">{{payinfo}}</span>
	                    <div class="arrow"></div>
	                </div>
	                <div class="optiondef" style="width: 125px; display: none;">
	                    <ul style="width: 125px;" v-on="mouseover:changeClass($event,'sel'),mouseout:changeClass($event,'sel')">
	                        <li v-repeat="shopPayinfos">{{text}}</li>
	                    </ul>
	                </div>
	            </div>
	        </div>
	        <div class="rows_title"><span><span class="rows_title_star">*</span>租金</span></div>
	    </div>
	    <div class="rows_wrap clearfix custom_name">
	        <div class="rows_content">
	            <div class="radio_wrap clearfix success">
	                <div v-repeat="issplits" v-class="radio:true,focus:issplit==text" data-value="{{text}}" v-on="click:change(text,'issplit')">
	                    <i></i>
	                    <label>{{text}}</label>
	                </div>
	            </div>
	        </div>
	        <div class="rows_title"><span><span class="rows_title_star"></span>是否可分割</span></div>
    	</div>
    	<div class="rows_wrap clearfix custom_name">
	        <div class="rows_content">
	            <div class="radio_wrap clearfix success">
	                <div v-repeat="limitdates" v-class="radio:true,focus:limitdate==text" data-value="{{text}}" v-on="click:change(text,'limitdate')">
	                    <i></i>
	                    <label>{{text}}</label>
	                </div>
	            </div>
	        </div>
	        <div class="rows_title"><span><span class="rows_title_star"></span>有效期</span></div>
    	</div>
    	 <div class="rows_wrap clearfix custom_name">
        <div class="rows_content">
            <div class="tip" style="display: none;"></div>
            <div class="checkbox_wrap clearfix">
                <div style="width: 95px;" v-repeat="item in equitments.shop" v-on="click:toggle(item)" v-class="checkbox:true,focus:item.done"><i></i>
                    <label>{{item.text}}</label></div>
                <div class="select_all"><span v-on="click:checkAll($event,equitments.shop)" data-value="0">全选</span></div>
            </div>
        </div>
        <div class="rows_title"><span>配套设施</span></div>
    </div>
	</div>
</template>
<script>
	var Vue = require('vue')
        ,data = require('./data').data
        ,validates = require('./validate').validates;  
	Vue.use(require('./vue-validator.min.js'));
	module.exports = {		
		data:function(){
			return data
		},
		validator:{
		    validates: validates
  		},
  		methods:{
  			change:function(t,p){				
				var arr = document.getElementsByClassName("radio");
				this[p] = t;
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
	        select:function(e,id,p){
				var div = document.getElementById(id)
					, divselector = div.querySelector("ul").parentNode;

				divselector.style.display = "block";
				if (e.target.nodeName==="LI") {
					this[p] = e.target.innerHTML;
					divselector.style.display = "none";
				};
			},
			toggle: function (item) {
      			item.done = !item.done;      			
    		},
    		checkAll:function(e,items){
    			var isAllCheck = !parseInt(e.target.getAttribute("data-value"));

    			var innerHTML =  isAllCheck ? "取消":"全选";
    			e.target.setAttribute("data-value",isAllCheck?1:0);
    			for (var i = items.length - 1; i >= 0; i--) {
    				items[i].done = isAllCheck;
    			};
    			e.target.innerHTML = innerHTML;
    		}
  		}
	}
</script>