<template>
    {{$router}}
</template>

<script>
export default {
	data(){
		return {
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
		console.log(1);
		this.getProduct()
	}
}
</script>