import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
import echarts from 'echarts'
Vue.prototype.$echarts = echarts 
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  console.log(to);
  if(to.matched.length>0){
	for (var value of to.matched) {
	  console.log(value);
	  if(value.path=='/soldier'){
	  	document.title = value.meta.title;
	  	break;
	  }
	}
  }
  // if (to.meta.title) {
  //   document.title = to.meta.title
  // }
  next()
})

// Vue.directive('title', {
//   inserted: function (el, binding) {
//     document.title = binding.value
//   }
// })
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');