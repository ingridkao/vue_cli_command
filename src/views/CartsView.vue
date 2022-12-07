<template>
    <Layout class="padding-10">
        <Breadcrumb class="margin-1">
            <BreadcrumbItem to="/"><Icon type="md-home" /></BreadcrumbItem>
            <BreadcrumbItem>{{$route.meta.title}}</BreadcrumbItem>
        </Breadcrumb>
		<List>
			<ListItem v-for="item in cartMappingList" :key="item.id">
				<ListItemMeta 
					:title="item.title" 
					:description="item.description" />
					<template #action>
						<li>
							${{item.price}}
						</li>
						<li>
							<InputNumber v-model="item.count" controls-outside size="small" min="1"/>
						</li>
						<li>
							<Button icon="ios-trash" shape="circle" @click="deleteCart(item)"/>
						</li>
					</template>
					<template #extra>
						<Image :src="item.images[0]" fit="fill" lazy width="200px" height="150px" >
							<template #placeholder>
								<Spin size="large" fix />
							</template>
							<template #error>
								<Icon type="ios-image-outline" size="24" color="#ccc" />
							</template>
						</Image>
					</template>
			</ListItem>
		</List>
		<hr>
		總計{{total}}
	</Layout>
</template>

<script>
    export default {
        data () {
            return {
				cartMappingList: []
			}
        },
        computed: {
			cartArray(){
				return this.$store.state.cartList
			},
			total(){
				// 使用reduce去加總 價錢＊數量
				// https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
				return this.cartMappingList.reduce((accumulator, currentValue) => {
					return accumulator + (currentValue.count* currentValue.price)
				},0)
			}
		},
		created(){
			this.cartArray.map(item => {
				this.getTargetProduct(item)
			})
		},
		methods:{
			getTargetProduct(product){
				this.axios.get(`https://api.escuelajs.co/api/v1/products/${product.id}`)
				.then( (response) => {
					if(!response || !response.data)return
					const Product = response.data
					this.cartMappingList.push({
						...Product,
						count: product.count
					})
				})
				.catch( (error) => {
					console.log(error);
				})
			},
			deleteCart(product){
				this.cartMappingList = this.cartMappingList.filter(item => item.id != product.id)
				this.$store.commit('setCarts', this.cartMappingList)
			}
		}
    }
</script>
