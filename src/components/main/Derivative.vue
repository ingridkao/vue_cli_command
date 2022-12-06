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
                    <div class="derivative_number_var">0{{selected}}</div>
                    <div class="derivative_number_bar">/</div>
                    <div class="derivative_number_total">{{derivativeArray.length}}</div>
                </div>
            </div>
            <div class="derivative_container">
                <ul class="derivative_group slide_left" id="special_group">
                    <li class="derivative_list" v-for="(item, index) in derivativeArray" :key="index" @mouseenter="selectShop(index)"> 
                        <div class="derivative_list_card">
                            <figure class="product_else" @click="linkShop(item)">
                                <img class="tea_img" :src="require(`@/assets/img/${item.img}`)" :alt="item.name">
                            </figure>
                            <div class="tea_img_name"> 
                                <h3>{{item.name}}</h3>
                                <button class="derivative_car">
                                    <Icon type="md-cart" />
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
                                <Icon type="md-arrow-dropright" />
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
            selected: 1,
            derivativeArray: [
                {id: 1, img: '22.jpg', name:'玻璃禮品茶罐'},
                {id: 2, img: '6.jpg', name:'茶香吐司'},
                {id: 3, img: '10.jpg', name:'抹茶馬卡龍'},
                {id: 4, img: '68.png', name:'高山清白茶'},
                {id: 5, img: '38.jpg', name:'綜合茶皂組'},
                {id: 6, img: '26.jpg', name:'100%抹茶手工皂'},
                {id: 7, img: '14.jpg', name:'職人茶具組'}
            ]
        }
    },
    methods: {
        selectShop(index){
            this.selected = index+1
        },
        linkShop(item){
            console.log(item);
            if(!item.id) return
            this.$router.push(`/shop/${item.id}`)
        }
    }
}
</script>