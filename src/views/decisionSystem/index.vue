<template>
  <div class="decision" style="padding-top:20px">
    <gMap ref="gduMap" handleType="search_route" :bShowBasic="false" :bShowMeasure="false" :bShowLonLat="false"></gMap>
  </div>
</template>

<script>
export default {
  name: 'decision',
  data () {
    return {
    }
  },
  methods: {
  },
  created () {
  },
  activated () {
    const tmpMap = this.$refs.gduMap.map2D
    setTimeout(() => {
      tmpMap._map.updateSize()
    }, 200)
  }
}
</script>

<style lang="scss" scoped>
.decision {
  height: 940px;
}
</style>
