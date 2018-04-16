import fetch from 'components/config/fetch'
var login = (username, password) => fetch('post', 'loginOut/userLogin', {
	username: username,
	password: password
});
var getPendingEditNum = () => fetch('post', 'SCLogin/getPendingEditNum', {});
//客户管理
var userOverviewList = (registeTime) => fetch('post', 'SCLogin/userOverviewList', {
	registeTime: registeTime
});
var userList = (params) => fetch('post', 'SCLogin/userList', params);
var advertiserInfo = (userId, curPage) => fetch('post', 'SCLogin/advertiserInfo', {
	userId: userId,
	curPage: curPage
});
var carUserInfo = (userId, curPage) => fetch('post', 'SCLogin/carUserInfo', {
	userId: userId,
	curPage: curPage
});
var advertiserAndCarInfo = (userId) => fetch('post', 'SCLogin/advertiserAndCarInfo', {
	userId: userId
});
var queryLawerTaskInfo = (userId, curPage) => fetch('post', 'SCLogin/queryLawerTaskInfo', {
	userId: userId,
	curPage: curPage
});
var queryLawerCarInfo = (userId, curPage) => fetch('post', 'SCLogin/queryLawerCarInfo', {
	userId: userId,
	curPage: curPage
});
var companyList = (params) => fetch('post', 'SCLogin/companyList', params);
var checkCompanyInfo = (companyId) => fetch('post', 'SCLogin/checkCompanyInfo', {
	companyId: companyId
});
var deleteUser = (remark, userFlag, userId) => fetch('post', 'SCLogin/deleteUser', {
	remark: remark,
	userFlag: userFlag,
	userId: userId
});
var userListExport = (params) => fetch('post', 'SCLogin/userListExport', params);
var userAndCarAudit = (auditType, auditId, remark, operationType) => fetch('post', 'SCLogin/userAndCarAudit', {
	auditType: auditType,
	auditId: auditId,
	remark: remark,
	operationType: operationType
})
//车辆管理
var carList = (params) => fetch('post', 'SCLogin/carList', params);
var carInfo = (carCode) => fetch('post', 'SCLogin/carInfo', {
	carCode: carCode
});
var carListExport = (params) => fetch('post', 'SCLogin/carListExport', params)
//任务管理
var taskList = (params) => fetch('post', 'SCLogin/taskList', params); //任务列表
var taskEdit = (params) => fetch('post', 'SCLogin/taskEdit', params); //添加&编辑任务
var orderExamineList = (taskNo, curPage, orderState) => fetch('post', 'SCLogin/orderExamineList', {
	taskNo: taskNo,
	curPage: curPage,
	orderState: orderState
});
var orderExamineInfo = (taskNo) => fetch('post', 'SCLogin/orderExamineInfo', {
	taskNo: taskNo
});
var taskExamineList = (params) => fetch('post', 'SCLogin/taskExamineList', params); //审核列表
var checktask = (taskNo) => fetch('post', 'SCLogin/checktask', {
	taskNo: taskNo
}); //任务详情查看/编辑反显
var orderOnImgOperator = (operatorFlag, orderId, remark) => fetch('post', 'SCLogin/orderOnImgOperator', {
	operatorFlag: operatorFlag,
	orderId: orderId,
	remark: remark
});
var orderOperator = (operatorFlag, orderId, remark) => fetch('post', 'SCLogin/orderOperator', {
	operatorFlag: operatorFlag,
	orderId: orderId,
	remark: remark
});

//管理员
var adminAndRoleList = () => fetch('post', 'SCLogin/adminAndRoleList', {}); //查询管理员列表
var roleToAdminList = (roleId, curPage) => fetch('post', 'SCLogin/roleToAdminList', {
	roleId: roleId,
	curPage: curPage
}); //查询某管理员下面的成员
var adminUserList = (roleId, loginName, curPage) => fetch('post', 'SCLogin/adminUserList', {
	roleId: roleId,
	loginName: loginName,
	curPage: curPage
}); //查询管理员列表
var adminLogList = (curPage) => fetch('post', 'SCLogin/adminLogList', {
	curPage: curPage
});
var roleList = () => fetch('post', 'SCLogin/roleList', {});
var getRoleOfMenuList = (roleId) => fetch('post', 'SCLogin/getRoleOfMenuList', {
	roleId: roleId
});
var delAdmin = (adminUserId) => fetch('post', 'SCLogin/delAdmin', {
	adminUserId: adminUserId
});
var saveRole = (roleForm) => fetch('post', 'SCLogin/saveRole', roleForm);
var saveAdmin = (addAdminForm) => fetch('post', 'SCLogin/saveAdmin', addAdminForm);
var getRoleOfMenuList = (roleId) => fetch('post', 'SCLogin/getRoleOfMenuList', {
	roleId: roleId
});
var updateRole = (roleId, power) => fetch('post', 'SCLogin/updateRole', {
	roleId: roleId,
	power: power
});
var roleBindUser = (adminUserId, roleId) => fetch('post', 'SCLogin/roleBindUser', {
	adminUserId: adminUserId,
	roleId: roleId
});
var releaseRoleUser = (adminUserId) => fetch('post', 'SCLogin/releaseRoleUser', {
	adminUserId: adminUserId
});
var delRole = (roleId) => fetch('post', 'SCLogin/delRole', {
	roleId: roleId
})
//营收总览
var achievementList = (orderFinishTime) => fetch('post', 'SCLogin/achievementList', {
	orderFinishTime: orderFinishTime
});
//工具字典
var getCarBrands = () => fetch('post', 'SCLogin/getCarBrands', {});
var getUserCarBrands = ()=> fetch('post','SCLogin/getUserCarBrands',{})
var getCarModel = (brand) => fetch('post', 'SCLogin/getCarModel', {
	brand: brand
});
var getUserCarSeries = (brand) => fetch('post','SCLogin/getUserCarSeries',{brand:brand})
var getCarConstructs = (brand, carSerial) => fetch('post', 'SCLogin/getCarConstructs', {
	brand: brand,
	carSerial: carSerial
})
var getUserCarConstructs = (brand,carSerial) =>fetch('post','SCLogin/getUserCarConstructs',{brand:brand,carSerial:carSerial})
var getCarColor = (brand, carModel) => fetch('post', 'SCLogin/getCarColor', {
	brand: brand,
	carModel: carModel
});
var checkCities = (cityId) => fetch('post', 'SCLogin/checkCities', {
	cityId: cityId
});
var checkProvinces = () => fetch('post', 'SCLogin/checkProvinces', {});
var getCompanyList = () => fetch('post', 'SCLogin/getCompanyList', {});
var getBeautyGreesList = () => fetch('post', 'SCLogin/getBeautyGreesList', {});
//字典表
var dictionaryList = (curPage, classification, classificationName) => fetch('post', 'SCLogin/dictionaryList', {
	curPage: curPage,
	classification: classification,
	classificationName: classificationName
})
var addDictionary = (params) => fetch('post', 'SCLogin/addDictionary', params);
var getDictionaryNameList = (classfication) => fetch('post', 'SCLogin/getDictionaryNameList', {
	classfication: classfication
});
var addOrModifyCompanyInfo = (params) => fetch('post', 'SCLogin/addOrModifyCompanyInfo', params);
var delDictionary = (classification) => fetch('post', 'SCLogin/delDictionary', {
	classification: classification
});
var updDictionary = (beforeClassification, afterClassification) => fetch('post', 'SCLogin/updDictionary', {
	beforeClassification: beforeClassification,
	afterClassification: afterClassification
})
var editDictionary = (params) => fetch('post', 'SCLogin/editDictionary', params);
var delDictionaryName = (dictionaryId) => fetch('post', 'SCLogin/delDictionaryName', {
	dictionaryId: dictionaryId
});
//实时监控
var realTimeMonitor = (hour) => fetch('post', 'SCLogin/realTimeMonitor', {
	hour: hour
});
var onlineTaskList = (curPage) => fetch('post', 'SCLogin/onlineTaskList', {
	curPage: curPage
});
//提现
var withdrawRecord = (params) => fetch('post', 'SCLogin/withdrawRecord', params);
var userAccountWithdraw = (withdrawId) => fetch('post', 'SCLogin/userAccountWithdraw', {
	withdrawId: withdrawId
});
//退出
var userLogOut = () => fetch('post', 'SCLogin/userLogOut', {});


var canpanyInfo =(params)=>fetch('post','APPloginOut/canpanyInfo',params);
var getProvinces = ()=>fetch('post','APPloginOut/getProvinces',{});
var getCities = (cityId)=>fetch('post','APPloginOut/getCities',{cityId:cityId})
export {
	canpanyInfo,
	getProvinces,
	getCities,


	login,
	getPendingEditNum,
	adminAndRoleList,
	roleToAdminList,
	adminUserList,
	adminLogList,
	roleList,
	getRoleOfMenuList,
	delAdmin,
	saveRole,
	saveAdmin,
	updateRole,
	achievementList,
	taskList,
	getCarModel,
	getCarBrands,
	getCarColor,
	checkCities,
	checkProvinces,
	getCompanyList,
	carList,
	taskEdit,
	orderExamineList,
	checktask,
	getBeautyGreesList,
	taskExamineList,
	userOverviewList,
	carInfo,
	userList,
	advertiserAndCarInfo,
	carUserInfo,
	advertiserInfo,
	dictionaryList,
	addDictionary,
	queryLawerCarInfo,
	queryLawerTaskInfo,
	getDictionaryNameList,
	addOrModifyCompanyInfo,
	companyList,
	checkCompanyInfo,
	deleteUser,
	userListExport,
	userAndCarAudit,
	realTimeMonitor,
	onlineTaskList,
	orderExamineInfo,
	orderOnImgOperator,
	orderOperator,
	withdrawRecord,
	userAccountWithdraw,
	userLogOut,
	roleBindUser,
	delRole,
	releaseRoleUser,
	delDictionary,
	updDictionary,
	editDictionary,
	delDictionaryName,
	carListExport,
	getCarConstructs,
	getUserCarBrands,
	getUserCarSeries,
	getUserCarConstructs
}