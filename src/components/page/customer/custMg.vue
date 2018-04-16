<template>
	<div class="custMg">
		<div class="search_area clear">
			<div class="s_input clear"><label>用户名</label><el-input v-model="searchForm.userName" placeholder="用户名"></el-input></div>
			<div class="s_input clear"><label>邮箱</label><el-input v-model="searchForm.email" placeholder="邮箱"></el-input></div>
			<div class="s_input clear">
				<label>用户类型</label>
				<el-select v-model="searchForm.userType" placeholder="请选择">
				    <el-option label="广告主" value="0"></el-option>
				    <el-option label="车主" value="1"></el-option>
				    <el-option label="两者都是" value="2"></el-option>
				</el-select>
			</div>
			
			<div class="s_input clear custMg_registertime"><label>注册时间</label>
				<el-date-picker
			      v-model="registStartTime"
			      type="date"
			      placeholder="选择开始日期"
      			  value-format="yyyy-MM-dd"
      			  @change="changeRegistStartTime">
			    </el-date-picker>
			    <el-date-picker
			      v-model="registEndTime"
			      type="date"
			      placeholder="选择结束日期"
      			  value-format="yyyy-MM-dd"
      			  @change="changeRegistEndTime">
			    </el-date-picker>
			</div>
			<div class="s_input clear">
				<label>状态</label>
				<el-select v-model="searchForm.userState" placeholder="请选择">
				    <el-option label="正常"  value="0"></el-option>
				    <el-option label="禁用"  value="1"></el-option>
				</el-select>
			</div>
			<div class="s_btn_area">
				<el-button type="primary" @click="searchSub()">查询</el-button>
				<el-button type="primary" @click="resetSearchForm()">清空</el-button>
			</div>
		</div>
		<div class="data_area">
			<el-button type="primary" style="float:right;margin-bottom:15px;" @click="exportCust()">导出</el-button>
			<el-table
		    :data="tableData"
		    border
		    style="width: 100%">
		    <el-table-column type="index" width="80"></el-table-column>
		    <el-table-column
		      prop="userName"
		      label="用户名"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="email"
		      label="邮箱"
		      width="200">
		    </el-table-column>
		    <el-table-column
		      prop="address"
		      label="所在城市"
		      width="250">
		    </el-table-column>
		    <el-table-column
		      prop="insDate"
		      label="注册时间">
		    </el-table-column>
		    <el-table-column
		      prop="userFlag"
		      label="用户类型">
		    </el-table-column>
		    <el-table-column
		      prop="delFlag"
		      label="状态">
		    </el-table-column>
		    <el-table-column label="操作" width="200">
		      <template scope="scope">
		        <el-button size="small" @click="handleDetail(scope.row)">查看</el-button>
		        <el-button type="danger" v-if="scope.row.delFlag=='正常'" size="small" @click="disableUser(scope.row.userId,'1')">禁用</el-button>
		        <el-button type="success" v-else size="small" @click="disableUser(scope.row.userId,'0')">启用</el-button>
		      </template>
		    </el-table-column>
		  </el-table>
		  <div class="block">
			  <el-pagination
			    layout="prev, pager, next"
			    :total="userCnt"
			    @current-change="userListPageChange">
			  </el-pagination>
		  </div>
		</div>
		<el-dialog title="提示" :visible.sync="dialogDisableVisible"  width="30%" center>
			
	        <el-form :model="disableForm">
	            <el-form-item label="禁用/启用原因" :label-width="formLabelWidth">
	                <el-input type="textarea" v-model="disableForm.remark"></el-input>
	            </el-form-item>
	        </el-form>
	      <span slot="footer" class="dialog-footer">
	        <el-button @click="cancel()">取 消</el-button>
	        <el-button type="primary" @click="confirm()">确 定</el-button>
	      </span>
	    </el-dialog>
	    <input type="hidden" id="delUserId" value="">
		<input type="hidden" id="delFlag" value="">
	</div>
</template>
<script>
import {userList,advertiserAndCarInfo,carUserInfo,advertiserInfo,deleteUser,userListExport} from 'service/getData'
import $ from 'jquery'
	export default{
		data(){
			return{
				userCnt:0,
				backCurPage:'',
				dialogDisableVisible: false,
				registEndTime:'',
				registStartTime:'',
				disableForm:{
					remark:''
				},
				searchForm:{
					userName:'',
					email:'',
					userType:'',
					registEndTime:'',
					operationType:'1',
					userState:'',
					registStartTime:'',

				},
				tableData: [],
				formLabelWidth:'120'
			}
		},
		mounted(){
			this.getUserList(this.searchForm);
		},
		methods:{
			//userList
			getUserList(params){
				userList(params).then(res=>{
					//console.log(res);
					// userCnt
					// backCurPage
					// userList
					// userPage

					if(res.code=='000'){
						this.userCnt = res.userCnt;
						this.backCurPage = res.backCurPage;
						this.tableData = res.userList;
					}
				})
			},
			changeRegistStartTime(registStartTime){
				this.searchForm.registStartTime = registStartTime;
			},
			changeRegistEndTime(registEndTime){
				this.searchForm.registEndTime = registEndTime;
			},
			searchSub(){
				this.getUserList(this.searchForm);
			},
			exportCust(){
				//userListExport
				userListExport(this.searchForm).then(res=>{
					console.log(res)
					require.ensure([], () => {
		      　　　　const { export_json_to_excel } = require('../../../vendor/Export2Excel');
		      　　　　const tHeader = ['用户名', '邮箱', '所在城市', '注册时间','用户类型','用户状态'];
		      　　　　const filterVal = ['userName', 'email', 'address', 'insDate','userFlag','delFlag'];
		      　　　　const list = res.userList;
		      　　　　const data = this.formatJson(filterVal, list);
		      　　　　export_json_to_excel(tHeader, data, '客户列表');
		      　　})
				})
				// this.$router.push('/addcom');
			},
			formatJson(filterVal, jsonData) {
	　　　　　　return jsonData.map(v => filterVal.map(j => v[j]))
	　　　　},
			disableUser(userId,delFlag){
				console.log(userId+","+delFlag);
				$("#delUserId").val(userId);
				$("#delFlag").val(delFlag);
				this.dialogDisableVisible = true;
			},
			handleDetail(row){
				if(row.userFlag=='广告主'){
					this.$router.push({path:'/detailAd',query:{userId:row.userId}});
				}else if(row.userFlag=="车主"){
					this.$router.push({path:'/detailCar',query:{userId:row.userId}})
				}else{
					this.$router.push({path:'/detail',query:{userId:row.userId}})
				}
			},
			resetSearchForm(){
				this.searchForm.userName = '';
				this.searchForm.email = '';
				this.searchForm.userType = '';
				this.searchForm.registEndTime = '';
				this.searchForm.registStartTime= '';
				this.searchForm.operationType='1';
				this.searchForm.userState='';
				this.getUserList(this.searchForm);
			},
			userListPageChange(val){
				this.searchForm.curPage = val;
				this.getUserList(this.searchForm);
			},
			confirm(){
				// userFlag
				// userId
				var userId = $("#delUserId").val();
				var userFlag = $("#delFlag").val();
				deleteUser(this.disableForm.remark,userFlag,userId).then(res=>{
					if(res.code=='000'){
						this.$message.success("操作成功！");
						this.dialogDisableVisible = false;
						this.disableForm.remark = '';
						this.getUserList(this.searchForm);
					}else{
						this.$message.success("操作失败！");
					}
				})
			},
			cancel(){
				this.dialogDisableVisible = false;
				this.disableForm.remark = '';
			},
		}
	}
</script>
<style scoped>
.s_btn_area{position:absolute;right: 30px;top:103px;}
.s_btn_area:before{content: '';width:px;height: 10px;background: #fff;}
.data_area{margin-top:50px;}
</style>