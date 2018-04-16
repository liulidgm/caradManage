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
			
			<div class="s_input clear custMg_registertime">
				<label>注册时间</label>
				<el-date-picker
			      v-model="registStartTime"
			      type="date"
			      placeholder="选择开始日期"
      			  value-format="yyyy-MM-dd"
      			  @change="getRegistStartTime">
			    </el-date-picker>
			    <el-date-picker
			      v-model="registEndTime"
			      type="date"
			      placeholder="选择结束日期"
      			  value-format="yyyy-MM-dd"
      			  @change="getRegistEndTime">
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
				<el-button type="primary" @click="searchComCust()">查询</el-button>
				<el-button type="primary" @click="resetSearchForm()">清空</el-button>
			</div>
		</div>
		<div class="data_area">
			<el-button type="primary" style="float:right;margin-bottom:15px;" @click="goAdd()">新增企业客户</el-button>
			<el-table :data="comCustList" border style="width: 100%">
		    <el-table-column  type="index" label="序号" width="80"></el-table-column>
		    <el-table-column v-if="false" prop="companyId" label="企业ID"></el-table-column>
		    <el-table-column
		      prop="loginName"
		      label="用户名"
		      width="200">
		    </el-table-column>
		    <el-table-column
		      prop="companyName"
		      label="企业名称"
		      width="200">
		    </el-table-column>
		    <el-table-column
		      prop="linkName"
		      label="联系人姓名"
		      width="250">
		    </el-table-column>
		    <el-table-column
		      prop="linkMobile"
		      label="联系人电话">
		    </el-table-column>
		    <el-table-column
		      prop="insDate"
		      label="注册时间">
		    </el-table-column>
		    <el-table-column label="操作" width="180">
		      <template scope="scope">
		        <el-button
		          size="small"
		          @click="detail(scope.row)">查看</el-button>
		        <el-button
		          size="small"
		          @click="edit(scope.row)">修改</el-button>

		      </template>
		    </el-table-column>
		  </el-table>
		  <div class="block">
              <el-pagination
                layout="prev, pager, next"
                :total="companyCnt"
                @current-change="comListPageChange">
              </el-pagination>
        </div>
		</div>
	</div>
</template>
<script>
import {companyList} from 'service/getData'
	export default{
		data(){
			return{
				registEndTime:'',
				registStartTime:'',
				searchForm:{
					userName:'',
					email:'',
					userType:'',
					registEndTime:'',
					operationType:'',
					userState:'',
					registStartTime:'',

				},
				comCustList: [],
				backCurPage: '',
    			companyCnt: 0
			}
		},
		mounted(){
			this.getComCustList(1);
		},
		methods:{
			//companyList
			getComCustList(curPage){
				this.searchForm.curPage = curPage||1;
				companyList(this.searchForm).then(res=>{
					if(res.code=="000"){
						this.comCustList = res.companyList;
						this.backCurPage = res.backCurPage;
						this.companyCnt = res.companyCnt;

					}
				})
			},
			comListPageChange(val){
                this.getComCustList(val);
            },
            searchComCust(){
            	this.getComCustList(1);
            },
            resetSearchForm(){
            	this.searchForm.userName='';
				this.searchForm.email='';
				this.searchForm.userType='';
				this.searchForm.registEndTime='';
				this.searchForm.operationType='';
				this.searchForm.userState='';
				this.searchForm.registStartTime='';
				this.getComCustList(1);
            },
            getRegistStartTime(registStartTime){
            	console.log(registStartTime);
            	this.searchForm.registStartTime = registStartTime||'';
            },
            getRegistEndTime(registEndTime){
            	this.searchForm.registEndTime = registEndTime||'';
            },
			goAdd(){
				this.$router.push('/addcom');
			},
			edit(row){
				//this.$router.push('/detailCar');
				this.$router.push({path:'/addcom',query:{companyId:row.companyId}});
			},
			detail(row){
				// var companyId = row.companyId;
				this.$router.push({path:'/comCustDetail',query:{companyId:row.companyId}});

			}
		}
	}
</script>
<style scoped>
.s_btn_area{position:absolute;right: 30px;top:103px;}
.s_btn_area:before{content: '';width:px;height: 10px;background: #fff;}
.data_area{margin-top:50px;}
</style>