<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title">{{ item.title }}</template>
                        <template v-for="subItem in item.subs">
                            <!--第三级菜单暂不循环出来-->
                            <!-- <template v-if="subItem.subs">
                                    <el-submenu :index="subItem.index">
                                        <template slot="title">{{ subItem.title }}</template>
                                        <el-menu-item v-for="(subItem,i) in subItem.subs" :key="i" :index="subItem.index">
                                            {{ subItem.title }}
                                        </el-menu-item>
                                    </el-submenu>
                                </template> -->
                                <template>
                                    <el-menu-item :index="subItem.index">
                                        {{ subItem.title }}
                                    </el-menu-item>
                                </template>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        {{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                   
                    // {
                    //     index:'index',
                    //     title:'首页'
                    // },
                    // {
                    //     icon: 'el-icon-menu',
                    //     index: '1',
                    //     title: '客户管理',
                    //     subs: [
                    //         {
                    //             index: 'overview',
                    //             title: '客户总览'
                    //         },
                    //         {
                    //             index: 'custMg',
                    //             title: '客户管理',
                    //         },
                    //         {
                    //             index: 'newCust',
                    //             title: '新增客户审核'
                    //         },
                    //         {
                    //             index: 'comCust',
                    //             title: '企业客户管理'
                    //         },
                    //     ]
                    // },
                    // {
                    //     icon: 'el-icon-menu',
                    //     index: 'carlist',
                    //     title: '车辆管理'
                    // },
                    // {
                    //     icon: 'el-icon-menu',
                    //     index: '22',
                    //     title: '任务管理',
                    //     subs: [
                    //         {
                    //             index: 'renwu',
                    //             title: '任务列表'
                    //         },
                    //         {
                    //             index: 'taskexamine',
                    //             title: '任务审核'
                    //         },
                    //     ]
                    // },
                    // {
                    //     icon: 'el-icon-menu',
                    //     index: '3',
                    //     title: '管理员',
                    //     subs: [
                    //         {
                    //             index: 'adminlist',
                    //             title: '管理员'
                    //         },
                    //         {
                    //             index: 'authority',
                    //             title: '权限管理'
                    //         },
                    //         {
                    //             index: 'adminlog',
                    //             title: '管理日志'
                    //         }
                    //     ]
                    // },
                    // {
                    //     index: 'revenue',
                    //     title: '营收数据总览'
                    // },
                    // {
                    //     index:'activeData',
                    //     title:'实时监控'
                    // }





                    // {
                    //     icon: 'el-icon-menu',
                    //     index: '12',
                    //     title: '表格',
                    //     subs: [
                    //         {
                    //             index: 'basetable',
                    //             title: '基础表格'
                    //         },
                    //         {
                    //             index: 'vuetable',
                    //             title: 'Vue表格组件'
                    //         }
                    //     ]
                    // },
                    // {
                    //     icon: 'el-icon-date',
                    //     index: '13',
                    //     title: '表单',
                    //     subs: [
                    //         {
                    //             index: 'baseform',
                    //             title: '基本表单'
                    //         },
                    //         {
                    //             index: 'vueeditor',
                    //             title: '编辑器'
                    //         },
                    //         {
                    //             index: 'markdown',
                    //             title: 'markdown'
                    //         },
                    //         {
                    //             index: 'upload',
                    //             title: '文件上传'
                    //         }
                    //     ]
                    // },
                    // {
                    //     icon: 'el-icon-star-on',
                    //     index: 'basecharts',
                    //     title: '图表'
                    // },
                    // {
                    //     icon: 'el-icon-upload2',
                    //     index: 'drag',
                    //     title: '拖拽'
                    // }
                ]
              //  items:[]
            }
        },
        mounted(){
             this.items = JSON.parse(localStorage.menus);
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 200px;
        left: 0;
        top: 70px;  
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
