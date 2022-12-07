<template>
    <Layout class="padding-10">
		<Carousel v-model="value" loop>
			<!-- <CarouselItem>
			<div class="demo-carousel"><img alt="" :src="require(`@/assets/images/avatar/report_avatar_1.png`)"></div>
			</CarouselItem>
			<CarouselItem>
			<div class="demo-carousel"><img alt="" :src="require(`@/assets/images/avatar/report_avatar_2.png`)"></div>
			</CarouselItem>
			<CarouselItem>
			<div class="demo-carousel"><img alt="" :src="require(`@/assets/images/avatar/report_avatar_3.png`)"></div>
			</CarouselItem> -->
			<!-- 透過v-for來渲染圖片 -->
			<CarouselItem v-for="item in 5" :key="item">
				<div class="demo-carousel">
					<img alt="" :src="require(`@/assets/images/avatar/report_avatar_${item}.png`)">
				</div>
			</CarouselItem>
		</Carousel>
	</Layout>
</template>

<script>
    export default {
        data () {
            return {
                value: 0
            }
        }
    }
</script>
