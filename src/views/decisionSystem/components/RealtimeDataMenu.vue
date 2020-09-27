<template>
  <div class="containerStyle">
    <PoliceRankingMenu></PoliceRankingMenu>
  </div>
</template>

<script>
import PoliceRankingMenu from './PoliceRankingMenu'

export default {
  components: {
    PoliceRankingMenu
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.containerStyle {
  position: absolute;
  right: 30px;
  top: 60px;
  width: 380px;
  // height: 850px;
  background: lemonchiffon;
}

</style>
