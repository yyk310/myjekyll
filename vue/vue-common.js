(function (Vue) {
    // 默认配置
    var defaults = {
        pageSize: 12,// 一页显示的数目
        pageIndex: 1,// 当前页码
        pages: [], // 页码集合[1,2,3...]
        totalPage: 1, // 总数        
        items: {} // list集合
    };
    // 存放用户的原始配置
    var originOPS = {};
    
    var VM = (function () {
        var vm = function (options) {
            return new vm.fnstart.init(options);
        }
        // 初始化
        vm.fnstart = vm.prototype = {
            init: function (options) {
                var _this = this; // _this 指向 vm.fnstart对象，方便 _this.query 调用
                originOPS = clone(options); // 保存用户的原始配置
                var v = new Vue({           // vue实例初始化
                    el: options.el,
                    data: mix(options.data, defaults, false),
                    methods: mix(options.methods, {
                        // 查询
                        search: function () {
                            this.pageIndex = arguments[0] || this.pageIndex;
                            _this.query.call(this, originOPS);
                        }
                    },false),
                    components: {
                        // 分页组件
                        "page-components": {
                            props: ['pageSize', 'pageIndex', 'pages', 'totalPage'],
                            template: '<ul class="pagination">' +
                                '<li><a href="javascript:void(0)" v-on="click:search(1)">首页</a></li>' +
                                '<li><a href="javascript:void(0);" v-on="click:prev">上一页</a></li>' +
                                '<li v-repeat="page in pages"><a href="javascript:void(0);" v-class="{true:\'active\'}[pageIndex==page]" v-on="click:loadPage(page)">{{ page }}</a></li>' +
                                '<li><a href="javascript:void(0);" v-on="click:next">下一页</a></li>' +
                                '<li><a href="javascript:void(0)" v-on="click:search(totalPage)">末页</a></li></ul>',
                            data: function () {
                                return options.data;
                            },
                            methods: {
                                // 下一页
                                next: function () {
                                    if (this.pageIndex < this.totalPage) {
                                        this.pageIndex++;
                                        this.search();
                                    }
                                },
                                // 上一页
                                prev: function () {
                                    if (this.pageIndex > 1) {
                                        this.pageIndex--;
                                        this.search();
                                    }
                                },
                                // 点击页码
                                loadPage: function (page) {
                                    this.pageIndex = page;
                                    this.search();
                                },
                                // 查询
                                search: function () {
                                    this.pageIndex = arguments[0] || this.pageIndex;
                                    _this.query.call(this, originOPS);
                                }
                            }
                        }
                    },
                    // 在编译完成后调用
                    compiled: function () {
                        this.search();
                    }
                });
            },
            query: function (options) {
                var self = this,// vue实例对象
                    resource = self.$resource(options.url.search),// 用于ajax请求
                    proparr = []; // 搜索参数  pageSize pageIndex是必须，options.data自定义 

                for (var p in options.data) {
                    proparr.push(p);
                }
                 
                var temp = clone(options); // 克隆一个新对象   //     例 temp.data = {a:1,b:2} concat后的结果为 ["a","b","pageSize","pageIndex"]
                resource.get(mix(temp.data, self, true, proparr.concat(["pageSize", "pageIndex"])), function (data) { // mix(temp.data, self, true, proparr) 将self对象的属性复制到temp.data上
                    self.items = eval(data.entitylist);

                    self.totalPage = Math.ceil(data.count / self.pageSize);                  
                    if (self.totalPage > 2) {
                        if (self.pageIndex > 1 && self.pageIndex < self.totalPage) {
                            self.pages = [
                                self.pageIndex - 1,
                                self.pageIndex,
                                self.pageIndex + 1
                            ];
                        } else if (self.pageIndex == 1) {
                            self.pages = [
                                self.pageIndex,
                                self.pageIndex + 1,
                                self.pageIndex + 2
                            ];
                        } else if (self.pageIndex == self.totalPage) {
                            self.pages = [
                                self.pageIndex - 2,
                                self.pageIndex - 1,
                                self.pageIndex
                            ];
                        };
                    } else {
                        self.pages = [1, 2];
                    }
                });
            }
        }
        vm.fnstart.init.prototype = vm.prototype;
        return vm;
    }())

    window.VM = VM;
    /*
   * 将源对象的成员复制到目标对象中
   * @param { Object } 目标对象
   * @param { Object } 源对象
   * @param { Boolean } 是否覆盖 默认为true(覆盖)
   * @param { Array } 只复制该数组中在源对象中的属性
   * @return { Object } 目标对象
   */
    function mix(target, source, override, whitelist) {
        if (!target || !source) return;
        if (override === undefined) {
            override = true;
        }

        var prop, len, i,
            _mix = function (prop) {
                if (override === true || !(prop in target)) {
                    target[prop] = source[prop];
                }
            };

        if (whitelist && (len = whitelist.length)) {
            for (i = len; i;) {
                prop = whitelist[--i];
                if (prop in source) {
                    _mix(prop);
                }
            }
        }
        else {
            for (prop in source) {
                _mix(prop);
            }
        }

        return target;
    };

    /*
    * 克隆一个新对象
    */
    function clone(myObj) {
        if (typeof (myObj) != 'object') return myObj;
        if (myObj == null) return myObj;

        var myNewObj = new Object();

        for (var i in myObj)
            myNewObj[i] = clone(myObj[i]);

        return myNewObj;
    }
}(Vue))