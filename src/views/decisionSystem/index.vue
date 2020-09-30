<template>
  <div class="decision" style="padding-top:20px">
    <gMap
      ref="gduMap"
      handleType="search_route"
      :bShowBasic="false"
      :bShowMeasure="false"
      :bShowLonLat="false"
      :bShowPoliceStatistics="true"
      :bShowBottomMenu="true"></gMap>
  </div>
</template>

<script>
import { EventBus } from '@/utils/eventBus.js'
import videoMixin from '../videoSystem/mixins/videoMixin'
import regionMixin from './regionMixin'
import riverMixin from './riverMixin'
export default {
  name: 'decision',
  data () {
    return {
    }
  },
  mixins: [videoMixin, regionMixin, riverMixin],
  methods: {
    // 处理数据，便于地图组件加载显示
    handerVideoDevice (dev) {
      if (dev.deviceTypeCode === 'GDJK') {
        dev.type = 'RP_Camera'
      } else if (dev.deviceTypeCode === 'WRJ') {
        dev.type = 'RP_Drone'
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
      this.$refs.gduMap.map2D.riverProtectionManager.addRpDatas([devInfo])
    },
    // 显示高点设备和无人机设备
    getAllDeviceDoneCallback (cameraDevs, droneDevs) {
      cameraDevs.forEach(dev => {
        this.handerVideoDevice(dev)
      })
      this.showRpDatas(cameraDevs)
      droneDevs.forEach(dev => {
        this.handerVideoDevice(dev)
      })
      this.showRpDatas(droneDevs)
    },
    // 显示长江大保护数据层信息
    showRpDatas (tmpDatas) {
      this.$refs.gduMap.map2D.riverProtectionManager.addRpDatas(tmpDatas)
      if (tmpDatas.length > 0) {
        if (this.$refs.gduMap !== undefined) {
          this.$refs.gduMap.map2D.zoomToCenter(tmpDatas[0].longitude, tmpDatas[0].latitude)
        }
      }
    },
    // 显示船只实时位置
    showRpShips (tmpDatas) {
      this.$refs.gduMap.map2D.riverProtectionManager.removeAllShpis()
      this.$refs.gduMap.map2D.riverProtectionManager.addRpDatas(tmpDatas)
    }
  },
  created () {
  },
  mounted () {
    // this.$refs.gduMap.map2D.zoomToCenter(114.65511872631607, 30.68961010828556)
    // this.$refs.gduMap.map2D.setZoom(16)
    // Test Code
    {
      const tmpShips = [{
        type: 'RP_Ship',
        id: '1',
        name: '江上船只1',
        address: '长江二桥河段',
        longitude: 114.65811872631607,
        latitude: 30.68961010828556
      },
      {
        type: 'RP_Ship',
        id: '2',
        name: '江上船只2',
        address: '长江二桥河段',
        longitude: 114.65411872631607,
        latitude: 30.68961010828556
      }]
      const tmpWarn = {
        id: '6dddef0f25758f86db0b7281b0c2efa8',
        caseNo: '2020092922678',
        reportTel: '1111',
        reportAddr: '珞瑜路',
        reportTime: '2020-09-30 11:00:00',
        caseDesc: null,
        longitude: 114.66811872631607,
        latitude: 30.68961010828556
      }
      setTimeout(() => {
        EventBus.$emit('radar/realTimeInfo', tmpShips)
        EventBus.$emit('addNewWarningSuccess', tmpWarn)
      }, 5000)

      const tmpShips2 = [{
        type: 'RP_Ship',
        id: '12',
        name: '江上船只12',
        address: '长江二桥河段',
        longitude: 114.65811872631607,
        latitude: 30.67961010828556
      },
      {
        type: 'RP_Ship',
        id: '22',
        name: '江上船只22',
        address: '长江二桥河段',
        longitude: 114.65411872631607,
        latitude: 30.67961010828556
      }]
      setTimeout(() => {
        EventBus.$emit('radar/realTimeInfo', tmpShips2)
      }, 10000)
    }

    this.$refs.gduMap.map2D.riverProtectionManager.addRpRegions(this.rpRegions)
    this.$refs.gduMap.map2D.riverProtectionManager.popupJumpToDetailsClickEvent.addEventListener(tmpData => {
      if (tmpData.type === 'RP_Camera' || tmpData.type === 'RP_Drone') {
        localStorage.gotoVideoId = tmpData.id
        this.$router.push({ path: '/videoSystem' })
      } else if (tmpData.type === 'RP_Warning') {
        this.$router.push({ path: '/digitalIndividual' })
      }
    })
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
