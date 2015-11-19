exports.validates = {		      	
  	numeric: function (val) {
  		return /^[0-9]+$/.test(val);
  	},
  	less_than:function(val, field){
  		if (!/^\-?[0-9]*\.?[0-9]+$/.test(field)) {
    		return false;
		}
		return (parseFloat(val) <= parseFloat(field));
  	},
  	greater_than:function(val, field){
  		if (!/^\-?[0-9]*\.?[0-9]+$/.test(field)) {
    		return false;
		}
		return (parseFloat(val) >= parseFloat(field));
  	},
  	badwords:function(val){
  		return function(resolve, reject){
  			fetch('/filter/badwords',{
  				method:'post',
  				headers:{
	              'content-type': 'application/json',
	              'x-token': 'xxxxxxxx'
	            },
				body: JSON.stringify({ title: val })
  			}).then(function(res){
  				if (res.status === 200) {
	              resolve()
	            } else if (res.status === 400) {
	              // something todo ...
	            }	

  			}).catch(function (err) {
	            // something todo ...
	            reject()
	        })
  		}
  	},
  	contact:function(val){
  		return !/.*1[34578]\d{9}.*|.*(0\d{2,4}-)?[2-9]\d{6,7}(-\d{2,5})?.*|.*(?!\d+(-\d+){3,})[48]00(-?\d){7,10}.*/.test(val);
  	},  	
  	specialSymbol:function(val){
		return !/((?=[\x21-\x7e]+)[^A-Za-z0-9])/.test(val);
	},
	mobile:function(val){
		var numberRegStr = /^\d{11}$/;
		var regNum = new RegExp(numberRegStr);
		if (regNum.test(val)) {
			var telRegStr = /^(13|14|15|17|18)\d{9}$/;
			var reg = new RegExp(telRegStr);
			return reg.test(val);							
		} else {
			return false;
		}
	},
	notdefault:function(val,field){
		if (field) {return val != field;};
		return val !="请选择";
	}
}