<template>
	<div class="data_area">
		 <el-table :data="tableData" style="width: 100%">
		  <el-table-column type="index" fixed width="80"></el-table-column>
          <el-table-column
          	fixed
            prop="taskName"
            label="上刊名称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="singleAmt"
            label="单笔佣金"
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
            label="上刊周期"
            width="120">
          </el-table-column>
            <el-table-column
            prop="orderState"
            label="任务状态"
            width="180">
          </el-table-column>
           <el-table-column
            label="上刊图"
            width="300">
            <template scope="scope">
              <div class="onlineImg">
                <a v-for="imgSrc in scope.row.onlineImg" :href="imgSrc">
                  <img :src="imgSrc">
                </a>
              </div>
              
              <!-- <img v-for="imgSrc in scope.row.onlineImg" :src="imgSrc" style="width:70px;" /> -->
            </template>
          </el-table-column>
           <el-table-column
            label="下刊图"
            width="300">
            <template scope="scope">
              <div class="offlineImg">
                <a v-for="imgSrc in scope.row.offlineImg" :href="imgSrc">
                  <img :src="imgSrc">
                </a>
              </div>
              <!-- <img v-for="imgSrc in scope.row.offlineImg" :src="imgSrc" style="width:70px;" /> -->
            </template>
          </el-table-column>
           <el-table-column
            prop="rejectReson"
            label="驳回原因"
            width="200">
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
		props:{tableData:{}},
		mounted(){
		},
		methods:{

		}
	}
</script>
<style scoped>
	
</style>
