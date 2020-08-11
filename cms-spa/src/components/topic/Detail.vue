<template>
    <section class="container">
        <div class="row">
            <div class="col-md-9">
                <h1 class="title">标题:{{topic.title}}</h1>
                <p>发布于几秒前 作者 1 次浏览 来自客户端测试</p>
                <p v-if="isLoginUser">
                    <router-link :to="{name:'topic-edit',params:{id:topic.id}}">编辑</router-link>
                    <a @click.prevent="removeTopicById(topic.id)" href="#">删除</a>
                </p>
                <hr/>
                <article class="markdown-body">
                    {{topic.content}}
                </article>
                <!--v-for遍历数组,data里面的数据拿取遍历-->
                <div class="panel panel-default" v-for="item in comments">
                    <div class="panel-heading">
                        <span>luluzheng</span> commented
                        <span>24 minutes ago</span>
                        <span class="action">
            <a href=""><i class="glyphicon glyphicon-thumbs-up pull-right"></i></a>
            <a href=""><i class="glyphicon glyphicon-remove-circle pull-right"></i></a>
            <a href=""><i class="glyphicon glyphicon-remove-circle pull-right"></i></a>
          </span>
                    </div>
                    <div class="panel-body">
                        {{item.content}}
                    </div>
                </div>
                <hr>
                <form @submit.prevent="createCommentHandler" class="formtable">
                    <div class="form-group">
                        <label for="exampleInputPassword1">添加回复</label>
                        <textarea class="form-control" v-model="commentContent" required cols="5" rows="3"></textarea>
                    </div>
                    <button type="submit" class="btn btn-success">回复</button>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Show",
        data(){
            return{
                topic: {
                    title: '',
                    content: '',
                },
                commentContent:'',
                isLoginUser:false,
                comments:[]
            }
        },
        //编辑和删除是默认不显示的,只要当前话题是属于当前登录用户发表的才显示
        //话题的user_id
        created() {
           // const {id} = this.$route.params
           // this.loadTopicById(id)
        },

        //在导航之前获取数据,可以避免看到异步渲染慢,而有白块的情况的问题,所以让这个钩子函数预先加载
        //路由导航钩子
        //to 当前路由信息
        //from从哪个组件导航过来的路由信息
        //next导航完成加载,渲染组件
        // next方法有一个参数vm就是组件实例,(是上面data 里面return的对象)
       /* async beforeRouterEnter(to,from,next){
            const {id} = to.params
            const  {data:topic} = await axios.get(`/api/topics/${id}`)
            try {
                const {data:sessionUser} = await axios.get('/api/session')
                next(vm =>{
                    vm.topic = topic
                    vm.isLoginUser = topic.user_id === sessionUser.id
                })
                //getPost(to.params.id,(err,post) =>{
                //  next(vm => vm.setData(err,post))
                // })

            }catch (err) {
                next(vm => {
                    vm.topic = topic
                })
            }
        },*/

        async created(){
            //根据话题id获取话题详情
            const {id} = this.$route.params
            const {data:topic} = await axios.get(`/api/topics/${id}`)
            this.topic = topic

            //根据话题id加载所有评论
            this.loadComments(topic.id)

            //获取会话信息,处理,编辑,删除,链接的显示与隐藏
            const {data:sessionUser} = await axios.get('/api/session')
            this.isLoginUser = topic.user_id === sessionUser.id

        },

        methods:{

           /* async loadTopicById (id) {
                try {
                    const  {data:topic} = await axios.get(`/api/topics/${id}`)
                    this.title = topic.title
                    this.content = topic.content

                    //获取当前会话状态信息
                    const {data:sessionUser} = await axios.get('/api/session')
                    if (topic.user_id === sessionUser.id){
                        this.isLoginUser = true
                    }
                }catch (err) {

                }
            }*/

           async removeTopicById (id){
               if (!window.confirm('Are you sure?')){
                   return
               }
               try {
                   await axios.delete(`/api/topics/${id}`)
                   this.$router.push('/')
               }catch (err) {

               }
           },

            async createCommentHandler(){
                  //topic_id
                  //content
                try {
                    //先校验是否已经登录,如果没有登录,则提示去登录
                    await axios.get('/api/session')
                    const {data} = await axios.post('/api/comments',{
                        topic_id:this.topic.id,
                        content:this.commentContent
                    })
                    window.alert('发表成功,加载评论列表..')
                    this.comments.push((data))
                    this.commentContent = ''
                }catch (err) {
                    const {status} = err.response
                    switch (status) {
                       case 401:
                           if(!window.confirm('请登录')){
                               return
                           }
                           this.$router.push('/login')
                            break
                    }
                    window.alert('发表失败,请稍后重试!')
                }
            },

            async loadComments (topicId) {
               const {data} = await axios.get(`/api/comments?topic_id=${topicId}`)
                this.comments = data
            }
        }
    }
</script>

<style scoped>
.markdown-body{
    margin-bottom: 100px;
}
.formtable{
    margin-bottom: 20px;
}
</style>