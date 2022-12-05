<template>
    <div class="load_write">
        <ul class="write_group">
            <li class="write_list fill">
                <input type="email" placeholder="電子信箱" v-model="email" >
            </li>
        </ul>
    </div>
    <div class="addbtn">
        <div class="letgo" @click="resetPsw">寄送信件</div>
        <div class="forget" @click="$emit('update')">取消</div>
    </div>
</template>

<script>
import { firebaseAuth }from "@/assets/config/firebase.js"
import { sendPasswordResetEmail } from "firebase/auth"

export default {
    data(){
        return {
            email: ''
        }
    },
    methods: {
        resetPsw(){
            if(this.email === '')return
            sendPasswordResetEmail(firebaseAuth, this.email)
            .then(() => {
                // Todo: 
                // 已發送信件至信箱，請按照信件說明重設密碼
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log(errorCode);
                console.log(errorMessage);
                // Todo: 做錯誤提示
                // this.$router.push({ name: 'user', params: { 
                //     type: 'error'
                // } })
            })
        }
    }
}
</script>