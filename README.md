# vue_cli_command
使用VueCLI(vue3)來建立商品網頁

[Demo](https://ingridkao.github.io/vue_cli_command/)


##  把框架制定出來並把index如原稿一樣顯示

步驟1-改title:
在`vue.config.js`中更改，詳情請參考該檔案

步驟2-改icon:
把`public/favicon.ico`圖檔覆蓋並不改檔名



## 頁面說明
### home
> 借才珺個專-[茶苑CHAYUAN](https://github.com/tangtang1b1b/chayuan)來製作
> 將Banner和線上商城拆成兩個component
@/views/HomeView.vue

### shop
> 借才珺個專-[茶苑CHAYUAN](https://github.com/tangtang1b1b/chayuan)來製作
> 僅UI，無實際功能
@/views/ShopInfoView.vue

### about
> 測試iview的Carousel
@/views/AboutView.vue
### news
> 透過`https://api.escuelajs.co`來製作
功能：
1. 產品列表：透過URL篩選商品類別、前端filter商品價錢、媒合購物車列表、新增購物車
2. 產品詳情：媒合購物車列表、新增減少購物車數量

使用vue-router裡面的children，官方翻成嵌套路由，設定參考`src/router/index.js`中的L.24-41
@/views/news/Index.vue
@/views/news/List.vue
@/views/news/Info.vue

> 特別說明：
> 為了讓localstorage其實有所限制，在同一個domain網域，字符串可以任意長。但是總使用量必須低於5MB。
> 所以僅存產品ID和數量以減少value字數，在key帶入使用者ID或是訪客的字串去辨識
### carts
1. 取得vuex裡面的購物車列表
2. 使用`computed`計算購物車項目的總價
3. 由於產品過多用api的方式取得商品資訊(圖片價錢等)

@/views/CartsView.vue

## 重要檔案說明
`vue.config.js`
webpack的相關設定
1. 更改SPA引入檔案的URL前綴，像是部署時需要更改js,css引入的路徑
2. 網站title是中文

`src/main.js`
入口js - 所有需要掛*全域*的組件、第三方套件、js、css等，都從這邊import引入
1. 減少重複引入
2. 第三方UI函式庫必須將style從這邊引入

`src/App.vue`
Vue第一個檔案
1. 取得localStorage可以從這邊取得，並存到vuex
2. <router-view/>


    