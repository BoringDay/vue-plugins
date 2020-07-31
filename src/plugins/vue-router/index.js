import routerLink from './components/router-link'
import routerView from './components/router-view'
import Vue from 'vue';

class VueRouter {
  constructor(options){
    this.$options  = options 

    // this.current 记录的当前的URL标识符
    const initPath = window.location.hash.slice(1) || '/'

    // 响应式的matched 按深度存放路由配置
    Vue.util.defineReactive(this, 'matched', [])
    Vue.util.defineReactive(this, 'current', initPath)

    window.addEventListener('hashchange',this.onHashchange.bind(this))
    this.onHashchange()
  }

  onHashchange(){
    this.current = window.location.hash.slice(1) || '/'
    this.matched = []
    this.match()
  }

  match(){
    const routes = this.$options.routes || []
    // const paths = this.current.split('/').slice(1)
    const matched = []
    let depth = 0
    let pathString = this.current

    // 根据当前访问路径划分router-view的层级组件组
    // const getRouter = (routers)=>{
    //   for(const router of routers){
    //     if(router.path === `${paths[depth]}` || router.path === `/${paths[depth]}`){
    //       matched.push(router)
    //       if(router.children) getRouter(router.children,++depth)
    //       return router
    //     }
    //   }
    // }
    
    const getRouter = (routers)=>{
      for(const router of routers){
        if(this.current==='/' && this.current ===router.path){
          matched.push(router)
          return
        }

        if(router.path!='/' &&  ~pathString.indexOf(router.path)){
          console.log(router.path)
          matched.push(router)
          pathString = pathString.slice(router.path.length)
          if(router.children) getRouter(router.children)
          return router
        }
      }
    }

    this.matched = matched

    getRouter(routes,depth)
  }
}

VueRouter.install = function(_Vue){
  const Vue = _Vue
  Vue.component(routerLink.name,routerLink)
  Vue.component(routerView.name,routerView)
  Vue.mixin({
    beforeCreate(){
      //$options 用于当前 Vue 实例的初始化选项。需要在选项中包含自定义 property 时会有用处：
      if(this.$options.router){
        Vue.prototype.$router  = this.$options.router 
      }
    }
  })
}

export default VueRouter