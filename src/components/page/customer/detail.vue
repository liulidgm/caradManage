<template>
	<div class="detailCar detail">
		<el-button type="primary" @click="goBack()" style="float:right">返回</el-button>
		<h3>个人信息</h3>
		<table>
			<tr><td class="title">姓名</td><td>{{adAndCarInfo.name}}</td><td class="title">联系电话</td><td>{{adAndCarInfo.linkMobile}}</td></tr>
			<tr><td class="title">邮箱</td><td>{{adAndCarInfo.email}}</td><td class="title">证件类型</td><td>{{adAndCarInfo.cardType}}</td></tr>
			<tr>
				<td class="title">证件号</td><td>{{adAndCarInfo.cardId}}</td>
				<td class="title">证件照片</td>
				<td class="carImgs">
					<a v-for="img in cardImgs" :href="img"><img style="width:150px;height:150px;margin-left:20px;" :src="img"></a>
					<!-- <img src="../../../assets/logo.png">
					<img src="../../../assets/logo.png"/> -->
				</td>
			</tr>
			<tr><td class="title">初次领取驾照日期</td><td>{{adAndCarInfo.firstGetDrivingTime}}</td><td class="title">注册时间</td><td>{{adAndCarInfo.insDate}}</td></tr>
			<tr><td class="title">注册手机号</td><td>{{adAndCarInfo.mobile}}</td><td class="title">当前状态</td><td>{{adAndCarInfo.userState}}</td></tr>
		</table>
		<h3>车辆信息-{{carTotalCnt}}辆</h3>
		<cartable :carInfo = 'carInfo' @linkToCardetail='linkToCardetail'></cartable>
		<div class="block">
              <el-pagination
                layout="prev, pager, next"
                :total="carTotalCnt"
                @current-change="carListPageChange">
              </el-pagination>
        </div>
		<h3>任务信息-{{taskTotalCnt}}个</h3>
		<tasktable :taskData = "taskInfo"></tasktable>
		<div class="block">
              <el-pagination
                layout="prev, pager, next"
                :total="taskTotalCnt"
                @current-change="taskListPageChange">
              </el-pagination>
        </div>
		
	</div>
</template>
<script>
import {mixinUtils} from 'components/config/mixin'
import tasktable from './taskTable'
import cartable from './carTable'
import {advertiserAndCarInfo,queryLawerCarInfo,queryLawerTaskInfo} from 'service/getData'
	export default{
		data(){
			return{
				userId:'',
				carInfo:[],
				carTotalCnt:0,
				taskInfo:[],
				taskTotalCnt:0,
				adAndCarInfo:'',
				cardImgs:[],
			}
		},
		mixins:[mixinUtils],
		updated(){
			baguetteBox.run('.task_exmall_img');
			baguetteBox.run('.carImgs');
		},
		mounted(){
			this.userId = this.$route.query.userId;
			Promise.all([
        		this.getCarInfo(this.userId,1), 
        		this.getTaskInfo(this.userId,1), 
        		this.getAdAndCarInfo(this.userId),
        		]).then(function(results){
			    	console.log(results);
				});
		},
		methods:{
			getCarInfo(userId,curPage){
        		var _this = this;
        		var p = new Promise(function(resolve, reject){
					queryLawerCarInfo(userId,curPage).then(res=>{
	        			console.log(res);
	        			if(res.code=="000"){
	        				_this.carInfo = res.carList||[];
	        				_this.carTotalCnt = res.totalCnt;
	        			}
	        		});
        		})
        		return p;
        	},
        	getTaskInfo(userId,curPage){
        		var _this = this;
        		var p = new Promise(function(resolve, reject){
					queryLawerTaskInfo(userId,curPage).then(res=>{
	        			console.log(res);
	        			if(res.code=="000"){
	        				_this.taskInfo = res.taskInfo;
	        				_this.taskTotalCnt = res.totalCnt;
	        			}
	        		});
        		})
        		return p;
        	},
        	getAdAndCarInfo(userId){
        		var _this = this;
        		var p = new Promise(function(resolve, reject){
					advertiserAndCarInfo(userId).then(res=>{
	        			console.log(res);
	        			if(res.code=="000"){
	        				_this.adAndCarInfo = res.advertiserAndCarInfo;
	        				if(res.advertiserAndCarInfo.cardImg.length>0) _this.cardImgs = res.advertiserAndCarInfo.cardImg.split(',');
	        			}
	        		});
        		})
        		return p;
        	},
        	linkToCardetail(carCode){
				console.log(carCode);
				this.$router.push('/carDetail?carCode='+carCode)
			},
			carListPageChange(val){
				this.getCarUserInfo(this.userId,val);
			},
			taskListPageChange(){
				this.getTaskInfo(this.userId,val);
			}

		},
		components:{tasktable,cartable}
	}
</script>
<style scoped>
.detailCar{}
</style>