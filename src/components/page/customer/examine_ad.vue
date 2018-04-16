<template>
	<div class="detailCar detail">
		<el-button type="primary" @click="goBack()" style="float:right">返回</el-button>
		<h3>个人信息</h3>
		<table>
			<tr><td class="title">姓名</td><td>{{advertiserInfo.USER_NAME}}</td><td class="title">联系电话</td><td>{{advertiserInfo.MOBILE}}</td></tr>
			<tr><td class="title">邮箱</td><td>{{advertiserInfo.EMAIL}}</td><td class="title">证件类型</td><td>{{advertiserInfo.CARD_TYPE}}</td></tr>
			<tr><td class="title">证件号</td>
				<td>{{advertiserInfo.ID_CARD}}</td>
				<td class="title">证件照片</td>
				<td class="carImg">
					<a :href="CARD_IMG[0]"><img :src="CARD_IMG[0]"></a>
					<a :href="CARD_IMG[1]"><img :src="CARD_IMG[1]"/></a>
				</td>
			</tr>
			
		</table>
		<div style="text-align: right;">
			<el-button type="primary" @click="userAudit('1')">通过</el-button>
			<el-button type="warning" @click="reject()">驳回</el-button>
		</div>


		<el-dialog title="提示" :visible.sync="dialogRejectVisible"  width="30%" center>
			
	        <el-form>
	            <el-form-item label="禁用/启用原因">
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
import $ from 'jquery'
import {advertiserInfo,userAndCarAudit} from 'service/getData'
import tasktable from './taskTable'
	export default{
		data(){
			return{
				dialogRejectVisible:false,
				operationtype:'1',
				advertiserInfo:'',
				taskInfo:'',
				totalCnt:'',
				totalPage:'',
				backCurPage:'',
				userId:'',
				remark:'',
				curPage:'',
				CARD_IMG:[],

			}
		},
		mixins:[mixinUtils],
		mounted(){
			this.userId = this.$route.query.userId;
			this.getAdvertiserInfo(this.userId,1,false);
		},
		methods:{
			getAdvertiserInfo(userId,curPage,isTable){
				advertiserInfo(userId,curPage).then(res=>{
					console.log(res);
					if(res.code=='000'){
						// if(!isTable){
						// 	this.advertiserInfo = res.advertiserInfo;
						// }
						// this.taskInfo = res.taskInfo;
						// this.totalCnt = res.taskInfo;
						// this.totalPage = res.totalPage;
						// this.backCurPage = res.backCurPage;


						this.advertiserInfo = res.advertiserInfo;
						this.CARD_IMG = res.advertiserInfo.CARD_IMG.split(',');

					}
				})
			},
			// exmAdListPageChange(val){
			// 	this.curPage = val;
			// 	this.getAdvertiserInfo(this.userId,val,true)
			// },
			reject(){
				this.dialogRejectVisible = true;
			},
			cancel(){
				this.dialogRejectVisible = false;
				this.remark = '';
			},
			confirm(operationType){
				this.doUserAndCarAudit(operationType);
			},
			userAudit(operationType){
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
				console.log("dfdgdfs");
				userAndCarAudit(1,this.userId,this.remark,operationType).then(res=>{
		        	console.log(res);
		        	if(res.code=="000"){
		        		this.getAdvertiserInfo(this.userId,this.curPage,true);
		        		this.$message.success('操作成功')
		        	}else{
		        		this.$message.error(res.msg)
		        	}
				})
			}
			
		},
		updated(){
			baguetteBox.run('.carImg');
		},
		components:{tasktable}
	}
</script>
<style scoped>
.detailCar{}
</style>