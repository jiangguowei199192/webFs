<template>
  <div style="height: 250px; margin-top: 22px;">
    <div ref="rankingRef" style="height: 250px; overflow: hidden;">
      <div class="rankingItemStyle" v-for="(item, index) in data" :key="index">
        <span class="itemLeftTitleStyle">{{
          "NO." + item.No + " " + item.title
        }}</span>
        <span class="itemRightTitleStyle">{{ item.count }}</span>
        <el-progress
          :show-text="false"
          color="#00ccff"
          :percentage="item.count"
          style="margin-top: 8px"
        ></el-progress>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    const p = this
    this.timer = setInterval(() => {
      p.scroll()
    }, 2000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  data () {
    return {
      timer: null,
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
    scroll () {
      this.$refs.rankingRef.scrollTop = this.$refs.rankingRef.scrollTop + 50
      if (this.$refs.rankingRef.scrollTop === 250) {
        this.$refs.rankingRef.scrollTop = 0
      }
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
}
</style>
