<template>
  <div class="hello" :class="type">
    <div class="img" v-for="item in 6" :key="item">
      <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
      <!-- <img alt="Vue logo" :src="require('@/assets/logo.png')"> -->
      <img alt="Vue logo" :src="require(`@/assets/images/avatar/report_avatar_${item}.png`)">
    </div>
    <!-- <div class="img" :style="{
      backgroundImage: `url( ${ require('@/assets/logo.png') } )`
    }" /> -->
    <div>
      <p>{{ title }}</p>
      <p>{{ msg }}</p>
      <button>+</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    title: String,
    msg: String,
    type: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello{
  width: 100%;
  display: inline-flex;
  margin: 1rem;
}
.wide{
  width: 50%;
  overflow: hidden;
}
.img{
  width: 8rem;
  height: 8rem;
  background-color: #ddd;
}
</style>
