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
      ref="commingMovies"
      >
        <div class="list-inner">
          <movie-list :movies="comingMovies" :needDate="needDate" @getHeight="getHeight" @getMap="getMap" :hasMore="hasMoreComingMovies" @select="selectMovie" ref="list"></movie-list>
        </div>
      </scroll>
      <loadMore 
      :fullScreen="fullScreen" 
      v-show="currentIndex===1&&!comingMovies.length||currentIndex===0&&!hotMovies.length"
      ></loadMore>
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
export default {
  
name:'MovieShow',

  data () {
    return {
    };
  },

props:{},
  components: {},

  computed: {},


  methods: {}
}

</script>
<style lang='stylus' scoped>
</style>