import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false;
App.mpType = 'app';
const app = new Vue(App);
app.$mount();
// 因为vue的data上没绑定上$globalData，所以没办法监听$globalData的变化。待续...
Vue.prototype.$globalData = {
    count: 0,
};
