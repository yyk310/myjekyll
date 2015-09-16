(function(win,doc){
	var defaults = {
		message:{
			require:"不能为空",
			min_length: '%s 长度不足 %s ',
            max_length: '%s 超出长度 %s ',
            numeric:"必须为数字",
            integer:"必须为整数"		
		},
		callback:function(error){

		}

	}
	var ruleRegex = /^(.+?)\[(.+)\]$/,
		numericRegex = /^[0-9]+$/,
		integerRegex = /^\-?[0-9]+$/;

	var zuValidater = function(formname,fields,callback){
		this.form = this._formByName(formname) || {};
	}	
}(window,document))