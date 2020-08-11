const db = require ('../models/db')
const md5 = require ('blueimp-md5')

/**
 * 获取会话状态
 * @param req
 * @param res
 * @param next
 */
exports.get = (req,res,next) =>{

    //结构赋值,将下面要写一大串重复的代码req.session赋值成一小段user代码,减少工作量
  const {user} = req.session
  if (!user){
      return res.status(401).json({

          //没有登录
          error:' Unauthorized'
      })
  }
  res.status(200).json(user)
}

/**
 * 创建会话,用户登录
 * @param req
 * @param res
 * @param next
 */
exports.create = async (req,res,next) =>{

//接收表单数据
//操作数据库处理登录请求
//发送响应
    try {
        const body =req.body
        body.password = md5(md5(body.password))
        const sqlStr = `
           SELECT * FROM users WHERE email = '${body.email}' and password = '${body.password}'`
        const [user] = await db.query(sqlStr)
        if (!user){
            return res.status(404).json({

                //邮箱或者密码错误
                err:'Invalid email or password'
            })
        }

        //登录成功,记录Session
        req.session.user = user

        //发送响应
        res.status(201).json(user)
    }catch (err) {
        next(err)
    }

}

/**
 * 注销登录
 * @param req
 * @param res
 * @param next
 */
exports.destroy = (req,res,next) =>{
  delete req.session.user
    res.status(201).json({})
}