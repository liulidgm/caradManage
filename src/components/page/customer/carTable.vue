<template>
	<div class="exm_tableData detail_dataTable">
		<el-table :data="carInfo"  border style="width: 100%">
             <el-table-column
              type="index"
              width="80">
            </el-table-column>
            <el-table-column
                prop="dictionaryId"
                v-if="false">
            </el-table-column>
            <el-table-column
              prop="cityName"
              label="城市名称">
            </el-table-column>
            <el-table-column label="车牌号">
              <template scope="scope">
                <a class="linkToCardetail" @click="linkToCardetail(scope.row.carCode)">{{scope.row.carCode}}</a>
              </template>
            </el-table-column>
            <el-table-column
              prop="carModel"
              label="车型">
            </el-table-column>
            <el-table-column
              prop="userName"
              label="车主姓名">
            </el-table-column>
            <el-table-column
              prop="insDate"
              label="车辆注册时间">
            </el-table-column>
            <el-table-column
              prop="carState"
              label="车辆状态">
            </el-table-column>
            <el-table-column label="操作" width="180" v-if="operationtype=='1'">
              <template scope="scope">

                <el-button v-if="scope.row.carState=='待审核'" size="small" type="success" @click="userAudit(scope.row.carCode,'1')">通过</el-button>
                <el-button v-if="scope.row.carState=='待审核'" size="small" type="warning" @click="reject(scope.row.carCode)">驳回</el-button>
              </template>
            </el-table-column>
        </el-table>
	</div>
</template>
<script>
	export default{
		data(){
			return{

			}
		},
		props:{
      carInfo:'',
      operationtype:''
    },
		mounted(){},
		methods:{
      reject(carCode){
        //this.dialogRejectVisible = true;
        this.$emit("reject",carCode);
      },
      cancel(){
        this.$emit("cancel");
        // this.dialogRejectVisible = false;
        // this.remark = '';
      },
      userAudit(carCode,operationtype){
        this.$emit("userAudit",carCode,operationtype);
      },
      linkToCardetail(carCode){
        this.$emit("linkToCardetail",carCode);
      }
    }
	}
</script>
<style scoped>
	.linkToCardetail{color: #20a0ff;cursor: pointer;}
</style>