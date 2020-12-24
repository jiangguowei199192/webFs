<!--
 * @Descripttion: 出来混迟早是要还的
 * @version: v_1.0
 * @Author: liangkaiLee
 * @Date: 2020-12-13 13:50:41
 * @LastEditors: liangkaiLee
 * @LastEditTime: 2020-12-14 19:58:01
-->
<template>
  <div>
    <!-- 案件列表 -->
    <div class="case_list">
      <div class="list_header">
        <div class="fl">
          <img :src="titleImg" alt />
        </div>
        <h4 class="fl" style="margin-left: 15px">案件列表</h4>
        <img style="cursor: pointer" class="fr" :src="chatImg" alt @click.stop="chatBoxShowOrHide" />
        <img
          style="cursor:pointer;margin-right:16px;margin-top:-2px"
          class="fr"
          :src="addImg"
          alt
          @click.stop="newPolice"
        />
      </div>
      <div class="list_content webFsScroll">
        <div
          style="text-align: center; line-height: 100px"
          v-if="!todayCaseInfos || todayCaseInfos.length == 0"
        >
          <h3 style="color: #1eb0fc">暂无警情</h3>
        </div>
        <div
          class="content_item"
          v-else
          v-for="(case_item, case_index) in todayCaseInfos"
          :key="case_index"
        >
          <div class="item_top">
            <el-tooltip
              popper-class="gTooltip plotTooltip"
              :content="case_item.belong"
              placement="top"
              :open-delay="500"
            >
              <p class="fl">{{ case_item.belong }}</p>
            </el-tooltip>
          </div>
          <div class="item_center">
            <div class="left fl" v-if="case_item.img || case_item.img !== null">
              <img :src="case_item.img" alt />
            </div>
            <div class="left fl" v-else>
              <img :src="caseImage" alt />
            </div>
            <div class="right fr">
              <p style="height: 50px" class="divEllipsis">
                <span style="color: #ff0000">情况说明：</span>
                <span>{{ case_item.description }}</span>
              </p>
              <p>
                <img :src="timeImg" alt />
                {{ case_item.time }}
              </p>
              <p>
                <img :src="placeImg" alt />
                {{ case_item.address }}
              </p>
            </div>
          </div>
          <div class="item_bottom">
            <span class="btn_dispatch" @click.stop="dispatchBoxShow(case_item)">分派</span>
            <span class="btn_complete" @click.stop="handleBoxShow(case_item)">处置完成</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 聊天对话框 -->
    <div class="case_chat" ref="case_chat" v-show="bShowChat">
      <div class="case_header">
        <div class="fl">
          <img :src="titleImg" alt />
        </div>
        <h4 class="fl" style="margin-left: 15px">聊天通讯</h4>
        <div class="close fr" @click.stop="chatBoxShowOrHide">×</div>
      </div>
      <div ref="chatBox" class="case_content webFsScroll">
        <div v-for="(talk,index) in talks" :key="index" class="talk_box">
          <span class="time">{{timeFormat2(talk.time)}}</span>
          <span class="name" :class="[talk.isRight === true ? 'right':'left']">{{talk.person}}</span>
          <div
            v-for="(msg,index2) in talk.messages"
            :key="index2"
            class="msg-box"
            :class="[talk.isRight === true ? 'right_talk' :'left_talk']"
          >
            <img class="img" :src="msg" v-if="talk.type ==='img'" />
            <div
              class="playerBox"
              :class="{videoRight:talk.isRight === true}"
              v-else-if="talk.type ==='video'"
            >
              <LivePlayer
                :videoUrl="msg"
                :show-custom-button="false"
                :muted="false"
                :controls="false"
                :autoplay="true"
                oncontextmenu="return false"
                fluent
                :stretch="true"
                :live="false"
                aspect="fullscreen"
                :poster="poster"
              ></LivePlayer>
            </div>
            <span v-else class="msg">{{msg}}</span>
          </div>
        </div>
      </div>
      <div class="case_bottom">
        <el-input
          style="position: relative"
          placeholder="请在此输入文字...."
          type="textarea"
          resize="none"
          v-model.trim="msg"
          maxlength="100"
          @keyup.enter.native="sendMessage"
        ></el-input>
        <div class="bottom_btn">
          <span class="btn_clear" @click.stop="msg = ''">清空</span>
          <span class="btn_send" @click.stop="sendMessage">发送</span>
        </div>
        <span class="link" @click.stop="upload"></span>
        <input type="file" ref="uploadFile" style="display:none" @change="fileChange" />
      </div>
    </div>
    <!-- 处置结果弹框 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="handleBoxVisible"
      width="960px"
      class="handel_box"
    >
      <div>
        <div class="handel_header">
          <span style="margin-left: 5px">处置结果</span>
        </div>
        <el-form
          ref="handleRef"
          :model="handleForm"
          label-width="90px"
          :inline="true"
          :rules="handleRules"
          style="margin: 30px 50px 0 46px"
        >
          <el-form-item label="处置结果" prop="record" class="textarea">
            <el-input placeholder="请输入...." type="textarea" v-model="handleForm.record"></el-input>
          </el-form-item>
          <div
            style="
              display: flex;
              justify-content: space-between;
              margin-top: 10px;
            "
          >
            <el-form-item label="处置时间" prop="time" class="input">
              <el-date-picker
                v-model="handleForm.time"
                type="datetime"
                placeholder="请选择"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="处置人" prop="people" class="input">
              <el-input placeholder="请输入" v-model="handleForm.people"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div class="handle_bottom" style="margin-top: 20px">
          <div class="btn_cancel" @click.stop="closeHandleBox">取消</div>
          <div class="btn_confirm" @click.stop="submitHandleAdd">确定</div>
        </div>
      </div>
    </el-dialog>
    <!-- 警力分派弹框 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dispatchBoxVisible"
      width="400px"
      class="dispatch_box"
    >
      <div class="dispatch_header">
        <div class="fl">
          <img class="fl" :src="titleImg" alt />
          <h4 class="fl" style="margin-left: 15px">分派</h4>
        </div>
      </div>
      <div class="dispatch_content">
        <el-input
          v-model="dispatchInput"
          placeholder="请输入所属部门进行搜索"
          class="otherInput"
          @keyup.enter.native="getDesignateUserList"
        ></el-input>
        <div class="searchBtn" @click="getDesignateUserList">
          <img :src="searchImg" style="margin-top: 7px; width: 17px; height: 22px" />
        </div>
        <div class="list webFsScroll">
          <div v-for="(dispatch_item, dispatch_index) in dispatchList" :key="dispatch_index">
            <el-checkbox v-model="dispatch_item.isChecked"></el-checkbox>
            <img :src="personImg" alt />
            <el-tooltip
              popper-class="gTooltip plotTooltip"
              :content="dispatch_item.name"
              placement="top"
              :open-delay="500"
            >
              <span>{{dispatch_item.name}}</span>
            </el-tooltip>
          </div>
        </div>
      </div>
      <div class="handle_bottom" style="padding: 12px 0">
        <div class="btn_cancel" @click.stop="closeDispatchBox">取消</div>
        <div class="btn_confirm" @click.stop="submitDispatchAdd">确定</div>
      </div>
    </el-dialog>
    <!-- 新建警情 -->
    <el-dialog
      :visible.sync="showNewPolice"
      :close-on-click-modal="false"
      width="960px"
      class="newPoliceDlg"
    >
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
            <el-input placeholder="自动生成" :disabled="true" v-model="newPoliceForm.number"></el-input>
          </el-form-item>
          <el-form-item label="信息来源" prop="source" class="input1 label1">
            <el-input placeholder="请输入" v-model="newPoliceForm.source"></el-input>
          </el-form-item>
          <el-form-item label="举报人" prop="people" class="input1">
            <el-input placeholder="请输入" v-model="newPoliceForm.people"></el-input>
          </el-form-item>
          <el-form-item label="举报电话" class="input1 label1">
            <el-input placeholder="请输入" v-model="newPoliceForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="举报地址" prop="address" class="input2">
            <el-input placeholder="请输入" v-model="newPoliceForm.address"></el-input>
            <!-- <div style="width: 760px; height: 140px; margin-top: 5px;">
              <gMap
                ref="gduMap"
                handleType="devMap"
                :bShowSimpleSearchTools="true"
                :bShowBasic="false"
                :bShowMeasure="false"
                :bShowLonLat="false"
                :bAutoLocate="false"
              ></gMap>
            </div>-->
          </el-form-item>
          <el-form-item label="    " prop="lon">
            <div style="width: 760px; height: 140px;">
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
          <el-form-item label="举报时间" prop="time" class="input1">
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
            <el-input placeholder="请输入" v-model="newPoliceForm.description"></el-input>
          </el-form-item>
          <el-form-item label="重点记录" class="input2">
            <el-input placeholder="请输入" v-model="newPoliceForm.record"></el-input>
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
import { caseListApi } from '@/api/case'
import globalApi from '@/utils/globalApi'
import { policeApi } from '@/api/police.js'
import { Notification } from 'element-ui'
import { loginApi } from '@/api/login'
import MqttService from '@/utils/mqttService'
import { stringIsNullOrEmpty } from '@/utils/validate'
import LivePlayer from '@liveqing/liveplayer'
import { timeFormat2 } from '@/utils/date'
import { EventBus } from '@/utils/eventBus.js'

export default {
  name: 'caseList',

  data () {
    return {
      poster: require('../../../assets/images/loading.gif'),
      msg: '',
      fileTypes: ['mp4', 'png', 'jpg', 'jpeg'],
      titleImg: require('../../../assets/images/control/title.png'),
      addImg: require('../../../assets/images/control/add_case.png'),
      chatImg: require('../../../assets/images/control/speak.png'),
      timeImg: require('../../../assets/images/control/time.png'),
      placeImg: require('../../../assets/images/control/place.png'),
      caseImage: require('../../../assets/images/control/case.png'),
      searchImg: require('../../../assets/images/policeHistory/search.png'),
      personImg: require('../../../assets/images/control/person.png'),
      checkImg: require('../../../assets/images/control/check.png'),
      gouImg: require('../../../assets/images/control/gou.png'),
      // 今日案件信息
      todayCaseInfos: [],
      handleBoxVisible: false,
      dispatchBoxVisible: false,
      // 处置表单字段
      handleForm: {
        record: '',
        time: '',
        people: ''
      },
      // 验证规则
      handleRules: {
        record: [{ required: true, message: '请输入处置记录' }],
        time: [{ required: true, message: '请选择处置时间' }],
        people: [{ required: true, message: '请输入处置人' }]
      },
      dispatchInput: '',
      dispatchList: [
        { id: 0, name: '刘守辉 江汉渔政' },
        { id: 1, name: '王明德 南岸咀渔政' },
        { id: 2, name: '张强 王家湾渔政' },
        { id: 3, name: '付文兵 青山渔政' },
        { id: 4, name: '李国庆 徐东大街渔政' }
      ],
      talks: [
        {
          person: '武汉渔政 张三',
          messages: ['将非法捕捞预警指派给王军'],
          time: new Date().getTime()
        },
        {
          person: '青山渔政 张三',
          messages: ['已收到指令', '正在前往案发中心处置,随时上报案件处理情况'],
          time: new Date().getTime()
        },
        {
          person: '青山渔政 李四',
          messages: ['ws://58.49.169.235:50010/live/5H00983PAKCC2CC0.flv'],
          type: 'video',
          time: new Date().getTime()
        }
      ],
      serverUrl: globalApi.headImg,
      bShowChat: false,
      username: '',
      userDetail: '',
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
        record: '', // 重点记录
        lon: ''
      },
      newPoliceRules: {
        source: [{ required: true, message: '请输入信息来源' }],
        people: [{ required: true, message: '请输入举报人' }],
        address: [{ required: true, message: '请输入举报地址' }],
        time: [{ required: true, message: '请选择举报时间' }],
        lon: [{ required: true, message: '请选择坐标' }]
      },
      deptTree: ''
    }
  },
  components: {
    LivePlayer
  },
  created () {
    this.getDeptTree()
    this.getDesignateUserList()
  },

  mounted () {
    this.getTodayCase()
    this.getChatList()
    this.userDetail = JSON.parse(localStorage.getItem('userDetail'))
    this.username = this.userDetail.deptName + ' ' + this.userDetail.username
    const me = this
    // 案件聊天信息
    EventBus.$on('caseHandling', info => {
      if (info.userid === this.userDetail.id) return
      me.caseHandling(info)
    })
  },

  destroyed () {
    EventBus.$off('caseHandling')
  },

  methods: {
    timeFormat2,
    // 获取案件指派人员列表
    getDesignateUserList () {
      this.dispatchList = []
      const param = {
        deptName: this.dispatchInput
      }
      const config = {
        headers: { 'Content-Type': 'application/json;charset=UTF-8' }
      }
      this.$axios
        .post(caseListApi.queryDesignateUserList, param, config)
        .then(res => {
          const tempData = res.data.data.filter(r => {
            r.isChecked = false
            r.name = r.username + ' ' + r.deptName
            return r.deptName !== null
          })
          this.dispatchList = tempData
          console.log('getDesignateUserList:', tempData)
        })
        .catch(err => {
          console.log('getDesignateUserList.Excp:' + err)
        })
    },
    // 获取今日案件信息
    getTodayCase () {
      this.todayCaseInfos = []
      const param = {
        caseBelong: '',
        content: '',
        currentPage: 0,
        endTime: '',
        pageSize: 100,
        startTime: ''
      }
      this.$axios
        .post(caseListApi.queryCaseList, param, {
          headers: { 'Content-Type': 'application/json;charset=UTF-8' }
        })
        .then(res => {
          // console.log('警情信息接口返回: ', res)
          if (res && res.data && res.data.code === 0) {
            const tempData = res.data.data.records.filter(
              r => r.caseStatus === '未处置'
            )
            tempData.forEach((item, index) => {
              let tmpImg = null
              if (item.caseImg !== null) {
                tmpImg = globalApi.headImg + item.caseImg
              }
              const info = {
                id: item.id,
                xuHao: index + 1,
                bianHao: item.caseNo,
                source: item.infoSource,
                people: item.reportMan,
                phone: item.reportTel,
                img: tmpImg,
                address: item.reportAddr,
                time: item.reportTime,
                belong: item.caseBelong,
                description: item.caseDesc,
                status: item.caseStatus,
                mainRecord: item.importantRecord,
                handleResult: item.dispositionRecord,
                handleTime: item.dispositionTime,
                handlePeople: item.dispositionMan,
                type: 'RP_Warning',
                latitude: item.latitude,
                longitude: item.longitude
              }
              this.todayCaseInfos.push(info)
            })
            this.$emit('getTodayCaseDone', this.todayCaseInfos)
          }
        })
        .catch(err => {
          console.log('接口错误: ' + err)
        })
    },

    // 案件处置
    submitHandleAdd () {
      this.$refs.handleRef.validate(valid => {
        if (!valid) return

        var param = {
          id: this.curHandleItem.id,
          dispositionMan: this.handleForm.people,
          dispositionRecord: this.handleForm.record,
          dispositionTime: this.handleForm.time
        }
        this.$axios
          .post(policeApi.dispose, param, {
            headers: { 'Content-Type': 'application/json;charset=UTF-8' }
          })
          .then(res => {
            if (res && res.data && res.data.code === 0) {
              this.handleBoxVisible = false
              this.getTodayCase()
              Notification({
                title: '提示',
                message: '处置成功',
                type: 'success',
                duration: 5 * 1000
              })
            } else {
              Notification({
                title: '提示',
                message: '处置失败',
                type: 'warning',
                duration: 5 * 1000
              })
            }
          })
          .catch(err => {
            Notification({
              title: '提示',
              message: '处置异常',
              type: 'error',
              duration: 5 * 1000
            })
            console.log('handle exception:', err)
          })
      })
    },
    submitDispatchAdd () {
      const tmpIds = []
      this.dispatchList.forEach(r => {
        if (r.isChecked === true) {
          tmpIds.push(r.id)
        }
      })
      if (tmpIds.length < 1) {
        Notification({
          title: '提示',
          message: '请先选择分派人员',
          type: 'warning',
          duration: 5 * 1000
        })
        return
      }
      var param = {
        caseId: this.curDispatchItem.id,
        userIds: tmpIds
      }
      const config = {
        headers: { 'Content-Type': 'application/json;charset=UTF-8' }
      }
      this.$axios
        .post(caseListApi.designateCaseToUsers, param, config)
        .then(res => {
          if (res && res.data && res.data.code === 0) {
            this.dispatchBoxVisible = false
            Notification({
              title: '提示',
              message: '分派成功',
              type: 'success',
              duration: 5 * 1000
            })
          } else {
            Notification({
              title: '提示',
              message: '分派失败',
              type: 'warning',
              duration: 5 * 1000
            })
          }
        })
        .catch(err => {
          Notification({
            title: '提示',
            message: '分派异常',
            type: 'error',
            duration: 5 * 1000
          })
          console.log('handle exception:', err)
        })
    },

    chatBoxShowOrHide () {
      this.bShowChat = !this.bShowChat
      if (this.bShowChat) this.chatBoxToBottom()
    },
    handleBoxShow (item) {
      this.curHandleItem = item
      this.handleBoxVisible = true
    },
    closeHandleBox () {
      this.handleBoxVisible = false
      this.handleForm = {}
      this.curHandleItem = {}
      this.$refs.handleRef.resetFields()
    },
    dispatchBoxShow (item) {
      this.curDispatchItem = item
      this.dispatchList.forEach(r => {
        r.isChecked = false
      })
      this.dispatchBoxVisible = true
    },
    closeDispatchBox () {
      this.curDispatchItem = {}
      this.dispatchBoxVisible = false
    },
    /**
     *  上传图片或视频
     */
    upload () {
      this.$refs.uploadFile.click()
    },
    /**
     *  文件选择完毕
     */
    fileChange (e) {
      if (e.target.files.length <= 0) return
      const f = e.target.files[0]
      this.$refs.uploadFile.value = null
      const fileType = f.name
        .substring(f.name.lastIndexOf('.') + 1, f.name.length)
        .toLowerCase()
      if (this.fileTypes.indexOf(fileType) === -1) {
        this.$notify.closeAll()
        this.$notify.warning({
          title: '警告',
          message: '只能上传图片或者视频'
        })
        return
      }

      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      const formData = new FormData()
      formData.append('chatFile', f)
      this.$axios
        .post(caseListApi.chatUploadFile, formData, config)
        .then(res => {
          if (res.data.code === 0) {
            const type = fileType === 'mp4' ? 'video' : 'img'
            this.sendCaseMessage(
              type,
              globalApi.headImg + res.data.data.filePath
            )
          }
        })
        .catch(err => {
          console.log('chatUploadFile Err : ' + err)
        })
    },

    // 获取组织树
    async getDeptTree () {
      this.$axios.post(loginApi.getDeptTree).then(res => {
        if (res && res.data && res.data.code === 0) {
          this.deptTree = res.data.data[0].children
        }
      })
    },

    newPolice () {
      this.showNewPolice = true

      var that = this
      setTimeout(() => {
        that.newPoliceForm.phone = ''
        that.newPoliceForm.belong = ''
        that.newPoliceForm.description = ''
        that.newPoliceForm.record = ''
        that.$refs.newPoliceRef.resetFields()

        const tmpMap = that.$refs.gduMap.map2D
        tmpMap.clickEvent.addEventListener(lonlat => {
          that.newPoliceForm.lon = lonlat[0]

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
      this.$refs.newPoliceRef.validate(valid => {
        if (!valid) {
          return false
        }
        this.showNewPolice = false

        var lonlat = this.getSelectedLocation()
        const formData = new FormData()
        formData.append('infoSource', this.newPoliceForm.source)
        formData.append('reportMan', this.newPoliceForm.people)
        formData.append('reportTel', this.newPoliceForm.phone)
        formData.append('reportAddr', this.newPoliceForm.address)
        formData.append('latitude', lonlat[1])
        formData.append('longitude', lonlat[0])
        formData.append('reportTime', this.newPoliceForm.time)
        formData.append('caseBelong', this.newPoliceForm.belong)
        formData.append('caseDesc', this.newPoliceForm.description)
        formData.append('importantRecord', this.newPoliceForm.record)
        formData.append('file', '')
        const config = { headers: { 'Content-Type': 'multipart/form-data' } }
        this.$axios.post(policeApi.add, formData, config).then(res => {
          if (res && res.data && res.data.code === 0) {
            this.getTodayCase()
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
    },
    /**
     *  获取聊天历史
     */
    getChatList () {
      this.$axios
        .get(caseListApi.chatListPage, {
          params: { currentPage: 0, pageSize: 10 }
        })
        .then(res => {
          if (res.data.code === 0) {
            this.talks = []
            const chats = res.data.data.records.reverse()
            chats.forEach(c => {
              const message = JSON.parse(c.msgContent)
              this.talks.push({
                person:
                  message.userid === this.userDetail.id
                    ? '我'
                    : message.username,
                messages: [message.msg],
                time: parseInt(message.sendTime),
                type: message.type,
                isRight: message.userid === this.userDetail.id
              })
            })
            this.chatBoxToBottom()
          }
        })
        .catch(err => {
          console.log('chatListPage Err : ' + err)
        })
    },
    /**
     *  接收案件消息
     */
    caseHandling (info) {
      this.talks.push({
        person: info.username,
        messages: [info.msg],
        time: new Date().getTime(),
        type: info.type
      })
      this.chatBoxToBottom()
    },
    /**
     *  发送案件消息
     */
    sendCaseMessage (type, msg) {
      if (stringIsNullOrEmpty(msg)) return
      const time = new Date().getTime()
      new MqttService().client.send(
        'web/river/caseHandling',
        JSON.stringify({
          sendTime: time,
          userid: this.userDetail.id,
          username: this.username,
          type: type, // type：txt img video
          msg: msg // 如果type是img、video , msg就是图片和video的地址
        })
      )
      this.talks.push({
        person: '我',
        isRight: true,
        messages: [msg],
        type: type,
        time: time
      })
      this.msg = ''
      this.chatBoxToBottom()
    },
    /**
     *  发送消息
     */
    sendMessage () {
      this.sendCaseMessage('txt', this.msg)
    },
    chatBoxToBottom () {
      this.$nextTick(() => {
        if (this.$refs.chatBox) {
          this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// 案件列表
.case_list {
  width: 340px;
  height: 710px;
  background: url(../../../assets/images/control/wrap.png) no-repeat center/100%
    100%;
  text-align: center;
  padding: 20px;
  position: relative;
  .list_header {
    height: 30px;
    line-height: 30px;
  }
  .list_content {
    margin-top: 15px;
    height: 670px;
    overflow-y: auto;
    .content_item {
      width: 308px;
      height: 200px;
      border: 1px solid#1EB0FC;
      padding: 8px;
      margin-bottom: 12px;
      background: rgba($color: #121e3a, $alpha: 0.85);
      .item_top {
        height: 30px;
        line-height: 30px;
        font-size: 15px;
        border-bottom: 1px solid#1EB0FC;
        p {
          width: 160px;
          word-break: keep-all;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .item_center {
        margin-top: 8px;
        height: 120px;
        .left {
          img {
            width: 88px;
            height: 110px;
          }
        }
        .right {
          width: 200px;
          font-size: 13px;
          p {
            margin-bottom: 10px;
            text-align: left;
            img {
              margin-right: 10px;
            }
          }
        }
      }
      .item_bottom {
        width: 100%;
        display: flex;
        justify-content: space-around;
        .btn_dispatch,
        .btn_complete {
          display: block;
          width: 82px;
          height: 28px;
          line-height: 28px;
          text-align: center;
          border: 1px solid #1eb0fc;
          border-radius: 4px;
          background: #1eb0fc;
          font-size: 15px;
          cursor: pointer;
        }
      }
    }
  }
}
// 聊天对话框
.case_chat {
  width: 450px;
  height: 395px;
  background: url(../../../assets/images/control/chat_bg.png) no-repeat
    center/100% 100%;
  text-align: center;
  padding: 20px;
  position: absolute;
  left: 1150px;
  bottom: -50px;
  .case_header {
    height: 30px;
    line-height: 30px;
    border-bottom: 1px dashed#1eb0fc;
    .close {
      font-size: 30px;
      cursor: pointer;
      margin-top: -5px;
    }
  }
  .case_content {
    height: 258px;
    overflow-y: auto;
    padding: 0px 10px 0px 0px;
    .talk_box {
      display: flex;
      flex-direction: column;
      font-size: 12px;
      .time {
        margin: auto;
        margin-top: 12px;
        background: rgba($color: #fff, $alpha: 0.1);
        border-radius: 4px;
        padding: 2px 10px;
        color: #d1d1d1;
      }
      .name {
        margin-top: 12px;
      }
      .left {
        text-align: left;
        color: #fff;
      }
      .right {
        text-align: right;
        color: #10e73f;
      }
      .msg-box {
        .msg {
          display: inline-block;
          min-height: 28px;
          box-sizing: border-box;
          border: 1px solid#1eb0fc;
          border-radius: 4px;
          line-height: 28px;
          padding: 0px 10px;
          font-size: 12px;
          margin-top: 10px;
          max-width: 200px;
          word-break: break-all;
          white-space: pre-wrap !important;
        }
        .img {
          margin-top: 10px;
          display: inline-block;
          width: 148px;
          height: 78px;
        }
        .playerBox {
          margin-top: 10px;
          width: 148px;
          height: 78px;
          position: relative;
        }
        .videoRight {
          float: right;
        }
      }
      .left_talk {
        text-align: left;
      }
      .right_talk {
        text-align: right;
      }
    }
  }
  .case_bottom {
    position: relative;
    margin-top: 20px;
    /deep/.el-textarea__inner {
      height: 86px;
      border: 1px solid #0fbfe0;
      background-color: transparent;
      color: rgb(243, 243, 243);
    }
    .bottom_btn {
      position: absolute;
      right: 8px;
      bottom: 8px;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      .btn_clear,
      .btn_send {
        display: block;
        width: 64px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        border: 1px solid #1eb0fc;
        border-radius: 4px;
        font-size: 14px;
        cursor: pointer;
      }
      .btn_send {
        background: #1eb0fc;
        color: #fff;
      }
      .btn_clear {
        background: transparent;
        color: #1eb0fc;
        margin-right: 20px;
      }
    }
    .link {
      display: inline-block;
      position: absolute;
      width: 16px;
      height: 16px;
      cursor: pointer;
      background: url(../../../assets/images/control/link.png) no-repeat;
      right: 10px;
      top: 3px;
    }
  }
}
// 处置结果弹框
.handel_box.el-dialog__wrapper {
  background-color: rgba($color: #040404, $alpha: 0.76);
  /deep/.el-dialog {
    .el-dialog__header {
      display: none;
    }
    background: transparent;
    .el-dialog__body {
      display: inline-block;
      padding: 0px;
      width: 100%;
      height: 360px;
      background: url(../../../assets/images/policeHistory/handleBox.png)
        no-repeat center/100% 100%;
      .handel_header {
        width: 165px;
        height: 34px;
        line-height: 34px;
        background: url(../../../assets/images/header-bg.png) no-repeat
          center/100%;
        padding-left: 15px;
        margin: 15px 0 0 15px;
        font-size: 16px;
        font-weight: bold;
        color: #fff;
      }
      .textarea {
        .el-textarea__inner {
          width: 760px;
          height: 106px;
          border: 1px solid #0fbfe0;
          background-color: transparent;
          color: rgb(243, 243, 243);
        }
      }
      .input {
        .el-input__inner {
          width: 320px;
          color: white;
          border: solid 1px #0fbfe0;
          background-color: transparent;
        }
      }
      .el-form-item__label {
        color: #0fbfe0;
        font-size: 15px;
      }
    }
  }
}
.handle_bottom {
  padding: 0 40px;
  display: flex;
  justify-content: flex-end;
  .btn_confirm,
  .btn_cancel {
    display: block;
    width: 87px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border: 1px solid #1eb0fc;
    border-radius: 4px;
    font-size: 15px;
    cursor: pointer;
  }
  .btn_confirm {
    background: #1eb0fc;
    color: #fff;
  }
  .btn_cancel {
    background: transparent;
    color: #1eb0fc;
    margin-right: 20px;
  }
}
// 警力分派弹框
.dispatch_box.el-dialog__wrapper {
  background-color: rgba($color: #040404, $alpha: 0.76);
  /deep/.el-dialog {
    .el-dialog__header {
      display: none;
    }
    background: transparent;
    .el-dialog__body {
      display: inline-block;
      padding: 0px;
      width: 100%;
      height: 660px;
      background: url(../../../assets/images/policeHistory/handleBox.png)
        no-repeat center/100% 100%;
      padding: 20px 30px;
      .dispatch_header {
        height: 35px;
        line-height: 35px;
        color: #fff;
        border-bottom: 1px dashed #1eb0fc;
        img {
          margin-top: 7px;
        }
      }
      .dispatch_content {
        margin-top: 25px;
        .otherInput {
          vertical-align: top;
          width: 300px;
          height: 35px;
          /deep/.el-input__inner {
            width: 310px;
            height: 35px;
            color: #c5f3ff;
            border: solid 1px #1eb0fc;
            border-radius: 0;
            background-color: transparent;
            font-size: 12px;
          }
        }
        .searchBtn {
          display: inline-block;
          width: 65px;
          height: 35px;
          line-height: 35px;
          text-align: center;
          margin-left: 25px;
          background-color: #086484;
          color: #fff;
          cursor: pointer;
        }
        .list {
          margin-top: 25px;
          height: 475px;
          overflow-y: auto;
          div {
            height: 35px;
            line-height: 35px;
            border-bottom: 1px solid #1eb0fc;
            color: #eee;
            margin-bottom: 20px;
            word-break: keep-all;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          div > img {
            margin: 0 25px 0 30px;
          }
        }
      }
    }
  }
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
