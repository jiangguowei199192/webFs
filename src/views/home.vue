<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="box">
          <div
            v-for="(item, index) in systems"
            :key="index"
            class="list"
            @click.stop="jumpTo(index)"
          >
            <div class="item" :class="{ title: index == 3, active: isActive == index }">
              <span>{{ item.content }}</span>
            </div>
            <template>
              <div class="status" v-if="index == 2">
                <el-button
                  type="primary"
                  :class="{ activeStatus: curActive == 1 }"
                  @click.stop="jumpToVideoUrl(1)"
                >实时视频</el-button>
                <el-button
                  type="primary"
                  :class="{ activeStatus: curActive == 2 }"
                  @click.stop="jumpToVideoUrl(2)"
                >回放</el-button>
              </div>
            </template>
          </div>
        </div>
        <!-- <div :class="this.isChecked ? 'activeClass' : 'about'" @click.stop="goToAboutUs()">
          <img :src="this.isChecked ? aboutImgCkSrc : aboutImgSrc" alt />
          <p>关于我们</p>
        </div> -->

        <div class="cur">
          <div class="realTime">
            <span class="extra">{{ timeObj.year }}</span> 年
            <span class="extra">{{ timeObj.month }}</span> 月
            <span class="extra">{{ timeObj.day }}</span> 日
            <span class="extra">{{ timeObj.weekday }}</span>
            <span class="curCity extra">{{ curCity }}</span>
            <template v-if="weatherReport">
              <span>天气：</span>
              <span class="extra">{{ weatherReport.weather }}</span>
              <span class="extra">
                {{ weatherReport.temperature }}
                <i>。</i>
              </span>
            </template>
          </div>
        </div>
        <audio src="./audio.mp3"></audio>
      </el-header>
      <el-main :style="machineMainStyle($route.path)">
        <!-- <router-view /> -->
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { getTime } from '@/utils/date'
import amapApi from '@/axios/amapapis'
import MqttService from '@/utils/mqttService'
import { EventBus } from '@/utils/eventBus.js'
import { loginApi } from '@/api/login'
import globalApi from '../utils/globalApi'
const droneOffline = 'gdu/appOutLine'
export default {
  name: 'Home',
  data () {
    return {
      timeObj: '', // 当前时间
      curCity: '', // 所在城市
      weatherReport: '', // 天气情况
      isActive: 2, // 默认激活视频侦查系统
      systems: [
        {
          content: '常态管控'
        },
        {
          content: '调度中心'
        },
        {
          content: '视频侦查'
        },
        {
          content: '消防救援现场指挥系统'
        },

        {
          content: '案件中心'
        },
        {
          content: '信息要闻'
        },
        {
          content: '系统设置'
        }
      ],
      curActive: 1, // 激活实时视频还是回放视频 1实时 2回放
      realtimeInfoTopicArray: [], // 需要监听的飞机实时信息主题
      isChecked: false,
      aboutImgSrc: require('../assets/images/about/about.png'),
      aboutImgCkSrc: require('../assets/images/about/about-ck.png')
    }
  },
  created () {
    this.systems[3].content = globalApi.projectTitle
    // 设备上线
    EventBus.$on('video/device/online', info => {
      EventBus.$emit('UpdateDeviceOnlineStatus', info)
      this.$notify.success({ title: '提示', message: '设备上线！' })
    })
    // 设备下线
    EventBus.$on('video/device/offline', info => {
      EventBus.$emit('UpdateDeviceOnlineStatus', info)
      this.$notify.success({ title: '提示', message: '设备下线！' })
    })
    // 通道上线
    EventBus.$on('video/realVideo/streamStart', info => {
      EventBus.$emit('streamStart', info)
    })
    // 通道下线
    EventBus.$on('video/realVideo/streamEnd', info => {
      EventBus.$emit('streamEnd', info)
    })
    // 飞机实时信息
    EventBus.$on('droneInfos', info => {
      this.parseDroneRealtimeInfo(info)
    })
    // 人员识别提示
    EventBus.$on('video/people/found', info => {
      this.$notify.warning({ title: '提示', message: '发现可疑人员!' })
    })
    // 人员显示
    EventBus.$on('video/people/real', info => {
      EventBus.$emit('peopleRealChange', info)
    })
    // AR显示
    EventBus.$on('video/aRAiResult', info => {
      EventBus.$emit('getArChange', info)
    })
    // 案件聊天信息
    EventBus.$on('web/river/caseHandling', info => {
      EventBus.$emit('caseHandling', info)
    })
    // 警力gps汇报
    EventBus.$on('riverProtection/positionReport', info => {
      EventBus.$emit('positionReport', info)
    })
  },
  destroyed () {
    EventBus.$off('video/device/online')
    EventBus.$off('video/device/offline')
    EventBus.$off('video/realVideo/streamStart')
    EventBus.$off('video/realVideo/streamEnd')
    EventBus.$off('droneInfos')
    EventBus.$off('video/people/found')
    EventBus.$off('video/people/real')
    EventBus.$off('video/aRAiResult')
    EventBus.$off('video/deviceIid/channleID/datalink/firewarning')
    EventBus.$off('web/river/caseHandling')
    EventBus.$off('riverProtection/positionReport')
    // 退出时，关闭mqtt连接
    if (this.mqtt) {
      this.mqtt.needReconnect = false
      if (this.mqtt.isConnect) this.mqtt.disconnect()
    }
  },
  mounted () {
    // 火情火点
    EventBus.$on('video/deviceIid/channleID/datalink/firewarning', info => {
      this.$notify.warning({ title: '警告', message: '发现火点火情！' })
      this.$nextTick(() => {
        document.querySelector('audio').play()
      })
      EventBus.$emit('getFireAlarm', info)
    })
    this.jumpTo(this.isActive)
    setInterval(() => {
      this.timeObj = getTime()
    }, 1000)
    this.init()
    // 通过构造函数，创建mqtt连接
    // eslint-disable-next-line no-unused-vars
    this.mqtt = new MqttService()
    // 如果mqtt已经创建过
    if (this.mqtt.created) {
      this.mqtt.mqttConnect()
    }
    // 获取飞机实时信息所需订阅主题
    this.getRealtimeInfoTopics()
  },
  watch: {
    // 监听,当路由发生变化的时候执行
    $route: 'getPath'
  },
  methods: {
    // 路由发生变化
    machineMainStyle (path) {
      if (path === '/decisionSystem' || path === '/evaluationSystem') {
        return {
          margin: '-65px 0px 0px 0px'
        }
      } else {
        return {
          margin: '0px'
        }
      }
    },
    getPath () {
      // 激活实时视频还是回放视频 1实时 2回放
      if (this.$route.path === '/playback') {
        this.curActive = 2
      } else if (this.$route.path === '/videoSystem') {
        this.isActive = 2
        this.curActive = 1
      } else if (this.$route.path === '/digitalIndividual') {
        this.isActive = 4
      }
    },
    // 点击激活当前系统
    jumpTo (index) {
      if (index !== 3) {
        if (index === 0) this.$router.push({ path: '/decisionSystem' })
        else if (index === 2) {
          this.jumpToVideoUrl(this.curActive)
        } else if (index === 1) {
          this.$router.push({ path: '/evaluationSystem' })
        } else if (index === 4) {
          this.$router.push({ path: '/digitalIndividual' })
        } else if (index === 5) {
          this.goToAboutUs()
        } else if (index === 6) this.$router.push({ path: '/systemSettings' })
        this.isActive = index
      }
    },
    // 视频侦查二级菜单跳转
    jumpToVideoUrl (type) {
      this.isActive = 2
      this.curActive = type
      if (type === 1) this.$router.push({ path: '/videoSystem' })
      else this.$router.push({ path: '/playback' })
    },
    init () {
      amapApi.getLocation({}).then(res => {
        if (res) {
          if (res && res.data && res.data.info === 'OK') {
            this.curCity = res.data.city || ''
            const cityCode = res.data.adcode
            amapApi.getWeather({ city: cityCode }).then(res => {
              if (res && res.data && res.data.info === 'OK') {
                this.weatherReport = res.data.lives[0]
              }
            })
          }
        }
      })
    },
    // 获取飞机实时信息所需订阅主题
    getRealtimeInfoTopics () {
      this.realtimeInfoTopicArray = []
      const tmpThis = this
      const tmpAxios = this.$axios
      this.$axios
        .get(loginApi.getUserDetail)
        .then(res => {
          if (res.data.code === 0) {
            localStorage.setItem('userDetail', JSON.stringify(res.data.data))
            tmpAxios
              .get(loginApi.getDeptByDeptCode, {
                params: { deptCode: res.data.data.deptCode }
              })
              .then(res2 => {
                if (res2.data.code === 0) {
                  res2.data.data.forEach(deptCode => {
                    tmpThis.realtimeInfoTopicArray.push('gdu/' + deptCode)
                  })
                  tmpThis.realtimeInfoTopicArray.unshift(
                    'gdu/' + res.data.data.deptCode
                  )
                }
              })
              .catch(err2 => {
                console.log('loginApi.getDeptByDeptCode Err : ' + err2)
              })
          }
        })
        .catch(err => {
          console.log('loginApi.getUserDetail Err : ' + err)
        })
    },
    // 解析飞机实时信息(根据主题进行分发)
    parseDroneRealtimeInfo (msg) {
      const object = JSON.parse(msg.payloadString)
      if (droneOffline === msg.topic) {
        EventBus.$emit('droneOffline', object)
      } else {
        const tmpArray = this.realtimeInfoTopicArray
        for (let i = 0; i < tmpArray.length; i++) {
          if (msg.topic.indexOf(tmpArray[i]) === 0) {
            EventBus.$emit('droneRealtimeInfo', object)
            break
          }
        }
      }
    },
    // 关于我们
    goToAboutUs () {
      this.isChecked = !this.isChecked
      this.$router.push({ path: '/aboutUs' })
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  background: url(../assets/images/bg.png) no-repeat;
  background-size: 100% 100%;
  .el-header {
    margin-top: 36px;
    height: auto !important;
    padding: 0 20px 0 20px;
    position: relative;
  }
  .el-main {
    padding: 0;
  }
  .box {
    display: flex;
    // 临时显示菜单
    justify-content: space-between;
    // justify-content: center;
    font-size: 24px;
    font-weight: 500;
    .list {
      position: relative;
      z-index: 1;
      .item {
        position: relative;
      }
      .status {
        position: absolute;
        z-index: 999;
        width: 300px;
        // 临时显示菜单
        // left: -40px;
        // padding-top: 30px;
        left: -75px;
        padding-top: 33px;
        display: none;
        .el-button {
          width: 140px;
          background: #082d56;
        }
        .activeStatus {
          border: 2px solid rgba(233, 226, 101, 1);
          color: #e9e265;
        }
      }
    }
    .list:not(:nth-child(4)):hover .status {
      display: block !important;
    }
    div.list:not(:nth-child(4)) .item {
      cursor: pointer;
      width: 182px;
      height: 52px;
      background: url(../assets/images/unselected.png) no-repeat;
      line-height: 52px;
      text-align: center;
    }
    div.list:nth-child(n + 5) .item {
      background: url(../assets/images/unselected-right.png) no-repeat;
    }
    .title {
      width: 540px;
      height: 66px;
      line-height: 66px;
      text-align: center;
      // 临时显示菜单 添加
      // margin: 0 44px;
      font-size: 36px;
      font-weight: bold;
      margin-top: -13px;
      font-family: Source Han Sans CN;
      background: url(../assets/images/title.png) no-repeat;
      span {
        text-shadow: #000 3px 4px 5px;
      }
    }
    div.list:not(:nth-child(4)) .active {
      background: url(../assets/images/selected.png) no-repeat !important;
    }
    div.list:nth-child(n + 5) .active {
      background: url(../assets/images/selected-right.png) no-repeat !important;
    }
    // div.list:nth-child(3),
    // div.list:nth-child(6) {
    //   display: none;
    // }
    // div.list:nth-child(1),
    // div.list:nth-child(5) {
    //   margin-right: 40px;
    // }
  }
  .about {
    // width: 100px;
    // height: 50px;
    font-size: 18px;
    color: #86d0e8;
    text-align: center;
    margin: -10px 0 0 100px;
    cursor: pointer;
    position: absolute;
    top: 3px;
    right: 15px;
    img {
      width: 40px;
      height: 40px;
    }
  }
  .activeClass {
    // width: 100px;
    // height: 50px;
    font-size: 18px;
    color: #fff;
    text-align: center;
    margin: -10px 0 0 100px;
    cursor: pointer;
    position: absolute;
    top: 3px;
    right: 15px;
  }
  .cur {
    position: relative;
    margin-top: 8px;
    margin-bottom: 25px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    height: 40px;
    line-height: 40px;
    text-align: center;
    z-index: 1000;
    pointer-events: none;
    .realTime {
      width: 936px;
      background: url(../assets/images/logo.png) no-repeat;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      span.extra {
        color: #fff45c;
        i {
          font-style: normal;
          position: relative;
          top: -10px;
        }
      }
      span.extra:last-child {
        margin-left: 4px;
      }
      span.curCity {
        margin-left: 30px;
        margin-right: 25px;
      }
    }
  }
}
</style>
