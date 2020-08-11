const moment = require('moment')
const db = require ('../models/db')
/**
 *分页话题列表
 * @param req
 * @param res
 * @param next
 */
exports.list = async (req,res,next) =>{
  try {
    //分页处理,开始的页码,每页查看多少条
  let {_page = 1,_limit = 20} = req.query
    if (_page < 1){
        _page = 1
    }
    if (_limit < 1){
        _limit = 1
    }
    if (_limit > 20){
        _limit = 20
    }

    const start = (_page - 1) * _limit

  //获取分页列表数据
  //sql语句这是查询所有,加上limit 1 0,20就是第一页20条话题,2 20,20就是第二页从21条开始有20条话题,(_page - 1) * _limit  _limit
  const sqlStr = `
  SELECT * FROM topics LIMIT ${start},${_limit}
  `
  const topics = await db.query(sqlStr)
 //查询总共有多少条话题
  const [{count}] = await  db.query(`SELECT COUNT(*) as count FROM topics`)

  res.status(200).json({topics,count})
  }  catch (err) {
      next(err)
  }
}

/**
 *根据id查找一个
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.one = async  (req,res,next) =>{
    try {
        const {id} = req.params
        const sqlStr =`SELECT * FROM topics WHERE id=${id}`
        const topics = await db.query(sqlStr)
        res.status(200).json(topics[0])
    }catch (err) {
        next(err)
    }
}


/**
 * 创建话题
 * @param req
 * @param res
 * @param next
 */
exports.create = async (req,res,next) =>{

  try {
/*  //验证是否登录
  const {user} = req.session
  if (!user){
      return res.status(401).json({
          err:' Unauthorized'
      })
  }*/
  const  body = req.body
  body.create_time = moment().format('YYYY-MM-DD hh:mm:ss')
  body.modify_time = moment().format('YYYY-MM-DD hh:mm:ss')
  body.user_id = req.session.user.id
  const  sqlStr = `
    INSERT INTO  topics(title,content,user_id,create_time,modify_time)
    VALUES(
    '${body.title}',
    '${body.content}',
    '${body.user_id}',
    '${body.create_time}',
    '${body.modify_time}')`


        const ret = await db.query(sqlStr)
      console.log(ret)
        const [topic] = await db.query(`SELECT * FROM topics WHERE id='${ret.insertId}'`)
        res.status(201).json(topic)
    }catch (err) {
        next(err)
    }
}

/**
 *更新话题
 * @param req
 * @param res
 * @param next
 */
exports.update = async (req,res,next) =>{
  try {
  const {id} = req.params
  const body = req.body
  const sqlStr = `UPDATE topics SET 
  title='${body.title}',
  content='${body.content}',
  modify_time='${moment().format('YYYY-MM-DD hh:mm:ss')}'
  WHERE id=${id}`

  //执行更新操作
  await db.query(sqlStr)

  const [updateTopic] = await db.query(`SELECT * FROM topics WHERE id=${id}`)

  res.status(201).json(updateTopic)
  }catch (err) {
      next(err)
  }
}

/**
 * 删除话题
 * @param req
 * @param res
 * @param next
 */
exports.destroy = async (req,res,next) =>{
  //根据话题id查询得到话题中存储的作者id, 如果话题中user_id === 当前登录用户的id,就有权限删除该话题,反之则不可
  //url中的 :id 叫做动态路由参数
  //可以通过req.params来获取动态路由参数
  //查询字符串:req.query
  //post请求体:req.body
  //动态路由参数:req.params
  try {
      const {id} = req.params
/*      const [topic] = await db.query(`SELECT * FROM topics WHERE id=${id}`)
      //如果删除的资源不存在
      if (!topic){
          return res.status(404).json({
              error:'Topic not Found.'
          })
      }

      //如果话题不属于作者自己
      if (topic.user_id !== req.session.user.id){
          return res.status(404).json({
              error:'Delete Invalid.'
          })
      }*/

      //执行删除操作
      await db.query(`DELETE FROM topics WHERE id=${id}`)
      //响应成功
      res.status(201).json({})
  }catch (err) {
      next(err)
  }

}