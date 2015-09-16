(function(){
        function $(id){
            return document.getElementById(id);
        }
        function add(a,b){ return a + b };
        function addEventHandle(){
            var num1 = $("number1").value;
            var num2 = $("number2").value;
            var result = add(num1, num2);
            $("result").innerHTML = result;
        }
        function initEvent() {
            $("addbtn").addEventListener("click", addEventHandle, false);
        }

        initEvent();
    }())