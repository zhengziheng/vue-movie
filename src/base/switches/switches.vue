<!--  -->
<template>
  <ul class="switches">
    <li 
    class="switch-item"
    v-for="(item,index) in switches"
    :key='index'
    :class="{'active':currentIndex===index,'small-font':smallFont === true}"
    @click="switchItem(index)">
    <span>{{item.name}}</span>
    </li>
  </ul>
</template>

<script>
export default {
name:'',

  data () {
    return {
    };
  },

props:{
  switches:{
    type:Array,
    default:[]
  },
  currentIndex:{
    type:Number,
    default:0,
  },
  smallFont:{
    type:Boolean,
    default:false,
  },
},
  components: {},

  computed: {},


  methods: {
    switchItem(index){
      this.$emit('switch',index)
    }
  }
}

</script>
<style lang='stylus' scoped>
@import "../../common/stylus/variable.styl"
@import "../../common/stylus/mixin.styl"
.switches
  position relative
  z-index 200
  background $color-background
  display flex
  align-items center
  width 100%
  .switch-item
    flex 1
    text-align center
    padding 15px
    font-size $font-size-medium-x
    color $color-text
    border-bottom-1px(transparent)
    &.small-font
      padding 14px 5px
      font-size $font-size-small
    &.active
      color $color-theme-f
      border-bottom-1px($color-theme-f)
</style>