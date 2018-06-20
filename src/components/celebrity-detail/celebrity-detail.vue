<!--  -->
<template>
  <div class="detail-wrapper">
    <div class="fixed-title">
      <span class="back" @click="back">
        <i class="icon-back"></i>
      </span>
      <span class="type" ref="fixed">
        影人
      </span>
    </div>
    <scroll class="celebrity-detail" v-if="celebrityDetail.avatars" :data="celebrityDetail">
      <div class="scroll-wrapper">
        <div class="big-image" ref="image">
          <img v-lazy="replaceUrl(celebrityDetail.avatars.large)" alt="">
        </div>
        <div class="celebrity-info">
          <div class="main">
            <h1 class="name-cn">{{celebrityDetail.name}}</h1>
            <span class="name-en">{{celebrityDetail.name_en}}</span>
            <div class="collect" @click="sevaCollect" :class="{'has-collected':isCollected}">
              <i class="icon" :class="collect"></i>
              <span class="text">{{collextText}}</span>
            </div>
          </div>
          <div class="brief">
            <div class="title">个人简介</div>
            <p class="text" @click="showInfo">
              {{celebrityDetail.summary}}
              <span class="more"><i class="icon-keyboard_arrow_right "></i></span>
            </p>
          </div>
          <scroll 
          class="work"
          :scrollX="this.scrollX" 
          :eventPassthrough="this.eventPassthrough"
          ref="scroll"
          v-if="works.length"
          >
            <div class="works-content" ref="content">
              <h2 class="title">代表作品</h2>
              <div class="work-item" v-for="(item, index) in works" :key="index" @click="selectWork(item,$event)">
                <img v-lazy="replaceUrl(item.image)" width="90" height="120">
                <h3 class="item-title">{{item.title}}</h3>
                <star :score="item.rating" :showScore="showScore"></star>
              </div>
            </div>
          </scroll>
          <div class="allWorks" @click="getAllWorks">
            查看全部作品
            <i class="icon-keyboard_arrow-right"></i>
          </div>
        </div>
      </div>
    </scroll>
    <loadmore :fullScreen="fullScreen" v-if="!celebrityDetail.avatars"></loadmore>
    <celebrity-info :infoLists="celebrityDetail" ref="info"></celebrity-info>
    <router-view></router-view>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Loadmore from 'base/loadmore/loadmore'
import Star from 'base/star/star'
import CelebrityInfo from 'components/celebrity-info/celebrity-info'
import { createMovieList } from '../../common/js/movieList'
import Celebrity from '../../common/js/celebrity'
import { getCelebrity } from '../../api/celebrity'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
name:'celebrity',

  data () {
    return {
      celebrityDetail:{},
      works:[],
      scrollX:true,
      eventPassthrough:'vertical',
      fullScreen:true,
      showScore:true,
      collectText:'收藏',
      isCollected:false,
    };
  },

props:{},
  components: {
    Scroll,
      Loadmore,
      Star,
      CelebrityInfo
  },

  computed: {
    collect(){
      return this.isCollected===false?'icon-collect':'icon-checkmark'
    },
    ...mapGetters([
      'currentCelebrityId',
      'collectedCelebrities'
    ])
  },
  created(){
    this._getCelebrity()
  },


  methods: {
    back(){
      this.$router.back()
    },
    showInfo(){
      this.$refs.info.show()
    },
    saveCollect(){
      this.markCelebrity(this.celebrity)
      this.isCollected  = !isCollected
      if(!this.isCollected){
        this.collectText = '收藏'
      }else{
        this.collectText = '已收藏'
      }
    },
    getAllWorks(){
      this.$router.push({
        path:`/celebrity/${this.currentCelebrityId}/works`
      })
    },
    sekectWork(movie){
      if(!event._constructed){
        return 
      }
      this.setMovie(movie)
      this.$router.push({
        path:`/movie/${movie.id}`
      })
    },
    _getCelebrity(){
      if(!this.currentCelebrityId){
        this.$router.push('/movie-show')
        return
      }
      getCelebrity(this.currentCelebrityId).then(res=>{
        if(!this.$router.params.celebrityId){
          return
        }
        this.celebrityDetail = res
        let ret=[]
        res.works.forEach(item => {
          ret.push(item.subject)
        });
        this.works = createMovieList(ret)
        this._checkCollect()
        const mainWorks = []
        res.works.forEach(item=>{
          mainWorks.push(item.subject.title)
        })
        this.celebrity = new Celebrity({
          id:res.id,
          name:res.name,
          image:res.avatars.large,
          works:mainWorks.slice(0,3).join('/')
        })
        this._initPics()
      })
    },
    replaceUrl(srcUrl) {
        if (srcUrl !== undefined) { // 图片防盗链处理
          return ('https://images.weserv.nl/?url=' + srcUrl.replace(/http\w{0,1}:\/\//, ''));
        }
    },
    _checkCollect(){
      const index = this.collectCelebrities.findIndex(item=>{
        return item.id===this.celebrityDetail.id
      })
      if(index>-1){
        this.isCollected = true
        this.collectText= '已收藏'
      }else{
        this.isCollected = false
        this.collectText= '收藏'
      }
    },
    _initPics(){
      let picWidth = 90
      let margin = 8
      let width = (picWidth + margin) *this.celebrityDetail.works.length-margin
      this.$nextTick(()=>{
        this.$refs.content.style.width = width+'px'
      })
    },
    ...mapMutations({
      setMovie:'SET_MOVIE'
    }),
    ...mapActions([
      'markCelebrity'
    ])
  }
}

</script>
<style lang='stylus' scoped>
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  .detail-wrapper
    position fixed
    top 
    bottom 0
    left 0
    right 0
    background $color-background-f
    z-index 10
    .fixed-title
      position fixed
      top 0
      width 100%
      z-index 100
      background-color rgba(85,85,85,.6)
      .back
        position absolute
        top 0
        left 6px
        z-index 50
        .icon-back
          display block
          padding 11px
          font-size $font-size-large
          color $color-background
      .type
        display inline-block
        padding-top 12px
        padding-left 50px
        font-size: $font-size-medium-x
        color: $color-background
    .celebrity-detail
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
          width 40%
      .celebrity-info
        background-color $color-background
        padding 15px 20px 0 20px
        .main
          position relative
          .name-cn
            font-size $font-size-medium-x
            color $color-text-f
          .name-en
            display inline-block
            padding-top 7px
            font-size $font-size-medium
          .collect
            position absolute
            top 0
            right 0
            height 30px
            line-height 30px
            width 80px
            text-align center
            font-size $font-size-medium
            border 1px solid $color-theme-f
            border-radius 10px
            &.has-collected
              border 1px solid $color-collect
              color $color-collect
              .icon
                color $color-collect
              .text
                color $color-collect
            .icon
              display inline-block
              vertical-align middle
              color $color-theme-f
            .text
              display inline-block
              font-size   $font-size-small
              color $color-theme-f
        .brief
          position relative    
          margin-top 30px
          font-size $font-size-medium
          .text
            position relative
            padding-right 15px
            display -webkit-box
            -webkit-line-clamp: 3
            -webkit-box-orient: vertical
            overflow: hidden
            margin-top: 20px
            color: $color-text-f
            line-height: 20px
            .more
              position absolute
              top 50%
              transform translateY(-50%)
              right 0
              font-size $font-size-large-x
              color $color-theme-f
          .works
            margin-top 30px
            padding-bottom 20px
            white-space nowrap
            overflow hidden
            font-size 0    
            border-bottom-1px(#ccc)
            .works-content
              .title
                font-size $font-size-medium
                padding-bottom 20px
              .work-item
                width 90px
                vertical-align top
                display inline-block
                margin-right 8px  
                font-size $font-size-medium
                img
                  height 120px
                  width 90px
                .item-title
                  color $color-text-f
                  padding 8px 0 5px 0
                  no-wrap()
          .allWorks
            padding 20px 0 
            fontsin  $font-size-medium
            i   
              display inline-block
              vertical-align middle
              font-size $font-size-large-x
</style>