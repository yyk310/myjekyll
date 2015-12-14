exports.editPage = function(data){
	// 处理房屋配套
	function foreq (obj,str){
		for (var i = obj.length - 1; i >= 0; i--) {
			if (str.indexOf(obj[i].text)>=0) {
				obj[i].done = true;
			};
		};
	}
	// 处理房源图片
	function addFile(imgurls){
		var imgarr = imgurls.split(',');
		if (imgurls&&imgarr.length) {
			var $list = $("#fileList");
			for (var i = 0; i < imgarr.length; i++) {
				                      
			    (function (index) {
			        var $li = $('<li data-url=' + imgarr[index] + '><p class="imgWrap"></p></li>'),
	                $btns = $('<div class="file-panel"><span class="cancel">删除</span></div>').appendTo($li),
	                $img = $("<img>").appendTo($li),
		            $wrap = $li.find('p.imgWrap');

			        $li.appendTo($list);

			        var img = $('<img src="' + imgarr[index] + '">');
			        $wrap.empty().append(img);

			        $li.on('mouseenter', function () {
			            $btns.stop().animate({ height: 30 });
			        });

			        $li.on('mouseleave', function () {
			            $btns.stop().animate({ height: 0 });
			        });
			        $btns.on('click', 'span', function () {
			            $(this).parent().parent().remove();
			        });
			    }(i))
			};
		};
	}	
	this.htype = data.Purpose;
	this.rtype = data.Mright;
	this.projname = data.ProjName;
	this.projcode = data.ProjCode;
	this.district = data.District;
	this.comarea = data.Comarea;
	this.address = data.Address;
	this.room = data.Room;
	this.hall = data.Hall;
	this.toilet = data.Toilet;
	
	if (this.htype=='住宅'||this.htype=='别墅') {		
		this.area = data.Buildingarea;
		this.floor = data.Floor; 
		this.totalFloor = data.Totlefloor 
		this.price = data.Price; 
	}else if(this.htype=='商铺'){		
		this.sarea = data.Buildingarea;
		this.sfloor = data.Floor; 
		this.stotalFloor = data.Totlefloor 
		this.sprice = data.Price;
		this.shopType = data.ShangYongType;
		this.shopGrade = data.PuMianJiBieType;
		this.shopState = data.ShopOfficeStatus;
		foreq(this.manageCategorys,data.ManagementCategory);
	}else{
		this.oarea = data.Buildingarea;
		this.ofloor = data.Floor; 
		this.ototalFloor = data.Totlefloor 
		this.oprice = data.Price; 
		this.officeType = data.ShangYongType;
		this.officeGrade = data.PuMianJiBieType;
	}
	
	this.title = data.Title;
	this.description = data.Description;
	addFile(data.ExtendInfo) ; // 需要图片处理
	this.fitment = data.Fitment == "简单装修" ? "简装修" : data.Fitment;
	this.forward = data.Forward;
	this.payinfo = data.PayInfo;
	if (this.htype=='住宅') {		
		foreq(this.equitments.rent,data.Equitment);
	}else if(this.htype=='别墅'){
		foreq(this.equitments.villa,data.Equitment);
	}else if(this.htype=='商铺'){		
		foreq(this.equitments.shop,data.Equitment);
	}
	this.equitment = data.Equitment;
	this.checkIndate = data.BeginTime;
	this.username = data.ContactPerson;
	this.usermobile = data.MobileCode;
	this.rentway = data.RentWay;
	this.gender = data.RentGender;
	this.priceType = data.Pricetype;
	this.partner = data.IsShortrent;
	this.limitdate = data.LimitDate;
	this.issplit = data.Issplit;
	this.iswuyefei = data.IsWuYeFei;
	this.wuyefei = data.WuYeFei;
	this.wuyecompany = data.WuYeCompany;
	this.isuse400 = data.Isuse400 == 1 ? true : false;
}
