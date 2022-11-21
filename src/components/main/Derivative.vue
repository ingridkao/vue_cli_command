<template>
    <section class="derivative_row"> 
        <div class="derivative_inner_box">
            <div class="derivative_title">
                <div class="derivative_title_inner">
                    <p class="main_new">線上商城</p>
                    <h2>SHOPPING</h2>
                </div>
            </div>
            <div class="derivative_number">
                <div class="derivative_number_inner">
                    <div class="derivative_number_var">01</div>
                    <div class="derivative_number_bar">/</div>
                    <div class="derivative_number_total">08</div>
                </div>
            </div>
            <div class="derivative_container">
                <ul class="derivative_group" id="special_group">
                    <div id="followbtn">
                        <img :src="require(`@/assets/img/lr.svg`)" alt="follow">
                    </div>
                    <li class="derivative_list" v-for="(item, index) in derivativeArray" :key="index"> 
                        <div class="derivative_list_card">
                            <!-- <a href="indexshopinner.html">  -->
                                <figure class="product_else">
                                    <img class="tea_img" :src="require(`@/assets/img/${item.img}`)" :alt="item.name">
                                </figure>
                            <!-- </a> -->
                            <div class="tea_img_name"> 
                                <h3>{{item.name}}</h3>
                                <button class="derivative_car">
                                    <span class="material-symbols-outlined">shopping_cart </span>
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="read slideIn">
                <div class="read_inner"> 
                    <router-link class="read_more" to="/product">
                        <div class="read_more_text"> 
                            <p>View More</p>
                            <p>View More</p>
                        </div>
                        <div class="read_go">
                            <div class="circle">
                                <i class="fa-solid fa-arrow-right"></i>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data(){
        return {
            derivativeArray: [
                {img: '22.jpg', name:'玻璃禮品茶罐'},
                {img: '6.jpg', name:'茶香吐司'},
                {img: '10.jpg', name:'抹茶馬卡龍'},
                {img: '68.png', name:'高山清白茶'},
                {img: '38.jpg', name:'綜合茶皂組'},
                {img: '26.jpg', name:'100%抹茶手工皂'},
                {img: '14.jpg', name:'職人茶具組'}
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.derivative_group{
    left: 10% !important;
}
</style>