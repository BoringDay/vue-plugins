import routerLink from './components/router-link'
import routerView from './components/router-view'

const install = (_Vue) => {
  const Vue = _Vue
  Vue.component(routerLink.name, routerLink)
  Vue.component(routerView.name, routerView)
  Vue.mixin({
    beforeCreate () {
      if (this.router) {
        Vue.prototype.$router = this.router
      }
    }
  })
}

export default install
