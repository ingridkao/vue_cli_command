<template>
    <header class="nav_box">
        <nav class="nav_bar"> 
            <h1>
                <router-link to="/" class="header_logo" >
                    <img alt="CHAYUAN" :src="require(`@/assets/images/logo.svg`)">
                    <!-- <img src="img/logo.svg" alt="CHAYUAN"> -->
                </router-link>
            </h1>
            <div id="hamb" class="hamber" @click="toggle = !toggle">
                <div class="hambox"></div>
                <div class="hambox"></div>
                <div class="hambox"></div>
                <div class="hambox"></div>
            </div>
            <ul class="list_group" :class="{show: toggle}"> 
                <!-- <li class="list_item"> <a href="indexshop.html">線上商城</a></li>
                <li class="list_item"> <a href="indexspecial.html">職人手工</a></li>
                <li class="list_item"> <a href="indexflavor.html">特色風味</a></li>
                <li class="list_item"> <a href="indexnews.html">最新消息</a></li>
                <li class="list_item"> <a href="indexabout.html">關於茶苑</a></li> -->
                <li class="list_item"><router-link to="/product">線上商城</router-link></li>
                <li class="list_item"><router-link to="/news">最新消息</router-link></li> 
                <li class="list_item"><router-link to="/about">關於茶苑</router-link></li> 
            </ul>
            <ul class="icon_group">
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
    }
}
</script>
<style lang="scss">
    @import "@/assets/css/navbarfoot.css";
    .list_group.show{
        left: 0 !important;
    }
</style>
