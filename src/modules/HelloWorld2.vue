<template>
  <div class="hello">
    <h1>HelloWorld2</h1>
    <p><router-link to="/">to Home</router-link></p>
    <p><router-link to="/HelloWorld2">to HelloWorld2</router-link></p>
    <p><router-link to="/HelloWorld2/posts">to posts</router-link></p>
    <p><router-link to="/HelloWorld2/profile">to profile</router-link></p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld2'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
