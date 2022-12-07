<template>
    <Layout class="padding-10">
        <Breadcrumb class="margin-1">
            <BreadcrumbItem to="/"><Icon type="md-home" /></BreadcrumbItem>
            <BreadcrumbItem>{{$route.meta.title}}</BreadcrumbItem>
        </Breadcrumb>
	</Layout>
    <!-- 因為有child router所以要放置router-view -->
    <router-view/>
</template>

<script>
export default {
    data(){
        return {
            load: false,
            source: [],
            sourceCount: 0,
            order: [],
            // product: [],
            count: [],
            search: '',
            min: 0,
            max: 0,
        }
    },
    computed:{
        product(){
            let cache = this.source
            if(this.min > 0){//篩選最小價錢
                cache = cache.filter((item, index)=>{
                    return item.price > this.min
                })
            }
            if(this.max > 0){//篩選最大價錢
                cache = cache.filter(item=>{
                    return item.price < this.max
                })
            }
            if(this.search !== ''){//篩選相符標題
                cache = cache.filter(item=>{
                    return item.title.includes(this.search)
                })
            }
            return cache
        },
        total(){
            let total = 0
            for ( const countIndex in this.product) {
                total += this.count[countIndex] * this.product[countIndex]['price']
            }
            return parseInt(total)
        }
    },
    watch:{
        //監聽data或computed
        total: {
            handler: function(newVal, oldVal) {
                if(newVal> 1000){
                    alert('你要餓死了')
                }
            }
        }
    },
    methods:{
        parseRating(rating){
            if(!rating) return null
            let starStr = ''
            const star = parseInt(rating.rate)
            for (let index = 0; index < star; index++) {
                starStr += '🌟'
            }
            return `${starStr}${rating.count}`
        },
        parsePrice(price){
            return `TWD ${price*33}`
        },
        getResource(){
            this.load = true
            fetch('https://fakestoreapi.com/products/')
            .then(res=>res.json())
            .then(json=>{
                this.source = json
                //初始化商品數量
                // for ( item in this.product) {
                //     this.count.push(0)
                // }
                this.load = false
                this.sourceCount = this.source.length
                // console.log('method:'+this.sourceCount);
            })
        },
        addCount(index, item){
            this.count[index] += 1
            // const exits = this.order.some(orderItem => {
            //     // 訂單裡面有沒有(orderItem)存在新增的商品(item)
            //     return orderItem.id === item.id
            // })
            // 如果訂單清單裡有這個商品，就將同id的商品增加數量count
            // 取訂單商品的順序
            const prodIndex = this.order.findIndex(orderItem => {
                console.log(orderItem)
                return orderItem.id === item.id
            })
            if(prodIndex >= 0 ){
                // 將訂單商品數量+1
                // this.order[prodIndex]['count'] = this.order[prodIndex]['count'] + 1 
                this.order[prodIndex]['count'] += 1 
            }else{
                //prodIndex結果會是-1
                //如果訂單清單裡沒有這個商品，就新增一個訂單商品
                this.order.push({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    count: 1 //init
                })
            }
            this.setStorage()
        },
        reduceCount(index, item){
            if(this.count[index] <= 0) return
            this.count[index] -= 1
            const prodIndex = this.order.findIndex(orderItem => {
                return orderItem.id === item.id
            })
            if(prodIndex < 0) return
            if(this.order[prodIndex]['count'] > 1){
                // this.order[prodIndex]['count'] = this.order[prodIndex]['count'] - 1 
                this.order[prodIndex]['count'] -= 1 
            }else{
                this.order.splice(prodIndex, 1)
            }
            this.setStorage()
        },
        getStorage(){
            let data = localStorage.getItem('turleShop')
            data = JSON.parse(data)
            this.order = data? data: []
        },
        setStorage(){
            //陣列或物件轉字串
            const data = JSON.stringify(this.order)
            localStorage.setItem('turleShop', data)
        }
    },
    created() {
        // console.log('created:'+this.source.length);
            // this.getResource()
    },
      mounted(){
          this.getResource()
          this.getStorage()
          this.sourceCount = this.source.length
          // console.log('mounted:'+this.sourceCount);
      },
      beforeUnmount(){
          // alert('beforeUnmount')
          // console.log('beforeUnmount');
      }
}
</script>

<style lang="scss">
</style>