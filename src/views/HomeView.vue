<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld title="嘿嘿" msg="1dsadadd"/>
    <HelloWorld title="ffsfdsd" msg="2"/>
    <HelloWorld title="eqwdwadad" msg="3"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
