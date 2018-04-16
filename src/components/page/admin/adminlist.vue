<template>
	<div class="adminlist clear">
		<el-button type="primary" size="large" style="float:right;margin-bottom:20px;" @click="addAdmin()">新增管理员+</el-button>
		<div class="data_area">
			<el-table :data="adminlist" border style="width:100%">
						    <el-table-column
						      type="index"
						      width="50">
						    </el-table-column>
						    <el-table-column
						     v-if="false"
						      prop="roleId"
						      label="角色ID"
						      width="200">
						    </el-table-column>
						    <el-table-column
						      prop="roleName"
						      label="角色名称"
						      width="200">
						    </el-table-column>
						    <el-table-column
						      prop="userName"
						      label="成员">
						    </el-table-column>
						    <el-table-column
						      prop="description"
						      label="描述">
						    </el-table-column>
						    <el-table-column label="操作" width="300">
						      <template scope="scope">
						        <el-button type="primary"
						          size="small"
						          @click="membermg(scope.row)">成员管理</el-button>
						        <el-button type="primary"
						          size="small"
						          @click="editrole(scope.row)">编辑</el-button>
						        <el-button type="danger"
						          size="small"
						          @click="delRole(scope.row)">删除</el-button>

						      </template>
						    </el-table-column>
			</el-table>
			<!-- <div class="block">
			  <el-pagination
			    layout="prev, pager, next"
			    :total="20"
			    @current-change="adminListPageChange">
			  </el-pagination>
			</div> -->
		</div>
		<!--新增管理员-->
		<el-dialog title="新增管理员" :visible.sync="addAdminDialog" >
		  <el-form ref="addAdminForm" :model="addAdminForm" label-width="80px" status-icon :rules="addAdminFormRule">
			  <el-form-item label="姓名" prop="adminUserName">
			    <el-input v-model="addAdminForm.adminUserName"></el-input>
			  </el-form-item>
			  <el-form-item label="手机号码" prop="adminUserMobile">
			    <el-input v-model="addAdminForm.adminUserMobile"></el-input>
			  </el-form-item>
			  <el-form-item label="部门" prop="department">
			    <el-input v-model="addAdminForm.department"></el-input>
			  </el-form-item>
			  <el-form-item label="角色" prop="roleId">
			    <el-select v-model="addAdminForm.roleId" placeholder="请选择">
			      <el-option
				      v-for="item in roleList"
				      :key="item.roleId"
				      :label="item.roleName"
				      :value="item.roleId">
				    </el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="初始密码" prop="mpwd">
			    <el-input type="password" v-model="addAdminForm.mpwd"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="confirmAddAdmin('addAdminForm')">添加</el-button>
			    <el-button @click="cancelAddAdmin('addAdminForm')">取消</el-button>
			  </el-form-item>
			</el-form>
		</el-dialog>
		<!--成员管理-->
		<el-dialog title="成员管理" :visible.sync="memberMgTable">
		  <el-button type="primary"  @click="addMember()">添加</el-button>
		  <el-table border :data="memberMgData" style="margin-top:20px;">
		    <el-table-column property="accountNum" label="登录账户"></el-table-column>
		    <el-table-column property="userName" label="姓名"></el-table-column>
		    <el-table-column label="操作">
				<template scope="scope">
					<el-button type="danger" size="small" @click="delAdminUser(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		  </el-table>
		  <div class="block">
				<!--默认每页显示10条-->
			  <el-pagination
			    layout="prev, pager, next"
			    :total="memberCnt"
			    @current-change="memberMgPageChange">
			  </el-pagination>
		  </div>
		</el-dialog>
		<!--成员管理（添加新成员）-->
		<el-dialog title="成员管理" :visible.sync="adminUserTable">
			<!--搜索区域-->
			<el-form :inline="true" :model="searchAdminForm" class="demo-form-inline">
			  <el-form-item>
			    <el-input v-model="searchAdminForm.loginName" placeholder="请输入管理员账号或名称"></el-input>
			  </el-form-item>
			 <el-form-item>
			    <el-button type="primary" @click="searchAdmin()">查询</el-button>
			    <el-button type="primary" @click="roleBindUser()">确认</el-button>
			  </el-form-item>
			</el-form>
		  <el-table :data="adminUserData" border style="width: 100%" @selection-change="handleSelectionChange">
		    <el-table-column
		      type="selection"
		      width="55">
		    </el-table-column>
		    <el-table-column
		      v-if="false"
		      prop="adminUserId">
		    </el-table-column>
		   
		    <el-table-column
		      prop="loginId"
		      label="登录账号"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="userName"
		      label="姓名"
		      width="150">
		    </el-table-column>
		    <el-table-column
		      prop="department"
		      label="部门">
		    </el-table-column>
		  </el-table>
		</el-dialog>
		<!--编辑角色-->
		<el-dialog title="编辑" :visible.sync="editRole" class="editAddAdmin">
			<el-form :model="editRoleForm" :label-position="labelPosition" label-width="80px">
			  <el-form-item label="角色名称">
			    <el-input v-model="editRoleForm.roleName"></el-input>
			  </el-form-item>
			  <el-form-item label="描述">
			    <el-input type="textarea" v-model="editRoleForm.description"></el-input>
			  </el-form-item>
			  <el-form-item style="text-align:right">
			     <el-button type="primary" @click="confirmEditRole()">确定</el-button>
			     <el-button  @click="editRole=false">取消</el-button>
			  </el-form-item>
			</el-form>
		</el-dialog>
		<!--错误提示-->
		<el-alert
			v-if="errorFlag"
		    title="errorMsg"
		    type="error">
		 </el-alert>
	</div>
</template>
<script>
import mixin from 'components/config/mixin'
import {adminAndRoleList,roleToAdminList,adminUserList,
	delAdmin,saveRole,saveAdmin,roleList,roleBindUser,
	releaseRoleUser,delRole} from 'service/getData'
import {Encrypt} from 'components/config/utils'
	export default{
		data(){
			var validateAdminPhone = (rule, value, callback) => {
				//"^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$"
		       if(!(/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value))){
		        	callback(new Error('手机号格式不正确'));
		        }else{
		        	callback();
		        }
		     };
		     var validatepass = (rule,value,callback) =>{
		     	//由数字和26个英文字母组成的字符串：^[A-Za-z0-9]+$ 
		     	if (value.length<8) {
		          callback(new Error('密码至少6位数字+字母组成'));
		          //
		        }else if(!(/^[A-Za-z0-9]+$/.test(value))){
		        	callback(new Error('密码至少6位数字+字母组成'));
		        }else{
		        	callback();
		        }
		     }
			return{
				v_flag:false,//不需要显示，但又需要用到的字段，用它来控制隐藏
				//SCLogin/adminAndRoleList.do//查询管理员列表 
				adminlist:[],
				//SCLogin/roleToAdminList.do   查询条件showPage每页条数 roleId角色Id curPage当前页 adminUserList roleToAdminCnt roleToAdminPage backCurPage
				memberMgData:[],
				memberCnt:0,//总条数
				memberCurPage:0,//backCurPage
				//SCLogin/adminUserList.do  获取管理员列表，给某管理员下添加新成员时用  查询条件 showPage roleId loginName curPage
				adminUserData:[],
				adminUserDataCnt:0,//管理员列表总数
				adminuserDataCurPage:0,//管理员列表 当前页码
				memberMgTable:false,
				adminUserTable:false,
				editRole:false,
				searchAdminForm:{roleId:'',loginName:'',curPage:''},
				editRoleForm:{opertorType:'1',roleId:'',description:'',roleName:''},//opertorType 0代表添加，1代表修改 roleId修改时比传
				labelPosition:'right',
				errorFlag:false,
				errorMsg:'',
				m_roleId:'',//成员管理弹框里面的操作需要roleId;
				addAdminDialog:false,
				addAdminForm:{adminUserId:'',adminUserName:'',adminUserMobile:'',roleId:'',password:'',department:'',mpwd:''},
				addAdminFormRule:{
					adminUserName:[{required:true,message: '请输入姓名', trigger: 'blur'}],
					adminUserMobile:[{validator: validateAdminPhone, trigger: 'blur'}],
					mpwd:[{validator:validatepass,trigger:'blur'}],
					department:[{required:true,message: '请输入部门名称', trigger: 'blur'}],
					roleId:[{required:true,message: '请选择角色', trigger: 'blur'}],
				},
				roleList:[],
				multipleSelection:[],//角色添加新成员时，用来保存成员的id
			}
		},
		mixmins:{mixin},
		mounted(){
			this.getAdminAndRoleList();
		},
		methods:{
			back(){
				window.history.go(-1);
			},
			handleClick(tab, event) {
		        console.log(tab, event);
		    },
		    adminListPageChange(val) {
		    	//切换页码时调用后台
		        console.log('当前页'+val);
		    },
		    memberMgPageChange(val){
		    	console.log('当前页'+val);
		    },
		    handleSelectionChange(val) {
		    	console.log(val);
		        this.multipleSelection = val;
		   },
		   addAdmin(){
		   		this.getRoleList();
		   	 	this.addAdminDialog = true
		   },
		   confirmAddAdmin(formName){
		   		this.$refs[formName].validate((valid) => {
		          if (valid) {
		            //SCLogin/saveAdmin.do
			   		console.log(this.addAdminForm);
			   		this.addAdminForm.password = Encrypt(this.addAdminForm.mpwd);
			   		saveAdmin(this.addAdminForm).then(res=>{
			   			console.log(res);
			   			if(res.code=="000"){
			   				this.getAdminAndRoleList();
			   				this.$message({
						        type: 'success',
						       	message: '修改成功!'
						    });
						    this.addAdminDialog = false;
			   			}else{
			   				this.$message({
						        type: 'error',
						       	message: res.msg
						    });
			   			}
			   		});
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		   		
		   },
		   cancelAddAdmin(formName){
		   		console.log(formName);
		   		this.addAdminDialog = false;
		   		this.$refs[formName].resetFields();
		   },
		   membermg(row){
		   		console.log(row.roleId);
		   		this.m_roleId = row.roleId;
		   		this.getRoleToAdminList(row.roleId,1);
		   },
		   addMember(){
		   		//this.m_roleId
		   		this.getAdminUserList(this.m_roleId,'',1)
			   	this.memberMgTable=false;
			   	this.adminUserTable=true
		   },
		   getAdminAndRoleList(){
		   		adminAndRoleList().then(res=>{
					console.log(res);
					if(res.code=="000"){
						this.adminlist = res.adminUserList;
					}else{
						// this.errorMsg('获取管理员列表失败');

					}
				});
		   },
		   getRoleList(){
		   		//SCLogin/roleList.do
		   		roleList().then(res=>{
		   			this.roleList = res.roleList;
		   		});
		   },
		   getRoleToAdminList(roleId,curpage){
				roleToAdminList(roleId,curpage).then(res=>{//默认第一页
		   			if(res.code=="000"){
		   				this.memberCnt = res.roleToAdminCnt;
		   				this.memberCurPage = res.backCurPage;
		   				this.memberMgData = res.adminUserList;
		   				this.memberMgTable = true;
		   				console.log(this.memberMgTable)
		   			}else{
		   				//this.errorMsg('获取成员列表失败');
		   			}
		   		})
		   },
		   getAdminUserList(roleId,loginName,curPage){
		   		adminUserList(roleId,loginName,curPage).then(res=>{
		   			if(res.code == '000'){
		   				this.adminuserDataCurPage = res.backCurPage;
			   			this.adminUserDataCnt = res.adminUserInfoCnt;
			   			this.adminUserData = res.adminUsers;
		   			}else{

		   			}
		   			
		   		})
		   },
		   searchAdmin(){
			   	this.getAdminUserList(this.m_roleId,this.searchAdminForm.loginName,1);
		   },
		   roleBindUser(){
			 	//adminUserId
				// roleId
				this.multipleSelection
				var adminUserId = "";
				for(var i=0;i<this.multipleSelection.length;i++){
					adminUserId+= this.multipleSelection[i].adminUserId+',';
				}
				// console.log(adminUserId);
				roleBindUser(adminUserId,this.m_roleId).then(res=>{
					if(res.code=="000"){
						// console.log(res);
						this.getAdminAndRoleList();
						this.adminUserTable=false;
					}else{

					}
				})

		   },
		   editrole(row){
		   		this.roleId = row.roleId;
			   	// this.editRoleForm.opertorType='1'
			   	this.editRoleForm.roleId = row.roleId;
			   	this.editRoleForm.roleName = row.roleName;
			   	this.editRoleForm.description = row.description;
		   		this.editRole = true;
		   },
		   confirmEditRole(){
		   		//SCLogin/saveRole.do
		   		saveRole(this.editRoleForm).then(res=>{
		   			if(res.code=="000"){
		   				this.$message({
					        type: 'success',
					       	message: '修改成功!'
					    });
					    this.editRole = false;
					    this.getAdminAndRoleList();

		   			}
		   		});
		   },
		   addAdminUser(){
		   		console.log();
		   },
		   delRole(row){
		   		//SCLogin/delRole.do
		   		this.$confirm('确定删除此角色吗?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	delRole(row.roleId).then(res=>{
		        		if(res.code=='000'){
		        			this.$message({
					            type: 'success',
					            message: '删除成功!'
					          });
		        			// this.getRoleToAdminList(this.m_roleId,1);
		        			this.getAdminAndRoleList();
		        		}
		        	});
		          
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
		   },
		   delAdminUser(row){
		   		//SCLogin/releaseRoleUser.do
		   		this.$confirm('确定删除此成员吗?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	console.log('sdfdfg');
		        	releaseRoleUser(row.adminUserId).then(res=>{
		        		console.log(res);
		        		if(res.code=='000'){
		        			this.$message({
					            type: 'success',
					            message: '删除成功!'
					          });
		        			this.getRoleToAdminList(this.m_roleId,1);
		        			this.getAdminAndRoleList();
		        		}
		        	});
		          
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
		      }
		   }
		}
	
</script>
<style scoped>
.adminlist{

}
.data_area{
	margin-top: 0px;	
}
.el-form-item.is-required .el-form-item__label:before {
    content: "*";
    color: #fa5555;
    margin-right: 4px;
    display: none!important;
}
</style>