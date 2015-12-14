exports.savePage = function(data,houseid){
	return {
		HouseId:houseid,
		Purpose:data.htype,				
		Mright:data.rtype,
		ProjName:data.projname,
		ProjCode:data.projcode,
		District:data.district,	
		Comarea:data.comarea,	
		Address:data.address,	
		Room:data.room,
		Hall:data.hall,
		Toilet:data.toilet,
		Buildingarea:(function(){
			if (data.htype=='写字楼') {
				return data.oarea;
			}else if(data.htype=='商铺'){
				return data.sarea;
			}else{
				return data.area;
			}
		}()),
		Floor:(function(){
			if (data.htype=='写字楼') {
				return data.ofloor;
			}else if(data.htype=='商铺'){
				return data.sfloor;
			}else{
				return data.floor;
			}
		}()),
		Totlefloor:(function(){
			if (data.htype=='写字楼') {
				return data.ototalFloor;
			}else if(data.htype=='商铺'){
				return data.stotalFloor;
			}else{
				return data.totalFloor;
			}
		}()),
		Price:(function(){
			if (data.htype=='写字楼') {
				return data.oprice;
			}else if(data.htype=='商铺'){
				return data.sprice;
			}else{
				return data.price;
			}
		}()),
		Title:data.title,
		Description:data.description,
		ExtendInfo:data.imgurl.toString(),
		Fitment:data.fitment,
		Forward:data.forward,
		PayInfo:data.payinfo,
		Equitment:data.equitment,
		BeginTime:data.checkIndate,
		ContactPerson:data.username,
		MobileCode:data.usermobile,
		RentWay:data.rentway,
		RentGender:data.gender,
		Pricetype:data.priceType,
		IsShortrent:data.partner,
		ShangYongType:data.htype=='写字楼'?data.officeType:data.shopType,
		PuMianJiBieType:data.htype=='写字楼'?data.officeGrade:data.shopGrade,
		ShopOfficeStatus:data.shopState,
		LimitDate:data.limitdate,
		Issplit:data.issplit,
		IsWuYeFei:data.iswuyefei,
		WuYeFei:data.wuyefei,
		WuYeCompany:data.wuyecompany,
		ManagementCategory:data.manageCategory,
		Isuse400:data.isuse400?1:0,
	}
}
