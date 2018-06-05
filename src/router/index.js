import Vue from 'vue'
import Router from 'vue-router'

const MovieShow = resolve => require(['components/movie-show/movie-show'], resolve)
const Rank = resolve => require(['components/rank/rank'], resolve)
const RankDetail = resolve => require(['components/rank-detail/rank-detail'], resolve)
const MovieDetail = resolve => require(['components/movie-detail/movie-detail'], resolve)
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
    {
      path: '/rank',
      component:Rank,
      children:[
        {
          path:':rankType',
          component:RankDetail
        }
      ]
    },
    {
      path:'/movie/:movieId',
      component:MovieDetail,

    }

  ]
})
