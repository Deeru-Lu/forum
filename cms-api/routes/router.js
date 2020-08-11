const express = require ('express')
const userController = require('../controllers/user')
const topicController = require('../controllers/topic')
const commentController = require('../controllers/comment')
const sessionController = require('../controllers/session')
const db = require ('../models/db')

const router = express.Router()

//函数封装一个方法,在调用使用其他需要登录的状态操作前先进行判定的一个中间件
function checkLogin(req,res,next){
        if (!req.session.user){
            return res.status(401).json({
                error:'Unauthorized'
            })
        }
        next()//用户登录后就继续下一步,进入控制器
}

//函数封装一个校验登录权限,检验是否是本人发表的话题校验过后,才能进行删除和修改
async function checkTopic(req,res,next){
    try {
        const { id } = req.params
        const [topic] = await db.query(`SELECT * FROM topics WHERE id=${id}`)
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
        }
        next()
    }catch (err) {
        next(err)
    }
}

/*
* 用户资源
 */
router
    .get('/users',userController.list)
    .post('/users',userController.create)
    .patch('/users/:id',userController.update)
    .delete('/users/:id',userController.destroy)



/*
* 话题资源
 */
router
//判断用户是否登录
    /*    .post('/topics',(req,res,next) =>{
        if (!req.session.user){
            return res.status(401).json({
                error:'Unauthorized'
            })
        }
        next()//用户登录后就继续下一步,进入控制器
    },topicController.create)*/
    .get('/topics',topicController.list)
    .get('/topics/:id',topicController.one)
    .post('/topics',checkLogin,topicController.create)
    .patch('/topics/:id',checkLogin,checkTopic,topicController.update)
    .delete('/topics/:id',checkLogin,checkTopic,topicController.destroy)



/*
* 评论资源
 */
router
    .get('/comments',commentController.list)
    .post('/comments',checkLogin,commentController.create)
    .patch('/comments/:id',checkLogin,commentController.update)
    .delete('/comments/:id',checkLogin,commentController.destroy)




/*
* 会话管理
 */
router
    .get('/session',sessionController.get)
    .post('/session',sessionController.create)
    .delete('/session',sessionController.destroy)

module.exports = router