import Vue from 'vue'
import App from './App'


import uView from "uview-ui";

Vue.use(uView);


Vue.config.productionTip = false
App.mpType = 'app'


//登录拦截方法
/* 
每个页面都可以使用
拦截
只需要在 created() 方法中调用该方法
从localstorage中取出数据，进行判断
若localStorage 能取到该数据，就允许通过，即允许跳转到对应页面

 */
Vue.prototype.checkLogin = function() {
	const token = this.vuex_token;
	//console.log(token);
	if(token === ''){ // 本地没有token表示未登录
		console.log('未登录返回到登录页')
		uni.reLaunch({url:'/pages/index/login/login'})
		return false
	}
}




const app = new Vue({
    ...App
})
app.$mount()
 
