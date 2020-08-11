import Vue from 'vue'
import App from './App.vue'
import $ from 'jquery'
//加载依赖路由文件
import router from "./router"
import './assets/css/main.css'

new Vue({
    components:{ App },
    template:'<app></app>',
    router,
    $
}).$mount('#app')