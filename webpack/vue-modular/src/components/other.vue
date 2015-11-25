<template>
	<div class="block_wrap block_content">
		<div class="block_title"><h2>其他信息</h2></div>
		<div class="block_content">
			<div class="rows_wrap clearfix custom_name">
				<div class="rows_content">
					<div v-class="tip:true,												
						validate_error:validation.checkIndate.invalid
						">
						<span v-show="validation.checkIndate.required">请选择入住时间</span>	
					    			   
					</div>
					<div v-class="input_text_wrap:true, error:validation.checkIndate.invalid&&validation.checkIndate.dirty,success:validation.checkIndate.valid" style="position: relative;">
						<input type="inputText" class="slectIcon timeBtn" id="checkIndate" v-model="checkIndate" v-validate="required" style="width:153px;">
					</div>
				</div>
				<div class="rows_title"><span><span class="rows_title_star">*</span>入住时间</span></div>
			</div>
			<div class="rows_wrap clearfix custom_name">
				<div class="rows_content">
					<div v-class="tip:true,												
						validate_error:validation.username.invalid
						">
						<span v-show="validation.username.required">请填写联系人</span>	
					    <span v-show="validation.username.specialSymbol">联系人不能填写特殊符号</span>
					    <span v-show="(validation.username.minLength||validation.username.maxLength)&&validation.username.dirty">1～6个字，不能填写电话和特殊符号</span>					   
					</div>
					<div v-class="input_text_wrap:true, error:validation.username.invalid&&validation.username.dirty,success:validation.username.valid" style="position: relative;">
						<input type="inputText" maxlength="6" v-model="username" v-validate="required,minLength:1,maxLength:6,specialSymbol">
					</div>
				</div>
				<div class="rows_title"><span><span class="rows_title_star">*</span>联系人</span></div>
			</div>
			<div class="rows_wrap clearfix custom_name">
				<div class="rows_content">
					<div v-class="tip:true,												
						validate_error:validation.usermobile.invalid
						">
						<span v-show="validation.usermobile.required">请填写手机号码</span>	
					    <span v-show="validation.usermobile.mobile&&validation.usermobile.dirty">请填写正确的手机号码</span>					    
					</div>
					<div v-class="input_text_wrap:true, error:validation.usermobile.invalid&&validation.usermobile.dirty,success:validation.usermobile.valid" style="position: relative;">
						<input type="inputText" maxlength="11" v-model="usermobile" v-validate="required,mobile">
					</div>					
				</div>
				<div class="rows_title"><span><span class="rows_title_star">*</span>联系电话</span></div>
			</div>				
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
  		}
	}
</script>