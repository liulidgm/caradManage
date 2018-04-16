import Vue from 'vue';
import Router from 'vue-router';
import index from 'components/page/index'
import overview from 'components/page/customer/overview'
//客户管理
import custMg from "components/page/customer/custMg"
import detailCar from "components/page/customer/detailCar"
import detailAd from "components/page/customer/detailAd"
import detail from "components/page/customer/detail"
import examineCar from "components/page/customer/examine_car"
import examineAd from "components/page/customer/examine_ad"
import examineAdCar from "components/page/customer/examine_ad_car"
import newCust from "components/page/customer/newCust"
import comCust from "components/page/customer/comCust"
import comCustDetail from "components/page/customer/comCustDetail"
//车辆管理
import carlist from "components/page/car/list"
import addcom from "components/page/customer/addCom"
import cardetail from 'components/page/car/detail'
//任务管理
import tasklist from 'components/page/task/list'
import taskdetail from 'components/page/task/taskdetail'
import editTask from 'components/page/task/editTask'
import taskexamine from 'components/page/task/taskexamine'
import taskexamineDetail from 'components/page/task/taskexamineDetail'
//管理员
import adminlist from 'components/page/admin/adminlist'
import authority from 'components/page/admin/authority'
import adminlog from 'components/page/admin/adminlog'
//营收数据总览
import revenue from 'components/page/revenue/revenue'
import activeData from 'components/page/activeData/activeData'
//数据字典
import dictionary from 'components/page/dataDictionary/dictionaryList'
//提现
import withdraw from 'components/page/withdraw/withdrawRecord'
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: resolve => require(['../components/page/login.vue'], resolve)
        },

        //////////////////项目开始的地方////////////////////////////////////
        { 
            path: '/soldier', 
            meta: {
                title: '兵创上海分会'
            },
            component: resolve => require(['../components/page/test/index.vue'], resolve),
            children:[
                { path: '/',component: resolve => require(['../components/page/test/default.vue'], resolve)},
                { path: '/test1',component: resolve => require(['../components/page/test/test1.vue'], resolve)},
                { path: '/test2',component: resolve => require(['../components/page/test/test2.vue'], resolve)}
            ]
        },
        
       { 
            path: '/index', 
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {path: '/',component: index},
                {path: '/overview',component: overview},
                //客户管理
                {path:'/custMg',component:custMg},
                {path:'/detailCar',component:detailCar},
                {path:'/detailAd',component:detailAd},
                {path:'/detail',component:detail},
                {path:'/examineCar',component:examineCar},
                {path:'/examineAd',component:examineAd},
                {path:'/examineAdCar',component:examineAdCar},
                {path:'/newCust',component:newCust},
                {path:'/comCust',component:comCust},
                {path:'/addCom',component:addcom},
                {path:'/comCustDetail',component:comCustDetail},
                //车辆管理
                {path:'/carlist',component:carlist},
                {path:'/cardetail',component:cardetail},
                //任务管理
                {path:'/renwu',component:tasklist},
                {path:'/taskdetail',component:taskdetail},
                {path:'/editTask',component:editTask},
                {path:'/taskexamine',component:taskexamine},
                {path:'/taskexamineDetail',component:taskexamineDetail},
                //管理员
                {path:'/adminlist',component:adminlist},
                {path:'/authority',component:authority},
                {path:'/adminlog',component:adminlog},
                {path:'/revenue',component:revenue},
                {path:'/activeData',component:activeData},
                {path:'/data_find',component:dictionary},
                //提现
                {path:'/withdraw',component:withdraw},






































                {
                    path: '/basetable',
                    component: resolve => require(['../components/page/demo/BaseTable.vue'], resolve)
                },
                {
                    path: '/vuetable',
                    component: resolve => require(['../components/page/demo/VueTable.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/baseform',
                    component: resolve => require(['../components/page/demo/BaseForm.vue'], resolve)
                },
                {
                    path: '/vueeditor',
                    component: resolve => require(['../components/page/demo/VueEditor.vue'], resolve)    // Vue-Quill-Editor组件
                },
                {
                    path: '/markdown',
                    component: resolve => require(['../components/page/demo/Markdown.vue'], resolve)     // Vue-Quill-Editor组件
                },
                {
                    path: '/upload',
                    component: resolve => require(['../components/page/demo/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
                },
                {
                    path: '/basecharts',
                    component: resolve => require(['../components/page/demo/BaseCharts.vue'], resolve)   // vue-schart组件
                },
                {
                    path: '/drag',
                    component: resolve => require(['../components/page/demo/DragList.vue'], resolve)    // 拖拽列表组件
                }
            ]
        },




        
    ]
})
