<template>
    <div class="addCom formStyle clear" style="width:50%;">
        <!-- <table>
            <tr><td class="title">用户名</td><td></td><td class="title">联系电话</td><td>13098567965</td></tr>
            <tr><td class="title">邮箱</td><td>sss@163.com</td><td class="title">证件类型</td><td>身份证</td></tr>
            <tr><td class="title">证件号</td><td>34567890554433</td><td class="title">证件照片</td><td>jhj</td></tr>
            <tr><td class="title">初次领取驾照日期</td><td>2014-09-09</td><td class="title">注册时间</td><td>2017-09-09</td></tr>
            <tr><td class="title">注册手机号</td><td>13756340913</td><td class="title">当前状态</td><td>禁用</td></tr>
        </table> -->
        <el-form :model="addComForm" :label-position="labelPosition" :rules="addComFormRules" ref="addComForm" label-width="100px" class="demo-ruleForm clear">
          <div style="float:initial" class="clear">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="addComForm.userName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="企业名称" prop="companyName">
              <el-input v-model="addComForm.companyName" auto-complete="off"></el-input>
            </el-form-item>
          </div>
         <div style="float:initial" class="clear">
           <el-form-item label="主体资质" prop="mainQuality">
              <el-select v-model="mainQuality" @change="changeMainQuality" placeholder="请选择">
                <el-option v-for="item in qulityList" :label="item.classificationName" :key="item.dictionaryId" :value="item.dictionaryId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属行业" prop="industry">
              <el-select v-model="industry" @change="changeIndustry" placeholder="请选择">
                <el-option v-for="item in comType" :label="item.classificationName" :key="item.dictionaryId" :value="item.dictionaryId"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="float:initial" class="clear">
            <el-form-item label="公司地址" prop="companyAddress">
            <el-input v-model="addComForm.companyAddress" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="注册号" prop="registeNum">
              <el-input v-model="addComForm.registeNum" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div style="float:initial" class="clear">
            <el-form-item label="注册地址" prop="registeAddress">
              <el-input v-model="addComForm.registeAddress" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话号码" prop="companyTell">
              <el-input v-model="addComForm.companyTell" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div style="float:initial" class="clear">
            <el-form-item label="有效期" prop="validateTime">
              <el-date-picker
                v-model="validateTime"
                type="date"
                placeholder="选择有效时间"
                value-format="yyyy-MM-dd"
                @change="getValidTime">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="企业邮箱" prop="companyEmail">
               <el-input v-model="addComForm.companyEmail" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div style="float:initial" class="clear">
            <el-form-item label="联系人姓名" prop="linkName">
              <el-input v-model="addComForm.linkName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系人电话" prop="linkTell">
              <el-input v-model="addComForm.linkTell" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div style="float:initial" class="clear">
            <el-form-item label="企业法人姓名" prop="companyLawerName">
              <el-input v-model="addComForm.companyLawerName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="企业法人证件类型" prop="lawerCardType">
               <el-select v-model="lawerCardType"  @change="changeLawerCardType" placeholder="请选择">
                <el-option v-for="item in IDType" :label="item.classificationName" :key="item.dictionaryId" :value="item.dictionaryId"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="float:initial" class="clear">
            <el-form-item label="企业法人证件号码" prop="lawerCardNo">
                <el-input v-model="addComForm.lawerCardNo" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="上传车辆信息" prop="carInfo">
                <el-upload
                  class="upload-demo"
                  name="file"
                  :action="uploadUrl"
                  :before-upload="beforeUploadCarExcel"
                  :limit="1"
                  :on-change="handleChangeCarInfo"
                  :file-list="carInfoFileList"
                  :on-remove="removeCarExcel">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
                <a href="http://man.okcardad.com/app/data/contractFile/CarList.xlsx" download="车辆列表">点击可下载模板</a>
                <!-- <a href="" @click="downLoadExcel()">点击可下载模板</a> -->
            </el-form-item>
          </div>
          <el-form-item label="证件照上传(只能上传jpg/png文件，且不超过5M)" class="clear">
              <span>(证件照)正面</span>
              <el-upload
                class="avatar-uploader"
                name="file"
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="IDImg1Success"
                :before-upload="IDImg1BeforeUpload">
                <img v-if="IDImg1" :src="IDImg1" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <span>(证件照)反面</span>
              <el-upload
                class="avatar-uploader"
                name="file"
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="IDImg0Success"
                :before-upload="IDImg0BeforeUpload">
                <img v-if="IDImg0" :src="IDImg0" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
          
          </el-form-item>
          <!-- </div> -->
          <!-- <div style="float:initial" class="clear"> -->
          <el-form-item label="上传资质照片" style="margin-top:34px;margin-bottom:15px;">
               <el-upload
                class="avatar-uploader"
                name="file"
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="qualiSuccess"
                :before-upload="qualiBeforeUpload">
                <img v-if="qualiImg" :src="qualiImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
          </el-form-item>
          <el-form-item label="上传企业logo">
               <el-upload
                class="avatar-uploader"
                name="file"
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="logoSuccess"
                :before-upload="logoBeforeUpload">
                <img v-if="logoImg" :src="logoImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
          </el-form-item>
          <!-- </div> -->
        </el-form>
        <el-button type="primary" style="float:right;margin-right:15px;" @click="submitForm('addComForm')">确定</el-button>
        <el-button style="float:right;margin-right:15px;" @click="resetForm('addComForm')">取消</el-button>
       
    </div>
</template>

<script>
import $ from 'jquery'
import {getDictionaryNameList,addOrModifyCompanyInfo,checkCompanyInfo} from 'service/getData'
import {baseUrl} from 'components/config/env'
      export default {
        data() {
          //自定义验证方法实例
          return {
            companyId:'',
            validateTime:'',
            dialogImageUrl: '',
            dialogVisible:false,
            IDImg1: '',
            IDImg0:'',
            qualiImg:'',
            logoImg:'',
            uploadUrl:'/SCLogin/uploadFile.do',
            labelPosition:'top',
            qulityList:[],
            comType:[],
            IDType:[],
            carInfoFileList:[],
            carUploadExcel:[],
            mainQuality:'',
            lawerCardType:'',
            industry:'',
            addComForm: {
              operateType:'0',//  0:新增1:编辑 默认新增
              companyId:'',// 企业用户ID（编辑时传）
              userName:'',//  用户名
              companyName:'',// 企业名称
              mainQuality:'',// 主体资质
              companyAddress:'',//  公司地址
              registeAddress:'',//  注册地址
              industry:'',//  所属行业
              registeNum:'',//  注册号
              companyTell:'',// 电话号码
              validTime:'',// 有效期
              companyEmail:'',//  企业邮箱
              linkName:'',//  联系人姓名
              linkTell:'',//  联系人电话
              companyLawerName:'',//  企业法人姓名
              lawerCardType:'',// 企业法人证件类型
              lawerCardNo:'',// 企业法人证件号码
              lawerCardImg:'',//  证件照片上传
              qulityImg:'',// 上传资质照片
              companyLogo:'',// 上传企业logo
              carUploadExcel:'',//车辆信息
              industryId:'',
              mainQualityId:'',
              lawerCardTypeId:'',
            },
            addComFormRules: {
              userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
              companyName:[{ required: true, message: '请输入企业名称', trigger: 'blur' }],
              mainQualityId:[{ required: true, message: '请选择主体资质', trigger: 'blur' }],// 主体资质
              companyAddress:[{ required: true, message: '请输公司地址', trigger: 'blur' }],//  公司地址
              registeAddress:[{ required: true, message: '请输入注册地址', trigger: 'blur' }],//  注册地址
              industryId:[{ required: true, message: '请选择所属行业', trigger: 'blur' }],//  所属行业
              registeNum:[{ required: true, message: '请输入注册号', trigger: 'blur' }],//  注册号
              companyTell:[{ required: true, message: '请输入电话号码', trigger: 'blur' },{ pattern:/^1[34578]\d{9}$/, message: '请输入正确的手机号码'}],// 电话号码
              validTime:[{ type: 'date', required: true, message: '请选择有效日期', trigger: 'change' }],// 有效期
              companyEmail:[{ type: 'email', message: '邮箱格式不正确'}],//  企业邮箱
              linkName:[{ required: true, message: '请输入联系人姓名', trigger: 'blur' }],//  联系人姓名
              linkTell:[{ required: true, message: '请输入联系人电话', trigger: 'blur' },{ pattern:/^1[34578]\d{9}$/, message: '请输入正确的手机号码'}],//  联系人电话
              companyLawerName:[{ required: true, message: '请输入企业法人姓名', trigger: 'blur' }],//  企业法人姓名
              lawerCardTypeId:[{ required: true, message: '请选择', trigger: 'blur' }],// 企业法人证件类型
              lawerCardNo:[{ required: true, message: '请输入企业法人证件号码', trigger: 'blur' }],// 企业法人证件号码
              lawerCardImg:[],//  证件照片上传
              qulityImg:[{ required: true, message: '请上传资质照片', trigger: 'blur' }],// 上传资质照片
              companyLogo:[{ required: true, message: '请上传企业LOGO', trigger: 'blur' }],// 上传企业logo
            }
          };
      },
      mounted(){
        this.companyId = this.$route.query.companyId;
        if(this.companyId){
          Promise.all([
            this.getDictionaryList(), 
            this.getComType(),
            this.getIDType(),
            this.getCheckCompanyInfo(this.companyId)
            ]).then(function(results){
            console.log(results);
          });
        }else{
          Promise.all([
            this.getDictionaryList(), 
            this.getComType(),
            this.getIDType(),
            ]).then(function(results){
            console.log(results);
          });
        }
        
      },
      methods: {
        changeMainQuality(value){
          if(this.addComForm.mainQualityId) value = this.addComForm.mainQualityId;
          this.addComForm.mainQuality = value
        },
        changeIndustry(value){
          if(this.addComForm.industryId) value = this.addComForm.industryId;
          this.addComForm.industry= value
        },
        changeLawerCardType(value){
          if(this.addComForm.lawerCardTypeId) value = this.addComForm.lawerCardTypeId;
          this.addComForm.lawerCardType = value
        },
        getIDType(){
          var _this = this;
          var p = new Promise(function(resolve, reject){
            getDictionaryNameList('证件类型').then(res=>{
                console.log(res);
                if(res.code=="000"){
                  _this.IDType = res.dictionaryList;
                }
              });
            })
            return p;
        },
        getDictionaryList(){
          var _this = this;
          var p = new Promise(function(resolve, reject){
            getDictionaryNameList('主体资质').then(res=>{
                console.log(res);
                if(res.code=="000"){
                  _this.qulityList = res.dictionaryList;
                }
              });
            })
            return p;
        },
        getComType(){
          var _this = this;
          var p = new Promise(function(resolve, reject){
            getDictionaryNameList('所属行业').then(res=>{
                if(res.code=="000"){
                  _this.comType = res.dictionaryList;
                }
              });
            })
            return p;
        },
        getCheckCompanyInfo(companyId){
          //checkCompanyInfo
          checkCompanyInfo(companyId).then(res=>{
            console.log(res);
            if(res.code=='000'){
              this.addComForm = res.companyInfo;
              this.IDImg1 = this.addComForm.lawerCardImg[0];
              this.IDImg0 = this.addComForm.lawerCardImg[1];
              this.qualiImg = this.addComForm.qulityImg;
              this.logoImg = this.addComForm.companyLogo;
              this.mainQuality = this.addComForm.mainQuality;
              this.lawerCardType = this.addComForm.lawerCardType;
              this.industry = this.addComForm.industry;
              console.log("--------------"+this.addComForm.validTime);
              this.validateTime = this.addComForm.validTime;

            }
          })
        },
        submitForm(formName) {
          this.addComForm.lawerCardImg = this.IDImg1+","+this.IDImg0;
          this.addComForm.qulityImg = this.qualiImg;
          this.addComForm.companyLogo = this.logoImg;
          this.addComForm.carUploadExcel = this.carUploadExcel[0]||'';
          if(this.companyId){
            this.addComForm.operateType = '1';
            this.addComForm.companyId = this.companyId;
          }
          this.$refs[formName].validate((valid) => {
            if (valid) {
              console.log(this.addComForm);
              addOrModifyCompanyInfo(this.addComForm).then(res=>{
                console.log(res);
                if(res.code=="000"){
                  this.$router.push('/comCust')
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
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        getValidTime(validateTime){
          this.addComForm.validTime = validateTime;
        },
        /*---------------------------证件照上传--------------------*/
        IDImg1Success(res, file) {
          if(res.code=='000'){
            this.IDImg1 = res.filePath;
          }else{
            this.$message.error(res.msg);
          }
        },
        IDImg1BeforeUpload(file) {
          const isJPG = file.type === 'image/jpeg'||'image/png';
          const isLt2M = file.size / 1024 / 1024 < 5;
          if (!isJPG) {
            this.$message.error('图片格式不正确!');
          }
          if (!isLt2M) {
            this.$message.error('图片大小不能超过 5MB!');
          }
          return isJPG && isLt2M;
        },
        IDImg0Success(res, file) {
          if(res.code=='000'){
            this.IDImg0 = res.filePath;
          }else{
            this.$message.error(res.msg);
          }
          
        },
        IDImg0BeforeUpload(file) {
          const isJPG = file.type === 'image/jpeg'||'image/png';
          const isLt2M = file.size / 1024 / 1024 < 5;
          if (!isJPG) {
            this.$message.error('图片格式不正确!');
          }
          if (!isLt2M) {
            this.$message.error('图片大小不能超过 5MB!');
          }
          return isJPG && isLt2M;
        },
        qualiSuccess(res, file) {
          if(res.code=='000'){
            this.qualiImg = res.filePath;
          }else{
            this.$message.error(res.msg);
          }
        },
        qualiBeforeUpload(file) {
          const isJPG = file.type === 'image/jpeg'||'image/png';
          const isLt2M = file.size / 1024 / 1024 < 5;
          if (!isJPG) {
            this.$message.error('图片格式不正确!');
          }
          if (!isLt2M) {
            this.$message.error('图片大小不能超过 5MB!');
          }
          return isJPG && isLt2M;
        },
        logoSuccess(res, file) {
          if(res.code=='000'){
            this.logoImg = res.filePath;
          }else{
            this.$message.error(res.msg);
          }
        },
        logoBeforeUpload(file) {
          const isJPG = file.type === 'image/jpeg'||'image/png';
          const isLt2M = file.size / 1024 / 1024 < 5;
          if (!isJPG) {
            this.$message.error('图片格式不正确!');
          }
          if (!isLt2M) {
            this.$message.error('图片大小不能超过 5MB!');
          }
          return isJPG && isLt2M;
        },
        handleChangeCarInfo(file, fileList) {
          if(file.status == 'success'){
              this.carUploadExcel.push(file.response.filePath);
          }
          console.log(this.carUploadExcel);
              
        },
        removeCarExcel(file, fileList){
          this.removeByValue(this.carUploadExcel,file.response.filePath);
          console.log(this.carUploadExcel);
        },
        beforeUploadCarExcel(file){
          if(this.carUploadExcel.length>0){
              this.$message.warning('只能上传一个文件');
              return false
          }else{
            return true
          }
        },
        removeByValue(arr, val) {
          for(var i=0; i<arr.length; i++) {
            if(arr[i] == val) {
              arr.splice(i, 1);
              break;
            }
          }
        },
        downLoadExcel(){
          console.log('downLoad');
          var elemIF = document.createElement("iframe");     
          elemIF.src = 'https://fms.ipinyou.com/5/1B/93/C5/F001Nl1QA-CF000kYUtd.jpg';    
          elemIF.style.display = "none";     
          document.body.appendChild(elemIF); 
        },
        downLoad(){  
          var elemIF = document.createElement("iframe");     
          elemIF.src = 'https://fms.ipinyou.com/5/1B/93/C5/F001Nl1QA-CF000kYUtd.jpg';    
          elemIF.style.display = "none";     
          document.body.appendChild(elemIF);  
        
        }  

      }
  }
</script>

<style scoped>
.upload-demo{width: 45%;float: left;}
.el-form-item__content{width: 45%!important;}
</style>