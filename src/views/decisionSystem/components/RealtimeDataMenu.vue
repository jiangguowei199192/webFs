<template>
  <div>
    <div class="containerStyle">
      <div class="realtimeDataStyle">
        <div class="realtimeIconStyle"></div>
        <div class="realtimeTitleStyle">实时数据统计</div>
        <div class="newPoliceStyle" @click="newPolice()">新建警情</div>
        <div class="countBaseStyle">
          <div style="width: 132px; height: 90px; display: inline-block">
            <div class="countTitleStyle">警情数量</div>
            <div class="countNumberStyle">{{ this.policeCount }}</div>
          </div>
          <div style="width: 132px; height: 90px; float: right">
            <div class="countTitleStyle">人员数量</div>
            <div class="countNumberStyle">{{ this.peopleCount }}</div>
          </div>
          <div
            style="
              width: 132px;
              height: 90px;
              display: inline-block;
              margin-top: 10px;
            "
          >
            <div class="countNumberStyle">{{ this.redDeviceCount }}</div>
            <div class="countTitleStyle">红外设备</div>
          </div>
          <div
            style="width: 132px; height: 90px; float: right; margin-top: 10px"
          >
            <div class="countNumberStyle">{{ this.droneCount }}</div>
            <div class="countTitleStyle">无人机</div>
          </div>
        </div>
      </div>
      <div class="policeRankingStyle">
        <div class="realtimeIconStyle"></div>
        <div class="realtimeTitleStyle">各区警情数量排行</div>
        <PoliceRankingMenu ref="PoliceRankingMenu"></PoliceRankingMenu>
      </div>
      <div class="thisWeekStyle">
        <div class="realtimeIconStyle"></div>
        <div class="realtimeTitleStyle">本周报警趋势</div>
        <ve-line
          :data="chartData"
          :settings="chartSettings"
          height="300px"
          :legend-visible="false"
          :extend="chartExtend"
          :colors="chartColors"
          style="margin-top: -30px"
        ></ve-line>
      </div>
    </div>

    <el-dialog :visible.sync="showNewPolice" :close-on-click-modal="false" width="960px" class="newPoliceDlg">
      <div>
        <div class="npdTitleSty">新增案件</div>
        <el-form
          ref="newPoliceRef"
          :model="newPoliceForm"
          label-width="90px"
          :inline="true"
          :rules="newPoliceRules"
          style="margin-top: 40px; margin-left: 46px; margin-right: 50px"
        >
          <el-form-item label="案件编号" class="input1">
            <el-input
              placeholder="自动生成"
              :disabled="true"
              v-model="newPoliceForm.number"
            ></el-input>
          </el-form-item>
          <el-form-item label="信息来源" prop="source" class="input1 label1">
            <el-input
              placeholder="请输入"
              v-model="newPoliceForm.source"
            ></el-input>
          </el-form-item>
          <el-form-item label="举报人" prop="people" class="input1">
            <el-input
              placeholder="请输入"
              v-model="newPoliceForm.people"
            ></el-input>
          </el-form-item>
          <el-form-item label="举报电话" class="input1 label1">
            <el-input
              placeholder="请输入"
              v-model="newPoliceForm.phone"
            ></el-input>
          </el-form-item>
          <el-form-item label="举报地址" prop="address" class="input2">
            <el-input
              placeholder="请输入"
              v-model="newPoliceForm.address"
            ></el-input>
            <div style="width: 760px; height: 140px; margin-top: 5px">
              <gMap
                ref="gduMap"
                handleType="devMap"
                :bShowSimpleSearchTools="true"
                :bShowBasic="false"
                :bShowMeasure="false"
                :bShowLonLat="false"
                :bAutoLocate="false"
              ></gMap>
            </div>
          </el-form-item>
          <el-form-item label="举报时间" class="input1">
            <el-date-picker
              v-model="newPoliceForm.time"
              type="datetime"
              placeholder="请选择"
              class="timeStyle"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="案件所属" class="input1 label1">
            <el-select placeholder="请选择" v-model="newPoliceForm.belong">
              <el-option
                v-for="(item, index) in deptTree"
                :key="index"
                :label="item.deptName"
                :value="item.deptCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="简要描述" class="input2">
            <el-input
              placeholder="请输入"
              v-model="newPoliceForm.description"
            ></el-input>
          </el-form-item>
          <el-form-item label="重点记录" class="input2">
            <el-input
              placeholder="请输入"
              v-model="newPoliceForm.record"
            ></el-input>
          </el-form-item>
        </el-form>
        <div style="height: 32px">
          <div class="npdConfirm" @click="newPoliceConfirm">确定</div>
          <div class="npdCancel" @click="newPoliceCancel">取消</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PoliceRankingMenu from './PoliceRankingMenu'
import { policeApi } from '@/api/police.js'
import { Notification } from 'element-ui'
import { loginApi } from '@/api/login'
import { EventBus } from '@/utils/eventBus.js'

export default {
  components: {
    PoliceRankingMenu
  },
  data () {
    return {
      policeCount: 0,
      peopleCount: 0,
      redDeviceCount: 0,
      droneCount: 0,

      chartData: {
        columns: ['日期', '警情'],
        rows: []
      },
      chartSettings: {
        area: true
      },
      chartColors: ['#4dd5e7'],
      chartExtend: {
        'xAxis.0.axisLabel.color': '#27BBE5',
        'yAxis.0.axisLabel.color': '#27BBE5',
        'yAxis.0.splitLine.lineStyle.color': '#27BBE5'
      },

      showNewPolice: false,
      newPoliceForm: {
        number: '', // 案件编号
        source: '', // 信息来源
        people: '', // 举报人
        phone: '', // 举报电话
        address: '', // 举报地址
        time: '', // 举报时间
        belong: '', // 案件所属
        description: '', // 简要描述
        record: '' // 重点记录
      },
      newPoliceRules: {
        source: [{ required: true, message: '请输入信息来源' }],
        people: [{ required: true, message: '请输入举报人' }],
        address: [{ required: true, message: '请输入举报地址' }]
      },

      deptTree: ''
    }
  },
  created () {
    this.getCount()
    this.getDeptTree()
  },
  mounted () {

  },
  methods: {
    async getCount () {
      this.$axios.get(policeApi.selectCount).then((res) => {
        if (res && res.data && res.data.code === 0) {
          var tempData = res.data.data
          this.policeCount = tempData.caseCount
          this.peopleCount = tempData.userCount
          this.redDeviceCount = tempData.gdjkcount
          this.droneCount = tempData.wrjcount
        }
      })

      this.$axios.get(policeApi.selectCountCaseNum).then((res) => {
        if (res && res.data && res.data.code === 0) {
          this.$refs.PoliceRankingMenu.setData(res.data.data)
        }
      })

      this.$axios.get(policeApi.selectCountWeek).then((res) => {
        if (res && res.data && res.data.code === 0) {
          var tempData = res.data.data
          var tempArr = []
          tempData.forEach((item) => {
            var date = item.reportTime.split('-')
            var dict = {
              日期: date[1] + date[2],
              警情: item.caseCount
            }
            tempArr.push(dict)
          })
          this.chartData.rows = tempArr
        }
      })
    },

    // 获取组织树
    async getDeptTree () {
      this.$axios.post(loginApi.getDeptTree).then((res) => {
        if (res && res.data && res.data.code === 0) {
          this.deptTree = res.data.data[0].children
        }
      })
    },

    newPolice () {
      this.showNewPolice = true

      setTimeout(() => {
        const tmpMap = this.$refs.gduMap.map2D
        tmpMap.clickEvent.addEventListener((lonlat) => {
          tmpMap.customMarkerLayerManager.clear()
          tmpMap.customMarkerLayerManager.addMarker({
            name: null,
            lon: lonlat[0],
            lat: lonlat[1],
            _bWgs2Gcj: false
          })
        })
        tmpMap._map.updateSize()
        tmpMap.zoomToCenter(114.31667, 30.51667)
        tmpMap.setZoom(10)
      }, 500)
    },
    newPoliceConfirm () {
      this.$refs.newPoliceRef.validate((valid) => {
        if (!valid) {
          return false
        }
        this.showNewPolice = false

        var lonlat = this.getSelectedLocation()
        var param = {
          infoSource: this.newPoliceForm.source,
          reportMan: this.newPoliceForm.people,
          reportTel: this.newPoliceForm.phone,
          reportAddr: this.newPoliceForm.address,
          latitude: lonlat[1],
          longitude: lonlat[0],
          reportTime: this.newPoliceForm.time,
          caseBelong: this.newPoliceForm.belong,
          caseDesc: this.newPoliceForm.description,
          importantRecord: this.newPoliceForm.record
        }
        this.$axios.post(policeApi.add, param, {
          headers: { 'Content-Type': 'application/json;charset=UTF-8' }
        }).then((res) => {
          if (res && res.data && res.data.code === 0) {
            setTimeout(() => {
              EventBus.$emit('addNewWarningSuccess', res.data.data)
            }, 5000)
            Notification({
              title: '提示',
              message: '新增成功',
              type: 'success',
              duration: 5 * 1000
            })
            return
          }
          Notification({
            title: '提示',
            message: '新增失败',
            type: 'warning',
            duration: 5 * 1000
          })
        })
      })
    },
    newPoliceCancel () {
      this.showNewPolice = false
    },
    getSelectedLocation () {
      const tmpMap = this.$refs.gduMap
      const tmpFs = tmpMap.map2D.customMarkerLayerManager._source.getFeatures()
      if (tmpFs.length > 0) {
        return tmpFs[0].getGeometry().getCoordinates()
      } else {
        return [tmpMap.lon, tmpMap.lat]
      }
    }
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
    cursor: pointer;
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
}

.newPoliceDlg.el-dialog__wrapper {
  /deep/.el-dialog {
    .el-dialog__header {
      display: none;
    }
    background: transparent;
    .el-dialog__body {
      display: inline-block;
      padding: 0px;
      width: 100%;
      height: 679px;
      background: url(../../../assets/images/RealtimeDataMenu/newPoliceBox.png)
        no-repeat;
      background-size: 100%;
      .npdTitleSty {
        width: 166px;
        height: 34px;
        color: white;
        font-size: 18px;
        font-weight: bold;
        line-height: 42px;
        background: url(../../../assets/images/header-bg.png) no-repeat;
        background-size: 100%;
        padding-left: 30px;
        margin: 26px 0 0 24px;
      }
      .input1 {
        .el-input__inner {
          color: white;
          width: 310px;
          border: solid 1px #0fbfe0;
          background-color: transparent;
        }
      }
      .input2 {
        .el-input__inner {
          width: 760px;
          color: white;
          border: solid 1px #0fbfe0;
          background-color: transparent;
        }
      }
      .el-form-item__label {
        color: #0fbfe0;
        font-size: 16px;
      }
      .label1 {
        margin-left: 40px;
      }
      .timeStyle {
        width: 310px;
      }
    }
  }
}

.npdConfirm {
  float: right;
  width: 87px;
  height: 32px;
  background: #1eb0fc;
  color: white;
  margin-right: 65px;
  font-size: 18px;
  line-height: 32px;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
}
.npdCancel {
  float: right;
  width: 87px;
  height: 32px;
  background: transparent;
  color: #1eb0fc;
  margin-right: 32px;
  font-size: 18px;
  line-height: 32px;
  text-align: center;
  border-radius: 4px;
  border: solid 1px #1eb0fc;
  cursor: pointer;
}
</style>
