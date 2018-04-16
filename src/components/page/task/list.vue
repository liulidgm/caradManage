<template>
	<div class="custMg">
		<div class="search_area clear">
			<div class="s_input clear"><label>上刊名称</label><el-input v-model="searchForm.taskName" placeholder="用户名"></el-input></div>
			<div class="s_input clear"><label>投放时间</label>
				<el-date-picker
				  @change='changeTime'
			      v-model="publishTime"
			      type="daterange"
			      placeholder="选择日期范围">
			    </el-date-picker>
			</div>
			<div class="s_input clear"><label>单笔佣金</label><el-input v-model="searchForm.singleAmt" placeholder="请输入"></el-input></div>
			<div class="s_input clear" style="width:30%;">
				<label>品牌</label>
				<el-select filterable v-model="searchForm.brand" placeholder="请选择" @change="changeBrands" class="brand_select">
				    <el-option
				      v-for="item in brandsList"
				      :key="item"
				      :label="item"
				      :value="item">
				    </el-option>
				</el-select>
				<el-select filterable v-model="searchForm.carModel" placeholder="请选择" @change="changeModel" class="brand_select">
				    <el-option
				      v-for="item in modelList"
				      :key="item"
				      :label="item"
				      :value="item">
				    </el-option>
				</el-select>
			</div>
			<div class="s_input clear">
				<label>颜色</label>
				<el-select v-model="searchForm.carColor" @change="changeColor" placeholder="请选择">
				    <el-option
				      v-for="item in colorList"
				      :label="item.classificationName" 
				      :value="item.dictionaryId">
				    </el-option>
				</el-select>
			</div>
			<div class="s_input clear">
				<label>状态</label>
				<el-select v-model="searchForm.taskState" placeholder="请选择">
				    <el-option key="0" value="0" label="待上线"></el-option>
				    <el-option key="1" value="1" label="进行中"></el-option>
				    <el-option key="2" value="2" label="已完成"></el-option>
				    <!-- <el-option key="3" value="3" label="草稿"></el-option> -->
				    <!-- <el-option key="4" value="4" label="已下线"></el-option> -->
				</el-select>
			</div>
			<div class="s_btn_area">
				<el-button type="primary" @click="resetForm()">清空</el-button>
				<el-button type="primary" @click="searchSub()">查询</el-button>
			</div>
		</div>
		<el-button type="primary" style="margin: 50px 0 20px 0;float: right;" @click="editTask('')">新增任务</el-button>
		<div class="data_area">
			<el-table
		    :data="listData"
		    border
		    style="width: 100%">
		    <el-table-column
		      type="index"
		      width="80">
		    </el-table-column>
		    <el-table-column
		    	v-if="false"
		    	prop="TASK_ID">
		    </el-table-column>
		    <el-table-column
		      prop="TASK_NAME"
		      label="上刊名称"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="TASK_START_TIME"
		      label="投放起始日期"
		      width="120">
		    </el-table-column>
		    <el-table-column
		      prop="TASK_END_TIME"
		      label="投放结束日期"
		      width="120">
		    </el-table-column>
		    <el-table-column
		      prop="REQUEST_CARNUM"
		      label="所需车辆">
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
		    	prop="taskState"
		    	label="状态"
		    	width="80">
		    </el-table-column>
		    <el-table-column label="操作" width="150">
		      <template scope="scope">
		        <el-button size="small" @click="goDetail(scope.row)">查看</el-button>
		        <el-button v-if="scope.row.taskState=='预上线'" size="small" @click="editTask(scope.row)">修改</el-button>

		      </template>
		    </el-table-column>
		  </el-table>
		  <div class="block">
			  <el-pagination
			    layout="prev, pager, next"
			    :total="tasklistCnt"
			    @current-change="taskListPageChange">
			  </el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
import {taskList,getCarBrands,getCarModel,getDictionaryNameList} from 'service/getData'
	export default{
		data(){
			return{
				  brandsList:[],
				  //taskName singleAmt brand carModel carColor publishTimeStart publishTimeEnd
				  searchForm:{
				  	taskName:'',
				  	singleAmt :'',
				  	brand :'',
				  	carModel :'',
				  	carColor :'',
				  	publishTimeStart :'',
				  	publishTimeEnd:'',
				  	taskState:'',
				  	curPage:1,
				  },
				listData: [],//SCLogin/taskList.do
		        publishTime:'',
		        stateList:[],
		        tasklistCnt:0,
		        curPage:'',
		        colorList:[],
		        modelList:[],
			}
		},
		mounted(){
			Promise.all([
	            this.getCarBrands(),
	            this.getCarColor(),
            ]).then(function(results){
            console.log(results);
          	});
			this.getTaskList(this.searchForm);
		},
		methods:{
			getCarBrands(){
				//SCLogin/getCarBrands.do
				var _this = this;
				var p = new Promise(function(resolve,reject){
					getCarBrands().then(res=>{
						if(res.code=='000'){
							_this.brandsList = res.brands;
						}
					})
				})
				
			},
			changeBrands(value){
				this.searchForm.brand = value;
				this.getCarModel(value);
			},
			getCarModel(brand){
				//SCLogin/getCarModel.do
				getCarModel(brand).then(res=>{
					console.log('车型');
					console.log(res);
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
	                console.log(res);
	                if(res.code=="000"){
	                  _this.colorList = res.dictionaryList;
	                }
	              });
	            })
	            return p;
			},
			changeColor(value){
				this.searchForm.carColor = value;
			},
			getTaskList(params){
				taskList(params).then(res=>{
					console.log(res);
					if(res.code=='000'){
						this.listData = res.taskList;
						this.stateList = res.stateList;
						this.tasklistCnt = res.taskCnt
					}
				})
			},
			resetForm() {
		        this.searchForm.taskName='';
				this.searchForm.singleAmt='';
				this.searchForm.brand ='';
				this.searchForm.carModel='';
				this.searchForm.carColor='';
				this.searchForm.publishTimeStart='';
				this.searchForm.publishTimeEnd='';
				this.searchForm.taskState='';
				this.publishTime = "";
				this.getTaskList(this.searchForm);
		     },
			searchSub(){
				console.log(this.searchForm);
				this.getTaskList(this.searchForm);
			},
			taskListPageChange(val){
				this.searchForm.curPage = val;
				this.getTaskList(this.searchForm);
			},
			changeTime(publishTime){
				this.searchForm.publishTimeStart = publishTime.substr(0,10);
				this.searchForm.publishTimeEnd = publishTime.substr(13,10);
			},
			goDetail(row){
				this.$router.push({path:'/taskdetail',query:{taskNo:row.TASK_ID}});
			},
			editTask(row){
				// console.log(row.TASK_ID);
				// this.$router.push({path:'/editTask',params:{taskNo:row.TASK_ID}});
				this.$router.push({path:'/editTask',query:{taskNo:row.TASK_ID}});
			}
		}
	}
</script>
<style scoped>
.s_btn_area{position:absolute;right: 30px;top:103px;}
.s_btn_area:before{content: '';width:px;height: 10px;background: #fff;}
.brand_select{float: left;width: 40%!important}
.brand_select.el-input{width: 100%!important;}
</style>