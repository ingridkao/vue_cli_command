<template>
	<div class="news"
		:style="{
			backgroundColor: activeColor
		}"
	>
		<img alt="Vue logo" :src="require(`@/assets/logo.png`)">
		<button 
			v-for="i in colors" 
			:key="i"
			:style="{
				backgroundColor: i
			}"
			:class="{active: activeColor === i}"
			@click="changeColor(i)"
		>{{i}}</button>
	</div>
</template>

<script>
import { Colors } from '@/assets/config/setting.js' 
export default {
	data(){
		return {
			colors: Colors,
			activeColor: ''
		}
	},
	methods:{
		changeColor(color){
			this.activeColor = color
		}
	}
}
</script>

<style lang="scss">
.news{
	text-align: center;
	padding: 4rem 0;
	background: #ddd;
}
button{
	color: #fff;
	padding: 0.5rem 1rem;
	&.active{
		border: 3px solid yellow;
	}
}
</style>