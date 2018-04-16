<template>
	<div class="custMg">
		<div class="search_area clear">
			<div class="s_input clear"><label>上刊名称</label><el-input v-model="searchForm.taskName" placeholder="用户名"></el-input></div>
			<div class="s_input clear custMg_registertime"><label>注册时间</label>
				<el-date-picker
			      v-model="searchForm.publishTimeStart"
			      type="date"
			      placeholder="选择开始日期"
      			  value-format="yyyy-MM-dd">
			    </el-date-picker>
			    <el-date-picker
			      v-model="searchForm.publishTimeEnd"
			      type="date"
			      placeholder="选择结束日期"
      			  value-format="yyyy-MM-dd">
			    </el-date-picker>
			</div>
			<div class="s_input clear"><label>单笔佣金</label><el-input v-model="searchForm.singleAmt" placeholder="用户名"></el-input></div>
			<div class="s_input clear">
				<label>品牌</label>
				<el-select filterable v-model="searchForm.brand" placeholder="品牌"  @change="changeBrands">
				    <el-option v-for="item in brandsList" :label="item" :value="item"></el-option>
				</el-select>
			</div>
			<div class="s_input clear">
				<label>车型</label>
				<el-select v-model="searchForm.carModel" placeholder="车型" @change="changeModel">
				    <el-option v-for="item in modelList" :label="item" :value="item"></el-option>
				</el-select>
			</div>
			<div class="s_input clear">
				<label>颜色</label>
				<el-select v-model="searchForm.carColor" placeholder="请选择">
				    <el-option
				      v-for="item in colorList"
				      :label="item.classificationName"
				      :value="item.classificationName">
				    </el-option>
				</el-select>
			</div>
			<div class="s_input clear">
				<label>状态</label>
				<el-select v-model="searchForm.taskState" placeholder="请选择">
					<!-- //0:待上线;1:进行中;2:已完成 -->
				    <el-option label="待上线" value="0"></el-option>
				    <el-option label="进行中" value="1"></el-option>
				    <el-option label="已完成" value="2"></el-option>
				</el-select>
			</div>
			<div class="s_btn_area">
				<el-button type="primary" @click="searchSub()">查询</el-button>
				<el-button type="primary" @click="resetSearchForm()">清空</el-button>
			</div>
		</div>
		<div class="data_area">
			<el-table
		    :data="taskExamineData"
		    border
		    style="width: 100%">
		    <el-table-column
		      type="index"
		      width="80">
		    </el-table-column>
		    <el-table-column
		      prop="TASK_NAME"
		      label="上刊名称"
		      width="200">
		    </el-table-column>
		    <el-table-column
		      prop="TASK_START_TIME"
		      label="投放起始日期"
		      width="150">
		    </el-table-column>
		    <el-table-column
		      prop="TASK_END_TIME"
		      label="投放结束日期"
		      width="150">
		    </el-table-column>
		    <el-table-column
		      prop="REQUEST_CARNUM"
		      label="所需车辆"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="SINGLE_AMOUNT"
		      label="单笔佣金"
		      width="100">
		    </el-table-column>
		    <el-table-column
		      prop="isNetCar"
		      label="是否网约车"
		      width="120">
		    </el-table-column>
		    <el-table-column
		    	prop="TASK_STATE"
		    	label="状态"
		    	width="100">
		    </el-table-column>
		    <el-table-column label="操作" width="150">
		      <template scope="scope">
		        <el-button
		          size="small"
		          @click="goDetail(scope.row)">查看</el-button>
		      </template>
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
	</div>
</template>
<script>
import {taskExamineList,getCarBrands,getCarModel,getDictionaryNameList} from 'service/getData'
	export default{
		data(){
			return{
				brandsList:[],
				colorList:[],
		        modelList:[],
				singleAmt:'',
				taskName:'',
				brand:'',
				carModel:'',
				carColor:'',
				publishTime:'',//publishTimeStart publishTimeEnd
				searchForm:{
					singleAmt:'',
					taskName:'',
					brand:'',
					carModel:'',
					carColor:'',
					publishTimeStart:'',
					publishTimeEnd:'',
					taskState:'',
					curPage:''
				},
				taskExamineData: [],
		        taskCnt:0,
		        curPage:1,
			}
		},
		mounted(){
			Promise.all([
        			this.getCarBrands(), 
        			this.getCarColor(),
        			this.taskExamineList(),
        			]).then(function(results){
			    		console.log(results);
			});
			this.taskExamineList();
		},
		methods:{
			getCarBrands(){
				//SCLogin/getCarBrands.do
				var _this = this;
		        var p = new Promise(function(resolve, reject){
		            getCarBrands().then(res=>{
		            	console.log(res);
						if(res.code=='000'){
							_this.brandsList = res.brands;
						}
					})
		        })
		        return p;
			},
			changeBrands(value){
				this.searchForm.brand = value;
				this.getCarModel(value);
			},
			getCarModel(brand){
				//SCLogin/getCarModel.do
				getCarModel(brand).then(res=>{
					this.modelList = res.carModels;
				})
			},
			changeModel(value){
				this.searchForm.carModel = value;
			},
			getCarColor(){
				var _this = this;
		        var p = new Promise(function(resolve, reject){
		            getDictionaryNameList('颜色').then(res=>{
		                if(res.code=="000"){
		                	console.log('颜色');
		                  _this.colorList = res.dictionaryList;
		                }
		              });
		        })
		        return p;
			},
			changeColor(value){
				this.searchForm.carColor = value;
			},
			searchSub(){
				this.taskExamineList();
			},
			resetSearchForm(){
					this.searchForm.singleAmt='';
					this.searchForm.taskName='';
					this.searchForm.brand='';
					this.searchForm.carModel='';
					this.searchForm.carColor='';
					this.searchForm.publishTimeStart='';
					this.searchForm.publishTimeEnd='';
					this.searchForm.taskState='';
					this.searchForm.curPage=1;
					this.taskExamineList();
			},
			taskListPageChange(val){
				this.searchForm.curPage = val;
				this.taskExamineList();
			},
			goDetail(row){
				this.$router.push({path:'/taskexamineDetail',query:{taskNo:row.TASK_ID}});
			},
			taskExamineList(){
				taskExamineList(this.searchForm).then(res=>{
					console.log(res);
					if(res.code=='000'){
						this.taskExamineData = res.taskList;
						this.taskCnt = res.taskExamineCnt;
						this.curPage = res.backCurPage;
					}
				})
			}

		}
	}
</script>
<style scoped>
.s_btn_area{position:absolute;right: 30px;top:147px;}
.s_btn_area:before{content: '';width:px;height: 10px;background: #fff;}
	/*.search_area .el-input{width:25%;float: left;margin-left: 10px;}*/
.brand_select{float: left;width: 40%!important}
.brand_select.el-input{width: 100%!important;}
</style>