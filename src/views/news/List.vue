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
	<Row v-else :gutter="4">
		<Col :xs="12" :md="8" v-for="item in displayData" :key="item.id" >
			<Card>
				<Carousel v-model="item.carousel">
					<CarouselItem v-for="imageitem in item.images" :key="imageitem">
						<Image :src="imageitem" fit="cover" lazy width="100%" height="150px" >
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
					<!-- 這個組件沒辦法做數量更改event，可以news/Info寫法 -->
					<InputNumber v-model="item.count" controls-outside size="small" min="0"/>
					<Button type="primary" icon="md-cart" size="small" shape="circle" @click="updateCart(item)"></Button>
					<Button icon="md-return-right" size="small" shape="circle" @click="showProduct(item.id)"></Button>
				</div>
			</Card>
		</Col>
	</Row>
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
			categoriesData: [],
			activeCategories: [],
			cartList: []
		}
	},
	computed: {
        cartArray(){
            return this.$store.state.cartList
        },
		displayData(){
			if(this.sourceData.length === 0)return

			console.log('computed');
			let newArray = this.sourceData
			if(this.activeCategories.length > 0){
				newArray = newArray.filter((item, index)=>{
					if(!item.category) return
					return this.activeCategories.includes(item.category.name)
				})
			}
			//篩選最小價錢-
			newArray = newArray.filter((item, index)=>{
				return item.price > this.min
			})
			//篩選最大價錢
			newArray = newArray.filter(item=>{
				return item.price < this.max
			})
			return newArray
		}
	},
	methods:{
		fetchCategories(){
			this.axios.get('https://api.escuelajs.co/api/v1/categories')
			.then( (response) => {
				if(!Array.isArray(response.data))return
				// this.categoriesData = response.data
				// 因為第六個以外是別人測試的
				this.categoriesData = response.data.splice(0,5)
			})
			.catch( (error) => {
				console.log(error);
			})
		},
		fetchProduct(){
			this.loading = true
			this.axios.get('https://api.escuelajs.co/api/v1/products', { 
				params: this.query
			})
			.then( (response) => {
				this.sourceData = response.data.map(item => {
					// mapping購物車和產品清單：找出產品列表中已出現在購物車的項目數量
					const haveCart = this.cartArray.find(cart => cart && cart.id === item.id)
					return {
						...item,
						count: haveCart? haveCart.count: 0
					}
				})
			})
			.catch( (error) => { // handle error
				console.log(error);
			})
			.finally( () => { // always executed
				this.loading = false
			});
		},
		showProduct(id){
			// https://router.vuejs.org/zh/guide/essentials/navigation.html#%E5%AF%BC%E8%88%AA%E5%88%B0%E4%B8%8D%E5%90%8C%E7%9A%84%E4%BD%8D%E7%BD%AE

			// 寫法1-直接帶路徑
			this.$router.push({ path: `/news/${id}`})
		},
		updateCart(product){
			if(product.count === 0){
				// 如果數量0表示要取消購物車裡的項目
				// 篩選出非"此ID"的列表
				this.cartList = this.cartList.filter(item => item.id != product.id)
			}else{
				// 找到此ID在列表中的陣列index
				// 去改變此ID的數量
				let exitIndex = this.cartList.findIndex(item => item.id == product.id)
				//如果都找不到值會是-1
				exitIndex = (exitIndex >= 0)? exitIndex: 0
				this.cartList[exitIndex] = {
					id: product.id, 
					count: product.count
				}
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