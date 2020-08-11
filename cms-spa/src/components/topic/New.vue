<template>
    <section class="container">
        <div class="row">
            <div class="col-md-5">
                <form @submit.prevent="postHandler">
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
                        <input class="form-control" v-model="formData.title" id="title" required >
                    </div>
                    <div class="form-group">
                        <label >内容</label>
                        <textarea class="form-control" v-model="formData.content" id="content" rows="3" required></textarea>
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
        name: "New",
        data(){
            return {
                formData:{
                    title:'',
                    content:''
                }
            }
        },
        methods:{
            //TODO:一个发布页面只能发布一次
            async postHandler () {
                try {
                    const res = await axios.post('/api/topics',this.formData)
                    this.$router.push(`/topic/detail/${data.id}`)
                }catch (err) {

                }
            }
        }
    }
</script>

<style scoped>

</style>