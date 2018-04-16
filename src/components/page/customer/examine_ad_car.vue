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
				<td class="cardImg">
					<a v-for="img in cardImg" :href="img"><img :src="img"></a>
					<!-- <img src="../../../assets/logo.png">
					<img src="../../../assets/logo.png"/> -->
				</td>
			</tr>
			<tr><td class="title">初次领取驾照日期</td><td>{{adAndCarInfo.firstGetDrivingTime}}</td><td class="title">注册时间</td><td>{{adAndCarInfo.insDate}}</td></tr>
			<tr><td class="title">注册手机号</td><td>{{adAndCarInfo.mobile}}</td><td class="title">当前状态</td><td>{{adAndCarInfo.userState}}</td></tr>
		</table>
		<h3>车辆信息-{{carTotalCnt}}辆</h3>
		<!-- <cartable :carInfo = 'carInfo' :operationtype='operationtype'></cartable> -->
		<cartable :carInfo = 'carInfo' @userAudit='userAudit' @reject="reject" @cancel="cancel" @linkToCardetail="linkToCardetail" :operationtype="operationtype"></cartable>
		<div class="block">
              <el-pagination
                layout="prev, pager, next"
                :total="carTotalCnt"
                @current-change="carListPageChange">
              </el-pagination>
        </div>
		<!-- <h3>任务信息-{{taskTotalCnt}}个</h3>
		<tasktable :taskData = "taskInfo" :operationtype='operationtype'></tasktable> -->
		<el-dialog title="提示" :visible.sync="dialogRejectVisible"  width="30%" center>
	        <el-form>
	            <el-form-item label="驳回原因">
	                <el-input type="textarea" v-model="remark"></el-input>
	            </el-form-item>
	        </el-form>
	      <span slot="footer" class="dialog-footer">
	        <el-button @click="cancel()">取 消</el-button>
	        <el-button type="primary" @click="confirm('2')">确 定</el-button>
	      </span>
	    </el-dialog>
	</div>
</template>
<script>
import {mixinUtils} from 'components/config/mixin'
import tasktable from './taskTable'
import cartable from './carTable'
import {advertiserAndCarInfo,queryLawerCarInfo,queryLawerTaskInfo,userAndCarAudit,carUserInfo} from 'service/getData'
	export default{
		data(){
			return{
				dialogRejectVisible:false,
				operationtype:'1',
				userId:'',
				carInfo:[],
				carTotalCnt:0,
				taskInfo:[],
				taskTotalCnt:'',
				adAndCarInfo:'',
				cardImg:[],
				remark:'',
				curPage:1
			}
		},
		mixins:[mixinUtils],
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
		updated(){
			baguetteBox.run('.carImg');
		},
		methods:{
			linkToCardetail(carCode){
				// console.log(carCode);
				this.$router.push('/carDetail?carCode='+carCode)
			},
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
	        				if(res.advertiserAndCarInfo.cardImg.length>0) _this.cardImg = res.advertiserAndCarInfo.cardImg.split(',');
	        			}
	        		});
        		})
        		return p;
        	},
        	reject(carCode){
				this.carCode = carCode;
				this.dialogRejectVisible = true;
			},
			cancel(){
				this.dialogRejectVisible = false;
				this.remark = '';
			},
			confirm(operationType){
				this.doUserAndCarAudit(operationType);
			},
			userAudit(carCode,operationType){
				console.log(carCode+","+operationType);
				this.carCode = carCode;
				this.$confirm('确定审核通过吗?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	this.doUserAndCarAudit(operationType);
		        }).catch(() => {
		                 
		        });

			},
			carListPageChange(val){
				this.curPage = val;
				this.getCarInfo(this.userId,val)
			},
			doUserAndCarAudit(operationType){
				// auditType
				// auditId
				// remark
				// operationType
				userAndCarAudit(2,this.carCode,this.remark,operationType).then(res=>{
		        	console.log(res);
		        	if(res.code=="000"){
		        		this.dialogRejectVisible = false;
		        		this.getCarInfo(this.userId,this.curPage);
		        		this.$message({
					        type: 'success',
					        message: '操作成功'
					    });
		        	}else{
		        		this.$message.error(res.msg)
		        	}
				})
			}

		},
		components:{tasktable,cartable}
	}
</script>
<style scoped>
.detailCar{}
</style>