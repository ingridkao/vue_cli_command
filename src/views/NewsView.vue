<template>
	<div class="news"
		:style="{
			backgroundColor: activeColor
		}"
	>
		<Table border :columns="columns" :data="data">
			<template #name="{ row }">
				<strong>{{ row.name }}</strong>
			</template>
			<template #action="{ row, index }">
				<Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
			</template>
		</Table>

		<!-- <Tabs value="name1">
			<TabPane label="标签一" name="name1">标签一的内容</TabPane>
			<TabPane label="标签二" name="name2">
				<div v-if="Object.keys(activeData).length === 0">
					Table
					<button @click="info">info</button>
				</div>
				<div v-else>
					{{activeData}}
					<button @click="activeData = {}">返回</button>
				</div>
			</TabPane>
			<TabPane label="标签三" name="name3">标签三的内容</TabPane>
		</Tabs> -->

		<!-- <img alt="Vue logo" :src="require(`@/assets/logo.png`)">
		<button 
			v-for="i in colors" 
			:key="i"
			:style="{
				backgroundColor: i
			}"
			:class="{active: activeColor === i}"
			@click="changeColor(i)"
		>{{i}}</button> -->
	</div>
</template>

<script>
import { Colors } from '@/assets/config/setting.js' 
export default {
	data(){
		return {
			colors: Colors,
			activeColor: '',
			activeData: {},
			columns: [
				{
					title: '產品名稱',
					key: 'title'
				},
				{
					title: '產品名稱',
					key: 'description'
				},
				{
					title: 'Action',
					slot: 'action',
					width: 150,
					align: 'center'
				}
			],
			data: []
		}
	},
	methods:{
		changeColor(color){
			this.activeColor = color
		},
		info(){
			this.activeData = {id: 111}
		},
		getProduct(){
			fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>{
				this.data = json
			})
		},
		show(index){
			console.log(index);
		}
	},
	created(){
		this.getProduct()
	},
	mounted(){},
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