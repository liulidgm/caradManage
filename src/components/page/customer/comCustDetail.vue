<template>
	<div class="detailCar detail">
		<h3>个人信息</h3>
		<table>
			<tr><td class="title">用户名</td><td>{{companyInfo.userName}}</td><td class="title">企业名称</td><td>{{companyInfo.companyName}}</td></tr>
			<tr><td class="title">主体资质</td><td>{{companyInfo.mainQuality}}</td><td class="title">公司地址</td><td>{{companyInfo.companyAddress}}</td></tr>
			<tr><td class="title">注册地址</td><td>{{companyInfo.registeAddress}}</td><td class="title">所属行业</td><td>{{companyInfo.industry}}</td></tr>
			<tr><td class="title">注册号</td><td>{{companyInfo.registeNum}}</td><td class="title">电话号码</td><td>{{companyInfo.companyTell}}</td></tr>
			<tr><td class="title">有效期</td><td>{{companyInfo.validTime}}</td><td class="title">企业邮箱</td><td>{{companyInfo.companyEmail}}</td></tr>
			<tr><td class="title">联系人姓名</td><td>{{companyInfo.linkName}}</td><td class="title">联系人电话</td><td>{{companyInfo.linkTell}}</td></tr>
			<tr><td class="title">企业法人姓名</td><td>{{companyInfo.companyLawerName}}</td><td class="title">企业法人证件类型</td><td>{{companyInfo.lawerCardType}}</td></tr>
			<tr>
				<td class="title">企业法人证件号码</td><td>{{companyInfo.lawerCardNo}}</td>
				<td class="title">证件照片</td>
				<td class="carImg">
					<a v-for="img in companyInfo.lawerCardImg" :href="img"><img :src="img"></a>
					<!-- <a href="http://man.okcarad.com/app/data/1514285879278.jpg"><img src="http://man.okcarad.com/app/data/1514285879278.jpg"></a> -->
					<!-- <a :href="companyInfo.lawerCardImg[0]"><img :src="companyInfo.lawerCardImg[0]"></a>
					<a :href="companyInfo.lawerCardImg[1]"><img :src="companyInfo.lawerCardImg[1]"></a> -->
				</td>
			</tr>
			<tr>
				<td class="title">资质照片</td>
				<td class="qulityImg">
					<a :href="companyInfo.qulityImg"><img :src="companyInfo.qulityImg"></a>
				</td>
				<td class="title">企业LOGO</td>
				<td class="companyLogo">
					<a :href="companyInfo.companyLogo"><img :src="companyInfo.companyLogo"></a></td>
				</tr>
		</table>
		<!-- <h3>车辆信息-{{carTotalCnt}}辆</h3>
		<cartable :carInfo = 'carInfo'></cartable> -->
		<h3>任务信息-{{taskTotalCnt}}个</h3>
		<tasktable :taskData = "taskList"></tasktable>
		
	</div>
</template>
<script>
import tasktable from './taskTable'
import cartable from './carTable'
import {advertiserAndCarInfo,queryLawerCarInfo,queryLawerTaskInfo,checkCompanyInfo} from 'service/getData'
	export default{
		data(){
			return{
				companyId:'',
				companyInfo:'',
				carInfo:[],
				carTotalCnt:'',
				taskList:[],
				taskTotalCnt:'',
				adAndCarInfo:'',
				lawerCardImg:[],
			}
		},
		mounted(){
			this.companyId = this.$route.query.companyId;
			this.getCompanyInfo(this.companyId);
			// Promise.all([
        		
   //      		]).then(function(results){
			//     	console.log(results);
			// 	});
		},
		methods:{
			getCompanyInfo(companyId){
				//checkCompanyInfo
				checkCompanyInfo(companyId).then(res=>{
					this.companyInfo = res.companyInfo;

					this.taskList = res.taskList;
					this.taskTotalCnt = res.totalCnt;
				})
			}

		},
		updated(){
			baguetteBox.run('.carImg');
			baguetteBox.run('.qulityImg');
			baguetteBox.run('.companyLogo');
			baguetteBox.run('.task_exmall_img');
		},
		components:{tasktable,cartable}
	}
</script>
<style scoped>
.detailCar{}
</style>