<template>
    <div class="editTask formStyle detail">
    <el-form :model="editTaskForm" :label-position="labelPosition" ref="editTaskForm" :rules="editTaskFormRule" label-width="100px" class="demo-ruleForm clear">
       <h3>企业信息</h3>
       <div class="clear">
	       	<el-form-item label="" prop="companyId">
		       <el-select filterable v-model="companyName" @change="changeCom" placeholder="请选择">
			       <el-option v-for="item in comList" :label="item.COMPANY_NAME" :value="item.COMPANY_ID"></el-option>
			   </el-select>
		   </el-form-item>
		   <el-button @click="searchCom()">搜索</el-button>
       </div>
	   <div class="clear" v-show="isShowComInfo">
		   	<table>
				<tr><td class="title">用户名</td><td>{{companyInfo.userName}}</td><td class="title">企业名称</td><td>{{companyInfo.companyName}}</td></tr>
				<tr><td class="title">主体资质</td><td>{{companyInfo.mainQuality}}</td><td class="title">公司地址</td><td>{{companyInfo.companyAddress}}</td></tr>
				<tr><td class="title">注册地址</td><td>{{companyInfo.registeAddress}}</td><td class="title">所属行业</td><td>{{companyInfo.industry}}</td></tr>
				<tr><td class="title">注册号</td><td>{{companyInfo.registeNum}}</td><td class="title">电话号码</td><td>{{companyInfo.companyTell}}</td></tr>
				<tr><td class="title">有效期</td><td>{{companyInfo.validTime}}</td><td class="title">企业邮箱</td><td>{{companyInfo.companyEmail}}</td></tr>
				<tr><td class="title">联系人姓名</td><td>{{companyInfo.linkName}}</td><td class="title">联系人电话</td><td>{{companyInfo.linkTell}}</td></tr>
				<tr><td class="title">企业法人姓名</td><td>{{companyInfo.companyLawerName}}</td><td class="title">企业法人证件类型</td><td>{{companyInfo.lawerCardType}}</td></tr>
				<tr>
					<td class="title">企业法人证件号码</td><td>{{companyInfo.lawerCardNo}}</td>
					<td class="title">证件照片</td>
					<td class="carImg">
						<a v-for="img in companyInfo.lawerCardImg" :href="img"><img :src="img"></a>
					</td>
				</tr>
				<tr>
					<td class="title">资质照片</td>
					<td class="qulityImg">
						<a :href="companyInfo.qulityImg"><img :src="companyInfo.qulityImg"></a>
					</td>
					<td class="title">企业logo</td>
					<td class="companyLogo">
						<a :href="companyInfo.companyLogo"><img :src="companyInfo.companyLogo"></a>
					</td>
				</tr>
				</tr>
			</table>
			<el-button type="primary" style="float:right" @click="hiddenComInfo()">确定</el-button>
	   </div>
	   <h3>任务信息</h3>
	   <div class="clear">
	   		<div style="float:initial" class="clear">
	   			<el-form-item label="投放区域(省)" prop="provinceId">
				    <el-select filterable v-model="provinces" @change="changeProvince" placeholder="省">
				      <el-option
					      v-for="item in provincesList"
					      :label="item.cityName"
					      :value="item.cityId">
					    </el-option>
				      
				    </el-select>
				</el-form-item>    
				<el-form-item label="投放区域(市)" prop="cityId">
				    <el-select @change="changeCity" v-model="city"  placeholder="市">
				      <el-option 
					      v-for="item in cityList" 
					      :label="item.cityName" 
					      :value="item.cityId">
				      </el-option>
				    </el-select>
				</el-form-item>
	   		</div>
            <div style="float:initial" class="clear">
				<el-form-item label="品牌" prop="brand">
				    <el-select filterable
					    v-model="editTaskForm.brand" 
					    placeholder="品牌"  
					    @change="changeBrands">
				      	<el-option v-for="item in brandsList" :label="item" :value="item"></el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="车系" prop="carModel">
				    <el-select filterable 
					    v-model="editTaskForm.carModel" 
					    placeholder="车系" 
					    @change="changeModel">
				      	<el-option v-for="item in modelList" :label="item" :value="item"></el-option>
				    </el-select>
				</el-form-item>
			</div>
			<div style="float:initial" class="clear">
				<el-form-item label="车型" prop="carForm">
				    <el-select filterable allow-create 
					    v-model="editTaskForm.carForm" 
					    placeholder="车型" 
					    @change="changeCarConstructs">
				      	<el-option v-for="item in carConstructsList" :label="item" :value="item"></el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="所需车辆数量" prop="carNum">
					<el-input placeholder="请输入内容" v-model="editTaskForm.carNum">
					    <template slot="append">台</template>
					</el-input>
				</el-form-item>
			</div>
			<div style="float:initial" class="clear">
				<el-form-item label="颜色" prop="carColor">
				    <el-select v-model="editTaskForm.carColor" placeholder="颜色">
				      <el-option v-for="item in colorList" :label="item.classificationName" :value="item.classificationName"></el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="上刊美观度" prop="beautyGrees">
				    <el-select @change="changeBeautyGrees" v-model="beautyGreeName" placeholder="不限">
				      <el-option v-for="item in beautyGreesList" :label="item.classificationName" :value="item.dictionaryId"></el-option>
				    </el-select>
				</el-form-item>
			</div>
			<div style="float:initial" class="clear">
				<el-form-item label="投放起始日期" prop="">
					<el-date-picker
				      v-model="taskStartTime"
				      type="date"
				      placeholder="选择开始日期"
	      			  value-format="yyyy-MM-dd"
	      			  @change="changeTaskStartTime">
				    </el-date-picker>
				    <el-date-picker
				      v-model="taskEndTime"
				      type="date"
				      placeholder="选择结束日期"
	      			  value-format="yyyy-MM-dd"
	      			  @change="changeTaskEndTime">
				    </el-date-picker>
				</el-form-item>
				<el-form-item label="投放周期" prop="taskPeriod">
					<el-input placeholder="请输入" v-model="editTaskForm.taskPeriod"></el-input>
				</el-form-item>
			</div>
			<div style="float:initial" class="clear">
				<el-form-item label="上刊名称" prop="taskName">
					<el-input placeholder="请输入" v-model="editTaskForm.taskName"></el-input>
				</el-form-item>
				
				<el-form-item label="单笔佣金" prop="singleAmt">
					<el-input placeholder="请输入内容" v-model="editTaskForm.singleAmt">
					    <template slot="append">元</template>
					</el-input>
				</el-form-item>
			</div>
			<div style="float:initial" class="clear">
				<el-form-item label="服务费" prop="serviceAmt">
					<el-input placeholder="请输入内容" v-model="editTaskForm.serviceAmt">
					    <template slot="append">元</template>
					</el-input>
				</el-form-item>
				<el-form-item label="支付费用" prop="investAmt">
					<el-input placeholder="请输入内容" v-model="editTaskForm.investAmt">
					    <template slot="append">元</template>
					</el-input>
				</el-form-item>
			</div>
			<div style="float:initial" class="clear">
				<el-form-item label="是否网约车" prop="isNetCar">
				    <el-select v-model="showIsNetCar" @change="changeIsNetCar">
				      	<el-option label="不限" value="0"></el-option>
				      	<el-option label="非网约车" value="1"></el-option>
				      	<el-option label="网约车" value="2"></el-option>
				    </el-select>
				</el-form-item>
			</div>
	   </div>
       <h3>上传展示图</h3>
       <el-upload
		  :action="uploadUrl"
		  name="file"
		  list-type="picture-card"
		  :on-preview="handlePictureCardPreview"
		  :on-remove="handleRemove"
		  :file-list="fileList"
		  :on-change="showImgChange">
		  <i class="el-icon-plus"></i>
		</el-upload>
		<el-dialog v-model="dialogVisible" size="tiny">
		  <img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
       <h3>特殊需求</h3>
        <el-form-item prop="specialNeeds" style="display: block;float: initial;">
			<el-input type="textarea" v-model="editTaskForm.specialNeeds"></el-input>
		</el-form-item>
       <h3>介绍</h3>
       <div id="editor"></div>
       <el-form-item style="width:100%;text-align:center; margin-top: 20px;">
       		<el-button size="medium" @click="cancel()">取消</el-button>
			<el-button type="primary" size="medium" @click="subTask('editTaskForm')">确定</el-button>
		</el-form-item>
       </el-form>
    </div>
</template>
<script type="text/javascript">
import {getCompanyList,
	checkCities,checkProvinces,
	getUserCarBrands,getUserCarSeries,
	getCarColor,taskEdit,checktask,
	getDictionaryNameList,getUserCarConstructs,
	checkCompanyInfo
} from 'service/getData'
import {baseUrl} from 'components/config/env'
import E from 'wangeditor'
    export default {
    	
        data(){
        	var isNum = (rule, value, callback) => {
		        if (!Number.isInteger(value)) {
	            	callback(new Error('请输入数字值'));
		        } else {
		        	callback();
		        }
		    };
            return{
            	companyInfo:'',
            	labelPosition:'top',
            	isShowComInfo:false,
            	isInitPro:false,
            	isInitCity:false,
            	isInitCom:false,
            	isInitBeauty:false,
            	isFirstNetCar:false,
            	uploadUrl:'/SCLogin/uploadFile.do',
            	beautyGreesList:[],
            	comList:[],
            	provincesList:[],
            	cityList:[],
            	brandsList:[],
            	colorList:[],
		        modelList:[],
		        carConstructsList:[],
		        companyName:'',
            	provinces:'',
            	city:'',
            	beautyGreeName:'',
            	// publishTime:'',
            	publishTime:'',//给后台不需要字段
            	operatorFlag:'0',
				operatorType:'0',//原型上只有“确定按钮”，默认保存并发布
				taskStartTime:'',
				taskEndTime:'',
				showIsNetCar:'',
            	editTaskForm:{
            		//录入页面字段//
            		taskNo:'',//编辑时必填
            		brand:'',//品牌
            		provinceId:0,
            		provinceName:'',
            		cityId:0,
            		cityName:'',
					taskName:'',
					singleAmt:'',
					taskPeriod:'',
					companyId:'',
					companyName:'',
					investAmt:'',
					serviceAmt:'',
					beautyGrees:0,//美观度列表目前为空，模拟数据
					taskEndTime:'',
					taskStartTime:'',
					carColor:'',
					carModel:'',
					brand:'',
					carForm:'',
					carNum:'',
					exhibitionImg:'',
					introduce:'',
					specialNeeds:'',
					isNetCar:'',//0:不限1:非网约车2：网约车
            	},
            	editTaskFormRule:{
            		// companyId:[{required:true,message: '请选择公司', trigger: 'blur'}],
					brand:[{required:true,message: '请选择品牌', trigger: 'blur'}],
					specialNeeds:[{required:true,message: '特殊需求不能为空', trigger: 'blur'}],
					// cityId:[{required:true,message: '请选择投放区域', trigger: 'blur'}],
					taskName:[{required:true,message: '任务名称不能为空', trigger: 'blur'}],
					singleAmt:[{required:true,message: '单笔佣金不能为空', trigger: 'blur'}],
					// taskPeriod:[{required:true,message: '投放周期不能为空', trigger: 'blur'}],
					investAmt:[{required:true,message: '支付费不可为空', trigger: 'blur'}],
					serviceAmt:[{required:true,message: '服务费不可为空', trigger: 'blur'}],
					// beautyGrees:[{required:true,message: '请选择上刊美观度', trigger: 'blur'}],
					taskStartTime:[{required:true,message: '投放起始日期不能为空', trigger: 'blur'}],
					taskEndTime:[{required:true,message: '投放起始日期不能为空', trigger: 'blur'}],
					//publishTime:[{required:true,message: '投放日期不能为空', trigger: 'blur'}],
					carColor:[{required:true,message: '请选择车辆颜色', trigger: 'blur'}],
					carModel:[{required:true,message: '请选择车型', trigger: 'blur'}],
					brand:[{required:true,message: '请选择品牌', trigger: 'blur'}],
					carNum:[{required:true,message: '所需车辆数量不能为空', trigger: 'blur'}],
				},
            	//展示图片
            	dialogImageUrl: '',
        		dialogVisible: false,
        		fileList:[],
        		imgUrl:[],
        		editor:''

            }
        },
        // mixins: [mixinUtils],
        async beforeMounted(){},
        mounted(){
        	//SCLogin/checktask.do 编辑信息返显 checkProvinces.do 获取省份  SCLogin/checkCities.do
        	// console.log("将要编辑"+this.editTaskForm.taskNo);
        	this.editTaskForm.taskNo = this.$route.query.taskNo;
        	if(this.editTaskForm.taskNo){
				this.isInitPro=true,
            	this.isInitCity=true,
            	this.isInitCom=true,
            	this.isInitBeauty = true,
            	this.isFirstNetCar = true,
        		this.operatorFlag = '1';
        		Promise.all([
        			this.getComList(), 
        			this.getProvinces(), 
        			this.getCarBrands(),
        			this.getBeautyGreesList(),
        			this.getCarColor(),
        			this.getTaskInfo(this.editTaskForm.taskNo)
        			]).then(function(results){
			    		console.log(results);
				});
        	}else{
        		Promise.all([
        			this.getComList(), 
        			this.getProvinces(), 
        			this.getCarBrands(),
        			this.getBeautyGreesList(),
        			this.getCarColor(),
        			]).then(function(results){
			    		console.log(results);
				});
        	}
        	
        	// this.getComList();
        	// this.getProvinces();
        	// this.getCarBrands();
        	this.initEditor();
        	
        },
        methods:{
        	getCompanyInfo(companyId){
				//checkCompanyInfo
				checkCompanyInfo(companyId).then(res=>{
					this.companyInfo = res.companyInfo;
					// this.taskList = res.taskList;
					// this.taskTotalCnt = res.totalCnt;
					this.isShowComInfo = true;
					
					baguetteBox.run('.qulityImg');
					baguetteBox.run('.companyLogo');
				})
			},
        	initEditor(){
        		/*初始化编辑器*/
	        	this.editor = new E('#editor');
	        	// 自定义菜单配置
			    this.editor.customConfig.menus = [
			        'head',  // 标题
				    'bold',  // 粗体
				    'italic',  // 斜体
				    'underline',  // 下划线
				    'strikeThrough',  // 删除线
				    'foreColor',  // 文字颜色
				    'backColor',  // 背景颜色
				    'list',  // 列表
				    'justify',  // 对齐方式
				    'quote',  // 引用
				    'image',  // 插入图片
	    			'table',  // 表格
	    			'undo',  // 撤销
	    			'redo'  // 重复
			    ];
			    //console.log(baseUrl+'upload/editorImg');
			    this.editor.customConfig.uploadImgServer = '/SCLogin/uploadFile.do';  // 上传图片到服务器
			    this.editor.customConfig.uploadFileName = 'file';
			    this.editor.customConfig.showLinkImg = false;//隐藏网络图片上传tab
			    this.editor.customConfig.uploadImgHooks = {
			    	customInsert: function (insertImg, result, editor) {
				        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
				        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
				        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
				        var url = result.filePath
				        insertImg(url)
				        // result 必须是一个 JSON 格式字符串！！！否则报错
				    }
			    }
		        this.editor.create();
        	},
        	changeIsNetCar(value){
        		if(this.isFirstNetCar){

        		}else{
        			this.editTaskForm.isNetCar = value;
        		}
        		
        	},
        	changeTaskStartTime(taskStartTime){
        		console.log(taskStartTime);
        		this.editTaskForm.taskStartTime = taskStartTime
        	},
        	changeTaskEndTime(taskEndTime){
        		console.log(taskEndTime);
        		this.editTaskForm.taskEndTime = taskEndTime
        	},
        	getBeautyGreesList(){
		          var _this = this;
		          var p = new Promise(function(resolve, reject){
		            getDictionaryNameList('上刊美观度').then(res=>{
		                console.log(res);
		                if(res.code=="000"){
		                	// console.log('美观度');
		                	// console.log(res.dictionaryList);
		                  _this.beautyGreesList = res.dictionaryList;
		                }
		              });
		            })
		            return p;
		    },
		    changeBeautyGrees(value){
        		if(this.isInitBeauty){
        			value = this.editTaskForm.beautyGrees;
        			this.isInitBeauty = false;
        		}
        		this.editTaskForm.beautyGrees = value;
		    },
        	getTaskInfo(taskNo){
        		//SCLogin/checktask.do
        		checktask(taskNo).then(res=>{
        			console.log(res);
        			if(res.code=='000'){
        				res.taskInfo
        				this.editTaskForm  = res.taskInfo;
        				this.provinces = this.editTaskForm.provinceName;
        				this.city = this.editTaskForm.cityName;
        				this.companyName = this.editTaskForm.companyName;
        				this.beautyGreeName = this.editTaskForm.beautyGreeName;
        				//对特殊字段处理  投放时间、展示图片、介绍(富文本)
        				// this.initEditor();
        				console.log(this.editor);
        				console.log(res.taskInfo.introduce);
        				this.editor.txt.html(res.taskInfo.introduce);

        				var _obj = {uid:'',url:''}
        				for(let i=0;i<res.taskInfo.imgs.length;i++){
        					_obj.uid = i;
        					_obj.url = res.taskInfo.imgs[i];
        					this.fileList.push(_obj);
        					this.imgUrl.push(_obj);
        				}

        				this.taskStartTime = res.taskInfo.taskStartTime;
        				this.taskEndTime = res.taskInfo.taskEndTime;
        				this.showIsNetCar = res.taskInfo.isNetCar;
        				////0:不限1:非网约车2：网约车
        				if(res.taskInfo.isNetCar=='不限'){
        					this.editTaskForm.isNetCar = '0'
        				}else if(res.taskInfo.isNetCar=='非网约车'){
        					this.editTaskForm.isNetCar = '1'
        				}else{
        					this.editTaskForm.isNetCar = '2'
        				}
        				console.log(this.editTaskForm.isNetCar);

        			}
        		})
        	},
        	changeCom(value){
        		if(this.isInitCom){
        			value = this.editTaskForm.companyId;
        			this.isInitCom = false;
        		}
        		this.editTaskForm.companyId = value
        	},
        	searchCom(){
        		//查询对应公司的详细信息
        		this.getCompanyInfo(this.editTaskForm.companyId);

        	},
        	hiddenComInfo(){
        		this.isShowComInfo = false;
        	},
        	getComList(){
        		//SCLogin/getCompanyList.do
        		var _this = this;
        		var p = new Promise(function(resolve, reject){
					getCompanyList().then(res=>{
	        			console.log(res);
	        			if(res.code=="000"){
	        				_this.comList = res.companyList;
	        				// _this.companyName = res.companyList[0].COMPANY_NAME
	        			}
	        		});
        		})
        		return p;
        	},
        	getProvinces(){
        		var _this = this;
        		var p = new Promise(function(resolve, reject){
        			checkProvinces().then(res=>{
	        			console.log(res);
	        			if(res.code=='000'){
	        				_this.provincesList = res.provinces;
	        			}
	        		})
        		})
        		return p;
        	},
        	changeProvince(value){
        		//编辑时 省市要返显
        		if(this.isInitPro){
        			value = this.editTaskForm.provinceId;
        			this.isInitPro = false;
        		}
        		this.editTaskForm.provinceId = value;
        		this.checkCities(value);

        	},
        	checkCities(provinceId){
        		// console.log('ppppppp'+provinceId)
        		checkCities(provinceId).then(res=>{
        			if(res.code=="000"){
        				this.cityList = res.cities;
        				// this.city = res.cities[0].cityName;
        				// this.editTaskForm.cityId = res.cities[0].cityId;
        			}
        		});
        	},
        	changeCity(value){
        		if(this.isInitCity){
        			value = this.editTaskForm.cityId;
        			this.isInitCity = false;
        		}
        		this.editTaskForm.cityId = value;
        	},
        	getCarBrands(){
				//SCLogin/getUserCarBrands.do
				var _this = this;
				var p = new Promise(function(resolve, reject){
					getUserCarBrands().then(res=>{
						console.log(res);
						if(res.code=='000'){
							_this.brandsList = res.brands;
						}
					})
				})
				return p;
			},
			changeBrands(value){
				console.log(value);
				this.editTaskForm.brand = value;
				this.getCarModel(value);
			},
			getCarModel(brand){
				//SCLogin/getUserCarSeries.do
				getUserCarSeries(brand).then(res=>{
					// console.log('车系');
					// console.log(res);
					this.modelList = res.carSerials;
				})
			},
			changeModel(value){
				this.editTaskForm.carModel = value;
				this.getCarConstructs(this.editTaskForm.brand,value);

			},
			getCarConstructs(brand,carSerial){
				//SCLogin/getUserCarConstructs.do
				getUserCarConstructs(brand,carSerial).then(res=>{
					if(res.code=='000'){
						console.log('车型');
						console.log(res);
						this.carConstructsList = res.carModels;
					}else{
						this.$message.error(res.msg);
					}
				})
			},
			changeCarConstructs(value){
				this.editTaskForm.carForm = value;
			},
			getCarColor(){
				console.log('获取颜色列表')
				var _this = this;
		        var p = new Promise(function(resolve, reject){
		            getDictionaryNameList('颜色').then(res=>{
		                console.log(res);
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
			changeTime(publishTime){
				console.log(publishTime);
				this.editTaskForm.taskStartTime = publishTime.substr(0,10);
				this.editTaskForm.taskEndTime = publishTime.substr(13,10);
				console.log(this.editTaskForm.taskStartTime+","+this.editTaskForm.taskEndTime);
			},
			// handleSuccess(response, file, fileList){
			// 	console.log('上传成功结果');
			// 	console.log(response);
			// 	console.log(file);
			// 	console.log(fileList);
			// },
			showImgChange(file, fileList){
				console.log('showImgChange');
				// console.log(file);
				if(file.response){
					var tplobj = {uid:file.uid,url:file.response.filePath};
					this.imgUrl.push(tplobj);
					// console.log('-------每次上传后的图片路径-------');
		   //  		console.log(this.imgUrl);
				}
				
				// console.log(fileList);
			},
        	handleRemove(file, fileList) {
		        this.delImg(this.imgUrl,file.uid);
		     //    console.log('-------每次删除后的图片路径-------');
		    	// console.log(this.imgUrl);
		    },
		    handlePictureCardPreview(file) {
		        this.dialogImageUrl = file.url;
		        this.dialogVisible = true;
		    },
		    delImg(arr,value){
		        var index = arr.length;
		        var deleindex = 0;
		        for(var i=0; i<index; i++){
		        	//console.log(arr[i].uid == value);
		            if(arr[i].uid == value){
		                deleindex = i;
		                break;
		            }
		        }
		        
		        arr.splice(deleindex,1); 
		        return arr;
		    },
		    cancel(){
		    	this.$router.push('/tasklist');
		    },
		    subTask(formName){
		    	var _self = this;
		    	//处理图片路径
		    	var subImgpath = '';//后台需要字符串格式的路径
		    	// console.log('-------提交的图片路径-------');
		    	// console.log(this.imgUrl);
		    	for(var i=0;i<this.imgUrl.length;i++){
		    		subImgpath+=this.imgUrl[i].url+',';
		    	}
		    	this.editTaskForm.exhibitionImg = subImgpath;
		    	//处理介绍内容(富文本内容)
		    	this.editTaskForm.introduce = this.editor.txt.text();
		    	//设置操作标志
		    	this.editTaskForm.operatorType = '0';
		    	this.editTaskForm.operatorFlag = this.operatorFlag;




		    	console.log(this.editTaskForm);
		    	this.$refs[formName].validate((valid) => {
		          if (valid) {
			   		taskEdit(_self.editTaskForm).then(res=>{
			   			console.log(res);
			   			if(res.code=='000'){
			   				this.$router.push('/renwu');
			   			}else{
			   				this.$message.error(res.msg);
			   			}
			   		})
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		    },
		    updated(){
				baguetteBox.run('.carImg');
			},
        }
    }
</script>
<style scoped>
	h3{margin:20px 0;}
   .editTask{
   		width: 60%;
   }
   .el-select{
   	display: inline-block;
    position: relative;
    width: 100%;
   }
.el-date-editor--daterange.el-input {
     width: 100%!important; 
}
</style>