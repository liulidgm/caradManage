<template>
    <div class="activeData">
    	<h3>实时监控</h3>
    	<div class="dataCard clear">
	        <el-card class="box-card">
			  <div slot="header" class="clearfix">
			    <span style="line-height: 36px;">新增任务({{newOrderNum}}个)</span>
			  </div>
			  <div class="text item">
			   	<p>预计营收</p>
			   	<p>{{newOrderMoney}}元</p>
			  </div>
			</el-card>
			<el-card class="box-card">
			  <div slot="header" class="clearfix">
			    <span style="line-height: 36px;">进行中任务({{runOrderNum}}个)</span>
			  </div>
			  <div class="text item">
			   	<p>预计营收</p>
			   	<p>{{runOrderMoney}}元</p>
			  </div>
			</el-card>
			<el-card class="box-card">
			  <div slot="header" class="clearfix">
			    <span style="line-height: 36px;">审核中({{auditOrderNum}}个)</span>
			  </div>
			  <div class="text item">
			   	<p>预计营收</p>
			   	<p>{{auditOrderMoney}}元</p>
			  </div>
			</el-card>
			<el-card class="box-card">
			  <div slot="header" class="clearfix">
			    <span style="line-height: 36px;">已完成任务({{overOrderNum}}个)</span>
			  </div>
			  <div class="text item">
			   	<p>预计营收</p>
			   	<p>{{overOrderMoney}}元</p>
			  </div>
			</el-card>
			<el-card class="box-card">
			  <div slot="header" class="clearfix">
			    <span style="line-height: 36px;">在线用户数</span>
			  </div>
			  <div class="text item">
			   	<h4 class='itemNum'>{{onlineUserNum}}人</h4>
			  </div>
			</el-card>
			<el-card class="box-card">
			  <div slot="header" class="clearfix">
			    <span style="line-height: 36px;">今日累计注册车主数</span>
			  </div>
			  <div class="text item">
			   	<h4 class='itemNum'>{{caruserNum}}人</h4>
			  </div>
			</el-card>
			<el-card class="box-card">
			  <div slot="header" class="clearfix">
			    <span style="line-height: 36px;">今日累计注册广告主数</span>
			  </div>
			  <div class="text item">
			   	<h4 class='itemNum'>{{advertyNum}}人</h4>
			  </div>
			</el-card>
			<el-card class="box-card">
			  <div slot="header" class="clearfix">
			    <span style="line-height: 36px;">今日累计新增企业数</span>
			  </div>
			  <div class="text item">
			   	<h4 class='itemNum'>{{companyNum}}人</h4>
			  </div>
			</el-card>
		</div>
		<h3>在线任务</h3>
		<div class="taskTable" style="margin-top:20px;">
			<el-table :data="taskList" border style="width: 100%">
			    <el-table-column
			      prop="taskDigree"
			      label="进度"
			      width="200">
			    </el-table-column>
			    <el-table-column
			      prop="taskName"
			      label="项目名称"
			      width="200">
			    </el-table-column>
			    <el-table-column
			      prop="orderNum"
			      label="接单量"
			      width="250">
			    </el-table-column>
			    <el-table-column
			      prop="requestNum"
			      label="需求量">
			    </el-table-column>
			    <el-table-column
			      prop="endTime"
			      label="截止时间">
			    </el-table-column>
			  </el-table>
			  <div class="block">
	              <el-pagination
	                layout="prev, pager, next"
	                :total="taskCnt"
	                @current-change="taskListPageChange">
	              </el-pagination>
	        </div>
		</div>
		<div class="clear">
			<div id="task" style="height:400px;width:100%;margin-top:50px;"></div>
			<div id="pageview" style="height:400px;width:100%;margin-top:50px;"></div>
			
		</div>
		<div id="regionData" style="height:600px;width:100%;margin-top:50px;"></div>
		
    </div>
</template>
<script type="text/javascript">
import $ from 'jquery'
import {optionDemo} from './regionData'
import {realTimeMonitor,onlineTaskList} from 'service/getData'
    export default {
        data(){
            return{
            	orderMap:'',
            	userMap:'',
            	hour24Datas:'',
            	hour24Visiters:'',
            	taskList:[],
            	taskCnt:0,
        		curPage :'',
            	newOrderNum:'',
            	newOrderMoney:'',
            	auditOrderMoney:'',
            	auditOrderNum:'',
            	overOrderMoney:'',
            	overOrderNum:'',
            	runOrderMoney:'',
            	runOrderNum:'',
            	caruserNum:'',
            	taskDrawY1:[],
            	taskDrawY2:[],
            	visiterAndroind:[],
            	visiterIOS:[],
            	cityData:[],
            	caruserNum:'',
            	advertyNum:'',
            	companyNum:'',
            	onlineUserNum:'',
            	v_month:'',
            	v_hour:''

            	
            }
        },
        mounted(){
        	// console.log(new Date().getHours());
        	var year = new Date().getFullYear();
	        var month = new Date().getMonth() + 1;
	        var date = new Date().getDate();
	        this.v_month = year+"-"+month+"-"+date;
        	this.v_hour = new Date().getHours();
        	if(this.v_hour<10){
        		this.v_hour="0"+this.v_hour
        	}
			this.getRealTimeMonitor(this.v_hour);
			this.getTaskList(1);

			//如果t在0到60秒之间（0-1000*60），就请求
			var _this=this;
			setInterval(1000*60,function(){
				var t = new Date().getTime()%(60*60*1000)//取到当前在过了整点后，多的毫秒数。
				if(t>0&&t<1000*60){
					var hour = new Date().getTime().getHours();
					if(hour<10){
						hour = '0'+hour
					}
					_this.getRealTimeMonitor(hour);
				}
			})
	        
        },
        methods:{
        	getRealTimeMonitor(hour){
        		//realTimeMonitor   hour
        		realTimeMonitor(hour).then(res=>{
        			console.log(res);
        			if(res.code=='000'){
        				this.hour24Datas = res.hour24Datas;
        				for(var i=0;i<this.hour24Datas.length;i++){
        					this.taskDrawY1.push(this.hour24Datas[i].taskReceiveNum);
        					this.taskDrawY2.push(this.hour24Datas[i].taskFinishNum);
        				}
        				for(var i=0;i<res.hour24Visiters.length;i++){
        					this.visiterAndroind.push(res.hour24Visiters[i].androidNum);
        					this.visiterIOS.push(res.hour24Visiters[i].iphoneNum);
        				}
        				///
        				this.userMap = res.userMap;
        				this.caruserNum = res.userMap.caruserNum;
        				this.companyNum = res.userMap.companyNum;
        				this.advertyNum = res.userMap.advertyNum;
        				this.onlineUserNum = res.userMap.onlineUserNum;
        				///
        				this.orderMap = res.orderMap;
        				///
        				this.newOrderNum = res.orderMap.newOrder.orderNum;
        				this.newOrderMoney = res.orderMap.newOrder.money;
        				this.auditOrderNum = res.orderMap.auditOrder.orderNum;
        				this.auditOrderMoney = res.orderMap.auditOrder.money;
        				this.overOrderNum = res.orderMap.overOrder.orderNum;
        				this.overOrderMoney = res.orderMap.overOrder.money;
        				this.runOrderNum = res.orderMap.runOrder.orderNum;
        				this.runOrderMoney = res.orderMap.runOrder.money;
        				///
        				this.cityData = res.cityList;
        				this.regionDraw();
        				this.taskDrawLine();
        				this.visitersDrawLine();
        			}
        		})
        	},
        	getTaskList(curPage){
        		//onlineTaskList
        		onlineTaskList(curPage).then(res=>{
        			if(res.code=='000'){
        				this.taskList = res.onlineTaskList
        				this.taskCnt = res.onlineTaskCnt;
        				this.curPage = res.backCurPage;

        			}
        		})

        	},
        	taskListPageChange(val){
        		this.getTaskList(val);
        	},
        	visitersDrawLine(){
				var _self = this;
				var taskOption = {
				    title: {
				        text: '24小时Androind和IOS访问量'
				    },
				    tooltip: {
				        trigger: 'axis'
				    },
				    legend: {
				        data:['Androind','IOS']
				    },
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    toolbox: {
				        // feature: {
				        //     saveAsImage: {}
				        // }
				    },
				    xAxis: {
				        type: 'category',
				        // boundaryGap: false,
				        data: ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
				        axisPointer: {
                            label: {
                                formatter: function (params) {
                                    return _self.v_month+":"+params.value;
                                }
                            }
                        },
				    },
				    yAxis: {
				        type: 'value',
				        minInterval: 1,
				    },
				    series: [
				        {
				            name:'Androind',
				            type:'line',
				            data:this.visiterAndroind
				        },
				        {
				            name:'IOS',
				            type:'line',
				             data:this.visiterIOS
				        }
				    ]
				};
	          let taskDataChart = this.$echarts.init(document.getElementById('pageview'))
	          taskDataChart.setOption(taskOption);
	        },
			taskDrawLine(){
				var _self = this;
				var taskOption = {
				    title: {
				        text: '24小时任务接受及完成趋势'
				    },
				    tooltip: {
				        trigger: 'axis'
				    },
				    legend: {
				        data:['接受任务','完成任务']
				    },
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    toolbox: {
				        // feature: {
				        //     saveAsImage: {}
				        // }
				    },
				    xAxis: {
				        type: 'category',
				        // boundaryGap: false,
				        data: ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
				        axisPointer: {
                            label: {
                                formatter: function (params) {
                                    return _self.v_month+":"+params.value;
                                }
                            }
                        },
				    },
				    yAxis: {
				        type: 'value',
				        minInterval: 1,
				    },
				    series: [
				        {
				            name:'接受任务',
				            type:'line',
				            data:this.taskDrawY1
				        },
				        {
				            name:'完成任务',
				            type:'line',
				            data:this.taskDrawY2
				        }
				    ]
				};
	          let taskDataChart = this.$echarts.init(document.getElementById('task'))
	          taskDataChart.setOption(taskOption);
	        },
	        // pvDrawLine(pvOption){
	        //   let pvDataChart = this.$echarts.init(document.getElementById('pageview'))
	        //   pvDataChart.setOption(pvOption);
	        // },
	        regionDraw(){
	        	if(this.cityData.length==1){
			    	$("#regionData").css('height','200px');
			    }
			    if(this.cityData.length>1&&this.cityData.length<6){
			    	$("#regionData").css('height','300px');
			    }
			    if(this.cityData.length>10){
			    	$("#regionData").css('height','900px');
			    }
				var resultdata0 = [];
				var titledata = [];
				for (var i = 0; i < this.cityData.length; i++) {
				    var d0 = {
				        name: this.cityData[i].cityName,
				        value: this.cityData[i].taskDigree
				    };
				    titledata.push(this.cityData[i].cityName)
				    resultdata0.push(d0);
				}
				resultdata0.sort(this.NumDescSort);
				var option = {
				    title: [{
				        text: '地域分布数据(%)',
				        left: 'left'
				    }],
				    tooltip: {
				        trigger: 'item'
				    },
				    grid: {
				        right: 40,
				        top: 100,
				        bottom: 40,
				        width: '90%'
				    },
				    xAxis: [{
				        position: 'top',
				        type: 'value',
				        boundaryGap: false,
				        splitLine: {
				            show: false
				        },
				        axisLine: {
				            show: false
				        },
				        axisTick: {
				            show: false
				        },
				        // axisPointer: {
            //                 label: {
            //                     formatter: function (params) {
            //                         return params.value+'%';
            //                     }
            //                 }
            //             },
				    }],
				    yAxis: [{
				        type: 'category',
				        data: titledata,
				        axisTick: {
				            alignWithLabel: true
				        }
				    }],
				    series: [{
				        // name: '全部',
				        z: 2,
				        type: 'bar',
				        label: {
				            normal: {
				                show: true
				            },
				            emphasis: {
				                show: true,
				            }
				        },
				        itemStyle:{
				            normal: {
				                show: true,
				                color: '#409eff',
				                borderWidth:0,
				                borderColor:'#333',
				            }
				        },
				        data: resultdata0
				    }]
				};
				let regionData = this.$echarts.init(document.getElementById('regionData'))
	          	regionData.setOption(option);

	        },
	        randomData() {
			    return Math.round(Math.random() * 1000);
			},
			NumDescSort(a,b){
			    return a.value-b.value;
			}
        }
    }
</script>
<style scoped>
    .activeData(){

    }
    .dataCard .box-card {
	    width: 360px;
	}
    .dataCard .el-card{
    	float: left;
    	margin:15px;
    }
    .el-card__header{
    	text-align: center;
    }
    .dataCard .el-card .item {
	     padding: 0; 
	     text-align: center;
	}
	.dataCard .el-card .item p{
		font-size: 16px;
	}
	.dataCard .el-card .item .itemNum{
		font-size: 16px;
	}
</style>