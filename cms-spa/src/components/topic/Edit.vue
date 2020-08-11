<template>
    <section class="container">
        <div class="row">
            <div class="col-md-5">
                <form>
                    <div class="form-group">
                        <label >选择板块</label>
                        <select class="form-control">
                            <option>分享</option>
                            <option>问答</option>
                            <option>招聘</option>
                            <option>客户端测试</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label >标题</label>
                        <input class="form-control" v-model="topic.title" id="title" required >
                    </div>
                    <div class="form-group">
                        <label >内容</label>
                        <textarea class="form-control" v-model="topic.content" id="content" rows="3" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-default">Submit</button>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Edit",
        data(){
            return{
                topic:{
                    title:'',
                    content:''
                }
            }
        },
        created() {
            //router做导航,route取数据
            const {id} = this.$route.params
            this.loadTopicById(id)
        },
        methods:{
            async loadTopicById (id){
                const {data:topic} = await axios.get(`/api/topics/${id}`)
                this.topic = topic
            }
        }
    }
</script>

<style scoped>

</style>