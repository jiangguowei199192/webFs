<template>
  <div class="evaluation" :style="'height:'+fullHeight+'px;'">
    <gMap
      ref="gduMap"
      :bShowBasic="false"
      :bShowMeasure="false"
      :bShowLonLat="false"
    ></gMap>
  </div>
</template>

<script>
export default {
  name: 'evaluation',
  data () {
    return {
      minHeight: 901,
      fullHeight: 0
    }
  },
  methods: {
    setMapHeight () {
      const tmpMap = this.$refs.gduMap.map2D
      var h = document.documentElement.clientHeight - 96
      if (h < this.minHeight) this.fullHeight = this.minHeight
      else this.fullHeight = h
      setTimeout(() => {
        tmpMap._map.updateSize()
      }, 200)
    }
  },
  mounted () {
    const me = this
    window.onresize = () => {
      me.setMapHeight()
    }
    this.setMapHeight()
  }
}
</script>

<style lang="scss" scoped>
.evaluation {

}
</style>
