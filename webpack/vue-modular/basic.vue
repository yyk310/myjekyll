
<template>
	<div class="block_wrap">
		<div class="block_title"><h2>房源类型</h2></div>
			<div class="block_content">
				<div class="rows_wrap clearfix">
					<div class="rows_content">
						<div class="tip" style="display: none;"></div>
						<div class="radio_wrap clearfix success">
							<div v-repeat="houseType" tabindex="1" v-class="radio:true,focus:text==htype" v-model="htype"  data-value="{{text}}">
								<i v-on="click:changeType($event)"></i>
								<label v-on="click:changeType($event)">{{text}}</label>
							</div>
						</div>
					</div>
				<div class="rows_title"><span><span class="rows_title_star">*</span>房源类型</span></div>
			</div>
		</div>
	</div>
	<div class="block_wrap block_content">
		<div class="block_title">
			<h2>基础信息</h2>
		</div>
		<div class="block_content">
			<div class="rows_wrap clearfix custom_name" style="z-index: 1600;">
				<div class="rows_content">
					<div class="input_text_wrap"> 							
						<input type="autoComplete"  autocomplete="off" disableautocomplete="true" maxlength="30" placeholder="请输入小区名称" style="width: 395px;" v-model="projname" v-on="keyup:getProjname($event)">
						<div class="tooltip" style=" margin:1px 0 0 -10px;overflow-y:auto;overflow-x:hidden;border:1px solid #ccc;position:absolute;z-index:497;display:none">
							<ul class="autoCompleteul" style="margin:0; padding:0; display:block; width: 100%;  border:0;background:#fff">
							</ul>
						</div>
					</div>
				</div>
				<div class="rows_title"><span><span class="rows_title_star">*</span>小区名称</span></div>
			</div>	
			<div class="rows_wrap clearfix custom_name" >
				<div class="rows_content">
					<div class="tip"></div>
					<div class="textshow clearfix" name="positionshow">
						<span type="textShow" id="positionshow"><span class="ico"></span>
						<span class="textcon textclass"></span></span>
					</div>
				</div>
				<div class="rows_title"><span>位置</span></div>
			</div>	
		</div>
	</div>
</template>
<script>
	var compA = require('./content.vue');
	module.exports = {
		data:function(){
			return{
				houseType:[
					{text:'住宅'},
					{text:'别墅'},
					{text:'写字楼'},
					{text:'商铺'}
				],
				htype:'住宅'	
			}
		},
		methods:{
			changeType:function(e){
				var div = e.target.parentElement;
				var value = div.getAttribute("data-value");	
				var arr = document.getElementsByClassName("radio");
				for (var i = arr.length - 1; i >= 0; i--) {
					arr[i].className = "radio";
					if (arr[i].getAttribute("data-value")===value) {
						arr[i].className = "radio focus";
					}
					else{
						arr[i].className = "radio";	
					};
				};
				this.htype = value;
			},
			getProjname:function(e){	
				var self = this;			
				self.$http.get('/rentinput/postservice/getnewdictlist.aspx',{
						'key':e.target.value,
						'purpose':self.htype
					}, function (data, status, request) {

	      			}).error(function (data, status, request) {
	        		
	      		})
			}
		}
	}
</script>
		