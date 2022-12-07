<template>
	<!-- 將所有應用連結寫進header -->
	<!-- 
		<nav>
		<router-link to="/">Home</router-link> |
		<router-link to="/about">About</router-link> | 
		<router-link to="/news">news</router-link> | 
		<router-link to="/shop">product</router-link>
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
	},
	created(){
		// 確認localStorage有使用者登入資訊
		let user = localStorage.getItem('userInfo')
		let carts = null
		if(user){
			user = JSON.parse(user)
			this.$store.commit('setUsers', user)
			carts = localStorage.getItem(`carts_${user.uid}`)
		}else{
			this.$store.commit('setUsers', null)
			carts = localStorage.getItem(`carts_vistit`)
		}
		if(!carts)return
		// 確認localStorage有購物清單
		carts = JSON.parse(carts)
		this.$store.commit('setCarts', carts? carts: [])
	}
}
</script>
