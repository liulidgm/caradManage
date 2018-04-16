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
      			  @change="getRegisterStartDate">
			    </el-date-picker>
			    <el-date-picker
			      v-model="registEndTime"
			      type="date"
			      placeholder="选择结束日期"
      			  value-format="yyyy-MM-dd"
      			  @change="getRegisterEndDate">
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
			<!-- <el-button type="primary" style="float:right;margin-bottom:15px;" @click="goAdd()">新增企业客户</el-button> -->
			<el-table
		    :data="tableData"
		    border
		    style="width: 100%">
		    <el-table-column type="index" :index="indexMethod" width="80"></el-table-column>
		    <el-table-column
		      prop="userName"
		      label="用户名"
		      width="140">
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
		    <el-table-column label="操作" width="200">
		      <template scope="scope">
		        <el-button
		          size="small"
		          @click="detail(scope.row)">查看</el-button>
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
	</div>
</template>
<script>
import {userList} from 'service/getData'
	export default{
		data(){
			return{
				userCnt:0,
				backCurPage:'',
				registStartTime:'',
				registEndTime:'',
				searchForm:{
					userName:'',
					email:'',
					userType:'',
					registEndTime:'',
					operationType:'2',
					userState:'',
					registStartTime:'',

				},
				// tableData: {curPage:'',list:[]}
				tableData: []
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
						// this.tableData.curPage = res.backCurPage;
						// this.tableData.list = res.userList;
						this.tableData = res.userList;
					}
				})
			},
			getRegisterEndDate(registEndTime){
				this.searchForm.registEndTime = registEndTime;
			},
			getRegisterStartDate(registStartTime){
				this.searchForm.registStartTime = registStartTime;
			},
			indexMethod(index) {
		       return (index+1)*(this.backCurPage-1)*10
		    },
			searchSub(){
				this.getUserList(this.searchForm);
			},
			goAdd(){
				this.$router.push('/addcom');
			},
			detail(row){
				switch(row.userFlag){
					case '广告主':
						this.$router.push({path:'/examineAd',query:{userId:row.userId}});
					 	break;
					case '车主':
						this.$router.push({path:'/examineCar',query:{userId:row.userId}});
						break;
					case '两者都有':
						this.$router.push({path:'/examineAdCar',query:{userId:row.userId}});
						break;
				}
			},
			resetSearchForm(){
				this.searchForm.userName = '';
				this.searchForm.email = '';
				this.searchForm.userType = '';
				this.searchForm.registEndTime = '';
				this.searchForm.registStartTime= '';
				this.searchForm.operationType='2';
				this.searchForm.userState='';
				this.getUserList(this.searchForm);
			},
			userListPageChange(val){
				this.searchForm.curPage = val;
				this.getUserList(this.searchForm);
			}
		}
	}
</script>
<style scoped>
.s_btn_area{position:absolute;right: 30px;top:103px;}
.s_btn_area:before{content: '';width:px;height: 10px;background: #fff;}
.data_area{margin-top:50px;}
</style>