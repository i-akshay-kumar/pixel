<template>
  <div id="app">
    <navbarPage/>
    <router-view></router-view>
  </div>
</template>

<script>
import navbarPage from "./components/navbarPage.vue"
export default {
  name: 'App',
  components: {
    navbarPage, 
  }
}
</script>

<style>
body{
    background-color: #f4f8fd;
  }
</style>
