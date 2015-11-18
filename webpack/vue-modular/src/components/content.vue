<template>
	<div v-if="htype=='写字楼'||htype=='商铺'"></div>
	<div v-if="htype=='住宅'||htype=='别墅'">
    <div class="rows_wrap clearfix custom_name" v-if="rtype=='整租'">
        <div class="rows_content">
            <div v-class="tip:true,												
						validate_error:validation.room.invalid||validation.hall.invalid||validation.toilet.invalid||validation.area.invalid	
						">
                <span v-show="(validation.room.required||validation.hall.required||validation.toilet.required||validation.area.required)">请填写数字</span>
                <span v-show="validation.room.numeric&&validation.room.dirty">室只能为数字</span>
                <span v-show="validation.hall.numeric&&validation.hall.dirty">厅只能为数字</span>
                <span v-show="validation.toilet.numeric&&validation.toilet.dirty">卫只能为数字</span>
                <span v-show="validation.area.numeric&&validation.area.dirty">面积只能为数字</span>
                <span v-show="validation.area.min&&validation.area.dirty">面积不能小于1</span>
                <span v-show="validation.area.max&&validation.area.dirty">面积不能大于10000</span>

            </div>
            <div v-class="input_text_wrap:true, clearfix:true, error:validation.room.invalid&&validation.room.dirty,success:validation.room.valid" style="position: relative;">
                <input type="inputText" maxlength="1" style="width: 95px;" v-model="room" v-validate="required,numeric"><span>室</span>
            </div>
            <div v-class="input_text_wrap:true, clearfix:true, error:validation.hall.invalid&&validation.hall.dirty,success:validation.hall.valid" style="position: relative;">
                <input type="inputText" maxlength="1" style="width: 95px;" v-model="hall" v-validate="required,numeric"><span>厅</span>
            </div>
            <div v-class="input_text_wrap:true, clearfix:true, error:validation.toilet.invalid&&validation.toilet.dirty,success:validation.toilet.valid" style="position: relative;">
                <input type="inputText" maxlength="1" style="width: 95px;" v-model="toilet" v-validate="required,numeric"><span>卫</span>
            </div>
            <div v-class="input_text_wrap:true, clearfix:true, error:validation.area.invalid&&validation.area.dirty,success:validation.area.valid" style="position: relative;">
                <span>共</span><input type="inputText" style="width: 95px;" v-model="area" v-validate="required,numeric,min:1,max:10000"><span>㎡</span>
            </div>
        </div>
        <div class="rows_title"><span><span class="rows_title_star">*</span>房屋户型</span></div>
    </div>
    <div class="rows_wrap clearfix custom_name" v-if="rtype=='合租'">
        <div class="rows_content">
            <div v-class="tip:true,												
						validate_error:validation.partner.invalid
						">
                <span v-show="validation.partner.notdefault">请选择合租户数</span>

            </div>
            <div class="selectordef" id="divrentway" style="z-index: 1493; width: 128px;" v-on="click:select($event,'divrentway','rentway')">
                <div class="title">
                    <span class="seled">{{rentway}}</span>
                    <div class="arrow"></div>
                    <input type="hidden" v-validate="notdefault" v-model="rentway" />
                </div>
                <div class="optiondef" style="width: 125px; display: none;">
                    <ul style="width: 125px;" v-on="mouseover:changeClass($event,'sel'),mouseout:changeClass($event,'sel')">
                        <li v-repeat="rentways">{{text}}</li>
                    </ul>
                </div>
            </div>
            <div class="selectordef" id="divpartner" style="z-index: 1492; width: 148px;" v-on="click:select($event,'divpartner','partner')">
                <div class="title">
                    <span class="seled">{{partner}}</span>
                    <div class="arrow"></div>
                    <input type="hidden" v-validate="notdefault:'请选择合租户数'" v-model="partner" />
                </div>
                <div class="optiondef" style="width: 125px; display: none;">
                    <ul style="width: 125px;" v-on="mouseover:changeClass($event,'sel'),mouseout:changeClass($event,'sel')">
                        <li v-repeat="partners">{{text}}</li>
                    </ul>
                </div>
            </div>
            <div class="selectordef" id="divgender" style="z-index: 1490; width: 128px;" v-on="click:select($event,'divgender','gender')">
                <div class="title">
                    <span class="seled">{{gender}}</span>
                    <div class="arrow"></div>
                    <input type="hidden" v-validate="notdefault" v-model="gender" />
                </div>
                <div class="optiondef" style="width: 125px; display: none;">
                    <ul style="width: 125px;" v-on="mouseover:changeClass($event,'sel'),mouseout:changeClass($event,'sel')">
                        <li v-repeat="genders">{{text}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="rows_title"><span><span class="rows_title_star">*</span>房屋户型</span></div>
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
				validate_error:validation.forward.invalid
				">
                <span v-show="validation.forward.notdefault">请选择一个值</span>
            </div>
            <div class="selectordef" id="divforward" style="z-index: 1481; width: 128px;" v-on="click:select($event,'divforward','forward')">
                <div class="title">
                    <span class="seled">{{forward}}</span>
                    <div class="arrow"></div>
                    <input type="hidden" v-validate="notdefault" v-model="forward" />
                </div>
                <div class="optiondef" style="width: 125px; display: none;">
                    <ul style="width: 125px;" v-on="mouseover:changeClass($event,'sel'),mouseout:changeClass($event,'sel')">
                        <li v-repeat="forwards">{{text}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="rows_title"><span><span class="rows_title_star">*</span>朝向</span></div>
    </div>
    <div class="rows_wrap clearfix custom_name">
        <div class="rows_content">
            <div v-class="tip:true,												
				validate_error:validation.floor.invalid||validation.totalFloor.invalid
				">
                <span v-show="(validation.floor.required||validation.totalFloor.required)">请填写数字</span>
                <span v-show="(validation.floor.numeric||validation.totalFloor.numeric)&&validation.floor.dirty">楼层只能为数字</span>
                <span v-show="(validation.floor.less_than||validation.floor.greater_than)&&validation.floor.dirty">楼层不能大于总楼层</span>
            </div>
            <div v-class="input_text_wrap:true, clearfix:true, error:validation.floor.invalid&&validation.floor.dirty,success:validation.floor.valid" style="position: relative;">
                <span>第</span><input type="inputText" maxlength="2" style="width: 95px;" v-model="floor" v-validate="required,numeric,less_than:totalFloor"><span>层</span>
            </div>
            <div v-class="input_text_wrap:true, clearfix:true, error:validation.totalFloor.invalid&&validation.totalFloor.dirty,success:validation.totalFloor.valid" style="position: relative;">
                <span>共</span><input type="inputText" maxlength="2" style="width: 95px;" v-model="totalFloor" v-validate="required,numeric,greater_than:floor"><span>层</span>
            </div>
        </div>
        <div class="rows_title"><span><span class="rows_title_star">*</span>楼层</span></div>
    </div>
    <div class="rows_wrap clearfix custom_name">
        <div class="rows_content">
            <div v-class="tip:true,												
				validate_error:validation.price.invalid
				">
                <span v-show="validation.price.required">请填写数字</span>
                <span v-show="validation.price.numeric&&validation.price.dirty">租金只能为数字</span>
                <span v-show="validation.price.min&&validation.price.dirty">租金不能小于100</span>
                <span v-show="validation.price.max&&validation.price.dirty">租金不能大于300000</span>
            </div>
            <div v-class="input_text_wrap:true, clearfix:true, error:validation.price.invalid&&validation.price.dirty,success:validation.price.valid" style="position: relative;">
                <input type="inputText" style="width: 128px;" v-model="price" v-validate="required,numeric,min:100,max:300000"><span>{{priceType}}</span>
            </div>
            <div class="selectordef success" id="divpayinfo" style="z-index: 1481; width: 128px;" v-on="click:select($event,'divpayinfo','payinfo')">
                <div class="title">
                    <span class="seled">{{payinfo}}</span>
                    <div class="arrow"></div>
                </div>
                <div class="optiondef" style="width: 125px; display: none;">
                    <ul style="width: 125px;" v-on="mouseover:changeClass($event,'sel'),mouseout:changeClass($event,'sel')">
                        <li v-repeat="payinfos">{{text}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="rows_title"><span><span class="rows_title_star">*</span>租金</span></div>
    </div>
    <div class="rows_wrap clearfix custom_name">
        <div class="rows_content">
            <div class="tip" style="display: none;"></div>
            <div class="checkbox_wrap clearfix">
                <div style="width: 95px;" v-repeat="item in htype=='住宅'?equitments.rent:equitments.villa" v-on="click:toggle(item)" v-class="checkbox:true,focus:item.done"><i></i>
                    <label>{{item.text}}</label></div>
                <div class="select_all"><span v-on="click:checkAll($event,htype=='住宅'?equitments.rent:equitments.villa)" data-value="0">全选</span></div>
            </div>
        </div>
        <div class="rows_title"><span>配套设施</span></div>
    </div>
    </div>
</template>
<script>
	var Vue = require('vue')
        ,data = require('../data').data
        ,validates = require('../validate').validates;  
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