<template>
	<div class="detailCar detail" v-loading="loading">
		<el-button type="primary" @click="goBack()" style="float:right">返回</el-button>
		<h3>个人信息</h3>
		<table>
			<tr><td class="title">司机姓名</td><td>{{carUserInfo.USER_NAME}}</td><td class="title">身份证号</td><td>{{carUserInfo.ID_CARD}}</td></tr>
			<tr><td class="title">初次领取驾照日期</td><td>{{carUserInfo.FIRST_GET_DRIVING_TIME}}</td><td class="title">注册时间</td><td>{{carUserInfo.INS_DATE}}</td></tr>
			<tr><td class="title">注册手机号</td><td>{{carUserInfo.MOBILE}}</td><td class="title">当前状态</td><td>{{carUserInfo.DEL_FLAG}}</td></tr>
		</table>
		<h3>车辆信息-{{totalCnt}}辆</h3>
		<cartable :carInfo = 'carInfo' :operationtype='operationtype' @linkToCardetail='linkToCardetail'></cartable>
        <div class="block">
              <el-pagination
                layout="prev, pager, next"
                :total="totalCnt"
                @current-change="carListPageChange">
              </el-pagination>
        </div>
		
		
	</div>
</template>
<script>

import {mixinUtils} from 'components/config/mixin'
import cartable from './carTable'
import {carUserInfo} from 'service/getData'
	export default{
		data(){
			return{
				loading:true,
				operationtype:'',
				userId:'',
				curPage:'',
				////
				carUserInfo:'',
				carInfo:'',
				totalCnt:0,
				totalPage:'',
				backCurPage:'',

			}
		},
		mixins:[mixinUtils],
		mounted(){
			this.userId = this.$route.query.userId;
			this.getCarUserInfo(this.userId,1);
		},
		methods:{
			getCarUserInfo(userId,curPage){
				carUserInfo(userId,curPage).then(res=>{
					if(res.code=="000"){
						this.carUserInfo = res.carUserInfo;
						this.carInfo = res.carInfo;
						this.totalCnt = res.totalCnt;
						this.totalPage = res.totalPage;
						this.backCurPage = res.backCurPage;
						this.loading = false
					}else{
						this.$message(res.msg);
					}
				})
			},
			carListPageChange(val){
				this.getCarUserInfo(this.userId,val);
			},
			linkToCardetail(carCode){
				console.log(carCode);
				this.$router.push('/carDetail?carCode='+carCode)
			}
		},
		components:{cartable}
	}
</script>
<style scoped>
.detailCar{}
</style>