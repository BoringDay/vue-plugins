<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <router-view></router-view>
    <testHoc a='1' >
      <template v-slot:slot1>
        <h1>About Me</h1>
      </template>
      AFTER about me 
    </testHoc>
  </div>
</template>

<script>
import testHoc from '@/modules/testHoc'
export default {
  name: 'App',
  components: {
    testHoc
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
