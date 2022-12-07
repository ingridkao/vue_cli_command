<template>
    <section class="banner_row"> 
        <div class="banner_go">
            <Carousel v-model="value" loop autoplay :autoplay-speed="5000">
                <CarouselItem v-for="(item, index) in carouselArray" :key="item">
                    <div class="demo-carousel">
                        <div
                            class="banner_images"
                            :class="{
                                active: value === index
                            }"
                            :style="{
                                backgroundImage: 'url(' + require(`@/assets/img/${item.img}`) + ')' 
                            }"
                        >
                        </div>
                        <div class="banner_inner">
                            <p class="main_new">最新產品</p>
                            <h2 class="main_pro">{{item.alt}}</h2>
                            <router-link class="read_more" to="/news">
                                <div class="read_more_text"> 
                                    <p>View More</p>
                                </div>
                                <span class="read_go">
                                    <img class="key_item" :src="require(`@/assets/img/scroll.svg`)" alt="viewmore">
                                </span>
                            </router-link>
                        </div>
                    </div>
                </CarouselItem>
            </Carousel>
        </div>
    </section>
</template>

<script>
export default {
    data(){
        return {
            value: 0,
            carouselArray: [
                {img: '56.jpg', alt:'高級檜木茶具組'},
                {img: '112.jpg', alt:'稻殼焙烤體驗課程'},
                {img: '56.png', alt:'全茶系即飲隨手包'}
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.demo-carousel{
    position: relative;
    height: 99vh;
    .banner_images{
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        transform: scale(1);
        transition-duration: 5s;
        &.active{
            transform: scale(1.05);
        }
    }
    .banner_inner{
        position: absolute;
        bottom: 1rem;
        left: 1rem;
        max-width: 1200px;
        width: 100%;
        padding: 0 20px;
        display: flex;
        flex-direction: column;
        .main_new {
            text-shadow: 1px 1px 2px black;
            color: #f7f7f7;
            font-size: 16px;
        }
        .main_pro {
            text-shadow: 1px 1px 2px black;
            color: #f7f7f7;
            font-size: 48px;
        }
        .read_more {
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
            background-color: #f7f7f7;
            border-radius: 50px;
            cursor: pointer;
            margin-top: 20px;
            display: inline-block;
            width: 140px;
            transition: 0.5s;
            overflow: hidden;
            text-decoration: none;
            &:hover {
                box-shadow: 0px 0px 15px rgb(0 0 0 / 50%);
                animation: movedown 0.2s;
            }
            .read_more_text {
                color: #333;
                font-weight: bold;
                overflow: hidden;
                height: 20px;
                transition: 0.2s;
            }
            .read_go {
                position: absolute;
                color: #333;
                font-size: 26px;
                font-weight: bold;
                transition: 0.2s;
                top: 50%;
                right: 0;
                transform: translateX(40px) translateY(-50%);
            }
        }
    }
}
.read_go .key_item {
    width: 75px;
}
@keyframes movedown {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}
</style>