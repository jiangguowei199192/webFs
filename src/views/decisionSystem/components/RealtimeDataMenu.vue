<template>
  <div class="containerStyle">
    <div class="realtimeDataStyle">
      <div class="realtimeIconStyle"></div>
      <div class="realtimeTitleStyle">实时数据统计</div>
      <div class="newPoliceStyle">新建警情</div>
      <div class="countBaseStyle">
        <div style="width: 132px; height: 90px; display: inline-block;">
          <div class="countTitleStyle">警情数量</div>
          <div class="countNumberStyle">66</div>
        </div>
        <div style="width: 132px; height: 90px; float: right;">
          <div class="countTitleStyle">人员数量</div>
          <div class="countNumberStyle">66</div>
        </div>
        <div style="width: 132px; height: 90px; display: inline-block; margin-top: 10px;">
          <div class="countNumberStyle">66</div>
          <div class="countTitleStyle">红外设备</div>
        </div>
        <div style="width: 132px; height: 90px; float: right; margin-top: 10px;">
          <div class="countNumberStyle">66</div>
          <div class="countTitleStyle">无人机</div>
        </div>
      </div>
    </div>
    <div class="policeRankingStyle">
      <div class="realtimeIconStyle"></div>
      <div class="realtimeTitleStyle">各区警情数量排行</div>
      <PoliceRankingMenu></PoliceRankingMenu>
    </div>
    <div class="thisWeekStyle">
      <div class="realtimeIconStyle"></div>
      <div class="realtimeTitleStyle">本周报警趋势</div>
    </div>
  </div>
</template>

<script>
import PoliceRankingMenu from './PoliceRankingMenu'

export default {
  components: {
    PoliceRankingMenu
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.containerStyle {
  position: absolute;
  right: 30px;
  top: 27px;
  width: 380px;
  height: 850px;
  background: url(../../../assets/images/RealtimeDataMenu/background.png)
    no-repeat;
  background-size: 100%;
  padding-top: 19px;
}
.realtimeDataStyle {
  height: 251px;
  margin-left: 20px;
  margin-right: 24px;
  padding-top: 1px;
  .newPoliceStyle {
    float: right;
    width: 83px;
    height: 29px;
    font-size: 16px;
    border: solid 1px #1eb0fc;
    background-color: #293c59;
    text-align: center;
    line-height: 29px;
  }
  .countBaseStyle {
    width: 275px;
    height: 190px;
    background: url(../../../assets/images/RealtimeDataMenu/countBase.png)
      no-repeat;
    background-size: 100%;
    margin: 15px auto;
    .countTitleStyle {
      // padding-top: 13px;
      color: white;
      font-size: 18px;
      text-align: center;
      margin-top: 15px;
    }
    .countNumberStyle {
      color: white;
      margin-top: 13px;
      text-align: center;
      font-size: 20px;
    }
  }
}
.realtimeIconStyle {
  display: inline-block;
  width: 21px;
  height: 16px;
  background: url(../../../assets/images/RealtimeDataMenu/arrow.png) no-repeat;
  background-size: 100%;
}
.realtimeTitleStyle {
  display: inline-block;
  height: 18px;
  width: 144px;
  color: white;
  font-size: 18px;
  margin-left: 15px;
}
.policeRankingStyle {
  height: 300px;
  margin-left: 20px;
  margin-right: 24px;
}
.thisWeekStyle {
  margin-left: 20px;
  margin-right: 24px;
  margin-top: 10px;
  height: 280px;
  // background: burlywood;
}
</style>
