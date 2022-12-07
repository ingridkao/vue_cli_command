<template>
    <header class="nav_box">
        <nav class="nav_bar"> 
            <h1>
                <router-link to="/" class="header_logo" >
                    <!-- <img src="img/logo.svg" alt="CHAYUAN"> -->
                    <img alt="CHAYUAN" :src="require(`@/assets/images/logo.svg`)">
                </router-link>
            </h1>
            <div 
                @click="toggleMenu" 
                :class="['hamber', {toggle: toggle}]"
            >
                <div class="hambox" :style="hambox1"/>
                <div class="hambox" :style="hambox2"/>
                <div class="hambox" :style="hambox3"/>
                <div class="hambox" :style="hambox1"/>
            </div>
            <ul class="list_group" :class="{show: toggle}"> 
                <!-- 記得只要是站內連結都要換成router-link -->
                <li class="list_item"><router-link to="/"><Icon type="md-contact" /></router-link></li>
                <!-- <li class="list_item"> <a href="indexshop.html">線上商城</a></li>
                <li class="list_item"> <a href="indexnews.html">最新消息</a></li>
                <li class="list_item"> <a href="indexabout.html">關於茶苑</a></li> -->
                <li class="list_item"><router-link to="/shop">線上商城</router-link></li>
                <li class="list_item"><router-link to="/news">最新消息</router-link></li> 
                <li class="list_item"><router-link to="/about">關於茶苑</router-link></li> 
            </ul>
            <ul class="icon_group">
                <li class="icon_item"><router-link to="/carts">
                     <Badge :count="cartCount" type="info">
                        <Icon type="md-cart" />
                     </Badge>
                </router-link></li> 
                <li class="icon_item"><router-link :to="infoPath">
                    <Icon type="md-contact" />
                </router-link></li> 
            </ul>
        </nav>
    </header>
</template>
    
<script>
export default {
    data(){
        return {
            toggle: false
        }
    },
    watch: { 
        // 轉換頁面馬上把toggle關起來
        '$route.path': {
            handler(path) {
                this.toggle = false 
            }
        }
    },
    computed: {
        infoPath(){
            if(this.$store.state.userInfo && this.$store.state.userInfo.uid){
                return '/profile' 
            }else{
                return '/login' 
            }
        },
        cartCount(){
            // 取得購物車數量
            return this.$store.state.cartList.length
        }
    },
    methods: {
        toggleMenu() {
            this.toggle = !this.toggle
        }
    }
}
</script>
<style lang="scss" scoped>
    @import "@/assets/scss/navbarfoot.scss";
</style>
