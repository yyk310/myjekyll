<template>
<div class="block_wrap block_content">
			<div class="block_title"><h2>基础信息</h2></div>
			<div class="block_content">
				<div class="rows_wrap clearfix custom_name" style="z-index: 1600;">
					<div class="rows_content">
						<div class="input_text_wrap"> 
							<input type="text" v-model="msg">
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
					<div class="rows_title"><span>位置</span></div></div>	
			</div>
		</div></template>