<template>
    <nav class="navbar navbar-default">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <div>
                    <div>
                        <a class="navbar-brand" href="/">
                            <img src="data:image/png;base64,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+3bGQmoRQNhDLMTtml60m7QgEwjDfXFTelpUsW6dsoD3QBbvzduxdBqCfeBFnSqCiynIpXu0g3PuVc3fljXbLrLJm/lmGwZiVvxE+slPTYUSdmK6+u3V9HlaTcgjGhFU8fy842nQ5rpfvhMutYGfUABCJ6JycERmmwFhOE78lmXC5ECNSngCbU614aHTGSBZ4+aXB/i4NEv3mn9//9qdKvnE50y/rTidhqVs/11P9OZ67xT7zV+0O1927Q2pkInijLF6e0VyEGr/OAct5ADPATnLQvH5M52ao+s8dL/mlTnPvO/1D1kSCLQ7DhX3dL954jh/oxYRiNp9n4MvZ9Ve+1N/dh98sIMAhDks2Ev/yUCIJmdwNEk0A2IcJZ1S5jtfYjj+INH06Yl90OXTw/OA23YCgP0KO1DmjuLoEpplPNKVSb9D8P/JXPA9LvaDnQbgPBbcDoSaMZ3OAjF9jiI8nOyau3Mi71HLB1oI9ymzriSZEsMk0MVznY6Y1ZK5jnJD5r7gm/P83Sw77wdMLOeHp3NU56s2lo7wu3eWEPOO8UH19Dbk/jPSyp+2hrdvW1c6A2Rb9TD9M/vN9Jp9aLKYd90D2i6dHM1Ak4MkWsLdQzrgBcZ8APhm2rN3+NvL/1PSHL0t1wsDyyXnKyRW7Ors37+H43Tf8tBD+D4AOF8EypxP3VEfaFPAC8+aB77HIXpTy3cDgPDwIBRyAGaiTGfridd8aICXMfhu1L69KMyt5E7MRl2lx5QPCz72VvTG8v8BHTK/3WrLslUAAAILaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49J++7vycgaWQ9J1c1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCc/Pgo8eDp4bXBtZXRhIHhtbG5zOng9J2Fkb2JlOm5zOm1ldGEvJyB4OnhtcHRrPSdJbWFnZTo6RXhpZlRvb2wgMTAuODAnPgo8cmRmOlJERiB4bWxuczpyZGY9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMnPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6cGRmPSdodHRwOi8vbnMuYWRvYmUuY29tL3BkZi8xLjMvJz4KICA8cGRmOkF1dGhvcj7pub/lvoE8L3BkZjpBdXRob3I+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOnhtcD0naHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyc+CiAgPHhtcDpDcmVhdG9yVG9vbD5DYW52YTwveG1wOkNyZWF0b3JUb29sPgogPC9yZGY6RGVzY3JpcHRpb24+CjwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9J3InPz4mdTATAAAAAElFTkSuQmCC"
                                 alt="">
                        </a>
                    </div>
                </div>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

                <form class="navbar-form navbar-left">
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Search">
                    </div>
                </form>
                <ul class="nav navbar-nav navbar-right">
                    <template v-if="user">
                        <a class="btn btn-default navbar-btn" href="#/topic/new">发起</a>
                        <li @click.prevent="show = !show" class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                <a class="btn btn-default navbar-btn">|||</a>
                            </a>
                            <ul class="dropdown-menu" :style="{display:show?'block':'none'}">
                                <li class="dropdown-current-user">
                                    当前登录用户: xxxxx
                                </li>
                                <li role="separator" class="divider"></li>
                                <li><a href="#">个人主页</a></li>
                                <li><a href="#/settings/profile">设置</a></li>
                                <li><a @click.prevent="logoutHandler" href="#">退出</a></li>

                            </ul>
                        </li>
                    </template>
                    <template v-else>
                        <a class="btn btn-primary navbar-btn" href="#/login">登录</a>
                        <a class="btn btn-success navbar-btn" href="#/register">注册</a>
                    </template>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container-fluid -->
    </nav>
</template>

<script>
    import axios from 'axios'
    export default {
        props:{
            user:{
                type:Object,
                default:null
            }

        },
        name: "Header",
        data() {
            return {
                show:false
            }
        },
        created() {
            //this.checkLogin()
            //父组件只会被路由守卫给卡住的,但是子组件也会预加载
            //子组件确实会受父组件的影响,但是如果你在钩子中想要及时获取,那你只能拿到null,因为父组件中的路由导航钩子是异步的,需要时间加载
            /*setTimeout(() =>{

            })*/
        },
        methods:{
            async logoutHandler (){
                try {
                   await axios.delete('/api/session')
                    this.$router.push('/login')
                }catch (err) {
                    window.alert('退出失败')
                }
            }
        }
    }

</script>

<style scoped>
    .navbar-brand{
        padding: 0;
    }
    img{
        height: 50px;
        top: 2px;
    }
    .dropdown-toggle {
        margin: 0;
        padding: 0;
    }
</style>