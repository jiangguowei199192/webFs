<template>
  <div style="height: 250px; margin-top: 22px">
    <div ref="rankingRef" style="height: 250px; overflow: hidden">
      <div class="rankingItemStyle" v-for="(item, index) in data" :key="index">
        <span class="itemLeftTitleStyle">{{
          "NO." + item.NO + " " + item.deptName
        }}</span>
        <span class="itemRightTitleStyle">{{ item.caseNum }}</span>
        <el-progress
          :show-text="false"
          color="#00ccff"
          :percentage="item.caseNum"
          style="margin-top: 8px"
        ></el-progress>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {},
  beforeDestroy () {
    clearInterval(this.timer)
  },
  data () {
    return {
      timer: null,
      data: []
    }
  },
  methods: {
    scroll () {
      this.$refs.rankingRef.scrollTop = this.$refs.rankingRef.scrollTop + 50
      if (this.$refs.rankingRef.scrollTop === 250) {
        this.$refs.rankingRef.scrollTop = 0
      }
    },

    setData (rankingData) {
      if (rankingData.length) {
        var temp1 = []
        rankingData.forEach((item, index) => {
          var dict = {
            NO: index + 1,
            caseNum: rankingData[index].caseNum,
            deptName: rankingData[index].deptName
          }
          temp1.push(dict)
        })
        this.data = temp1

        if (temp1.length > 5) {
          const p = this
          this.timer = setInterval(() => {
            p.scroll()
          }, 2000)
        }
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
