import {getCarBrands,getCarModel,getCarColor,checkCities,getCompanyList,checkProvinces} from 'service/getData'
export function formatUserState(type){
	switch(type){
		case '0':
			return '车主';
			break;
		case '1':
			return '广告主';
			break;
		case '2':
			return '车主&广告主';
			break;
	}
}
export const Encrypt = (val) => {
    var public_key = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCsWr6hFkOtLuSaLAmnO5p7rde8Swuk3j6p/2rh48iU8MjgJNyMy5L1qHM7GDn+R7qpXsHmJ1ZcNozluOhuCxXcjasNJDVQpDLylmPps8kw+4mV916vl3YB3E3DnkbuCxCujiluOOng345TUvwBopcWVlYe51ETR4M7lVzqWpnccwIDAQAB";
    // eslint-disable-next-line
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(public_key);
    var data = encrypt.encrypt(val);
    return data;
}
export const getBrands = () =>{
	getCarBrands().then(res=>{
		if(res.code=='000'){
			return res.brands;
		}
	})	
}
export const getModel = (brand) =>{
	//SCLogin/getCarModel.do
	getCarModel(brand).then(res=>{
		console.log(res);
		if(res.code=="000"){
			return res.carModels
		}
	})
}
export const getColor = (brand,carModel) =>{
	//SCLogin/getCarColor.do
	getCarColor(brand,carModel).then(res=>{
		console.log(res);
		if(res.code=="000"){
			return res.carColors;
		}
	})
}
export const getCities = (cityId) =>{
	//SCLogin/checkCities.do
	checkCities(cityId).then(res=>{
		console.log(res)
	});
}
// export const getProvinces = () => {
//     checkProvinces().then(res=>{
//         console.log(res);
//         if(res.code=='000'){
//         	return res.provinces;
//         	}
//     })
// }
export const getComList = () =>{
	//SCLogin/getCompanyList.do
	getCompanyList().then(res=>{
		console.log(res)
	})
}
export const fn = (a, b) => {
 
}