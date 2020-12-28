import { riverApi } from '@/api/river'
import { EventBus } from '@/utils/eventBus.js'
const riverMixin = {
  data () {
    return {
      warningList: [],
      deptList: [],
      policeList: [],
      isDispatch: false // 是否是调度中心页面
    }
  },

  mounted () {
    EventBus.$on('radar/realTimeInfo', info => {
      this.handerShipDatas(info.realRadarInfos)
    })
    EventBus.$on('addNewWarningSuccess', data => {
      this.handerWarningData(data)
      if (this.showWarningDatas) {
        this.showWarningDatas([data])
      }
    })
    if (!this.isDispatch) { this.getWarningList() }
    this.getDeptList()
    this.getPoliceList()
  },

  beforeDestroy () {
    EventBus.$off('radar/realTimeInfo')
    EventBus.$off('addNewWarningSuccess')
  },

  methods: {
    handerWarningData (data) {
      data.type = 'RP_Warning'
      data.srcId = data.id
      data.id = data.caseNo
      data.address = data.reportAddr
      data.phone = data.reportTel
      data.time = data.reportTime
      data.description = data.caseDesc
    },
    handerDeptData (data) {
      data.type = 'RP_Institution'
      data.name = data.deptName
      data.address = data.deptAddr
      data.tel = data.deptTel
      data.policeNum = data.userPoliceNum
      data.longitude = data.deptLongitude
      data.latitude = data.deptLatitude
    },
    handerPoliceData (data) {
      data.type = 'RP_Police'
      data.name = data.userName
      data.tel = data.deptTel
      data.phone = data.mobile
      data.dept = data.deptName
      data.longitude = data.userLongitude
      data.latitude = data.userLatitude
    },
    handerShipDatas (datas) {
      datas.forEach(data => {
        data.type = 'RP_Ship'
      })
      if (this.showRpShips !== undefined) {
        this.showRpShips(datas)
      }
    },

    getWarningList () {
      const param = { content: '' }
      this.$axios.post(riverApi.getWarningList, param, {
        headers: { 'Content-Type': 'application/json;charset=UTF-8' }
      }).then(res => {
        if (res && res.data && res.data.code === 0) {
          this.warningList = res.data.data
          this.warningList.forEach(data => {
            this.handerWarningData(data)
          })
          if (this.showWarningDatas) {
            this.showWarningDatas(this.warningList)
          }
          EventBus.$emit('getWarningList_Done', true)
        }
      })
    },
    getDeptList () {
      const param = { content: '' }
      this.$axios.post(riverApi.getDeptList, param, {
        headers: { 'Content-Type': 'application/json;charset=UTF-8' }
      }).then(res => {
        if (res && res.data && res.data.code === 0) {
          this.deptList = res.data.data
          this.deptList.forEach(data => {
            this.handerDeptData(data)
          })
          if (this.showRpDatas) {
            this.showRpDatas(this.deptList)
          }
          EventBus.$emit('getDeptList_Done', true)
        }
      })
    },
    getPoliceList () {
      const param = { content: '' }
      this.$axios.post(riverApi.getPoliceList, param, {
        headers: { 'Content-Type': 'application/json;charset=UTF-8' }
      }).then(res => {
        if (res && res.data && res.data.code === 0) {
          this.policeList = res.data.data
          this.policeList.forEach(data => {
            this.handerPoliceData(data)
          })
          if (this.showRpDatas) {
            this.showRpDatas(this.policeList)
          }
          EventBus.$emit('getPoliceList_Done', true)
        }
      })
    }
  }
}
export default riverMixin
