<!-- 电影列表组件 -->
<template>
  <div class="movie-list">
    <ul>
      <li
      v-for="(movie,index) in movies"
      :key="index"
      @click="selectItem(movie)"
      ref="group">
      <div class="date" v-if="needDate && !dateEqual(index)">{{movie.date}}</div>
      <div class="item">
        <div class="info-img">
          <img v-lazy="replaceUrl(movie.image)" height="120" width="80">
        </div>
        <div class="info-desc">
          <p class="title">{{movie.title}}</p>
          <star :size="24" :score="movie.rating" :showScore="showScore"></star>
          <div class="director">导演：{{movie.director}}</div>
          <div class="casts">主演：{{movie.casts}}</div>
          <div class="hasWatched">{{movie.collectCount}}人看过</div>
        </div>
      </div>
      </li>
    </ul>
    <loadmore :hasMore="hasMore" v-show="movies.length"></loadmore>
  </div>
</template>

<script type="text/ecmascript-6">
import Star from 'base/star/star'
import Loadmore from 'base/loadmore/loadmore'
export default {

  data () {
    return {
      casts:[],
      showScore:true
    };
  },
created(){
  this.listHeight= []
  this.indexMap={}
},
props:{
  movies:{
    type:Array,
    default:[]
  },
  needDate:{
    type:Boolean,
    default:false,
  },
  hasMore:{
    type:Boolean,
    default:true
  }
},
  components: {},

  computed: {},


  methods: {}
}

</script>
<style lang='stylus' scoped>
</style>