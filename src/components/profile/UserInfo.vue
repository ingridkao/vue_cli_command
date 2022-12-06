<template>
    <Image width="100px" height="100px" fit="cover" :src="userInfo.photoURL" class="margin-1">
        <template #placeholder>
            <Spin size="large" fix />
        </template>
        <template #error>
            <Icon type="ios-person" size="24" color="#ccc" />
        </template>
    </Image> 
    <Paragraph>
        {{userInfo.displayName}}
        <Icon :type="item" v-for="item in provider" :key="item"/>
    </Paragraph>
    <Paragraph v-if="userInfo.email">
        {{userInfo.email}}
        <Badge 
            :text="emailVerified? '已驗證': '未驗證'" 
            :type="emailVerified? 'success': 'error'"
        />
    </Paragraph>
    <Button @click="logout">登出</Button>
</template>

<script>
    import { firebaseAuth }from "@/assets/config/firebase.js"
    import { signOut } from "firebase/auth"

    export default {
        computed:{
            userInfo(){
                return this.$store.state.userInfo? this.$store.state.userInfo: {}
            },
            emailVerified(){
                return this.userInfo.email? this.userInfo.emailVerified: false
            },
            provider(){
                if(!this.userInfo.providerData)return []
                return this.userInfo.providerData.map(item => {
                    if(item.providerId === 'google.com') return 'logo-google'
                    if(item.providerId === 'password') return 'md-mail'
                })
            }
        },
        methods: {
            logout(){
                signOut(firebaseAuth)
                .then(() => {
                    this.$Message.warning('成功登出')
                    // 前往首頁
                    this.$store.commit('setUsers', null)
                    this.$router.push('/')
                })
                .catch((error) => {
                     console.log(error);
                    const errorCode = error.code
                    this.$Message.warning(errorCode)
                })
            }
        }
    }
</script>