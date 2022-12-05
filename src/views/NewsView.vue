<template>
	<div class="news">
		<!-- {{info}} -->
		<div>
			<input type="text" v-model.trim="title">
			<input type="number" v-model.number="price">
			<Button type="primary" size="small" style="margin-right: 5px" @click="createProduct">create</Button>
		</div>

		<Table border :columns="columns" :data="data">
			<template #name="{ row }">
				<strong>{{ row.name }}</strong>
			</template>
			<template #action="{ row, index }">
				<Button type="primary" size="small" @click="updateProduct(index, row)">修改</Button>
				<Button type="error" size="small" @click="deleteProduct(index, row)">刪除</Button>
			</template>
		</Table>
	</div>
</template>

<script>
export default {
	data(){
		return {
			title: '',
			price: '',
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
			data: [],
			info: {}
		}
	},
	methods:{
		getProduct(){
			fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>{
				this.data = json
			})
		},
		getTargetProduct(){
			fetch(`https://fakestoreapi.com/products/${this.$route.params.id}`)
            .then(res=>res.json())
            .then(json=>{
				// console.log(json)
				this.info = json
			})
		},
		createProduct(){
			fetch('https://fakestoreapi.com/products',{
				method:"POST",
				body:JSON.stringify(
					{
						title: this.title,
						price: this.price,
						description: 'lorem ipsum set',
						image: 'https://i.pravatar.cc',
						category: 'electronic'
					}
				)
			})
			.then(res=>res.json())
			.then(json=>{
				this.$Notice.open({
                    title: '新增成功',
                    // desc: JSON.stringify(json)
                    desc: json.id
                });
			})
		},
		updateProduct(index, row){
			if(this.title === '') return
			fetch(`https://fakestoreapi.com/products/${row.id}`,{
				method:"PUT",
				body:JSON.stringify(
					{
						title: this.title,
						price: 13.5,
						description: 'lorem ipsum set',
						image: 'https://i.pravatar.cc',
						category: 'electronic'
					}
				)
			})
            .then(res=>res.json())
            .then(json=>console.log(json))
		},
		deleteProduct(index, row){
			console.log(index);
			console.log(row);
			fetch(`https://fakestoreapi.com/products/${row.id}`,{
				method:"DELETE"
			})
            .then(res=>res.json())
            .then(json=>console.log(json))
		}
	},
	created(){
		this.getProduct()
		// this.getTargetProduct()
	}
}
</script>

<style lang="scss">
.news{
	text-align: center;
	padding: 4rem 0;
	background: #ddd;
}
</style>