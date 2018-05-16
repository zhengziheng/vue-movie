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
      </li>
    </ul>
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
</style>