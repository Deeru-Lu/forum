import VueRouter from 'vue-router'
import Home from './components/home/Home.vue'
import HomeList from './components/home/List.vue'
import Login from './components/user/Login.vue'
import Register from './components/user/Register.vue'

import TopicNew from './components/topic/New.vue'
import TopicDetail from './components/topic/Detail.vue'
import TopicEdit from './components/topic/Edit.vue'

import Setting from './components/settings/Setting.vue'
import SettingProfile from './components/settings/Profile.vue'
import SettingAdmin from './components/settings/Admin.vue'

Vue.use(VueRouter)

//直接导出路由实例,和nodejs的module.exports差不多
export default new VueRouter({
    linkActiveClass:'active',
   // mode:'history',
    routes:[
        {
            //当访问/ 渲染Home的时候,如果发现它有子路由,则会把children中的path为''空字符串
            path:'/',
            component:Home,
            children:[
                //当渲染/a的时候,它会先渲染它的父亲Home 然后HomeList渲染到Home的router-view
                {
                    path:'',
                    component:HomeList
                },
                {
                    path:'/topic/new',
                    component:TopicNew
                },
                {   name:'topic-detail',
                    path:'/topic/detail/:id',
                    component:TopicDetail
                },
                {   name:'topic-edit',
                    path:'/topic/edit/:id',
                    component:TopicEdit
                },
                {
                    path:'/settings',
                    component:Setting,
                    children:[
                        {
                            path:'/settings/profile',
                            component:SettingProfile
                        },
                        {
                            path:'/settings/admin',
                            component:SettingAdmin
                        }
                    ]
                },
            ]
        },
        {
            path:'/login',
            component:Login
        },
        {
            path:'/register',
            component:Register
        }
    ]
})