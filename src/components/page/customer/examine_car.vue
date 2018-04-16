<template>
	<div class="detailCar detail">
		<el-button type="primary" @click="goBack()" style="float:right">返回</el-button>
		<h3>个人信息</h3>
		<table>
			<tr><td class="title">司机姓名</td><td>{{carUserInfo.USER_NAME}}</td><td class="title">身份证号</td><td>{{carUserInfo.ID_CARD}}</td></tr>
			<tr><td class="title">初次领取驾照日期</td><td>{{carUserInfo.FIRST_GET_DRIVING_TIME}}</td><td class="title">注册时间</td><td>{{carUserInfo.INS_DATE}}</td></tr>
			<tr><td class="title">注册手机号</td><td>{{carUserInfo.MOBILE}}</td><td class="title">当前状态</td><td>{{carUserInfo.DEL_FLAG}}</td></tr>
		</table>
		<h3>车辆信息-{{totalCnt}}辆</h3>
		<cartable :carInfo = 'carInfo' @userAudit='userAudit' @reject="reject" @cancel="cancel" @linkToCardetail="linkToCardetail" :operationtype="operationtype"></cartable>
        <div class="block">
              <el-pagination
                layout="prev, pager, next"
                :total="totalCnt"
                @current-change="carListPageChange">
              </el-pagination>
        </div>


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
import {carUserInfo,userAndCarAudit} from 'service/getData'
import cartable from './carTable'
	export default{
		data(){
			return{
				dialogRejectVisible:false,
				remark:'',
				operationtype:'1',
				userId:'',
				curPage:'',
				////
				carUserInfo:'',
				carInfo:[],
				totalCnt:0,
				totalPage:'',
				backCurPage:'',
				curPage:'',
				carCode:'',

			}
		},
		mixins:[mixinUtils],
		mounted(){
			this.userId = this.$route.query.userId;
			this.getCarUserInfo(this.userId,1,false);
		},
		methods:{
			linkToCardetail(carCode){
				// console.log(carCode);
				this.$router.push('/carDetail?carCode='+carCode)
			},
			getCarUserInfo(userId,curPage,isTable){
				carUserInfo(userId,curPage).then(res=>{
					if(res.code=="000"){
						if(!isTable){
							this.carUserInfo = res.carUserInfo;
						}
						
						this.carInfo = res.carInfo;
						this.totalCnt = res.totalCnt;
						this.totalPage = res.totalPage;
						this.backCurPage = res.backCurPage;
					}else{
						this.$message(res.msg);
					}
				})
			},
			carListPageChange(val){
				this.curPage = val;
				this.getCarUserInfo(this.userId,val,true)
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
			doUserAndCarAudit(operationType){
				// auditType
				// auditId
				// remark
				// operationType
				userAndCarAudit(2,this.carCode,this.remark,operationType).then(res=>{
		        	console.log(res);
		        	if(res.code=="000"){
		        		this.dialogRejectVisible = false;
		        		this.getCarUserInfo(this.userId,this.curPage,true);
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
		components:{cartable}
	}
</script>
<style scoped>
.detailCar{}
</style>