import VueRouter from '@/plugins/vue-router'
import Vue from 'vue'
import HelloWorld from '@/modules/HelloWorld'
import HelloWorld2 from '@/modules/HelloWorld2'
import UserProfile from '@/modules/UserProfile'
import UserPosts from '@/modules/UserPosts'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: HelloWorld},
  { 
    path: '/HelloWorld2', 
    component: HelloWorld2, 
    children: [
      {
        path: 'profile',
        component: UserProfile
      },
      {
        path: 'posts',
        component: UserPosts
      }
    ] }
]

const router = new VueRouter({
  routes
})

export default router