<template>
    <div class="main">
        <div class="header">
            <a href="/">
                <img width="100px" height="100px" src="data:image/png;base64,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" alt="">
            </a>
            <h1>用户注册</h1>
        </div>

        <form @submit.prevent="register" >
            <div class="form-group">
                <label for="email">邮箱</label>
                <input type="email" class="form-control" id="email" v-model="formData.email" @input="checkEmail" @blur="checkEmail" required placeholder="Email" autofocus>
                <p calss="error-message" v-show="emailMessage">邮箱已经存在</p>
            </div>
            <div class="form-group">
                <label for="nickname">昵称</label>
                <input type="text" class="form-control" id="nickname" v-model="formData.nickname"@input="checkNickname" @blur="checkNickname" minlength="2" maxlength="21" required placeholder="Nickname">
                <p calss="error-message" v-show="nicknameMessage">昵称已经存在</p>
            </div>
            <div class="form-group">
                <label for="password">密码</label>
                <input type="password" class="form-control" id="password" v-model="formData.password" minlength="6" maxlength="18" required placeholder="Password" name="password">
            </div>
            <button type="submit" class="btn btn-success btn-block">注册</button>
        </form>
        <div class="message">
            <p>已有账号? <a href="#/login">点击登录</a>.</p>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import _ from 'lodash'
    export default {
        data(){
            return{
                formData:{
                    email:'',
                    nickname:'',
                    password:''
                },
                emailMessage:false,
                nicknameMessage:false,

            }
        },
        methods:{
            /*registerHander:_.debounce(async  function(){
                if (await this.checkEmail()){
                    return
                }
                if (await this.checkNickname()){
                    return
                }
                const  ret = await axios.post('/api/users',this.formData)
                this.$router.push('/')
            },500),
          checkEmail:_.debounce (async function(){
            const {data} = await axios.get(`/api/users?email=${this.formData.email}`)
            //如果邮箱不存在
                const exists = data[0]  ? true : false
                this.emailMessage = exists
                return exists
        },500),
        checkNickname:_.debounce (async function() {
             const {data} = await axios.get(`/api/users?nickname=${this.formData.nickname}`)
             //如果昵称不存在
                 const exists = data[0] ? true : false
                 this.nicknameMessage = exists
                 return exists
         },500)*/

            async register() {
                if (await this.checkEmail()) {
                    return
                }
                if (await this.checkNickname()) {
                    return
                }
                const ret = await axios.post('/api/users', this.formData)
                this.$router.push('/')
            },
            checkEmail: _.debounce(async function () {
                const {data} = await axios.get(`/api/users?email=${this.formData.email}`)
                //如果邮箱不存在
                const exists = data[0] ? true : false
                this.emailMessage = exists
                //这个是async函数,在其他的async函数中也可以调用
                //如果在其他async函数中调用它,则需要使用await来拿这个return返回值
                return exists
            }, 500),
            checkNickname: _.debounce(async function () {
                const {data} = await axios.get(`/api/users?nickname=${this.formData.nickname}`)
                //如果昵称不存在
                this.nicknameMessage = data[0] ? true : false
            }, 500)
        }
    }
</script>

<style scoped>
    .main {
        width: 340px;
        margin: 0 auto;
        margin-top: 50px;
        color: #333;
    }

    .main .header {
        text-align: center;
    }

    .main .header h1 {
        font-size: 26px;
    }

    .main form {
        padding: 20px;
        margin-bottom: 15px;
        border: 1px solid #d8dee2;
        border-radius: 5px;
        background-color: #fff;
    }

    .main .message {
        padding: 10px;
        padding-bottom: 0;
        border: 1px solid #d8dee2;
        border-radius: 5px;
    }
    .error-message {
    color: #ff0000;
    }
    .header img {
        width: 100%;
        height: 100%;
    }
</style>