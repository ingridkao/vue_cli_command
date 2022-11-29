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
import { firebaseAuth }from "@/config/firebase.js"
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
                console.log(userInfo);
                // Todo: 
                // 登入後轉址到首頁或profile page
                // 存到vuex
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                // Todo: 做錯誤提示
                console.log(errorCode, errorMessage)
            })
        }
    }
}
</script>