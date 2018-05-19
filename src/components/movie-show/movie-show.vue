<!-- 电影信息展示组件 -->
<template>
  <div class="movie-show">
    <div class="go-search" >
      <div class="logo">
        <img src="./douban-logo.png" alt="" width="35" height="35">
      </div>
      <div class="search-content">
        <span class="icon-search"></span>
        <span>电影/影人/标签</span>
      </div>
    </div>
    <switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></switches>
    <div class="list-wrapper">
      <scroll 
      v-show="currentIndex===0"
      class="list-scroll"
      :data="hotMovies"
      :pullup="pullup"
      @scrollToEnd="loadMore"
      ref="hotMovies"
      >
        <div class="list-inner">
          <movie-list :movies="hotMovies" :hasMore="hasMoreHotMovies" @select="selectMovie" ></movie-list>
        </div>
      </scroll>
      <scroll 
      v-show="currentIndex===1"
      class="list-scroll"
      :data="comingMovies"
      :pullup="pullup"
      :probeType="probeType"
      :listenScroll="listenScroll"
      @scroll="scroll"
      @scrollToEnd="loadMore"
      ref="comingMovies"
      >
        <div class="list-inner">
          <movie-list :movies="comingMovies" :needDate="needDate" @getHeight="getHeight" @getMap="getMap" :hasMore="hasMoreComingMovies" @select="selectMovie" ref="list"></movie-list>
        </div>
      </scroll>
      <loadmore 
      :fullScreen="fullScreen" 
      v-show="currentIndex===1&&!comingMovies.length||currentIndex===0&&!hotMovies.length"
      ></loadmore>
    </div>
    <div v-show="currentIndex===1" class="list-fixed" v-if="fixedTitle" ref="fixed">
      <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>
  </div>
</template>

<script>
  import Switches from 'base/switches/switches'
  import MovieList from 'components/movie-list/movie-list'
  import Scroll from 'base/scroll/scroll'
  import Loadmore from 'base/loadmore/loadmore'
  import {getMovie,getComingMovie} from '@/api/movie-show'
  import { createMovieList } from '../../common/js/movieList';
  import { mapMutations } from 'vuex';
  const SEARCH_MORE = 10
  const TITLE_HEIGHT=30
export default {
  
name:'MovieShow',

  data () {
    return {
      currentIndex:0,
      switches:[
        {name:'正在热映'},
        {name:'即将上映'},
      ],
      pullup:true,
      needDate:true,
      fullScreen:true,
      liadingFlag:true,
      scrollY:-1,
      diff:-1,
      hotMovies:[],
      comingMovies:[],
      hasMoreHotMovies:true,
      hasMoreComingMovies:true,
      hotMovieIndex:0,
      comingMovieIndex:0,
      scrollIndex:0,


    }
  },
created(){
  this._getMovie()
  this.probeType=3
  this.listenScroll=true
  this.lostHeight=[]
  this.scrollMap=[]
},
props:{},
  components: {
    Switches,
      MovieList,
      Scroll,
      Loadmore
  },

  computed: {
    fixedTitle(){
      if(this.scrollY>0){
        return ''
      }
      return this.scrollMap[this.scrollIndex] ? this.scrollMap[this.scrollIndex] : ''
    }
  },


  methods: {
    goSearch(){
      this.$router.push({
        path:'/search'
      })
    },
    selectMovie(movie){
      this.setMovie(movie)
      this.$router.push({
        path:`/movie/${movie.id}`
      })
    },
    switchItem(index){
      this.currentIndex  = index
      if(index===1){
        this.$refs.list.recalculate()
      }
      if(index===1&&!this.comingMoives.length){
        getComingMovie(this.comingMovieIndex,SEARCH_MORE).then(res=>{
          this.comingMoives = createMovieList(res.subjects)
          this._checkMore(res)
        })
      }
      if(index===1){ //重新载入的滚动位置
        this.$refs.comingMoives.scrollTo(0,this.scrollY)
      }
      setTimeout(() => {
        this.$refs.comingMoives.refresh()
        this.$refs.hotMovies.refresh()
      }, 20);
    },
    loadMore(){
      if(!this.loadingFlag){
        return
      }
      this.loadingFlag = false
      if(this.currentIndex===0){
        if(!this.hasMoreHotMovies){
          this.loadingFlag = true
          return
        }
        this.hotMoviesIndex +=SEARCH_MORE
        getMovie(this.hotMovieIndex,SEARCH_MORE).then(res=>{
          this.hotMovies = this.hotMovies.concat(createMovieList(res.subjects))
          
          this._checkMore(res)
          this.loadingFlag = true
        })
      }else {
          if (!this.hasMoreComingMovies) {
            this.loadingFlag = true;
            return;
          }
          this.comingMovieIndex += SEARCH_MORE;
          getComingMovie(this.comingMovieIndex, SEARCH_MORE).then((res) => {
            this.comingMovies = this.comingMovies.concat(createMovieList(res.subjects));
            this._checkMore(res);
            this.loadingFlag = true;
          });
        }
    },
    scroll(pos){
      this.scrollY =pos.y
    },
    getHeight(height){// 保存子组件传入的高度列表
      this.listHeight= height
    },
    getMap(map){// 保存子组件传入的日期索引
      this.scrollMap = map
    },
    _getMovie(){
      getMovie(this.hotMovieIndex,SEARCH_MORE).then(res=>{
        this.$emit('hasLoad')
        this.hotMovies = createMovieList(res.subjects)
        console.log(this.hotMovies);
        this._checkMore(res)
      })
    },
    _checkMore(data) {
        const movies = data.subjects;
        if (!movies.length || data.start + data.count > data.total) {
          if (this.currentIndex === 0) {
            this.hasMoreHotMovies = false
          } else {
            this.hasMoreComingMovies = false
          }
          this.loadingFlag = true
        }
      },
    ...mapMutations({
        setMovie: 'SET_MOVIE'
      })

  },
  watch:{
    scrollY(newY,oldY){
      if(!newY){
        this.scrollY = oldY
      }
      if(this.listHeight.length===0||this.scrollMap.lenght===0){
        return
      }
      if(newY>0){
        this.scrollIndex=0
        return
      }
      for (let i = 0; i < listHeight.length-1; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i+1]
        if(-newY>=height1 &&-newY<height2){
          this.scrollIndex = i
          this.diff=height2+newY
          return 
        }
        this.scrollIndex = this.listHeight.length - 2
      }
    },
    diff(newval){
      let fixedTop = (newval>0&&newval<TITLE_HEIGHT)? newval - TITLE_HEIGHT : 0
      if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$nextTick(() => {
          this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`
        })
    }
    
  }
}

</script>
<style lang='stylus' scoped>
@import "../../common/stylus/variable.styl"
  .movie-show
    height 100%
    .go-search  
      height 50px
      box-sizing border-box
      padding 10px 10px 5px 60px
      text-align center
      .logo
        position absolute
        left 10px
      .search-content
        background-color $color-background-d
        font-size $font-size-medium-x
        line-height: 35px
        border-radius 5px
        span 
          display inline-block
          vertical-align middle
    .list-wrapper
      position absolute
      top 97px
      bottom 61px
      width 100%
      .list-scroll
        position relative
        height 100%
        overflow hidden
        .list-inner
          padding 0 15px
    .list-fixed
      position absolute
      top 97px
      right 15px
      left 15px
      .fixed-title
        width 100%
        padding-left 5px
        height 30px
        line-height 30px
        background-color $color-background-d


</style>