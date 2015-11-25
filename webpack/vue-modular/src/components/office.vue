<template>
	<div v-if="htype=='住宅'||htype=='别墅'"></div>
	<div v-if="htype=='写字楼'">
		<div class="rows_wrap clearfix custom_name">
			<div class="rows_content">
	            <div v-class="tip:true,												
							validate_error:validation.officeType.invalid
							">
	                <span v-show="validation.officeType.notdefault">请选择类型</span>
	                <span v-show="validation.officeGrade.notdefault">请选择级别</span>
	            </div>
	            <div class="selectordef" id="divofficeType" style="z-index: 1493; width: 128px;" v-on="click:select($event,'divofficeType','officeType')">
	                <div class="title">
	                    <span class="seled">{{officeType}}</span>
	                    <div class="arrow"></div>
	                    <input type="hidden" v-validate="notdefault:'请选择类型'" v-model="officeType" />
	                </div>
	                <div class="optiondef" style="width: 125px; display: none;">
	                    <ul style="width: 125px;" v-on="mouseover:changeClass($event,'sel'),mouseout:changeClass($event,'sel')">
	                        <li v-repeat="officeTypes">{{text}}</li>
	                    </ul>
	                </div>
	            </div>
	            <div class="selectordef" id="divofficeGrade" style="z-index: 1492; width: 148px;" v-on="click:select($event,'divofficeGrade','officeGrade')">
	                <div class="title">
	                    <span class="seled">{{officeGrade}}</span>
	                    <div class="arrow"></div>
	                    <input type="hidden" v-validate="notdefault:'请选择级别'" v-model="officeGrade" />
	                </div>
	                <div class="optiondef" style="width: 125px; display: none;">
	                    <ul style="width: 125px;" v-on="mouseover:changeClass($event,'sel'),mouseout:changeClass($event,'sel')">
	                        <li v-repeat="officeGrades">{{text}}</li>
	                    </ul>
	                </div>
	            </div>           
	        </div>
	        <div class="rows_title"><span><span class="rows_title_star">*</span>类型/级别</span></div>
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
					validate_error:validation.ofloor.invalid||validation.ototalFloor.invalid||validation.oarea.invalid
					">
	                <span v-show="(validation.ofloor.required||validation.ototalFloor.required)">请填写数字</span>
	                <span v-show="(validation.ofloor.numeric||validation.ototalFloor.numeric)&&validation.ofloor.dirty">楼层只能为数字</span>
	                <span v-show="(validation.ofloor.less_than||validation.ofloor.greater_than)&&validation.ofloor.dirty">楼层不能大于总楼层</span>
	                <span v-show="validation.oarea.float&&validation.oarea.dirty">面积只能为数字，允许两位小数</span>
	                <span v-show="validation.oarea.min&&validation.oarea.dirty">面积不能小于1</span>
	                <span v-show="validation.oarea.max&&validation.oarea.dirty">面积不能大于1000000</span>
	            </div>
	            <div v-class="input_text_wrap:true, clearfix:true, error:validation.ofloor.invalid&&validation.ofloor.dirty,success:validation.ofloor.valid" style="position: relative;">
	                <span>第</span><input type="inputText" maxlength="2" style="width: 95px;" v-model="ofloor" v-validate="required,numeric,less_than:ototalFloor"><span>层</span>
	            </div>
	            <div v-class="input_text_wrap:true, clearfix:true, error:validation.ototalFloor.invalid&&validation.ototalFloor.dirty,success:validation.ototalFloor.valid" style="position: relative;">
	                <span>共</span><input type="inputText" maxlength="2" style="width: 95px;" v-model="ototalFloor" v-validate="required,numeric,greater_than:ofloor"><span>层</span>
	            </div>
	            <div v-class="input_text_wrap:true, clearfix:true, error:validation.oarea.invalid&&validation.oarea.dirty,success:validation.oarea.valid" style="position: relative;">
	                <span>共</span><input type="inputText" style="width: 95px;" v-model="oarea" v-validate="required,float,min:1,max:1000000"><span>㎡</span>
	            </div>
	        </div>
	        <div class="rows_title"><span><span class="rows_title_star">*</span>楼层</span></div>
	    </div>
	    <div class="rows_wrap clearfix custom_name">
	        <div class="rows_content">
	            <div v-class="tip:true,												
					validate_error:validation.oprice.invalid
					">
	                <span v-show="validation.oprice.required">请填写数字</span>
	                <span v-show="validation.oprice.float&&validation.oprice.dirty">租金只能为数字，允许两位小数</span>
	                <span v-show="validation.oprice.min&&validation.oprice.dirty">租金不能小于1</span>
	                <span v-show="validation.oprice.max&&validation.oprice.dirty">租金不能大于3000000</span>
	            </div>
	            <div v-class="input_text_wrap:true, clearfix:true, error:validation.oprice.invalid&&validation.oprice.dirty,success:validation.oprice.valid" style="position: relative;">
	                <input type="inputText" style="width: 128px;" v-model="oprice" v-validate="required,float,min:1,max:3000000"><span>{{priceType}}</span>
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
	            <div class="selectordef success" id="divopayinfo" style="z-index: 1481; width: 128px;" v-on="click:select($event,'divopayinfo','payinfo')">
	                <div class="title">
	                    <span class="seled">{{payinfo}}</span>
	                    <div class="arrow"></div>
	                </div>
	                <div class="optiondef" style="width: 125px; display: none;">
	                    <ul style="width: 125px;" v-on="mouseover:changeClass($event,'sel'),mouseout:changeClass($event,'sel')">
	                        <li v-repeat="officePayinfos">{{text}}</li>
	                    </ul>
	                </div>
	            </div>
	        </div>
	        <div class="rows_title"><span><span class="rows_title_star">*</span>租金</span></div>
	    </div>
	    <div class="rows_wrap clearfix custom_name">
	        <div class="rows_content">
	            <div v-class="tip:true,												
					validate_error:validation.wuyefei.invalid
					">
	                <span v-show="validation.wuyefei.required">请填写数字</span>
	                <span v-show="validation.wuyefei.float&&validation.wuyefei.dirty">物业费只能为数字，允许两位小数</span>
	                <span v-show="validation.wuyefei.min&&validation.wuyefei.dirty">物业费不能小于0</span>
	                <span v-show="validation.wuyefei.max&&validation.wuyefei.dirty">物业费不能大于300000</span>	               
	            </div>	                      
	            <div v-class="input_text_wrap:true, clearfix:true, error:validation.wuyefei.invalid&&validation.wuyefei.dirty,success:validation.wuyefei.valid" style="position: relative;">
	                <input type="inputText" style="width: 128px;" v-model="wuyefei" v-validate="required,float,min:0,max:300000"><span>元/平米·月</span>
	            </div>
	           
           		 <div class="input_text_wrap clearfix" style="position: relative;">
	                <input type="inputText" style="width: 128px;" v-model="wuyecompany"><span>物业公司</span>
	            </div>	
	        </div>
	        <div class="rows_title"><span><span class="rows_title_star">*</span>物业费</span></div>
	    </div>
	     <div class="rows_wrap clearfix custom_name">
	        <div class="rows_content">
	              <div class="radio_wrap clearfix success">
	                <div v-repeat="iswuyefeis" v-class="radio:true,focus:iswuyefei==text" data-value="{{text}}" v-on="click:change(text,'iswuyefei')">
	                    <i></i>
	                    <label>{{text}}</label>
	                </div>
           		</div>
	        </div>
	        <div class="rows_title"><span><span class="rows_title_star">*</span>是否包含物业费</span></div>
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
			}
  		}
	}
</script>