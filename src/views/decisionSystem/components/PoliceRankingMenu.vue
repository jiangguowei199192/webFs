<template>
  <div style="height: 250px; margin-top: 22px">
    <div ref="rankingRef" style="height: 250px; overflow: hidden">
      <div class="rankingItemStyle" v-for="(item, index) in showData" :key="index">
        <span class="itemLeftTitleStyle">{{
          "NO." + item.NO + " " + item.deptName
        }}</span>
        <span class="itemRightTitleStyle">{{ item.caseNum }}</span>
        <el-progress
          :show-text="false"
          color="#00ccff"
          :percentage="item.point"
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
      showData: [],
      trueData: []
    }
  },
  methods: {
    scroll () {
      this.$refs.rankingRef.scrollTop = this.$refs.rankingRef.scrollTop + 50
      if (this.$refs.rankingRef.scrollTop === this.trueData.length * 50) {
        this.$refs.rankingRef.scrollTop = 0
      }
    },

    setData (rankingData) {
      if (rankingData.length) {
        rankingData.forEach((item, index) => {
          if (item.deptName === null) {
            rankingData.splice(index, 1)
          }
        })

        var temp1 = []
        rankingData.forEach((item, index) => {
          var dict = {
            NO: index + 1,
            caseNum: item.caseNum,
            deptName: item.deptName,
            point: (item.caseNum / rankingData[0].caseNum) * 100
          }
          temp1.push(dict)
        })
        this.trueData = temp1

        if (temp1.length > 5) {
          // 额外添加五条数据，为实现滚动效果
          var temp2 = []
          temp1.forEach(item => {
            temp2.push(item)
          })
          for (let index = 0; index < 5; index++) {
            temp2.push(temp1[index])
          }

          this.showData = temp2

          const p = this
          this.timer = setInterval(() => {
            p.scroll()
          }, 2000)
        } else {
          this.showData = temp1
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
    display: inline-block;
    max-width: 300px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .itemRightTitleStyle {
    float: right;
    color: white;
  }
}
</style>
