<template>
  <div class="policeRankingStyle">
    <div class="rankingItemStyle" v-for="(item, index) in data" :key="index">
      <span class="itemLeftTitleStyle">{{'No.' + item.No}}</span>
      <span class="itemCenterTitleStyle">{{item.title}}</span>
      <span class="itemRightTitleStyle">{{item.count}}</span>
      <div class="itemProgressStyle" :style="{ width: progress + 'px' }"></div>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.show()
  },
  data () {
    return {
      total: 50,
      count: 44,
      progress: 0,
      data: [
        { No: 1, title: '江夏区渔政', count: 8 },
        { No: 2, title: '洪山区渔政', count: 9 },
        { No: 3, title: '江岸区渔政', count: 10 },
        { No: 4, title: '黄陂区渔政', count: 11 },
        { No: 5, title: '汉阳区渔政', count: 12 }
      ]
    }
  },
  methods: {
    show () {
      this.progress = 350 / this.total * this.count
    }
  }
}
</script>

<style lang="scss" scoped>
.policeRankingStyle {
  background: lavender;
  height: 300px;
  margin-top: 50px;
  .rankingItemStyle {
    height: 30px;
    border-bottom: solid 1px blue;
    .itemLeftTitleStyle {
      margin-left: 10px;
      color: blue;
      // background: red;
    }
    .itemCenterTitleStyle {
      display: inline-block;
      color: black;
      margin-left: 15px;
      // background: red;
    }
    .itemRightTitleStyle {
      float: right;
      color: black;
      margin-right: 10px;
      // background: red;
    }
    .itemProgressStyle {
      background: blue;
      height: 5px;
    }
  }
}
</style>
