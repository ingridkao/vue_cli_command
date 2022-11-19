<template>
  <div class="news">
    <Images link="https://fakeimg.pl/100/"/>
    <Images link="https://fakeimg.pl/150/"/>
    <h1>This is an news page</h1>
    <HelloWorld title="緊張喔" type="wide"/>
  </div>
</template>
<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Images from '@/components/Images.vue'

export default {
  name: 'NewsView',
  components: {
    HelloWorld: HelloWorld,
    Images
  }
}
</script>