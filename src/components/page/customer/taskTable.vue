<template>
	<div class="exm_tableData">
		 <el-table :data="taskData" border style="width: 100%">
		  <el-table-column type="index" fixed width="70"></el-table-column>
          <el-table-column
            fixed
            prop="taskName"
            label="上刊名称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="cityName"
            label="投放区域"
            width="120">
          </el-table-column>
          <el-table-column
            prop="requestCar"
            label="所需车辆"
            width="120">
          </el-table-column>
          <el-table-column
            prop="taskStartTime"
            label="投放起始日期"
            width="150">
          </el-table-column>
           <el-table-column
            prop="taskEndTime"
            label="投放结束日期"
            width="150">
          </el-table-column>
           <el-table-column
            prop="taskPeriod"
            label="投放周期"
            width="120">
          </el-table-column>
           <el-table-column
            prop="singleAmt"
            label="单笔佣金"
            width="120">
          </el-table-column>
           <el-table-column
            prop="investAmt"
            label="支付费用"
            width="120">
          </el-table-column>
          <el-table-column
            prop="percenProfit"
            label="利润百分比"
            width="120">
          </el-table-column>
          <el-table-column
            prop="serviceAmt"
            label="服务费用"
            width="120">
          </el-table-column>
           <el-table-column
            label="上刊图"
            width="300">
            <template scope="scope">
               <div class="task_exmall_img">
                  <a  v-for="imgSrc in scope.row.exhibitionImg" :href="imgSrc"><img :src="imgSrc"></a>
                <!--   <ul>
                      <li v-for="imgSrc in scope.row.exhibitionImg"><img :src="imgSrc" style="width:70px;" /></li>
                  </ul> -->
              </div>
            </template>
          </el-table-column>
           <el-table-column
            prop="taskState"
            label="任务状态"
            width="120">
          </el-table-column>
           <el-table-column
            prop="beautyGrees"
            label="上刊美观度"
            width="200">
          </el-table-column>
          <el-table-column label="操作" width="180" v-if="operationtype=='1'">
              <template scope="scope">
                <el-button size="small" type="success" @click="">通过</el-button>
                <el-button size="small" type="warning" @click="">驳回</el-button>
              </template>
          </el-table-column>
      </el-table>
      <!-- <div>
        <li v-for></li>
      </div> -->
	</div>
</template>
<script>
	export default{
		data(){
			return{

			}
		},
		props:{
      taskData:{type:Array},
      operationtype:''
    },
		mounted(){},
		methods:{}
	}
</script>
<style scoped>
	
</style>