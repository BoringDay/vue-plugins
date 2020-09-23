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
      const slots =  Object.keys(this.$slots)
        .reduce((arr, key) => arr.concat(this.$slots[key]), [])
        // 手动更正 context
        .map(vnode => {
          vnode.context = this._self
          return vnode
        })

      console.log('slots', slots)
      return h('WrappedComponent', {
        on: this.$listeners,
        bind: this.$attrs,
        props: this.$props
      }, slots)
    }
  }
}
