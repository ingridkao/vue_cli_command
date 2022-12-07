<template>
	<Breadcrumb class="margin-1">
		<BreadcrumbItem to="/"><Icon type="md-home" /></BreadcrumbItem>
		<BreadcrumbItem to="/news">最新消息</BreadcrumbItem>
		<BreadcrumbItem v-if="info.title">{{info.title}}</BreadcrumbItem>
	</Breadcrumb>
	<div>
		{{info}}
	</div>
</template>

<script>
export default {
	data(){
		return {
			info: {},
			loading: false
		}
	},
	methods:{
		getTargetProduct(){
			this.loading = true
			fetch(`https://api.escuelajs.co/api/v1/products/${this.$route.params.id}`)
            .then(res=>res.json())
            .then(json=>{
				// console.log(json)
				this.info = json
				this.loading = false
			})
		}
	},
	created(){
		this.getTargetProduct()
	}
}

</script>