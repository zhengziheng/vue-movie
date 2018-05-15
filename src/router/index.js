import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/movie-show'
    },
    {
      path: '/movie-show',
      component:MovieShow
    },

  ]
})
