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
import { firebaseAuth }from "@/config/firebase.js"
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
            if(!this.policy || this.email === '' || this.password === '')return
            createUserWithEmailAndPassword(firebaseAuth, this.email, this.password)
            .then((userCredential) => {
                const user = userCredential.user
                console.log(userCredential)
                // 登入後轉址到首頁或profile page
                // 存到vuex
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log(errorCode, errorMessage)
            })
        }
    }
}
</script>