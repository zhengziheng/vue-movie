<!-- 电影详情组件 -->
<template>
  <div class="detail-wrapper">
    <div class="fixed-title">
      <span class="back" @click="back">
        <i class="icon-back"></i>
      </span>
      <span class="type" ref="fixed">
        <span class="icon" v-show="!this.changeFix">
          <i class="icon-video-camera"></i>
          电影
        </span>
        <span v-if="changeFix" v-text="movieDetail.title" class="movie-name"></span>
      </span>
    </div>
    <scroll class="movie-detail"
            :data="movieDetail"
            :probeType="probeType"
            :listenScroll="listenScroll"
            @scroll="scroll"
            ref="scroll"
    >
      <div class="scroll-wrapper">
        <div class="scroll-content" v-if="movieDetail.image">
          <div class="bg-image" ref="image">
            <img v-lazy="replaceUrl(movieDetail.images.large)" alt="">
          </div>
          <movie-info :movieDetail="movieDetail" @selectCelebrity="selectCelebrity"></movie-info>
          <div class="switch">
            <switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></switches>
          </div>
          <movie-comment
            v-show="currentIndex===0"
            :comments="movieDetail.popular_comments"
            :commentNum="movieDetail.comments_count"
            @needAllComments="needAllComments"
          ></movie-comment>
          <movie-review 
          v-show="currentIndex===1"
          :reviews="movieDetail.popular_reviews.slice(0,5)"
          :reviewNum="movieDetail.reviews_count"
          @selectReview="selectReview"
          @needAllReviews="needAllReviews"
          ></movie-review>
        </div>
      </div>
      <loadmore :fullScreen="fullScreen" v-show="!movieDetail.images"></loadmore>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import MovieInfo from 'components/movie-info/movie-info'
import Scroll from 'base/scroll/scroll'
import Loadmore from 'base/loadmore/loadmore'
import Switches from 'base/switches/switches'
import MovieComment from 'components/movie-comment/movie-comment'
import MovieReview from 'components/movie-review/movie-review'
import { mapGetters, mapMutations } from 'vuex'
import { getMovieDetail } from '../../api/movie-detail'
export default {
name:'movieDetail',

created(){
  this.probeType = 3
  this.listenScroll = true
  this._getDetail()
},
  data () {
    return {
      movieDetail:{},
      fullScreen:true,
      swtiches:[
        {name:'短评'},
        {name:'影评'},
      ],
      currentIndex:0,
      scrollY:-1,
      imgHeight:-1,
      changeFix:false
    };
  },

props:{},
  components: {
    MovieInfo,
    Scroll,
    Loadmore,
    Switches,
    MovieComment,
    MovieReview
  },

  computed: {
    ...mapGetters([
      'movie'
    ])
  },


  methods: {
    back(){
      this.$router.back()
    },
    switchItem(index){
      this.currentIndex = index
      this.$nextTick(()=>{
        this.$refs.scroll.refresh()
      })
    },
    selectCelebrity(id){
      this.setCelebrity(id)
      this.$router.push({
        path:`/celebrity/${id}`
      })
    },
    selectReview(id){
      this.setReview(id)
      this.$router.push({
        path:`/movie/${this.movieDetail.id}/review/${id}`
      })
    },
    needAllComments(){
      this.setDiscussion('comment')
      this.$router.push({
        path:`/movie/${this.movieDetail.id}/comments`
      })
    },
    needAllReviews(){
      this.setDiscussion('review')
      this.$router.push({
        path:`/movie/${this.movieDetail.id}/reviews`
      })
    },
    replaceUrl(srcUrl) {
        if (srcUrl !== undefined) { // 图片防盗链处理
          return ('https://images.weserv.nl/?url=' + srcUrl.replace(/http\w{0,1}:\/\//, ''))
        }
    },
    scroll(pos){
      this.scrollY = pos.scrollY
      if(-this.imgHeight>pos.y&&this.imgHeight!==-1){
        this.changeFix = true
      }else{
        this.changeFix = false
      }
    },
    _getDetail(){
      if(!this.moivie.id){
        this.$router.push('/movie-show')
        return
      }
      getMovieDetail(this.movie.id).then(res=>{
        if(!this.$route.params.movieId){
          return
        }
        this.movieDetail =res
        let me = this
        this.$Lazyload.$once('loaded',function({el,src}){
          me.imgHeight = me._getImageHeight()
          setTimeout(()=>{
            if(!me.$route.params.movieId){
              return
            }
            me.$refs.scroll.refresh()
          },20)
        })
      })
    },
    _getImageHeight(){
      return this.$refs.image.clientHeight
    },
    ...mapMutations({
      setReview:'SET_REVIEW_ID',
      setDiscussion:'SET_DISCUSSION_TYPE',
      setCelebrity:'SET_CELEBRITY_ID',
    })
  }
}

</script>
<style lang='stylus' scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'

  .detail-wrapper
    position relative
    z-index 10
    .fixed-title
      position fixed
      top 0
      width 100%
      height 40px
      z-index 100
      background-color rgba(85,85,85,.6)
      text-align center
      .back
        position absolute
        top 0
        left 6px
        z-index 50
        .icon-back
          display block
          padding 10px
          font-size $font-size-large
          color $color-background
      .type
        .icon
          position absolute
          left 50%
          top 0
          color $color-background
          display block
          padding 10px
          transform translateX(-50%)
          .icon-video-camera
            display inline-block
            vertical-align text-bottom
            font-size $font-size-large-x
        .movie-name
          display block
          padding-top 11px
          width 100px
          color $color-background
    .movie-detail   
      position fixed
      top 0
      bottom 0
      left 0
      right 0
      background $color-background-f
      .bg-image
        text-align center
        padding 50px 0 20px 0 
        background-color $color-background-f
        img 
          width 50%
      .switch
        padding 0 20px
        background-color $color-background
        padding-top 20px   

</style>