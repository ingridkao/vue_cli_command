<template>
    <section class="load_area">
        <div class="container_load">
            <div class="content_load">
                <div class="loadadd">
                    <p @click="updateMethod('EmailSignOut')">註冊會員</p>
                    <p @click="updateMethod('EmailSignIn')">會員登入</p>
                </div>
                <div class="choosewhat">
                    <Button @click="signInGoogle" class="loginBtn">
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="">
                        使用google登入
                    </Button>
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
import { firebaseAuth }from "@/assets/config/firebase.js"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
const provider = new GoogleAuthProvider()

export default {
    components: {
        EmailSignIn,
        EmailSignOut,
        ForgetPassword
        // 無法用下列方式渲染
        // EmailSignIn: () => import('@/components/login/EmailSignIn.vue')
    },
    data(){
        return {
            oauthMethods: ''
        }
    },
    created(){
        this.updateMethod(this.$route.params.type)
    },
    methods:{
        updateMethod(method){
            this.oauthMethods = method? method: 'EmailSignIn'
        },
        signInGoogle(){
            signInWithPopup(firebaseAuth, provider)
            .then((result) => {
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                const userInfo = result.user
                this.$store.dispatch('updateUser', userInfo)
                this.$router.push({ name: 'result', params: { 
                    type: 'loginSuccess'
                }})
            }).catch((error) => {
                const errorCode = error.code
                this.$Message.warning(errorCode);
            })
        }
    }
}
</script>
<style lang="scss">
    @import "@/assets/css/styleload.css";
    .loginBtn{
        padding: .25rem 1rem;
        display: flex;
        align-items: center;
        img{
            height: 100%;
            margin-right: .25rem;
        }
    }
</style>