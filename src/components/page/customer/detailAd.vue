<template>
	<div class="detailCar detail">
		<el-button type="primary" @click="goBack()" style="float:right">返回</el-button>
		<h3>个人信息</h3>
		<table>
			<tr><td class="title">姓名</td><td>{{advertiserInfo.USER_NAME}}</td><td class="title">联系电话</td><td>{{advertiserInfo.MOBILE}}</td></tr>
			<tr><td class="title">邮箱</td><td>{{advertiserInfo.EMAIL}}</td><td class="title">证件类型</td><td>{{advertiserInfo.CARD_TYPE}}</td></tr>
			<tr>
				<td class="title">证件号</td>
				<td>{{advertiserInfo.ID_CARD}}</td>
				<td class="title">证件照片</td>
				<td>
					<div class="baguetteBoxOne">
						 <a v-for="img in CARD_IMG" :href="img"><img :src="img"></a>
					   <!--  <a href="http://feimosi.github.io/baguetteBox.js/img/thumbs/1-2.jpg"><img src="http://feimosi.github.io/baguetteBox.js/img/thumbs/1-2.jpg"></a> -->
					</div>
					   
				</td>
				</tr>
			
		</table>
		<h3>任务信息-{{totalCnt}}个</h3>
		<div class="detail_dataTable">
			<tasktable :taskData='taskInfo' :operationtype='operationtype'></tasktable>

		</div>
		<div class="block">
              <el-pagination
                layout="prev, pager, next"
                :total="totalCnt"
                @current-change="taskListPageChange">
              </el-pagination>
        </div>
		
	</div>
</template>
<script>
import {mixinUtils} from 'components/config/mixin'
import $ from 'jquery'
import {advertiserInfo} from 'service/getData'
import tasktable from './taskTable'
	export default{
		data(){
			return{
				operationtype:'',
				advertiserInfo:'',
				taskInfo:[],
				totalCnt:0,
				totalPage:'',
				backCurPage:'',
				userId:'',
				CARD_IMG:[],//把拿到的字符串类型的图片路径变成数组

			}
		},
		mixins:[mixinUtils],
		mounted(){
			this.userId = this.$route.query.userId;
			this.getAdvertiserInfo(this.userId,1);
		},
		methods:{
			getAdvertiserInfo(userId,curPage){
				advertiserInfo(userId,curPage).then(res=>{
					console.log(res);
					if(res.code=='000'){
						this.advertiserInfo = res.advertiserInfo;
						// console.log('+++++++++++++');
						// console.log(res.advertiserInfo.CARD_IMG.split(','));
						if(res.advertiserInfo.CARD_IMG.length>0)this.CARD_IMG = res.advertiserInfo.CARD_IMG.split(',');
						this.taskInfo = res.taskInfo||[];
						this.totalCnt = Number(res.totalCnt);
						this.totalPage = res.totalPage;
						this.backCurPage = res.backCurPage;
					}
				})
			},
			taskListPageChange(){
				this.getAdvertiserInfo(this.userId,val);
			}
			
		},
		updated(){
			baguetteBox.run('.baguetteBoxOne');
			baguetteBox.run('.task_exmall_img');
		},
		components:{tasktable}
	}
</script>
<style scoped>
.detailCar{}
</style>