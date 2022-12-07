<template>
	<Breadcrumb class="margin-1">
		<BreadcrumbItem to="/"><Icon type="md-home" /></BreadcrumbItem>
		<BreadcrumbItem>{{$route.meta.title}}</BreadcrumbItem>
	</Breadcrumb>

	<Space wrap>
		<CheckboxGroup v-model="activeCategories">
			<Checkbox v-for="item in categoriesData" :key="item.id" :label="item.name" border></Checkbox>
		</CheckboxGroup>

		<InputNumber v-model="min" size="small" min="0" :formatter="value => `$${value}`" :parser="value => value.replace('$', '')" />-
		<InputNumber v-model="max" size="small" min="0" :formatter="value => `$${value}`" :parser="value => value.replace('$', '')"/>
	</Space>
	
	<div v-if="loading">
		Loading...
	</div>
	<div v-else>
		<Card style="width:320px" v-for="item in displayData" :key="item.id" >
			<div style="text-align:center">
				<Carousel v-model="item.carousel">
					<CarouselItem v-for="imageitem in item.images" :key="imageitem">
						<Image :src="imageitem" fit="fill" lazy width="200px" height="150px" >
							<template #placeholder>
								<Spin size="large" fix />
							</template>
							<template #error>
								<Icon type="ios-image-outline" size="24" color="#ccc" />
							</template>
						</Image>
					</CarouselItem>
				</Carousel>
				<h3>{{item.title}}</h3>
				<div>
					<h4>$ {{item.price}}</h4>
					<InputNumber v-model="item.count" controls-outside size="small" min="0"/>
					<Button type="primary" icon="md-cart" size="small" shape="circle" @click="addCart(item)"></Button>
					<Button icon="md-return-right" size="small" shape="circle" @click="showProduct(item.id)"></Button>
				</div>
			</div>
		</Card>
	</div>
</template>

<script>
// 太多地方使用將import寫在main.js L3, L19
// import axios from 'axios'
export default {
	data(){
		return {
			// 1-50筆
			min: 0,
			max: 10000,
			query: {
				offset: 0,
				limit: 50
			},
			loading: false,
			sourceData: [],
			displayData: [],
			categoriesData: [],
			activeCategories: [],
			cartList: []
		}
	},
    computed: {
        cartArray(){
            return this.$store.state.cartList || []
        }
    },
	watch:{
		activeCategories(){
			if(this.activeCategories.length === 0){
				this.displayData = this.sourceData
			}else{
				this.displayData = this.sourceData.filter((item, index)=>{
					if(!item.category) return
					return this.activeCategories.includes(item.category.name)
				})
			}
		},
		min(){
			//篩選最小價錢
			this.displayData = this.sourceData.filter((item, index)=>{
				return item.price > this.min
			})
		},
		max(){
			//篩選最大價錢
			this.displayData = this.sourceData.filter(item=>{
				return item.price < this.max
			})
		},
	},
	methods:{
		fetchCategories(){
			return this.axios.get('https://api.escuelajs.co/api/v1/categories')
			.then( (response) => {
				if(Array.isArray(response.data)){
					// this.categoriesData = response.data
					// 因為第六個以外是別人測試的
					this.categoriesData = response.data.splice(0,5)
				}
			})
			.catch( (error) => {
				console.log(error);
			})
		},
		fetchProduct(){
			this.loading = true
			return this.axios.get('https://api.escuelajs.co/api/v1/products', { 
				params: this.query
			})
			.then( (response) => {
				// mapping購物車和產品清單
				this.sourceData = response.data.map(item => {
					const haveCart = this.cartArray.find(cart => cart.id === item.id)
					return {
						...item,
						count: haveCart? haveCart.count: 0
					}
				})
				this.displayData = this.sourceData
			})
			.catch( (error) => { // handle error
				console.log(error);
			})
			.finally( () => { // always executed
				this.loading = false
			});
		},
		showProduct(id){
			this.$router.push({ path: `news/${id}`})
		},
		addCart(product){
			if(product.count === 0) return
			const exitIndex = this.cartList.findIndex(item => item.id == product.id)
			if(exitIndex >= 0){
				this.cartList[exitIndex] = {
					id: product.id, 
					count: product.count
				}
			}else{
				this.cartList.push({
					id: product.id, 
					count: product.count
				})
			}
			this.$store.commit('setCarts', this.cartList)
		}
	},
	created(){
		this.fetchCategories()
		this.fetchProduct()
	}
}

</script>