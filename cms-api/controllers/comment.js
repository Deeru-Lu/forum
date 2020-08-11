const db = require ('../models/db')
/**
 * 获取某个评论
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.list = async (req,res,next) =>{
  try {
      const {topic_id} = req.query
      const sqlStr = `SELECT * FROM comments WHERE topic_id=${topic_id}`
      const comments = await db.query(sqlStr)
      res.status(200).json(comments)
  }catch (err) {
      next(err)
  }
}

/**
 * 创建评论
 * @param req
 * @param res
 * @param next
 */
exports.create = async (req,res,next) =>{
  try {
      //1.获取表单数据
      //2.操作数据库
      //3.发送响应数据

      //解构赋值
      const {
          content = '',
          topic_id,
          reply_id = 0
      } = req.body
      //Date.now()显示的时间戳
      const sqlStr =
          `INSERT INTO comments(content,create_time,modify_time,topic_id,user_id,reply_id)
       VALUES(
       '${content}',
       '${Date.now()}',
       '${Date.now()}',
       '${topic_id}',
       '${req.session.user.id}',
       '${reply_id}'
       )`
      //当进行增删改操作的时候,db.query方法返回一个对象,所以我们这里可以使用解构赋值的方式来取值
      const {insertId} = await db.query(sqlStr)
      //当执行查询操作的时候,返回的是数组所以这里可以数组解构来取值
      const  [comment]  = await db.query(`SELECT * FROM comments WHERE id=${insertId}`)
      res.status(201).json(comment)
  }catch (err) {
      next(err)
  }
}


exports.update = async (req,res,next) =>{

}


exports.destroy = async (req,res,next) =>{

}