const express = require('express')
const router = require ('./routes/router')
const bodyParser = require ('body-parser')
const session = require('express-session')

const app = express()

/**
 * 配置解析表单请求体,用来解析post表单请求的内容
 */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/**
 * 配置使用Session中间件,用来保存用户登录信息,cookie的
 */
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

/**
 * 配置路由
 */
app.use(router)


//统一处理模板错误
app.use((err,req,res,next) =>{
    res.status(500).json({
        err:err.message
    })
})


app.listen(3000,() =>{
    console.log('App is running at port 3000....')
    console.log('Please Visit http://127.0.0.1:3000/')
})

//www.circle.ink
//api.circle.ink