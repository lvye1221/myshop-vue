<template>
  <div id="app">
    <nav-header></nav-header>
    <router-view></router-view>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from '@/components/Header.vue'
import NavFooter from '@/components/Footer.vue'
export default {
  name: 'app',
  components: {
    NavHeader,
    NavFooter
  },
}
</script>

<style>

</style>
