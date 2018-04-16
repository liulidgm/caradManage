<template>
    <div class="overview" v-loading="loading">
    	<div id="datacharts" style="height:400px;width:100%"></div>
      <div class="search" >
        <div class="block" v-show="!showYear">
          <el-date-picker
            v-model="v_month"
            type="month"
            @change="changeTime_month"
            placeholder="选择月">
          </el-date-picker>
        </div>
        <div class="block" v-show="showYear">
          <el-date-picker
            v-model="v_year"
            align="right"
            type="year"
            @change="changeTime_year"
            placeholder="选择年">
          </el-date-picker>
        </div>
        <div class="block search_item search_active" @click="changeSearch($event)">月</div>
        <!-- <div class="block search_item" @click="changeSearch($event)">年</div> -->
      </div>
      <div class="sign">
        <span>{{showTime}}</span>
        <span>
          <span class="s_title">车主</span>
          <span class="s_num">{{info.ownRegistesMonth}}</span>
        </span>
        <span>
          <span class="s_title">车主&广告主</span>
          <span class="s_num">{{info.personTotalRegistesMonth}}</span>
        </span>
        <span>
          <span class="s_title">企业客户</span>
          <span class="s_num">{{info.companyRegistesMonth}}</span>
        </span>
        <span>
          <span class="s_title">总计注册</span>
          <span class="s_num">{{info.totalRegistesMonth}}</span>
        </span>
      </div>
      <el-table :data="registeList"  border style="width: 100%">
             <el-table-column
              type="index"
              width="80">
            </el-table-column>
            <el-table-column
              prop="registDate"
              label="日期">
            </el-table-column>
            <el-table-column
              prop="ownRegistes"
              label="车主">
            </el-table-column>
            <el-table-column
              prop="personTotalRegistes"
              label="车主和广告主">
            </el-table-column>
            <el-table-column
              prop="companyRegistes"
              label="企业客户">
            </el-table-column>
            <el-table-column
              prop="totalRegistes"
              label="总计">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import $ from 'jquery'
import {userOverviewList} from 'service/getData'
// import util from 'components/util.js'
    export default {
      data(){
        return{
          showYear:false,
          showTime:'',
          v_month:'',
          v_year:'',
          registeList:[],
          info:'',
          yD:[],
          xD:[],
          loading:true,
          isFirst:true,
        }
      },
      mounted(){
        //SCLogin/userOverviewList.do
        var year = new Date().getFullYear();
        var month = new Date().getMonth() + 1;
        this.v_month = year+"-"+month;
        this.showTime = year+"年"+month+"月";
        this.getUserOverviewList(this.v_month);
      },
      methods:{
        getUserOverviewList(registeTime){
          //SCLogin/userOverviewList.do
          //默认当前月

          userOverviewList(registeTime).then(res=>{
            // console.log(res);
            if(registeTime.length>4){
              this.showTime = registeTime.substr(0,4)+'年'+registeTime.substr(5,2)+'月';
            }else{
              this.showTime = registeTime+'年';
            }
            if(res.code=="000"){
              this.xD = [];
              this.yD = [];
              for(var i=0;i<res.registeList.length;i++){
                this.xD.push(i+1);
                this.yD.push(res.registeList[i].totalRegistes);
              }
              var _self = this;
              let optionDemo = {
                    title : {
                        text: '注册数'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
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
                                        return _self.v_month+"-"+params.value;
                                    }
                                }
                            },
                            data : this.xD
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            minInterval: 1,
                        }
                    ],
                    series : [
                        {
                            name:'注册数',
                            type:'line',
                            smooth:true,
                            symbol:'emptyCircle',
                            itemStyle: {normal: {color:'#20a0ff', areaStyle: {color:'#20a0ff'},lineStyle:{color:'#20a0ff'}}},
                            data:this.yD
                        }
                    ]
                };
                          
              this.drawLine(optionDemo);
              this.info = res;
              this.registeList = res.registeList;
              this.loading = false;
            }

          })
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
        drawLine(optionDemo){
          let overdataChart = this.$echarts.init(document.getElementById('datacharts'))
          overdataChart.setOption(optionDemo);
        },
        changeTime_month(v_month){
          if(this.isFirst){

          }else{
            if(v_month){
              console.log('因为改变时间触发');
              this.loading = true;
              this.getUserOverviewList(v_month);
            }
            this.isFirst = false;
          }
          
          
        },
        changeTime_year(v_year){
          if(v_year){
            this.loading = true;
            this.getUserOverviewList(v_year);
          }
        }
      }
      // components:{el-table-column}
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