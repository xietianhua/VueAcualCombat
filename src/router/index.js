import Vue from 'vue'
import Router from 'vue-router'
import Pos from '@/components/Pos'

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path:'/',
      name:'Pos',
      component:Pos
    }

  ]
})
