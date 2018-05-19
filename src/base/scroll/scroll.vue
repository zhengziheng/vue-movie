<!-- scroll组件 -->
<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
name:'MScroll',

  data () {
    return {
    };
  },

props:{
  probeType:{//派发滚动事件方式
    type:Number,
    default:1
  },
  click:{//是否支持点击
    type:Boolean,
    default:true,
  },
  data:{
    default:null
  },
  scrollX:{//设置滚动方向为X轴
    type:Boolean,
    default:false,
  },
  listenScroll:{//监听滚动
    type:Boolean,
    default:false
  },
  pullup:{//开启上拉刷新
    type:Boolean,
    default:false,

  },
  beforeScroll:{//滚动开始派发
    type:Boolean,
    default:false
  },
  refreshDelay:{ // 控制刷新时间(内部如果包含动画切换，需要增加延时)
    type:Number,
    default:20
  },
  eventPassthrouh:{
    type:String,
    default:''
  }
},
  mounted(){
    setTimeout(()=>{
      this._initScroll()
    },20)
  },

  components: {},

  computed: {},


  methods: {
    _initScroll(){
      if(!this.$refs.wrapper){
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper,{
        probeType:this.probeType,
        click:this.click,
        scrollX:this.scrollX,
        eventPassthrough:this.eventPassthrouh
      })

      //是否需要监听滚动事件
      if(this.listenScroll){
        this.scroll.on('scroll',(pos)=>{
          this.$emit('scroll',pos)
        })
      }

      //是否支持上拉刷新
      if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= this.scroll.maxScrollY + 50) { // 快滚动到底部
              this.$emit('scrollToEnd'); // 派发事件说明已经滚动到底部
            }
          })
        }
        //触发滚动之前派发事件，用于优化用户体验
      if(this.beforeScroll){
        this.scroll.on('beforeScrollStart',()=>{
          this.$emit('beforeScroll')
        })
      }
    },
    enable(){
      this.scroll &&this.scroll.enable()
    },
    disable(){
      this.scroll &&this.scroll.disable()
    },
    refresh(){
      this.scroll &&this.scroll.refresh()
    },
    scrollTo(){
      this.scroll &&this.scrollTo.apply(this.scroll,arguments)
    },
    scrollToElement(){
      this.scroll &&this.scroll.scrollToElement.apply(this.scroll,arguments)
    }
  },
  watch:{
    data(){
      setTimeout(()=>{//data发生变化 重新计算高度。
        this.refresh()
      },this.refreshDelay)
    }
  }
}

</script>
<style lang='stylus' scoped>
</style>