<!-- tab 组件 -->
<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/movie-show">
      <span class="tab-icon">
        <i class="icon-video-camera"></i>
      </span>
      <span class="tab-link">热映</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
      <span class="tab-icon">
        <i class="icon-stats-bars"></i>
      </span>
      <span class="tab-link">排行</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/user">
      <span class="tab-icon">
        <i class="icon-user"></i>
      </span>
      <span class="tab-link">我的</span>
    </router-link>
  </div>
</template>

<script>
export default {
name:'',

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
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
  .tab
    position fixed !important
    width 100%
    bottom 0
    border-top-1px($color-theme-f)
    display flex
    height 60px
    font-size $font-size-medium
    .tab-item
      flex 1
      text-align centet
      display flex
      flex-direction column
      align-items center
      justify-content center
      .tab-icon
        font-size $font-size-large-x
        color $color-text
      .tab-link
        font-size $font-size-small
        color $color-text
      &.router-link-active
        .tab-icon,.tab-link
          color $color-theme-f


</style>