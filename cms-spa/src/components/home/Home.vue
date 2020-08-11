<template>
 <div id="home">
  <app-header :user="user"></app-header>
  <router-view></router-view>
  <app-footer></app-footer>
 </div>
</template>

<script>
 import AppHeader from '../common/Header.vue'
 import AppFooter from '../common/Footer.vue'
 import axios from "axios";
    export default {
     //路由导航钩子
     async beforeRouteEnter (to,from,next) {
      //路由导航钩子,不能再Header组件去使用,因为Header组件没有路由,Header组件是一个公共组件,不通过路由加载的
      //所以这里更合理的是获取登录状态给Header组件
      //至于Header组件拿这个登录状态要干嘛是它自己的事情
      //这里需要利用组件传值的方式把数据传递给子组件

       try {
        const {data:sessionUser} = await axios.get('/api/session')
        next(vm =>{
         vm.user=sessionUser
        })
       }catch (err) {
          next()
       }
     },
        name: "Home",
       components:{
        AppHeader,
        AppFooter
        },
     data(){
      return{
       user:null
      }
     },
     methods:{
      async getSessionUser () {
       try {
        const {data:sessionUser} = await axios.get('/api/session')
        this.user = sessionUser
       }catch (err) {

       }
      }
     }
    }



</script>

<style scoped>
</style>