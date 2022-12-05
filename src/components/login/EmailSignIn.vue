<template>
    <div class="load_write">
        <ul class="write_group">
            <li class="write_list fill">
                <input type="email" placeholder="電子信箱" v-model="email" >
            </li>
            <li class="write_list fill">
                <input type="password" placeholder="密碼" v-model="password">
            </li>
        </ul>
    </div>
    <div class="addbtn">
        <div class="letgo" @click="signIn">登入</div>
        <div class="forget" @click="$emit('update', 'ForgetPassword')">忘記密碼?</div> 
    </div>
</template>

<script>
import { firebaseAuth }from "@/assets/config/firebase.js"
import { signInWithEmailAndPassword } from "firebase/auth"

export default {
    data(){
        return {
            email: '',
            password: '',
            userInfo: null
        }
    },
    methods: {
        signIn(){
            if(this.email === '' || this.password === '')return
            signInWithEmailAndPassword(firebaseAuth, this.email, this.password)
            .then((userCredential) => {
                const userInfo = userCredential.user
                this.$store.commit('setUsers', userInfo)
                this.$router.push({ name: 'result', params: { 
                    type: 'loginSuccess'
                }})
            })
            .catch((error) => {
                const errorCode = error.code
                // const errorMessage = error.message
                console.log(errorCode);
                if( errorCode === 'auth/wrong-password'){
                    this.$Message.warning('密碼錯誤');
                }else if(errorCode === 'auth/user-not-found'){
                    this.$Message.warning('請前往註冊');
                }else{
                    this.$Message.warning(errorCode);
                }
            })
        }
    }
}
</script>