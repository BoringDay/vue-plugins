export const createHOC = (WrappedComponent) => {
  return {
    mounted () {
      console.log('mounted', this.a)
    },
    components: {
      WrappedComponent
    },
    props: WrappedComponent.props,
    render (h) {
      console.log('this.$slots', this.$slots)
      const slots = Object.keys(this.$slots)
        .reduce((arr, key) => arr.concat(this.$slots[key]), [])
        // 手动更正 context(避免父级组件和子组件因为高阶组件这一层关系而context不相等)
        .map(vnode => {
          vnode.context = this._self
          return vnode
        })
      return h('WrappedComponent', {
        on: this.$listeners,
        bind: this.$attrs,
        // 透传 scopedSlots
        scopedSlots: this.$scopedSlots,
        props: this.$props
      }, slots)
    }
  }
}
