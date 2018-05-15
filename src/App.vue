<template>
  <div id="app">
    <keep-alive>
      <router-view @hasLoad="hasLoad"></router-view>
    </keep-alive>
    <tab></tab>
    <loading v-if="!loadingFlag"></loading>
  </div>
</template>

<script>
import Loading from "base/loading/loading";
import Tab from "components/tab/tab";
export default {
  name: 'App',
  data(){
    return{
      loadingFlag:false
    }
  },
  methods:{
    hasLoad(){
      this.loadingFlag = true
    }
  },
  components:{
    Tab,
    Loading,
  }
}
</script>

<style>

</style>
