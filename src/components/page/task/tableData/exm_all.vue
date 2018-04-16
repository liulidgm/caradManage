<template>
	<div class="exm_tableData">
		 <el-table :data="exmallData" border style="width: 100%">
		  <el-table-column type="index" fixed width="70"></el-table-column>
          <el-table-column
            prop="taskId"
            v-if="false">
          </el-table-column>
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
            label="上刊图"
            width="300">
            <template scope="scope">
               <div class="task_exmall_img overviewImg">
                  <a v-for="imgSrc in scope.row.onlineImg" :href="imgSrc"><img :src="imgSrc"></a>
                <!--  <a href="/app/data1516241526942.JPEG"><img src="/app/data1516241526942.JPEG"></a>
                 <a href="/app/data1516241526942.JPEG"><img src="/app/data1516241526942.JPEG"></a> -->
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="下刊图"
            width="300">
            <template scope="scope">
              <div class="overviewImg">
                <a v-for="imgSrc in scope.row.offlineImg" :href="imgSrc"><img :src="imgSrc"></a>
              </div>
            </template>
          </el-table-column>
           <el-table-column
            prop="orderState"
            label="任务状态"
            width="120">
          </el-table-column>
           <el-table-column
            prop="rejectReson"
            label="驳回原因"
            width="200">
          </el-table-column>
          <el-table-column fixed='right' label="操作" width="200">
		      <template scope="scope">
            <!-- 已领取未上刊；上刊提交审核中；上刊审核驳回；上刊审核通过；下刊提交审核中；下刊审核驳回；已完成 -->
            <div v-if="scope.row.orderState=='上刊提交审核中'">
              <el-button  size="small" type="success" @click="audit(scope.row.orderId,'0')">通过</el-button>
              <el-button size="small" type="warning" @click="reject(scope.row.orderId,'0')">驳回</el-button>
            </div>
            <div v-else-if="scope.row.orderState=='下刊提交审核中'">
              <el-button  size="small" type="success" @click="audit(scope.row.orderId,'1')">通过</el-button>
              <el-button size="small" type="warning" @click="reject(scope.row.orderId,'1')">驳回</el-button>
            </div>
            <div v-else></div>
		        
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
		props:{exmallData:{}},
		mounted(){
      // console.log($(".aa").length);
      // $(function(){
      //   $(".aa").LightBox({
      //         controls : true          //上一张、下一张是否显示，默认是显示true
      //       });
      // })
		},
		methods:{
      audit(taskId,state){
        this.$emit('audit',taskId,state)
      },
      reject(taskId,state){
        this.$emit('reject',taskId,state)
      }
		}
	}
</script>
<style scoped>
	
</style>