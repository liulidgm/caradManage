<template>
    <div class="detail">
        <h3>任务信息</h3>
		<table>
			<tr>
				<td class="title">企业名称</td><td>{{taskInfo.companyName}}</td>
				<td class="title">上刊名称</td><td>{{taskInfo.taskName}}</td>
			</tr>
			<tr>
				<td class="title">投放城市</td><td>{{taskInfo.cityName}}</td>
				<td class="title">所需车辆数量</td><td>{{taskInfo.carNum}}</td>
			</tr>
			<tr>
				<td class="title">品牌</td><td>{{taskInfo.brand}}</td>
				<td class="title">车系</td><td>{{taskInfo.carModel}}</td>
			</tr>
			<tr>
				<td class="title">车型</td><td>{{taskInfo.carForm}}</td>
				<td class="title">车辆颜色</td><td>{{taskInfo.carColor}}</td>
				
			</tr>
			<tr>
				<td class="title">投放起始日期</td><td>{{taskInfo.taskStartTime}}</td>
				<td class="title">投放结束日期</td><td>{{taskInfo.taskEndTime}}</td>
			</tr>
			<tr>
				<td class="title">上刊周期</td><td>{{taskInfo.taskPeriod}}</td>
				<td class="title">上刊美观度</td><td>{{taskInfo.beautyGreesName}}</td>
			</tr>
			<tr>
				<td class="title">单笔佣金</td><td>{{taskInfo.singleAmt}}</td>
				<td class="title">支付费用</td><td>{{taskInfo.serviceAmt}}</td>
			</tr>
			<tr>
				<td class="title">利润百分比</td><td>{{taskInfo.percentProfit}}%</td>
				<td class="title">服务费用</td><td>{{taskInfo.investAmt}}</td>
			</tr>
			<tr>
				<td class="title">任务状态</td><td>{{taskInfo.taskState}}</td>
				<td class="title">是否网约车</td><td>{{taskInfo.isNetCar}}</td>
			</tr>
		</table>
		<h3>展示图</h3>
		<div style="margin-top:20px;" class="baguetteBoxOne">
			 <a v-for="img in taskInfo.imgs" :href="img"><img style="width:150px;height:150px;margin-left:20px;" :src="img"></a>
			<!--  <a href="../../../assets/04.jpg"><img style="width:150px;height:150px;margin-left:20px;" src="../../../assets/04.jpg"></a>
			  <a href="../../../assets/01.jpg"><img style="width:150px;height:150px;margin-left:20px;" src="../../../assets/01.jpg"></a> -->
		</div>
		<h3 style="margin-top:30px;">特殊需求</h3>
		<p style="margin-top:20px;">{{taskInfo.specialNeeds}}</p>
		<h3 style="margin-top:30px;">介绍</h3>
		<div style="margin-top:20px;" v-html="taskInfo.introduce"></div>
    </div>
</template>
<script type="text/javascript">
import $ from 'jquery'
import {checktask} from 'service/getData'
    export default {
        data(){
            return{
            	taskNo:'',
            	taskInfo:'',
            	imgs:[],
            }
        },
        mounted(){
        	// $(function(){
        	// 	baguetteBox.run('.baguetteBoxOne');
        	// })
        	this.taskNo = this.$route.query.taskNo;
        	this.checktask(this.taskNo);
        },
        methods:{
        	checktask(taskNo){
        		checktask(taskNo).then(res=>{
        			if(res.code=='000'){
        				this.taskInfo = res.taskInfo;
        				this.specialNeeds = res.specialNeeds;
        				// this.imgs = ['../../../assets/04.jpg','../../../assets/01.jpg'];
        				
        			}
        		})
        	}
        },
        updated(){
        	baguetteBox.run('.baguetteBoxOne');
        }
    }
</script>
<style type="text/css">
    
</style>