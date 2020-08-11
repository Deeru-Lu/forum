//引包
var mongoose  = require ('mongoose')

//连接数据库
mongoose.connect('mongodb://localhost/test')

var Schema = mongoose.Schema

var userSchema = new Schema({
  email:{
      type:String,
      required:true
  },
    nickname:{
      type:String,
      required:true
    },
    password:{
      type:String,
      required:true
    },
    create_time:{
      type:Date,
        //注意:这里不要写Date.now() 因为会即可调用,应该直接给个Date.now方法,当你去new Models的时候,如果你没有传递create_time,则mongoose会调用default指定的Date.now方法,使用其返回值作为默认值
      default:Date.now
    },
    last_modified_time:{
      type:Date,
      defined:Date.now
    },
    avatar:{
      type:String,
      //默认值
      defined:'/assets/img/avatar-default.png'
    },
    bio:{
      type:String,
      defined:''
    },
    gender:{
      type:Number,
      //限制选择项,枚举
      enum:[-1,0,1],
      defined:-1
    },
    birthday:{
      type:Date,
    },
    status:{
      type:Number,
      //0没有权限设置
      //1不可以评论
      //2不可以登录使用
      enum: [0,1,2],
      defined:0
    }
})

module.exports = mongoose.model('User',userSchema)