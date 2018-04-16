<template>
    <div class="index">
    	<el-card class="box-card">
		  <div slot="header" class="card_title clearfix">
		    <span>待审核</span>
		  </div>
		  <!-- <div v-for="o in 4" :key="o" class="text item">
		    {{'列表内容 ' + o }}
		  </div> -->
      
      <div class="text item">
        车主审核({{carOwnerPendingEditNum}})
      </div>
      <div class="text item">
        任务审核({{pendingEditNum}})
      </div>
		</el-card>
    </div>
</template>

<script>
import {getPendingEditNum} from 'service/getData'
    export default {
      data(){
        return{
          //{"carOwnerPendingEditNum":0,"pendingEditNum":1,"code":"000","msg":"success"}
          carOwnerPendingEditNum:'',//待审核车主数
          pendingEditNum:''//待审核订单数

        }
      },
      mounted(){
        getPendingEditNum().then(res=>{
          console.log(res);
          if(res.code=="000"){
            this.pendingEditNum = res.pendingEditNum;
            this.carOwnerPendingEditNum = res.carOwnerPendingEditNum;
          }
        })
      }
    }
</script>
<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }

  .box-card {
    width: 480px;
  }
  .card_title{
    text-align: center;
    line-height: 36px;
  }
</style>