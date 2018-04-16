login.vue<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <!-- <p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p> -->
            </el-form>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import {Encrypt} from 'components/config/utils'
import {login} from 'service/getData'
    export default {
        data: function(){
            return {
                pwd:'12345',
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                // console.log('000000000000000000000000')
                Encrypt(this.pwd);
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.ruleForm.username);
                        login(this.ruleForm.username,Encrypt(this.ruleForm.password)).then(res=>{
                            if(res.code=='000'){
                                var menus = res.userInfo.menus;
                                var newMenus = [];
                                for(var i=0;i<menus.length;i++){
                                    var firstMenu = {};
                                    //如果有二级菜单
                                    if(menus[i].subMenus.length>0){
                                        firstMenu.index = i+1+'';//变成字符串
                                        firstMenu.title = menus[i].MENU_NAME;
                                        firstMenu.id = menus[i].MENU_ID;
                                        firstMenu.subs = [];//存二级菜单
                                        //处理子菜单,处理到三级，三级菜单是具体到功能按钮的菜单
                                        var secondMenus = menus[i].subMenus;
                                        var secondMenu = [];
                                        for(var j=0;j<secondMenus.length;j++){
                                            var smenu = {};
                                            if(secondMenus[j].subMenus.length>0){
                                                smenu.title = secondMenus[j].MENU_NAME;
                                                smenu.index = secondMenus[j].URL;
                                                smenu.id = secondMenus[j].MENU_ID;
                                                smenu.subs = [];//存三级菜单
                                                //以下是三级菜单，具体到功能按钮的菜单
                                                var threeMenus = secondMenus[j].subMenus;
                                                var threeMenu = [];
                                                for(var h=0;h<threeMenus.length;h++){
                                                    var tmenu = {}
                                                    tmenu.id=threeMenus[h].MENU_ID;
                                                    tmenu.index = threeMenus[h].MENU_NAME;
                                                    threeMenu.push(tmenu);
                                                }
                                                smenu.subs = threeMenu;
                                                secondMenu.push(smenu);
                                            }else{
                                                smenu.title = secondMenus[j].MENU_NAME;
                                                smenu.index = secondMenus[j].URL;
                                                smenu.id = secondMenus[j].MENU_ID;
                                                secondMenu.push(smenu);
                                            }

                                        }
                                        firstMenu.subs = secondMenu;
                                        newMenus.push(firstMenu);
                                    }else{
                                        firstMenu.title = menus[i].MENU_NAME;
                                        firstMenu.index = menus[i].URL;
                                        firstMenu.id = menus[i].MENU_ID;
                                        newMenus.push(firstMenu);
                                    }
                                }
                                res.userInfo.menus = newMenus;//将原来的菜单对象变成新菜单对象
                                console.log("newMenus----------------------------");
                                console.log(res.userInfo.menus);
                                localStorage.menus = JSON.stringify(res.userInfo.menus);
                                this.$router.push({path:'/index',query:{userName:res.userInfo.userName}})
                            }
                            
                        })
                        //this.$router.push('/index')
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>