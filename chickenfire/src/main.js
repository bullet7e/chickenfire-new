import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import MyHeader from './components/MyHeader'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
axios.defaults.baseURL="http://localhost:5050/";
Vue.prototype.axios=axios;
Vue.component("my-header",MyHeader);
Vue.config.productionTip = false;
Vue.use(ElementUI);
router.beforeEach((to,from,next)=>{
  if(to.meta.needLogin){
    //当页面需要登录的时候判断浏览器是否有sessionStorage
    if(window.sessionStorage.data){
      next()
    }else{
    //如果没有，让页面进入登录页
      next('/login')
    }
  }else{
    next()
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
