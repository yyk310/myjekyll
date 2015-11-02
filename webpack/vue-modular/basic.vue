<template><div class="block_wrap">
			<div class="block_title"><h2>房源类型</h2></div>
			<div class="block_content">
				<div class="rows_wrap clearfix">
					<div class="rows_content">
						<div class="tip" style="display: none;"></div>
						<div class="radio_wrap clearfix success" name="HireType">
							<div tabindex="1" class="radio hover focus" data-value="2"><i></i><label>住宅</label></div>
							<div tabindex="1" class="radio" data-value="0"><i></i><label>别墅</label></div>
							<div tabindex="1" class="radio" data-value="1"><i></i><label>写字楼</label></div>
							<div tabindex="1" class="radio" data-value="3"><i></i><label>商铺</label></div>
						</div>
					</div>
					<div class="rows_title"><span><span class="rows_title_star">*</span>{{houseType}}</span></div>
				</div>
			</div>
		</div>
		<content-a></content-a>
		</template>
		<script>
			var Vue = require('vue');
			var appOptions = require('./content.vue');
			module.exports = {
				data:function(){
					return{
						houseType:'房源类型'
					}
				},
				components:{
					'content-a':appOptions
				}
			}
		</script>
		