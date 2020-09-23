<template>
  <div class="hello">
    <h1>HelloWorld</h1>
    <span @click="handleClick">props: {{test}}</span>
    <slot name="slot1"/> <!-- 具名插槽 -->
    <p>===========</p>
    <slot/> <!-- 默认插槽 -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props:['a'],
  data(){
    return {
      test:'111'
    }
  },
  methods:{
    handleClick(){
      console.log('handleClick')
    }
  }
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
