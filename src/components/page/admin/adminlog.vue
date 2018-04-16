<template>
	<div class="adminLog">
		<p style="float:right;margin-bottom:15px;">共有数据：{{logListCnt}}条</p>
		<div class="data_area">
			<el-table :data="adminLog" border style="width:100%">
						    <el-table-column
						      type="index"
						      width="70">
						    </el-table-column>
						    <el-table-column
						     v-if="false"
						      prop="operatorState"
						      label="操作类型"
						      width="200">
						    </el-table-column>
						    <el-table-column
						      prop="adminUserName"
						      label="操作人"
						      width="200">
						    </el-table-column>
						    <el-table-column
						      prop="log"
						      label="操作日志">
						    </el-table-column>
						    <el-table-column
						      prop="operatorResult"
						      label="操作结果">
						    </el-table-column>
						    <el-table-column
						      prop="insDate"
						      label="操作日期">
						    </el-table-column>
						    
			</el-table>
			<div class="block">
			  <el-pagination
			    layout="prev, pager, next"
			    :total="logListCnt"
			    @current-change="adminLogPageChange">
			  </el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
import mixin from 'components/config/mixin'
import {adminLogList} from 'service/getData'
	export default{
		data(){
			return{
				//SCLogin/adminLogList.do ///code msg logListCnt//总条数 backCurPage logListPage//总条数 logList
				logListCnt:0,//总条数
				curPage:1,
				adminLog:[{adminUserName:'cbf',insDate:'dfg',log:'dfg',operatorState:'tyt',operatorResult:'rtu'}]
			}
		},
		mixmins:{mixin},
		mounted(){
			this.getAdminLogList(1);
		},
		methods:{
			getAdminLogList(curPage){
				adminLogList(curPage).then(res=>{
					console.log(res);
					if(res.code=='000'){
						this.adminLog = res.logList;
						this.curPage = res.backCurPage;
						this.logListCnt = res.logListCnt;
					}
				});
			},
			adminLogPageChange(val){
				this.curPage = val;
				this.getAdminLogList(val);
			}
		}
	}
</script>
<style scoped>
.adminlist{

}
.data_area{
	margin-top: 0px;	
}
</style>