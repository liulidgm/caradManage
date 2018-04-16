<template>
	<div class="custMg">
		<div class="search_area clear">
			<!-- <div class="s_input clear"><label>城市</label>
				<el-select v-model="searchForm.city" filterable placeholder="请选择">
					<el-option key="1" label="北京" value="1"></el-option>
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
			</div> -->
			<div class="s_input clear"><label>车牌号</label><el-input v-model="searchForm.carCode" placeholder="车牌号"></el-input></div>
			<div class="s_input clear">
				<label>审核状态</label>
				<el-select v-model="searchForm.carState" placeholder="请选择">
					<el-option key="1" label="全部" value=""></el-option>
				    <el-option key="2" label="待审核" value="0"></el-option>
				    <el-option key="3" label="已通过" value="1"></el-option>
				    <el-option key="4" label="已驳回" value="2"></el-option>	 
				</el-select>
			</div>
			<div class="s_input clear">
				<label>车辆状态</label>
				<el-select v-model="searchForm.orderState" placeholder="请选择">
					 <el-option key="1" label="全部" value=""></el-option>
				    <el-option key="2" label="未结单" value="0"></el-option>
				    <el-option key="3" label="已接单未上刊" value="1"></el-option>
				    <el-option key="4" label="进行中" value="2"></el-option>	 
				</el-select>
			</div>
			<div class="s_input clear" style="width:66%;">
				<label>品牌</label>
				<el-select v-model="searchForm.carBrand" filterable placeholder="请选择" @change="changeBrands" class="city_select">
				    <el-option
				      v-for="item in brandsList"
				      :key="item"
				      :label="item"
				      :value="item">
				    </el-option>
				</el-select>
				<el-select v-model="searchForm.carModel" placeholder="请选择" @change="changeModel" class="city_select">
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
				      :value="item.classificationName">
				    </el-option>
				</el-select>
			</div>
			<div class="s_btn_area">
				<el-button type="primary" @click="searchSub()">查询</el-button>
				<el-button type="primary" @click="resetSearchForm()">清除</el-button>
			</div>
		</div>
		<el-button type="primary" @click="exportCarList()" style="float: right;margin: 50px 30px 20px 0px;">导出数据</el-button>
		<div class="data_area">
			<el-table :data="carList"  border style="width: 100%">
		     <el-table-column
		      type="index"
		      width="80">
		    </el-table-column>
		    <el-table-column
		      prop="city"
		      label="城市">
		    </el-table-column>
		    <el-table-column
		      prop="carCode"
		      label="车牌号">
		    </el-table-column>
		    <el-table-column
		      prop="carBrand"
		      label="品牌">
		    </el-table-column>
		    <el-table-column
		      prop="carColor"
		      label="颜色">
		    </el-table-column>
		    <el-table-column
		      prop="isNetCar"
		      label="是否网约车">
		    </el-table-column>
		    <el-table-column
		      prop="orderState"
		      label="车辆状态">
		    </el-table-column>
		    <el-table-column
		    	prop="carState"
		    	label="审核状态">
		    </el-table-column>
		    <el-table-column label="操作" width="150">
		      <template scope="scope">
		        <el-button
		          size="small"
		          @click="handleDetail(scope.row)">查看</el-button>
		      </template>
		    </el-table-column>
		  </el-table>
		  <div class="block">
			  <el-pagination
			    layout="prev, pager, next"
			    :total="carCnt"
			    @current-change="carListPageChange">
			  </el-pagination>
		  </div>
		</div>
	</div>
</template>
<script>
import {formatUserState} from 'components/config/utils'
import {carList,getCarBrands,getCarModel,getDictionaryNameList,carListExport} from 'service/getData'
	export default{
		data(){
			return{
				brandsList:[],
				modelList:[],
				colorList:[],
				searchForm:{
					city:'',
					carCode:'',
					carState:'',
					orderState:'',
					carBrand:'',
					carModel:'',
					carColor:''

				},
				carCnt:0,
				curPage:'',
				carList: []
			}
		},
		mounted(){
			this.getCarColor();
			this.getCarBrands();
			this.getCarList(this.searchForm);
		},
		methods:{
			getCarBrands(){
				getCarBrands().then(res=>{
					console.log(res);
					if(res.code=='000'){
						this.brandsList = res.brands;
					}
				})
			},
			changeBrands(value){
				this.searchForm.carBrand = value;
				this.getCarModel(value);
			},
			getCarModel(brand){
				getCarModel(brand).then(res=>{
					this.modelList = res.carModels;
				})
			},
			changeModel(value){
				this.searchForm.carModel = value;

			},
			getCarColor(){
				// var _this = this;
		  //       var p = new Promise(function(resolve, reject){
		            getDictionaryNameList('颜色').then(res=>{
		                if(res.code=="000"){
		                	console.log('颜色');
		                  this.colorList = res.dictionaryList;
		                }
		              });
		        // })
		        // return p;

			},
			changeColor(value){
				this.searchForm.carColor = value;
			},
			getCarList(params){
				//SCLogin/carList.do
				carList(params).then(res=>{
					console.log(res);
					if(res.code=='000'){
						this.carList = res.carList;
						this.curPage = res.backCurPage;
						this.carCnt = res.carCnt;
					}
				})
			},
			searchSub(){
				console.log(this.searchForm);
				this.getCarList(this.searchForm);
			},
			resetSearchForm(){
				this.searchForm.city='';
				this.searchForm.carCode='';
				this.searchForm.carState='';
				this.searchForm.orderState='';
				this.searchForm.carBrand='';
				this.searchForm.carModel='';
				this.searchForm.carColor='';
				this.getCarList(this.searchForm);
			},
			handleDetail(row){
				//this.$router.push('/detailCar');
				this.$router.push({path:'/cardetail',query:{carCode:row.carCode}});
			},
			carListPageChange(val){
				this.searchForm.curPage = val;
				this.getCarList(this.searchForm);
			},
			exportCarList() {
				carListExport(this.searchForm).then(res=>{
					if(res.code=='000'){
						var carList = res.carList;
					    require.ensure([], () => {
			      　　　　const { export_json_to_excel } = require('../../../vendor/Export2Excel');
			      　　　　const tHeader = ['城市', '车牌号', '品牌', '颜色','是否网约车', '车辆状态', '审核状态'];
			      　　　　const filterVal = ['city', 'carCode', 'carBrand', 'carColor','isNetCar', 'orderState', 'carState'];
			      　　　　const list = carList;
			      　　　　const data = this.formatJson(filterVal, list);
			      　　　　export_json_to_excel(tHeader, data, '车辆列表');
			      　　 })
					}else{

					}
				})
	      　　
	      },
	      formatJson(filterVal, jsonData) {
	　　　　　　return jsonData.map(v => filterVal.map(j => v[j]))
	　　　},
		}
	}
</script>
<style scoped>
.s_btn_area{position:absolute;right: 30px;top: 105px;}
.s_btn_area:before{content: '';width:px;height: 10px;background: #fff;}
.data_area{margin-top:50px;}
.city_select{float: left;width: 30%!important}
.city_select.el-input{width: 100%!important;}
</style>