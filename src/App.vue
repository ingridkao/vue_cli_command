<template>
	<!-- 
		<nav>
		<router-link to="/">Home</router-link> |
		<router-link to="/about">About</router-link> | 
		<router-link to="/news">news</router-link> | 
		<router-link to="/product">product</router-link>
		</nav>
	-->
	<MainHead/>
	<router-view/>
</template>

<script>
import MainHead from '@/components/main/Head.vue'

export default {
	components: {
		MainHead
	}
}
</script>

<style lang="scss">
    @import "assets/css/reset.css";
    @import "assets/css/style.css";
</style>
