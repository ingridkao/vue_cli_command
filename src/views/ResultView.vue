<template>
    <Layout class="padding-10">
        <Result 
            :type="type" 
            :title="title" 
        >
            <template #actions>
                <Button type="info" @click="linkTo('/')">前往首頁</Button>
                <Button v-if="type === 'success'" @click="linkTo('/profile')">查看個人頁面</Button>
            </template>
        </Result>
    </Layout>
</template>
<script>
    export default {
        data(){
            return {
                type: '',
                title: ''
            }
        },
        created(){
            const result = this.$route.params.type
            switch (result) {
                case 'signoutSuccess':
                    this.type = 'success'
                    this.title = '成功註冊'
                    break;
                case 'loginSuccess':
                    this.type = 'success'
                    this.title = '登入成功'
                    break;
                default:
                    this.type = 'error'
                    this.title = '服務異常'
                    break;
            }
        },
        methods:{
            linkTo(path){
                this.$router.push(path)
            }
        }
    }
</script>