<template>
  <div>
    <div class="rankingItemStyle" v-for="(item, index) in data" :key="index">
      <span class="itemLeftTitleStyle">{{ "NO." + item.No + ' ' + item.title }}</span>
      <span class="itemRightTitleStyle">{{ item.count }}</span>
      <!-- <div class="itemProgressStyle" :style="{ width: progress + 'px' }"></div> -->
      <el-progress :show-text="false" color="#00ccff" :percentage="50" style="margin-top: 8px;"></el-progress>
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
      total: 100,
      count: 44,
      progress: 0,
      data: [
        { No: 1, title: '江夏区渔政', count: 90 },
        { No: 2, title: '洪山区渔政', count: 77 },
        { No: 3, title: '江岸区渔政', count: 50 },
        { No: 4, title: '黄陂区渔政', count: 34 },
        { No: 5, title: '汉阳区渔政', count: 4 },
        { No: 1, title: '江夏区渔政', count: 90 },
        { No: 2, title: '洪山区渔政', count: 77 },
        { No: 3, title: '江岸区渔政', count: 50 },
        { No: 4, title: '黄陂区渔政', count: 34 },
        { No: 5, title: '汉阳区渔政', count: 4 }
      ]
    }
  },
  methods: {
    show () {
      this.progress = (350 / this.total) * this.count
    }
  }
}
</script>

<style lang="scss" scoped>
.rankingItemStyle {
  height: 50px;
  .itemLeftTitleStyle {
    color: white;
    font-size: 14px;
  }
  .itemRightTitleStyle {
    float: right;
    color: white;
  }
  .itemProgressStyle {
    background: blue;
    height: 5px;
  }
}
</style>
