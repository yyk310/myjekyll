(function(win){
  /*
  * 是否为数组
  */
	function isArrar(arr){
	  return Object.prototype.toString.call(arr) === '[object Array]';
	}
	/*
  * 是否为函数
  */
	function isFunction(fn) {
    return typeof fn == 'function'
  }
  /*
  * 克隆对象
  */
  function cloneObject(obj) {
    var o = null,i = 0,j = 0;
    if(typeof(obj) !== "object" || obj === null){ return obj };
    if(isArrar(obj)){
      o = [];j = obj.length;
      for(;i<j;i++){
        if(typeof(obj[i])=="object" && obj[i]!=null){
				  o[i]=arguments.callee(obj[i]);
			  }
			  else{
				  o[i]=obj[i];
			  }
      }
    }else{
      o={};
  		for(i in obj){
  			if(typeof(obj[i])=="object" && obj[i]!=null){
  				o[i]=arguments.callee(obj[i]);
  			}
  			else{
  				o[i]=obj[i];
  			}
  		}
    }return o;
  }
  
  /*
  * 数组去重
  * 作为下标会被转换为字符串，这样1, '1'等不同类型的值会对应到同一个下标而被去重，但实际应该保留。把 hash 表的值从 true 改为一个数组，里面保存出现过的类型就行了。
  */
  function uniqArray(arr) {
    if(!isArrar(arr)) return false;
    var result = [],n = {},len = arr.length,val, type; 
    for (var i = 0; i < len; i++) {  
        val = arr[i];  
        type = typeof val;  
        if (!n[val]|| n[val].indexOf(type) < 0) {  
            n[val] = [type];  
            result.push(val);  
        } 
    }  
    return result;  
  }
  /*
  * 循环形式的trim
  */
  function simpleTrim(str) {
    var whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
    for (var i = 0; i < str.length; i++) {
      if (whitespace.indexOf(str.charAt(i)) === -1) {
        str = str.substring(i);
        break;
      }
    }
    for (i = str.length - 1; i >= 0; i--) {
      if (whitespace.indexOf(str.charAt(i)) === -1) {
        str = str.substring(0, i + 1);
        break;
      }
    }
    return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
  }
  /*
  * 正则形式的trim（推荐）
  */
  function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, ""); 
  }
  /*
  * 一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
  */  
  function each(arr, fn) {
      if (!isArrar(arr)) {return false};
      var l = arr.length;
      for (var i = 0; i < l; i++) {
        fn.call(this,arr[i],i);
      };
  }
  /*
  * 获取一个对象里面第一层元素的数量，返回一个整数
  */  
  function getObjectLength(obj) {
    var i = 0;
    for (p in obj) {
      i++;
    };
    return i;
  }
  // 另一种写法
  //function getObjectLength(obj) {
    //return Object.keys(obj).length;
  //}

  /*
  * 邮箱验证
  */
  function isEmail(emailStr){
    var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(emailStr);
  }
  /*
  * 手机验证
  */
  function isMobilePhone(phone) {
    var mobileRegex = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    return mobileRegex.test(emailStr);
  }
  /*
  * 为element增加一个样式名为newClassName的新样式
  */
  function addClass(element, newClassName) {
    if (element && newClassName && typeof newClassName === "string" ) {
      var className = element.className;
      className  = className + " " + newClassName;
      element.className = className;
    };
  }
  /*
  * 移除element中的样式oldClassName
  */  
  function removeClass(element, oldClassName) {
    if (element && oldClassName && typeof oldClassName === "string" ) {
        var className = element.className;
        if (className.indexOf(oldClassName)) {
          className = className.replace(oldClassName,"");
        };
        element.className = className;
    };
  }

  function isSiblingNode(element, siblingNode){
    return element.parentNode === siblingNode.parentNode;
  }
  /*
  * 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
  */ 
  function getPosition(element){
    var x = 0, y = 0;
    while(element != null){
      x += element.offsetLeft;
      y += element.offsetTop;
      element = element.offsetParent;
    }
    return { x : x, y : y };
  }

  function $(selector){
    var parts = selector.replace(/\s+/, " ").split(" ");
  }
}(window))
