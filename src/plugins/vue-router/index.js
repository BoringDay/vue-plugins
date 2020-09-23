import routerLink from './components/router-link'
import routerView from './components/router-view'
import { HashHistory } from './history/hash'
import Vue from 'vue'
import { parseQuery } from './lib/query'

class VueRouter {
  constructor (options) {
    this.$options = options
    this.mode = options.mode || 'hash'
    this.query = {} // 路径参数

    // this.current 记录的当前的URL标识符
    const initPath = window.location.hash.slice(1) || '/'

    // 响应式的matched 按深度存放路由配置
    Vue.util.defineReactive(this, 'matched', [])
    Vue.util.defineReactive(this, 'current', initPath)

    window.addEventListener('hashchange', this.onHashchange.bind(this))
    this.onHashchange()

    if (this.mode === 'hash') {
      this.history = new HashHistory(this, options)
    }
  }

  onHashchange () {
    this.current = window.location.hash.slice(1) || '/'
    this.matched = []
    this.match()
  }

  match (location) {
    const routes = this.$options.routes || []
    const matched = []
    const depth = 0
    let pathString = location || this.current

    this.query = parseQuery(pathString.replace(/.*\?/, ''))

    pathString = pathString.split('?').shift()

    console.log('pathString', pathString)

    // 根据当前访问路径划分router-view的层级组件组
    const getRouter = (routers) => {
      for (const router of routers) {
        if (pathString === '/' && pathString === router.path) {
          matched.push(router)
          return
        }

        if (router.path !== '/' && ~pathString.indexOf(router.path)) {
          matched.push(router)
          pathString = pathString.slice(router.path.length)
          if (router.children) getRouter(router.children)
          return router
        }
      }
    }

    getRouter(routes, depth)

    this.matched = matched
    this.current = location
  }

  push (location, onComplete, onAbort) {
    if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
      return new Promise((resolve, reject) => {
        this.history.push(location, resolve, reject)
      })
    } else {
      this.history.push(location, onComplete, onAbort)
    }
  }

  replace (location, onComplete, onAbort) {
    if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
      return new Promise((resolve, reject) => {
        this.history.replace(location, resolve, reject)
      })
    } else {
      this.history.replace(location, onComplete, onAbort)
    }
  }

  go (n) {
    this.history.go(n)
  }

  back () {
    this.go(-1)
  }

  forward () {
    this.go(1)
  }
}

VueRouter.install = function (_Vue) {
  const Vue = _Vue
  Vue.component(routerLink.name, routerLink)
  Vue.component(routerView.name, routerView)
  Vue.mixin({
    beforeCreate () {
      // $options 用于当前 Vue 实例的初始化选项。需要在选项中包含自定义 property 时会有用处：
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })
}

export default VueRouter
