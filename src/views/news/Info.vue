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
			//之後不會被改變此頁面的商品ID，所以用computed存取
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
			// 如果有存在於購物車中顯示該數量，如果沒有設定為０
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
			// 確認購物車中有沒有存在
			let exitIndex = this.cartList.findIndex(item => item && item.id == this.productID)
			// 如果有存在於購物車中找出陣列中的index，如果沒有則新增陣列
			exitIndex = (exitIndex >= 0)? exitIndex: this.cartList.length
			if(this.count === 0){
				// 如果數量為0，移除購物車項目
				this.cartList = this.cartList.filter(item => item && item.id !==  this.productID)
			}else{
				// 如果數量>0，更改購物車項目的數量
				this.cartList[exitIndex] = {
					id: this.productID, 
					count: this.count
				}
			}
			//在變更到全域的購物車列表
			this.$store.commit('setCarts', this.cartList)
		}
	},
	created(){
		// 之後要更新vuex裡面的購物車，所以不透過computed存取
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