<template>
    <section class="container topic-list">
        <ul class="media-list">
            <li class="media" v-for="topic in topics">
                <div class="media-left">
                    <a href="#">
                        <img width="40" height="40" class="media-object" src="../../assets/img/logo.png" alt="">
                    </a>
                </div>
                <div class="media-body">
                    <h4 class="media-heading">
                        <router-link :to="{name:'topic-detail',params:{id:topic.id}}">{{topic.title}}</router-link>
                    </h4>
                    <p>sueysok 回复了问题 • 2 人关注 • 1 个回复 • 187 次浏览 • 2020-2-20 13:45</p>
                </div>
            </li>
        </ul>
        <div class="block">
            <!--
            size-change 当每页显示大小改变的时候触发事件
            current-change 当前页码改变的时候触发事件
            page-size 配置每页显示大小
            page-size 每页显示多少条
            total 总页码, 该组件会自动根据总页码进行分页
            -->
            <!--<el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination-->
            <el-pagination
                    @current-change="handleCurrentChange"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div>
    </section>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "List",
        data(){
            return{
                topics:[],
                totalCount:0
            }
        },
        //钩子函数可以跨文件模块作用域拿参数,在动态路由拿参数
        created() {
          this.loadTopics(1,5)
        },
        methods:{
            //TODO:倒序列表
            async loadTopics (page,pageSize){
                const {data} = await axios.get(`/api/topics?_page=${page}&_limit${pageSize}`)
                this.topics = data.topics
                this.totalCount = data.count
            },

            handleCurrentChange(page){
                this.loadTopics(page,5)
            }
        }
    }
</script>

<style scoped>

</style>