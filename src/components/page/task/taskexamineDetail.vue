<template>
	<div class="detailCar detail">
		<el-button @click="back()">返回</el-button>
		<h3>企业信息</h3>
		<table>
			<tr><td class="title">用户名</td><td>{{companyInfo.userName}}</td><td class="title">企业名称</td><td>{{companyInfo.companyName}}</td></tr>
			<tr><td class="title">主体资质</td><td>{{companyInfo.mainQuality}}</td><td class="title">公司地址</td><td>{{companyInfo.companyAdds}}</td></tr>
			<tr><td class="title">注册地址</td><td>{{companyInfo.registAdds}}</td><td class="title">所属行业</td><td>{{companyInfo.industry}}</td></tr>
			<tr><td class="title">注册号</td><td>{{companyInfo.registNum}}</td><td class="title">电话号码</td><td>{{companyInfo.companyTell}}</td></tr>
			
			<tr><td class="title">有效期</td><td>{{companyInfo.validityTime}}</td><td class="title">企业邮箱</td><td>{{companyInfo.companyEmail}}</td></tr>
			<tr><td class="title">联系人姓名</td><td>{{companyInfo.linkName}}</td><td class="title">联系人电话</td><td>{{companyInfo.linkMobile}}</td></tr>

			<tr>
				<td class="title">企业法人姓名</td>
				<td>{{companyInfo.companylawerName}}</td>
				<td class="title">企业法人证件类型</td>
				<td>{{companyInfo.cardTypeName}}</td>
			</tr>
			<tr>
				<td class="title">企业法人证件号码</td>
				<td>{{companyInfo.lawerCardNo}}</td>
				<td class="title">证件照片</td>
				<td class="companyCardImg">
					<a v-for="img in companyInfo.companyCardImg" :href="img"><img :src="img"></a>
				</td>
			</tr>
			<tr>
				<td class="title">资质照片</td>
				<td class="qulityImg">
					<a :href="companyInfo.qulityImg"><img :src="companyInfo.qulityImg"></a>
				</td>
				<td class="title">企业logo</td>
				<td class="companyLogo">
					<a :href="companyInfo.companyLogo"><img :src="companyInfo.companyLogo"></a>
				</td>
			</tr>
		</table>
		<h3>任务信息</h3>
		<table>
			<tr><td class="title">投放区域</td><td>{{taskInfo.cityName}}</td><td class="title">所需车辆</td><td>{{taskInfo.requestCarNum}}</td></tr>
			<tr><td class="title">车型</td><td>{{taskInfo.carForm}}</td><td class="title">是否网约车</td><td>{{taskInfo.isNetCar}}</td></tr>
			<tr><td class="title">投放起始日期</td><td>{{taskInfo.taskStartTime}}</td><td class="title">投放结束日期</td><td>{{taskInfo.taskEndTime}}</td></tr>
			<tr><td class="title">上刊周期</td><td>{{taskInfo.taskPeriod}}天</td><td class="title">任务状态</td><td>{{taskInfo.taskState}}</td></tr>
			<tr><td class="title">上刊名称</td><td>{{taskInfo.taskName}}</td><td class="title">单笔佣金</td><td>{{taskInfo.singleAmt}}</td></tr>
			<tr><td class="title">上刊美观度</td><td>{{taskInfo.beautyGreesName}}</td><td class="title">支付费用</td><td>{{taskInfo.serviceAmt}}</td></tr>
			<tr><td class="title">利润百分比</td><td>{{taskInfo.percentProfit}}%</td><td class="title">服务费用</td><td>{{taskInfo.investAmt}}</td></tr>

			<tr>
				<td class="title">上刊图</td>
				<td colspan="3" class="exhibitionImg">
					<a v-for="imgSrc in taskInfo.exhibitionImg" :href="imgSrc"><img  :src="imgSrc"></a>
				</td>
			</tr>	
		</table>
		<h3>
			订单信息
			-{{orderNums.noUpImgNum}}个接单未上刊
			-{{orderNums.auditNum}}个待审核
			-{{orderNums.runningNum}}个进行中
			-{{orderNums.rejectNum}}个已驳回
			-{{orderNums.successNum}}个已完成
		</h3>
		<div class="s_input clear" style="margin-top:20px;">
			<label>订单状态</label>
			<el-select v-model="orderState" placeholder="请选择">
				<el-option key="" value="" label="全部"></el-option>
				<el-option key="0" value="0" label="已领取未上刊"></el-option>
				<el-option key="1" value="1" label="待审核"></el-option>
				<el-option key="2" value="2" label="进行中"></el-option>
				<el-option key="3" value="3" label="已驳回"></el-option>
				<el-option key="4" value="4" label="已完成"></el-option>
				<!-- 0:已领取未上刊1：待审核2：进行中3：已驳回4：已完成 -->
			</el-select>
			<el-button type="primary" @click="searchOrder()">查询</el-button>
		</div>
		<div class="detail_dataTable">
			<exmall :exmallData='exmallData' @audit="audit" @reject="reject"></exmall>
		</div>
		<div class="block">
			  <el-pagination
			    layout="prev, pager, next"
			    :total="totalCnt"
			    @current-change="orderListPageChange">
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
	        <el-button type="primary" @click="confirm()">确 定</el-button>
	      </span>
	    </el-dialog>
		<input type="hidden" id="orderState" value="">
		<input type="hidden" id="orderId" value="">
	</div>
</template>
<script>
import $ from 'jquery'
import mixin from 'components/config/mixin'
import exmall from './tableData/exm_all'
import {orderExamineList,orderExamineInfo,orderOperator,orderOnImgOperator} from 'service/getData'
	export default{
		data(){
			return{
				dialogRejectVisible:false,
				activeName2: 'first',
				taskNo:'',
				curPage:'',
				totalCnt:0,
				showPage:'',
				exmallData:[],
				taskInfo:{},
				companyInfo:{},
				orderState:'',
				remark:'',
				orderNums:{},
				// onlineImg :["/app/data1516241526942.JPEG","/app/data1516241540007.JPEG"],
			}
		},
		mixmins:{mixin},
		mounted(){
			this.taskNo = this.$route.query.taskNo;
			this.getOrderExamineInfo(this.taskNo);
			this.getOrderExamineList(this.taskNo,1,'');
			
		},
		
		methods:{
			getOrderExamineInfo(taskNo){
				orderExamineInfo(taskNo).then(res=>{
					// console.log("任务详情");
					// console.log(res);
					if(res.code=='000'){
						this.companyInfo = res.companyInfo;
						this.taskInfo = res.taskInfo;
						this.$nextTick(function(){
			                baguetteBox.run('.exhibitionImg');
			                baguetteBox.run('.companyCardImg');
							baguetteBox.run('.qulityImg');
							baguetteBox.run('.companyLogo');
			            })

					}
				})
			},
			getOrderExamineList(taskNo,curPage,orderState){
				//taskNo
				//curPage
				//orderState
				orderExamineList(taskNo,curPage,orderState).then(res=>{
					console.log(res);
					if(res.code=='000'){
						this.exmallData = res.orderList;
						this.totalCnt = res.totalCnt;
						this.curPage = res.backCurPage;
						this.orderNums = res.orderNums;
						this.$nextTick(() => {
		  
		                });
					}
				})
			},
			searchOrder(){
				this.getOrderExamineList(this.taskNo,1,this.orderState);
			},
			orderListPageChange(val){
				this.curPage = val;
				this.getOrderExamineList(this.taskNo,val,this.orderState);
			},
			reject(orderId,orderState){
				$("#orderState").val(orderState);
				$("#orderId").val(orderId);
				this.dialogRejectVisible = true;
			},
			audit(orderId,orderState){
				this.$confirm('确定审核通过吗?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	this.orderOpt('0',orderId,'',orderState);
		        }).catch(() => {
		                    
		        });
			},
			confirm(){
				var orderState = $("#orderState").val();
				var orderId = $("#orderId").val();
				this.orderOpt('1',orderId,this.remark,orderState);
			},
			cancel(){
				this.dialogRejectVisible = false;
				this.remark = '';
			},
			orderOpt(operatorFlag,orderId,remark,orderState){
				// operatorFlag
				// orderId
				// remark
				if(orderState=='0'){
					orderOnImgOperator(operatorFlag,orderId,remark).then(res=>{
						if(res.code=='000'){
							this.getOrderExamineList(this.taskNo,this.curPage,orderState)
							this.$message.success('操作成功')
						}else{
							this.$message.error(res.msg)
						}
					})
				}else{
					orderOperator(operatorFlag,orderId,remark).then(res=>{
						if(res.code=='000'){
							this.getOrderExamineList(this.taskNo,this.curPage,orderState)
							this.$message.success('操作成功')
						}else{
							this.$message.error(res.msg)
						}
					})
				}
				

			},

			back(){
				window.history.go(-1);
			},
			handleClick(tab, event) {
		        console.log(tab, event);
		    }
		},
		updated(){
			
			baguetteBox.run('.overviewImg');
		},
		components:{
	    	exmall
	    }
	}
</script>
<style scoped>
.detailCar{}
</style>