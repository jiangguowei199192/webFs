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
    <el-select class="searchCombo" placeholder="请选择类型" v-model="selMenuType">
      <el-option
        v-for="(item, index) in menuOptions"
        :key="index"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <div class="searchInputBox">
      <input
        class="inputText"
        v-model="searchText"
        type="text"
        autocomplete="off"
        value
        v-on:keyup.enter="searchRpDatas(searchText)"
        placeholder="请输入筛选内容"/>
        <div class="searchBtn" @click.stop="searchRpDatas(searchText)">
          <div class="btnImg"></div>
        </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/utils/eventBus.js'
import MqttService from '@/utils/mqttService'
import videoMixin from '../videoSystem/mixins/videoMixin'
import regionMixin from './regionMixin'
import riverMixin from './riverMixin'
import {
  Notification
} from 'element-ui'
export default {
  name: 'decision',
  data () {
    return {
      selMenuType: '1',
      searchText: '',
      menuOptions: [
        { label: '组织机构', value: '1' },
        { label: '在线警力', value: '2' },
        { label: '无人机', value: '3' },
        { label: '红外设备', value: '4' }
      ]
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
          this.$refs.gduMap.map2D.setZoom(12)
        }
      }
    },
    // 显示船只实时位置
    showRpShips (tmpDatas) {
      if (this.$refs.gduMap !== undefined) {
        this.$refs.gduMap.map2D.riverProtectionManager.removeAllShpis()
        this.$refs.gduMap.map2D.riverProtectionManager.addRpDatas(tmpDatas)
      }
    },
    // 搜索大保护数据结果
    searchRpDatas (_searchText) {
      if (_searchText === '') {
        Notification({
          title: '提示',
          message: '请输入筛选内容!',
          type: 'warning',
          duration: 5 * 1000
        })
        return
      }
      let tmpData = null
      if (this.selMenuType === '1') { // 组织机构
        const len = this.deptList.length
        for (let i = 0; i < len; i++) {
          if (this.deptList[i].name.search(_searchText) !== -1) {
            tmpData = this.deptList[i]
            break
          }
        }
      } else if (this.selMenuType === '2') { // 在线警力
        const len = this.policeList.length
        for (let i = 0; i < len; i++) {
          if (this.policeList[i].name.search(_searchText) !== -1) {
            tmpData = this.policeList[i]
            break
          }
        }
      } else if (this.selMenuType === '3') { // 无人机
        const len = this.droneDevArray.length
        for (let i = 0; i < len; i++) {
          if (this.droneDevArray[i].name.search(_searchText) !== -1) {
            tmpData = this.droneDevArray[i]
            break
          }
        }
      } else if (this.selMenuType === '4') { // 红外设备
        const len = this.cameraDevArray.length
        for (let i = 0; i < len; i++) {
          if (this.cameraDevArray[i].name.search(_searchText) !== -1) {
            tmpData = this.cameraDevArray[i]
            break
          }
        }
      }
      if (tmpData !== null) {
        this.$refs.gduMap.map2D.riverProtectionManager.findAndShowData(tmpData)
        this.$refs.gduMap.map2D.zoomToCenter(tmpData.longitude, tmpData.latitude)
      } else {
        Notification({
          title: '提示',
          message: '搜索不到:' + _searchText + '!',
          type: 'warning',
          duration: 5 * 1000
        })
      }
    }
  },
  created () {
  },
  mounted () {
    // this.$refs.gduMap.map2D.zoomToCenter(114.65511872631607, 30.68961010828556)
    // this.$refs.gduMap.map2D.setZoom(16)
    // Test Code
    {
      const tmpShips = {
        realRadarInfos: [{
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
      }
      const tmpWarn = {
        id: '6dddef0f25758f86db0b7281b0c2efa8',
        caseNo: '2020092922678',
        reportTel: '15672675664',
        reportAddr: '汉口江滩',
        reportTime: '2020-10-06 11:00:00',
        caseDesc: null,
        longitude: 114.316317,
        latitude: 30.606778
        // longitude: 114.66811872631607,
        // latitude: 30.68961010828556
      }
      setTimeout(() => {
        new MqttService().client.send('radar/realTimeInfo', JSON.stringify(tmpShips))
        EventBus.$emit('addNewWarningSuccess', tmpWarn)
      }, 5000)

      const tmpShips2 = {
        realRadarInfos: [{
          type: 'RP_Ship',
          id: '12',
          name: '江上船只1222',
          address: '长江二桥河段',
          longitude: 114.65811872631607,
          latitude: 30.67961010828556
        },
        {
          type: 'RP_Ship',
          id: '22',
          name: '江上船只22',
          address: '长江二桥河段',
          longitude: 114.65611872631607,
          latitude: 30.68061010828556
        }]
      }
      setTimeout(() => {
        new MqttService().client.send('radar/realTimeInfo', JSON.stringify(tmpShips2))
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
  position: relative;
  height: 940px;
  .searchCombo {
    position: absolute;
    top: 40px;
    left: 20px;
    width: 200px;
    height: 35px;
  }
  .searchInputBox {
    position: absolute;
    top: 41px;
    left: 240px;
    width: 240px;
    height: 32px;
    background-color: white;
    .inputText {
      width: 200px;
      height: 32px;
      border-width: 0px;
      padding-left: 5px;
      background-color: white;
      outline: none;
    }
    .searchBtn {
      cursor: pointer;
      position: absolute;
      width: 40px;
      height: 32px;
      right: 0px;
      top: 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      .btnImg {
        width: 21px;
        height: 22px;
        background-image: url('../../assets/images/map/search.png');
      }
    }
    .searchBtn:hover {
      opacity: 0.5;
    }
    .searchBtn:active {
      opacity: 0.75;
    }
  }
}
</style>
