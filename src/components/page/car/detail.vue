<template>
	<div class="detailCar detail">
		<el-button type="primary" @click="goBack()" style="float:right">返回</el-button>
		<h3>个人信息</h3>
		<table>
			<tr><td class="title">司机姓名</td><td>{{userInfo.userName}}</td><td class="title">身份证号</td><td>{{userInfo.idCard}}</td></tr>
			<tr>
				<td class="title">初次领取驾照日期</td>
				<td>{{userInfo.firstDrivingTime}}</td>
				<td class="title">注册时间</td>
				<td>{{userInfo.regisTime}}</td>
			</tr>
			<tr><td class="title">注册手机号</td><td>{{userInfo.mobile}}</td><td class="title">当前状态</td><td>{{userInfo.userState}}</td></tr>
		</table>
		<h3>车辆信息</h3>
		<table>
			<tr><td class="title">城市</td><td>{{carInfo.city}}</td><td class="title">车牌号</td><td>{{carInfo.carCode}}</td></tr>
			<tr><td class="title">品牌</td><td>{{carInfo.carModel}}</td><td class="title">车主姓名</td><td>{{carInfo.carOwnerName}}</td></tr>
			<tr><td class="title">车型</td><td>{{carInfo.carForm}}</td><td class="title">是否网约车</td><td>{{carInfo.isNetCar}}</td></tr>
			<tr><td class="title">车辆注册日期</td><td>{{carInfo.regisTime}}</td><td class="title">车辆状态</td><td>{{carInfo.orderState}}</td></tr>
		</table>
		<h3>任务信息-{{taskNum}}个</h3>
		<div class="detail_dataTable">
			<tasktable :tableData="carTaskList"></tasktable>
		</div>
		
	</div>
</template>
<script>
import {mixinUtils} from 'components/config/mixin'
import {carInfo} from 'service/getData'
import tasktable from './car_tasktable'
	export default{
		data(){
			return{
				carCode:'',
				taskNum:'',
				carTaskList:'',
				userInfo:'',
				carInfo:'',
			}
		},
		components:{tasktable},
		mixins: [mixinUtils],
		mounted(){
			this.carCode = this.$route.query.carCode;
			this.getCarInfo();

		},
		methods:{
			getCarInfo(){
				//SCLogin/carInfo.do
				carInfo(this.carCode).then(res=>{
					console.log(res);
					if(res.code=="000"){
						this.userInfo = res.userInfo;
						this.carInfo = res.carInfo;
						this.carTaskList = res.taskList;
						this.taskNum = res.taskList.length;
					}
				});
			},
			back(){
				window.history.go(-1);
			}
		},
		updated(){
			baguetteBox.run('.onlineImg');
			baguetteBox.run('.offlineImg');
		},
		
	}
</script>
<style scoped>
.detailCar{}
</style>