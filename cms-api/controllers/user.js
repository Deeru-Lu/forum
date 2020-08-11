const md5 = require('blueimp-md5')
const moment = require('moment')
const db = require ('../models/db')

exports.list = (req,res,next) =>{

}

exports.create = async (req,res,next) =>{
    //通过try()catch()来处理错误,我们把容易出错的代码放到这代码块里面,大意是尝试运行某代码,一旦错误进入catch中
    //try中的代码一旦出错,会立即进入catch代码块中
   try {
   const body = req.body
   const sqlStr =
       `INSERT INTO users(username,password,email,nickname,avatar,gender,create_time,modify_time)
       VALUES(
       '${body.email}',
       '${md5(md5(body.password))}',
       '${body.email}',
       '${body.nickname}',
       'default-avatar.png',
       0,
       '${moment().format('YYYY-MM-DD hh:mm:ss')}',
       '${moment().format('YYYY-MM-DD hh:mm:ss')}')`

        /*const  ret = await db.query('SELECT 1 + 1 as solution')
     console.log(ret)*/

        const ret = await db.query(sqlStr)
        console.log(ret)
        const [users] = await db.query(`SELECT * FROM users WHERE id='${ret.insertId}'`)
        res.status(201).json(users)
    }catch (err) {
      next(err)
    }
}

exports.update = (req,res,next) =>{

}

exports.destroy = (req,res,next) =>{

}