<template>
  <div :style="'height:' + fullHeight + 'px;'" style="position: relative">
    <gMap ref="gduMap" :bShowBasic="false" :bShowMeasure="false" :bShowLonLat="false"></gMap>
    <!-- 案件列表 -->
    <CaseList class="case-list" @getTodayCaseDone="getTodayCaseDone"></CaseList>
  </div>
</template>

<script>
import videoMixin from '../videoSystem/mixins/videoMixin'
import riverMixin from '../decisionSystem/riverMixin'
import createVueCompFunc from '@/utils/createVueComp'
import droneInfo from './droneBox'
import CaseList from './components/caseList'
import { EventBus } from '@/utils/eventBus.js'

export default {
  name: 'evaluation',
  components: { CaseList },

  data () {
    return {
      minHeight: 901,
      fullHeight: 0
    }
  },
  mixins: [videoMixin, riverMixin],
  methods: {
    setMapHeight () {
      if (!this.$refs.gduMap) return
      const tmpMap = this.$refs.gduMap.map2D
      var h = document.documentElement.clientHeight - 96
      if (h < this.minHeight) this.fullHeight = this.minHeight
      else this.fullHeight = h
      setTimeout(() => {
        tmpMap._map.updateSize()
      }, 200)
    },
    // 处理数据，便于地图组件加载显示
    handerVideoDevice (dev) {
      dev.isOnline = dev.onlineStatus === 'online'
      if (dev.deviceTypeCode === 'GDJK') {
        dev.type = 'RP_Camera'
      } else if (dev.deviceTypeCode === 'WRJ') {
        dev.type = 'RP_Drone'
      }
      if (dev.isOnline && dev.children && dev.children.length > 0) {
        dev.urls = []
        dev.children.forEach(l => {
          dev.urls.push(l.streamUrl)
        })
      }

      dev.name = dev.label
      dev.address = dev.deviceAddress
      dev.brand = dev.deviceBrand
      dev.longitude = dev.deviceLongitude
      dev.latitude = dev.deviceLatitude
    },
    // 新增显示高点或无人机设备
    addDeviceCallback (devInfo) {
      this.handerVideoDevice(devInfo)
      this.$refs.gduMap.map2D._dispatchCenterManager.addRpDatas([devInfo])
    },
    // 显示高点设备和无人机设备
    getAllDeviceDoneCallback (cameraDevs, droneDevs) {
      cameraDevs.forEach((dev) => {
        this.handerVideoDevice(dev)
      })
      this.showRpDatas(cameraDevs)
      droneDevs.forEach((dev) => {
        this.handerVideoDevice(dev)
      })
      this.showRpDatas(droneDevs)
    },
    // 显示长江大保护数据层信息
    showRpDatas (tmpDatas) {
      if (!this.$refs.gduMap) return
      this.$refs.gduMap.map2D._dispatchCenterManager.addRpDatas(tmpDatas)
      if (tmpDatas.length > 0) {
        if (this.$refs.gduMap !== undefined) {
          this.$refs.gduMap.map2D.zoomToCenter(
            tmpDatas[0].longitude,
            tmpDatas[0].latitude
          )
          this.$refs.gduMap.map2D.setZoom(12)
        }
      }
    },
    /**
     *  动态创建droneInfo组件
     */
    createDroneInfoCom (props) {
      return createVueCompFunc(droneInfo, props)
    },
    /**
     *  获取案件列表完毕
     */
    getTodayCaseDone (files) {
      if (!this.$refs.gduMap) return
      this.$refs.gduMap.map2D._dispatchCenterManager.removeAllWarning()
      this.showRpDatas(files)
    },
    /**
     *  更新警员位置
     */
    updatePoliceCoor (id, lat, lon) {
      if (!this.$refs.gduMap) return
      this.$refs.gduMap.map2D._dispatchCenterManager.updateFeatureCoord(id, lat, lon, 'RP_Police')
    }
  },
  created () {
    this.isDispatch = true
  },
  mounted () {
    this.$refs.gduMap.map2D._dispatchCenterManager.setCreateVueCompFunc(
      this.createDroneInfoCom
    )
    const me = this
    window.onresize = () => {
      me.setMapHeight()
    }
    this.setMapHeight()
    EventBus.$on('positionReport', data => {
      const id = parseInt(data.User_ID)
      const lat = parseFloat(data.GPS_Lat)
      const lon = parseFloat(data.GPS_Lon)
      me.updatePoliceCoor(id, lat, lon)
    })
  },
  beforeDestroy () {
    EventBus.$off('positionReport')
    window.onresize = null
    // 销毁时，清空图层数据
    this.$refs.gduMap.map2D._dispatchCenterManager.removeAll()
  }
}
</script>

<style lang="scss" scoped>
.case-list {
  position: absolute;
  left: 20px;
  top: 50px;
}
</style>
