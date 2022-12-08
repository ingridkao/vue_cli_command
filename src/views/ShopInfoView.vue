<template>
    <section class="title_area"> 
        <div class="container_title_area"> 
            <ul class="bread_group">
                <li class="bread_list"><router-link to="/">首頁</router-link><span>/</span></li>
                <li class="bread_list"><router-link to="/shop">線上商城</router-link><span>/</span></li>
                <li class="bread_list">{{info.subtitle}}</li>
            </ul>
        </div>
    </section>

    <section class="shopinner">
        <div class="container_inner">
            <div class="content_inner">
                <Carousel v-model="carouselValue" loop :dots="'none'" class="main_img">
                    <CarouselItem v-for="item in info.image" :key="item.id">
                        <img :src="require(`@/assets/img/${item.img}`)" :alt="item.name">
                    </CarouselItem>
                </Carousel>
                <div class="other_img">
                    <ul class="img_group">
                        <li class="img_list" @click="carouselValue = index" v-for="(item, index) in info.image" :key="item.id" :class="{
                            active: carouselValue === index
                        }">
                            <img :src="require(`@/assets/img/${item.img}`)" :alt="item.name">
                        </li>
                    </ul>
                </div>
            </div>
            <div class="content_shopping">
                <div class="title_shop">
                    <h2>{{info.title}}</h2>
                </div>
                <div class="title_cont">
                    <p v-html="info.description"></p>
                </div>
                <div class="title_price">
                    <p>NT$ {{info.price}}</p>
                </div>
                <div class="title_btn">
                    <div class="btnadd">加入購物車</div>
                    <div class="btnbuy">
                        <a href="indexshopcar.html">立即購買</a>
                    </div>
                </div>
                <div class="dcrib_big">
                    <ul class="title_dcrib_group">
                        <li class="title_dcrib_list">◼ 商品描述</li>
                        <li class="title_dcrib_list">◼ 送貨及付款方式</li>
                        <li class="title_dcrib_list">◼ 顧客評價</li>
                        <li class="title_dcrib_list">◼ 相關產品</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <section class="morebuyit">
        <div class="container_norebuy">
            <div class="title_morebuy">
                <h3>相關產品</h3>
            </div>
            <div class="content_morebuy">
                <div class="morebuyprod" v-for="item in other" :key="item.id">
                    <div class="imgbox">
                        <img :src="require(`@/assets/img/${item.image[0]}`)" :alt="item.name">
                        <div class="addbtn">
                            <a href="">加入購物車</a>
                        </div>
                    </div>
                    <div class="prodetail">
                        <p>{{item.name}}</p>
                        <p>NT$ {{item.price}}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data(){
        return {
            carouselValue: 0,
            info: {
                "title": "輕焙熟成烏龍 200g｜罐裝茶葉｜玻璃罐裝原始茶香",
                "subtitle": "輕焙熟成烏龍 200g",
                "price": 850,
                "description": "川久保玲御用設計師 Filip Pagowski<br>用代表 CAFE!N 的驚嘆號圖樣做出多種變化，每個驚嘆號都像 CAFE!N 的飲料一樣讓人驚喜，簡單有趣的線條配上明亮色塊，創造年輕活潑的的印象。",
                "image": [
                    {id: 1, img: '22.jpg', name:'玻璃禮品茶罐'},
                    {id: 2, img: '3.jpg', name:'茶香吐司'},
                    {id: 3, img: '113.jpg', name:'抹茶馬卡龍'},
                    {id: 4, img: '114.jpg', name:'抹茶馬卡龍'},
                    {id: 5, img: '87.jpg', name:'抹茶馬卡龍'}
                ]
            },
            other: [
                {
                    "id": 4,
                    "title": "輕清香鹿白茶｜單入禮包",
                    "price": 500,
                    "image": [
                        '68.jpg'
                    ]
                },
                {
                    "id": 8,
                    "title": "經典原味茶禮盒｜茶罐禮盒",
                    "price": 1100,
                    "image": [
                        '3.jpg'
                    ]
                },
                {
                    "id": 9,
                    "title": "宜蘭玉露茶罐｜茶罐紀念品",
                    "price": 700,
                    "image": [
                        '878.jpg'
                    ]
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/scss/navbarfoot.scss";
    @import "@/assets/css/styleshopinner.css";
    .main_img{
        height: 28rem;
    }
</style>
