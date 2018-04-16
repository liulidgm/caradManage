<template>
    <div class="dictionary">
     <div class="search_area clear">
     	<div class="s_input clear"><label>手机号</label><el-input v-model="searchForm.mobile" placeholder=""></el-input></div>
		<div class="s_input clear"><label>用户名</label><el-input v-model="searchForm.userName" placeholder=""></el-input></div>
		<div class="s_input clear">
			<label>状态</label>
			<el-select v-model="searchForm.withdrawalsStatus" placeholder="请选择">
				<!-- 0待审核1提现成功2提现失败 -->
				<el-option label="待审核" value="0"></el-option>
				<el-option label="提现成功" value="1"></el-option>
				<el-option label="提现失败" value="2"></el-option>
			</el-select>
		</div>
        <div class="s_btn_area">
            <el-button type="primary" @click="searchSub()">查询</el-button>
            <el-button type="primary" @click="reset()">清空</el-button>
        </div>
	</div>
    <div class="dataBox" style="margin-top:50px">
        <el-table :data="withdrawRecord"  border style="width: 100%">
             <el-table-column
              type="index"
              width="80">
            </el-table-column>
            <el-table-column
              prop="mobile"
              label="手机号">
            </el-table-column>
            <el-table-column
              prop="userName"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="withdrawId"
              label="提现流水">
            </el-table-column>
            <el-table-column
              prop="withdrawAmt"
              label="提现金额(元)">
            </el-table-column>
            <el-table-column
              prop="feeAmt"
              label="手续费">
            </el-table-column>
            <el-table-column
              prop="actualAmt"
              label="实际到账金额">
            </el-table-column>
            <el-table-column
              prop="bankNo"
              label="提现银行账号">
            </el-table-column>
            <el-table-column
              prop="withdrawStatus"
              label="提现状态">
            </el-table-column>
            <el-table-column
              prop="withdrawSuccessTime"
              label="提现成功时间">
            </el-table-column>
            <el-table-column
              prop="wihdrawTime"
              label="提现时间">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注">
            </el-table-column>
            <el-table-column label="操作" width="150">
		      <template scope="scope">

		        <el-button v-if="scope.row.withdrawStatus=='待审核'" type="success" size="small" @click="withdraw(scope.row.withdrawId)">提现</el-button>
		      </template>
		    </el-table-column>
        </el-table>
        <div class="block">
              <el-pagination
                layout="prev, pager, next"
                :total="totalCnt"
                @current-change="withdrawListPageChange">
              </el-pagination>
        </div>
    </div>
    </div>
</template>
<script type="text/javascript">
import {withdrawRecord,userAccountWithdraw} from 'service/getData'
    export default {
        data(){
            return{
                withdrawRecord:[],
                totalCnt:0,
                searchForm:{
                	withdrawalsStatus:'',
        					mobile:'',
        					userName:'',
        					curPage:1,
                }
            }
        },
        mounted(){
        	this.getWithdrawRecord();
        },
        methods:{
        	getWithdrawRecord(){
        		//withdrawRecord
        		withdrawRecord(this.searchForm).then(res=>{
        			if(res.code=='000'){
        				this.withdrawRecord = res.withdrawRecord;
        				this.totalCnt = res.totalCnt;
        			}
        		})
        	},
        	withdraw(withdrawId){
        		this.$confirm('确定提现吗?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	userAccountWithdraw(withdrawId).then(res=>{
		        		if(res.code=='000'){
		        			this.getWithdrawRecord();
		        			this.$message.success('操作成功');
		        		}else{
		        			this.$message.error('操作失败');
		        		}
        			})
		        }).catch(() => {
		                    
		        });
        		
        	},
          searchSub(){
            this.getWithdrawRecord();
          },
          reset(){
                this.searchForm.withdrawalsStatus='',
                this.searchForm.mobile='',
                this.searchForm.userName='',
                this.searchForm.curPage=1,
                this.getWithdrawRecord();
          },
          withdrawListPageChange(val){
          		this.searchForm.curPage = val;
          		this.getWithdrawRecord();
          }
        }
    }
</script>
<style type="text/css">
    .s_btn_area{position:absolute;right: 30px;top:55px;}
	.s_btn_area:before{content: '';width:px;height: 10px;background: #fff;}
</style>