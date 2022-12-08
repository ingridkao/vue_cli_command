<template>
	<Breadcrumb class="margin-1">
		<BreadcrumbItem to="/"><Icon type="md-home" /></BreadcrumbItem>
		<BreadcrumbItem to="/news">最新消息</BreadcrumbItem>
		<BreadcrumbItem v-if="info.title">{{info.title}}</BreadcrumbItem>
	</Breadcrumb>
	<div>
		<Card>
			<Carousel v-model="carousel">
				<CarouselItem v-for="item in info.images" :key="item">
					<Image :src="item" fit="cover" lazy width="100%" height="150px" >
						<template #placeholder>
							<Spin size="large" fix />
						</template>
						<template #error>
							<Icon type="ios-image-outline" size="24" color="#ccc" />
						</template>
					</Image>
				</CarouselItem>
			</Carousel>
			<h3>{{info.title}}</h3>
			<Tag v-if="info.category">{{info.category.name}}</Tag>
			<p>{{info.description}}</p>
			<div>
				<h4>$ {{info.price}}</h4>
				<Button icon="md-remove" @click="reduceCart"/>
				<InputNumber v-model="count" @change="updateCart" min="0"/>
				<Button icon="md-add" @click="addCart"/>
			</div>
		</Card>
	</div>
</template>

<script>
export default {
	data(){
		return {
			info: {},
			loading: false,
			carousel: 0,
			count: 0,
			cartList: []
		}
	},
	computed:{
		productID(){
			return this.$route.params.id
		}
	},
	methods:{
		getTargetProduct(){
			this.loading = true
			fetch(`https://api.escuelajs.co/api/v1/products/${this.productID}`)
            .then(res=>res.json())
            .then(json=>{
				this.info = json
				this.loading = false
			})
		},
		getTargetCart(){
			const exitCart = this.cartList.find(item => item && item.id == this.productID)
			this.count = exitCart? exitCart.count: 0
		},
		reduceCart(){
			if(this.count === 0) return
			this.count -= 1
			this.updateCart()
		},
		addCart(){
			this.count += 1
			this.updateCart()
		},
		updateCart(){
			let exitIndex = this.cartList.findIndex(item => item && item.id == this.productID)
			exitIndex = (exitIndex >= 0)? exitIndex: this.cartList.length
			if(this.count === 0){
				this.cartList = this.cartList.filter(item => item && item.id !==  this.productID)
			}else{
				this.cartList[exitIndex] = {
					id: this.productID, 
					count: this.count
				}
			}
			this.$store.commit('setCarts', this.cartList)
		}
	},
	created(){
		this.cartList = this.$store.state.cartList
		if(this.productID){
			//有URL參數
			this.getTargetProduct()
			this.getTargetCart()
		}else{
			//無URL參數導引到商品列表，或是其他提示
			this.$router.push({ name: 'news'})
		}
	}
}

</script>