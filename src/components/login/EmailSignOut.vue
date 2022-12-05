<template>
    <div class="load_write">
        <ul class="write_group">
            <li class="write_list fill">
                <input type="email" v-model="email" placeholder="電子信箱">
            </li>
            <li class="write_list fill">
                <input type="password" v-model="password" placeholder="密碼">
            </li>
            <li class="write_list">
                <input type="checkbox" v-model="policy">我同意
                <a href="">網站服務條款及隱私政策</a>
            </li>
        </ul>
    </div>
    <div class="addbtn">
        <div class="letgo" @click="signOutUser">立即加入</div>
        <div class="forget" @click="$emit('update', 'ForgetPassword')">忘記密碼?</div> 
    </div>
</template>

<script>
import { firebaseAuth }from "@/assets/config/firebase.js"
import { createUserWithEmailAndPassword } from "firebase/auth"

export default {
    data(){
        return {
            email: '',
            password: '',
            policy: false
        }
    },
    methods: {
        signOutUser(){
            if(this.email === '' || this.password === ''){
                this.$Message.info('請輸入信箱或密碼');
                return
            }
            if(!this.policy){
                this.$Message.info('請勾選隱私政策');
                return
            }
            createUserWithEmailAndPassword(firebaseAuth, this.email, this.password)
            .then((userCredential) => {
                const userInfo = userCredential.user
                this.$store.commit('setUsers', userInfo)
                this.$router.push({ name: 'result', params: { 
                    type: 'signoutSuccess'
                } })
            })
            .catch((error) => {
                const errorCode = error.code
                // const errorMessage = error.message
                if( errorCode === 'auth/email-already-in-use'){
                    this.$Message.warning('您的信箱可能已被註冊過了');
                }else if(errorCode === 'auth/weak-password'){
                    this.$Message.warning('此密碼強度太弱，至少包含六個字符');
                }else if(errorCode === 'auth/invalid-email'){
                    this.$Message.warning('信箱格式錯誤');
                }else{
                    this.$Message.warning(errorCode);
                }
            })
        }
    }
}
</script>