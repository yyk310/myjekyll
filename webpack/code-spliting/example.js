var a = require("./a");
var b = require("./b");
require.ensure(["./c"],function(require){
	require("./b").xyz();
	require("./d");
})