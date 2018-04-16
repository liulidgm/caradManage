<template>
    <div class="overview clear">
    	<div id="datacharts" style="height:400px;width:100%"></div>
      <div class="search" >
        <div class="block" v-show="!showYear">
          <el-date-picker
            @change='changeTime_month'
            v-model="v_month"
            type="month"
            format="yyyy-MM"
            placeholder="选择月">
          </el-date-picker>
        </div>
        <div class="block" v-show="showYear">
          <el-date-picker
            @change='changeTime_year'
            v-model="v_year"
            format="yyyy"
            align="right"
            type="year"
            placeholder="选择年">
          </el-date-picker>
        </div>
        <div class="block search_item search_active" @click="changeSearch($event)">月</div>
        <div class="block search_item" @click="changeSearch($event)">年</div>
      </div>
      <div class="sign">
        <span>
          <span class="s_title">完成订单数</span>
          <span class="s_num">{{orderNum}}</span>
        </span>
        <span>
          <span class="s_title">用户佣金(元)</span>
          <span class="s_num">{{totalAmt}}</span>
        </span>
        <span>
          <span class="s_title">平台营收(元)</span>
          <span class="s_num">{{totalRevenueAmt}}</span>
        </span>
      </div>
      <el-button type="primary" style="float:right;margin:15px 0;" @click="export2Excel()">导出数据</el-button>
      <el-table :data="revenues" border style="width: 100%;">
          <el-table-column
            type="index"
            width="70">
          </el-table-column>
          <el-table-column
            prop="orderDate"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="orderNum"
            label="完成订单数"
            width="180">
          </el-table-column>
          <el-table-column
            prop="singleAmount"
            label="用户佣金(元)">
          </el-table-column>
          <el-table-column
            prop="singleRevenueAmount"
            label="平台营收(元)">
          </el-table-column>
      </el-table>
    </div>
</template>

<script>
import $ from 'jquery'
// import util from 'components/util.js'
import {achievementList} from 'service/getData'
    export default {
      data(){
        return{
          showYear:false,
          v_month:"",
          v_year:"",
          year:'',
          month:'',
          //SCLogin/achievementList.do totalAmt//总用户佣金 totalRevenueAmt//总平台(服务费) orderNum //订单数 revenues//订单列表数据
          revenues: [],
          orderNum:0,//订单数
          totalAmt:0,//总用户佣金
          totalRevenueAmt:0,//总平台服务费
          xD:[],
          yD:[],

        }
      },
      mounted(){
        this.year = new Date().getFullYear();
        this.month = new Date().getMonth()+1;
        this.getAchievementList(this.year+"-"+this.month);
        //模拟数据 option
        
      },
      methods:{
        getAchievementList(orderFinishTime){

          achievementList(orderFinishTime).then(res=>{
            console.log(res);
            if(res.code=='000'){
              this.xD = [];
              this.yD = [];
              for(var i=0;i<res.revenues.length;i++){
                this.xD.push(i+1);
                this.yD.push(res.revenues[i].singleAmount);
              }
              var _self = this;
              let optionDemo = {
                    title : {
                        text: '用户佣金'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    // legend: {//图例
                    //     data:['意向','预购','成交']
                    // },
                    toolbox: {},
                    calculable : true,
                    xAxis : [
                        {
                            type: 'category',
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLine: {
                                onZero: false,
                                lineStyle: {}
                            },
                            axisPointer: {
                                label: {
                                    formatter: function (params) {
                                        return _self.year+"-"+_self.month+"-"+params.value;
                                    }
                                }
                            },
                            data : this.xD
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            minInterval: 1
                        }
                    ],
                    series : [
                        {
                            //name:'注册数',
                            type:'line',
                            smooth:true,
                            symbol:'emptyCircle',
                            itemStyle: {normal: {color:'#20a0ff', areaStyle: {color:'#20a0ff'},lineStyle:{color:'#20a0ff'}}},
                            data:this.yD
                        }
                    ]
                };
                          
              this.drawLine(optionDemo);
              this.revenues = res.revenues;
              this.orderNum = res.orderNum;
              this.totalRevenueAmt = res.totalRevenueAmt;
              this.totalAmt = res.totalAmt;

            }
          });
        },
        changeSearch(e){
          $(e.target).siblings().removeClass('search_active');
          $(e.target).addClass('search_active');
          if(this.showYear){
            this.showYear = false
          }else{
            this.showYear = true
          }
        },
        changeTime_year(v_year){
          this.getAchievementList(v_year);
        },
        changeTime_month(v_month){
          this.getAchievementList(v_month);

        },
        export2Excel() {
      　　require.ensure([], () => {
      　　　　const { export_json_to_excel } = require('../../../vendor/Export2Excel');
      　　　　const tHeader = ['日期', '完成订单数', '用户佣金(元)', '平台营收(元)'];
      　　　　const filterVal = ['orderDate', 'orderNum', 'singleAmount', 'singleRevenueAmount'];
      　　　　const list = this.revenues;
      　　　　const data = this.formatJson(filterVal, list);
      　　　　export_json_to_excel(tHeader, data, '营收数据总览');
      　　})
      },
      formatJson(filterVal, jsonData) {
　　　　　　return jsonData.map(v => filterVal.map(j => v[j]))
　　　},
      drawLine(optionDemo){
          let overdataChart = this.$echarts.init(document.getElementById('datacharts'))
          overdataChart.setOption(optionDemo);
        }
      }
    }
</script>
<style scoped>
.overview{position: relative;}
.search{position: absolute;right: 30px;top:0px;}
.search .block{float: left;}
.search .search_active{color:#20a0ff;}
.search .search_item{cursor:pointer;line-height: 32px;margin-left: 10px;}
  .sign > span{
    display: inline-block;
    margin:0 5px;
  }
  .sign .s_title{}
  .sign .s_num{
    color:#999;
  }
  .clearfix:after {
      clear: both
  }
</style>