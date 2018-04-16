<template>
	<div class="authority" style="position:relative">
    <el-button type="primary" style="position:absolute;left:500px;top:30px;"  @click="addRole()">新增角色</el-button>
    <div>
      <span>角色</span>
      <el-select v-model="roleId" placeholder="请选择" style="display:block;margin-top:10px;" @change="getRoleOfMenuList">
        <el-option
          v-for="item in roleList"
          :key="item.roleId"
          :label="item.roleName"
          :value="item.roleId"
          >
        </el-option>
      </el-select>
    </div>
    <div style="margin-top:20px;">
      <!--default-expanded-keys 默认展开项 default-checked-keys 默认选择项-->
      <span>权限</span>
      <el-tree
        :data="roleOfMenuList"
        show-checkbox
        default-expand-all
        node-key="id"
        :default-checked-keys="defaultChecked"
        ref="tree"
        highlight-current
        :props="defaultProps"
        style="margin-top:10px;">
      </el-tree>
    </div>
		<el-button type="primary" style="margin-top:20px;float:right"  @click="getCheckedNodes">确定</el-button>

    <el-dialog title="新增角色" :visible.sync="editRole" class="editAddAdmin">
      <el-form :model="editRoleForm" :label-position="labelPosition" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="editRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="editRoleForm.description"></el-input>
        </el-form-item>
        <el-form-item style="text-align:right">
           <el-button type="primary" @click="confirmEditRole()">确定</el-button>
           <el-button  @click="cancelEditRole('editRoleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
	</div>
</template>
<script>
import {roleList,getRoleOfMenuList,updateRole,saveRole} from 'service/getData'
  export default {
    data() {
      
      return {
        //SCLogin/roleList.do//角色列表 
        //SCLogin/getRoleOfMenuList.do //权限树 roleOfMenuList
        //SCLogin/updateRole.do//更新权限
        labelPosition:'right',
        roleList: [],
        roleId: '',
        roleOfMenuList: [],
        defaultChecked:[],
        editRoleForm:{opertorType:'0',roleId:'',description:'',roleName:''},//opertorType 0代表添加，1代表修改 
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        editRole:false,
      };
    },
    
    mounted(){
      this.getRoleList();
    },
    methods: {
      getRoleList(){
          //SCLogin/roleList.do
          roleList().then(res=>{
            this.roleList = res.roleList;
          });
      },
      getRoleOfMenuList(value){
        //SCLogin/getRoleOfMenuList.do
        this.roleId = value;
        getRoleOfMenuList(value).then(res=>{
          console.log(res);
          if(res.code=='000'){
            //console.log(this.getShowMenu(res.powerList));
            var menuObj = this.getShowMenu(res.powerList);
            this.roleOfMenuList = menuObj.newMenus;
            this.defaultChecked = menuObj.aryId;
          }


        });
      },
      getCheckedNodes() {
        var menus = this.$refs.tree.getCheckedNodes();
        console.log(menus);
        if(menus.length>0){
          var power = '';
          for(var i=0;i<menus.length;i++){
            if(i==menus.length-1){
              power+=menus[i].id;
            }else{
              power+=menus[i].id+',';
            }
            
          }
          updateRole(this.roleId,power).then(res=>{
            if(res.code=='000'){
              getRoleOfMenuList(this.roleId);
              this.$message({
                    type: 'success',
                    message: '修改成功!'
              });
            }
          });
        }else{

        }
      },
      getShowMenu(menus){
        var newMenus = [];
        var readyMenu = [];
        var aryId = [];
        for(var i=0;i<menus.length;i++){
                var firstMenu = {};
                //如果有二级菜单
                if(menus[i].subMenus.length>0){
                    firstMenu.label = menus[i].menuName;
                    firstMenu.id = menus[i].menuId;
                    if(menus[i].flag=='1'){
                      aryId.push(menus[i].menuId);
                    }
                    firstMenu.children = [];//存二级菜单
                    //处理子菜单,处理到三级，三级菜单是具体到功能按钮的菜单
                    var secondMenus = menus[i].subMenus;
                    var secondMenu = [];
                    for(var j=0;j<secondMenus.length;j++){
                        var smenu = {};
                        if(secondMenus[j].subMenus.length>0){
                            smenu.label = secondMenus[j].menuName;
                            smenu.id = secondMenus[j].menuId;
                            if(secondMenus[j].flag=='1'){
                              aryId.push(secondMenus[j].menuId);
                            }
                            smenu.children = [];//存三级菜单
                            //以下是三级菜单，具体到功能按钮的菜单
                            var threeMenus = secondMenus[j].subMenus;
                            var threeMenu = [];
                            for(var h=0;h<threeMenus.length;h++){
                                var tmenu = {}
                                tmenu.label = threeMenus[h].menuName;
                                tmenu.id=threeMenus[h].menuId;
                                if(threeMenus[h].flag=='1'){
                                  aryId.push(threeMenus[h].menuId);
                                }
                                threeMenu.push(tmenu);
                            }
                            smenu.children = threeMenu;
                            secondMenu.push(smenu);
                        }else{
                            smenu.label = secondMenus[j].menuName;
                            smenu.id = secondMenus[j].menuId;
                            if(secondMenus[j].flag=='1'){
                              aryId.push(secondMenus[j].menuId);
                            }
                            secondMenu.push(smenu);
                        }

                    }
                    firstMenu.children = secondMenu;
                    newMenus.push(firstMenu);
                }else{
                    firstMenu.label = menus[i].menuName;
                    firstMenu.id = menus[i].menuId;
                    if(menus[i].flag=='1'){
                      aryId.push(menus[i].menuId);
                    }
                    newMenus.push(firstMenu);
                }
        }
        return {newMenus:newMenus,aryId:aryId};
      },
      ///////////////
      setCheckedNodes() {
        this.$refs.tree.setCheckedNodes([{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 9,
          label: '三级 1-1-1'
        }]);
      },
      setCheckedKeys() {
        this.$refs.tree.setCheckedKeys([3]);
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      },
      cancelEditRole(formName){
          this.editRole = false;
          this.$refs[formName].resetFields();
      },
      addRole(){
        this.editRole = true;
      },
      confirmEditRole(){
          //SCLogin/saveRole.do
          saveRole(this.editRoleForm).then(res=>{
            if(res.code=="000"){
              this.$message({
                  type: 'success',
                  message: '保存成功!'
              });
              this.editRole = false;
              this.getRoleList();
            }
          });
       },
    },
    
}
</script>
<style scoped>
	.authority{width: 30%;}
</style>