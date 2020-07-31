<script>
export default {
  name: 'router-view',
  data(){
    return {
    }
  },
  render(h){
    this.$vnode.data.isRouterView = true
    const { matched } = this.$router

    let parent = this.$parent
    let depth = 0

    // 向上递归获取当前router-view的深度，从而知道自己的当前匹配path对应的组件
    while (parent) {
      if(parent.$vnode && parent.$vnode.data.isRouterView){
        ++depth
      }

      parent = parent.$parent
    }

    const component = matched[depth] && matched[depth].component

    return h(component)
  }
}
</script>
