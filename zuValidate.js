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
		this.callback = callback || defaults.callback;
		this.errors = [];
		this.fields = {};
		this.messages = {};
		this.handlers = {};
		this.conditionals = {};
		
		for (var i = 0, l = fields.length; i < l; i++) {
			var field = fields[i];
			if ((!field.name && !field.names) || !field.rules) {
				continue;
			};
			if (field.names) {
				for (var j = 0, nl = field.names.length; j < nl; j++) {
					 this._addField(field, field.names[j]);
				};
			} else {
				 this._addField(field, field.name);
			};
		};
	},
	attributeValue = function(element,attributeName){
		var i;
		if ((element.length > 0) && (element[0].type === 'radio' || element[0].type ==='checkbox')) {

		};
	}	
}(window,document))