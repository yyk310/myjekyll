<template>
	<div class="block_wrap block_content">
		<div class="block_title"><h2>详细信息</h2></div>
		<div class="block_content">
			<div class="rows_wrap clearfix custom_name">
				<div class="rows_content">
					<div v-class="tip:true,												
						validate_error:validation.title.invalid
						">
						<span v-show="validation.title.required">请填写标题</span>
					    <span v-show="validation.title.contact">不允许包含联系方式</span>
					    <span v-show="validation.title.minLength&&validation.title.dirty">标题不足5个字</span>
					    <span v-show="validation.title.maxLength">标题大于30个字</span>
					</div>
					<div v-class="input_text_wrap:true, error:validation.title.invalid&&validation.title.dirty,success:validation.title.valid" style="position: relative;">
						<input type="inputText" maxlength="30" v-model="title" v-validate="required,minLength:5,maxLength:60,contact">
					</div>
				</div>
				<div class="rows_title"><span><span class="rows_title_star">*</span>标题</span></div>
			</div>
			<div class="rows_wrap clearfix custom_name">
				<div class="rows_content">
					<div class="tip validate_error" id="desctip">						
					</div>
					<script id="editor" type="text/plain" style="width:540px;height:268px;" class="editor"></script>
					<input type="hidden" v-model="description" id="desc"/>
				</div>
				<div class="rows_title"><span><span class="rows_title_star">*</span>房源描述</span></div>
			</div>
			<div class="rows_wrap clearfix custom_name">
				<div class="rows_content">
					<div class="tip"></div>
					<div id="uploader">
						<div class="imgbar_wrap"><ul class="clearfix img_list filelist" id="fileList"><li class="first_icon" style="display: none;"><i></i></li></ul> <div class="upload_wrap"><div><div id="uploader-demo"><div id="filePicker">选择图片</div></div></div><div class="info">添加几张照片，让您的信息更受欢迎（最多上传<span>10</span>张，每张最大<span>5M</span>）</div></div></div>
					</div>
				</div>
				<div class="rows_title"><span>上传图片</span>
				</div>
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
		validator: {
		    validates: validates
  		}
	}
</script>