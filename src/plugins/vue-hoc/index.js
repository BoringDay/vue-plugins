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
      return h('WrappedComponent', {
        on: this.$listeners,
        bind: this.$attrs,
        props: this.$props
      })
    }
  }
}
