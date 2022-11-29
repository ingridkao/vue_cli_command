<template>
    <section class="load_area">
        <div class="container_load">
            <div class="content_load">
                <div class="loadadd">
                    <p @click="updateMethod('EmailSignOut')">註冊會員</p>
                    <p @click="updateMethod('EmailSignIn')">會員登入</p>
                </div>
                <div class="choosewhat">
                   <p>使用google註冊</p>
                </div>
                <keep-alive>
                    <component :is="oauthMethods" @update="updateMethod"></component>
                </keep-alive>
            </div>
        </div>
    </section>
</template>

<script>
import EmailSignIn from '@/components/login/EmailSignIn.vue'
import EmailSignOut from '@/components/login/EmailSignOut.vue'
import ForgetPassword from '@/components/login/ForgetPassword.vue'

export default {
    components: {
        EmailSignIn,
        EmailSignOut,
        ForgetPassword
        // 無法用下列方式渲染
        // EmailSignIn: () => import('@/components/login/EmailSignIn.vue'),
        // EmailSignOut: () => import('@/components/login/EmailSignOut.vue')
    },
    data(){
        return {
            oauthMethods: 'EmailSignIn'
        }
    },
    methods:{
        updateMethod(method){
            this.oauthMethods = method? method: 'EmailSignIn'
        }
    }
}
</script>
<style lang="scss">
    @import "@/assets/css/navbarfoot.css";
    @import "@/assets/css/styleload.css";
</style>