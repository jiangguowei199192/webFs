<!--
 * @Descripttion: 出来混迟早是要还的
 * @version: v_2.0
 * @Author: liangkaiLee
 * @Date: 2020-12-13 13:50:41
 * @LastEditors: liangkaiLee
 * @LastEditTime: 2020-12-13 20:28:26
-->
<template>
  <div>
    <!-- 案件列表 -->
    <div class="case_list">
      <div class="list_header">
        <div class="fl">
          <img :src="titleImg" alt="" />
        </div>
        <h4 class="fl" style="margin-left: 15px">案件列表</h4>
      </div>
      <div class="list_content webFsScroll">
        <div
          class="content_item"
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
              <p class="fl">
                {{ case_item.belong }}
              </p></el-tooltip
            >
            <img
              style="cursor: pointer"
              class="fr"
              :src="chatImg"
              alt=""
              @click.stop="chatBoxShow"
            />
          </div>
          <div class="item_center">
            <div class="left fl" v-if="case_item.img || case_item.img !== null">
              <img :src="case_item.img" alt="" />
            </div>
            <div class="left fl" v-else>
              <img :src="caseImage" alt="" />
            </div>
            <div class="right fr">
              <p>
                <span style="color: #ff0000">情况说明：</span>
                <span>{{ case_item.description }}</span>
              </p>
              <p><img :src="timeImg" alt="" />{{ case_item.time }}</p>
              <p><img :src="placeImg" alt="" />{{ case_item.address }}</p>
            </div>
          </div>
          <div class="item_bottom">
            <span class="btn_dispatch">分派</span>
            <span class="btn_complete" @click.stop="handleBoxShow"
              >处置完成</span
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 聊天对话框 -->
    <div class="case_chat" v-show="(chatBoxVisible = true)">
      <div class="case_header">
        <div class="fl"><img :src="titleImg" alt="" /></div>
        <h4 class="fl" style="margin-left: 15px">聊天通讯</h4>
        <div class="close fr" @click.stop="closeChatBox">×</div>
      </div>
      <div class="case_content">
        <div>
          <span>2020-12-15 13:24:36</span><span>武汉渔政 刘明涛</span>
          <p>将非法捕捞预警指派给王军</p>
        </div>
        <div>
          <div style="height: 20px">
            <span>王家湾渔政 黄宏伟</span><span>2020-12-15 13:24:36</span>
          </div>
          <div style="margin: 10px 0 0 10px; width: 170px">
            <p>已收到指令</p>
            <p style="margin-top: 10px">正在前往案发中心处置</p>
          </div>
        </div>
        <div>
          <span style="background: transparent"></span
          ><span>武汉渔政 刘明涛</span>
          <p>限时上报处置时间</p>
        </div>
      </div>
      <div class="case_bottom">
        <el-input
          style="position: relative"
          placeholder="请在此输入文字...."
          type="textarea"
        ></el-input>
        <div class="bottom_btn">
          <span class="btn_clear">清空</span>
          <span class="btn_send">发送</span>
        </div>
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
        <div class="handel_header">处置结果</div>
        <el-form
          ref="handleRef"
          :model="handleForm"
          label-width="90px"
          :inline="true"
          :rules="handleRules"
          style="margin-top: 30px; margin-left: 46px; margin-right: 50px"
        >
          <el-form-item label="处置结果" prop="record" class="textarea">
            <el-input
              placeholder="请输入...."
              type="textarea"
              v-model="handleForm.record"
            ></el-input> </el-form-item
          ><br />
          <el-form-item label="处置时间" prop="time" class="input">
            <el-date-picker
              v-model="handleForm.time"
              type="datetime"
              placeholder="请选择"
              class="timeStyle"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="处置人" prop="people" class="input">
            <el-input
              placeholder="请输入"
              v-model="handleForm.people"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="handle_bottom">
          <div class="btn_cancel" @click.stop="closeHandleBox">取消</div>
          <div class="btn_confirm" @click.stop="submitHandleAdd">确定</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { caseListApi } from '@/api/case'
import globalApi from '@/utils/globalApi'
import axios from 'axios'

export default {
  name: 'caseList',

  data () {
    return {
      //   标题icon
      titleImg: require('../../../assets/images/control/title.png'),
      //   聊天icon
      chatImg: require('../../../assets/images/control/speak.png'),
      //   时间icon
      timeImg: require('../../../assets/images/control/time.png'),
      //   位置icon
      placeImg: require('../../../assets/images/control/place.png'),
      caseImage: require('../../../assets/images/control/case.png'),
      // 今日案件信息
      todayCaseInfos: [],
      chatBoxVisible: false,
      handleBoxVisible: false,
      handleForm: {
        record: '',
        time: '',
        people: ''
      },
      handleRules: {
        record: [{ required: true, message: '请输入处置记录' }],
        time: [{ required: true, message: '请选择处置时间' }],
        people: [{ required: true, message: '请输入处置人' }]
      }
    }
  },

  mounted () {
    this.getTodayCase()
  },

  methods: {
    //   获取今日案件信息
    getTodayCase () {
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
        .then((res) => {
          console.log('警情信息接口返回: ', res)
          if (res && res.data && res.data.code === 0) {
            const tempData = res.data.data.records
            tempData.forEach((item, index) => {
              const info = {
                id: item.id,
                xuHao: index + 1,
                bianHao: item.caseNo,
                source: item.infoSource,
                people: item.reportMan,
                phone: item.reportTel,
                img: item.caseImg,
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
            // this.getCaseImg()
          }
        })
        .catch((err) => {
          console.log('接口错误: ' + err)
        })
    },

    getCaseImg () {
      const _this = this
      this.$nextTick(() => {
        if (_this.todayCaseInfos.img || _this.todayCaseInfos.img !== null) {
          _this.todayCaseInfos.forEach((item) => {
            console.log(item)
            axios
              .get(globalApi.headImg + item.img)
              .then((res) => {
                console.log('获取的图片: ', res)
              })
              .catch((err) => {
                console.log('加载json数据失败: ' + err)
              })
          })
        }
      })
    },

    chatBoxShow () {
      this.chatDialogVisible = true
      console.log(this.chatDialogVisible)
    },
    // 关闭
    closeChatBox () {
      this.chatDialogVisible = false
      console.log(this.chatDialogVisible)
    },

    handleBoxShow () {
      this.handleBoxVisible = true
    },
    closeHandleBox () {
      this.handleBoxVisible = false
    },
    submitHandleAdd () {
      this.$refs.handleRef.validate((valid) => {
        if (!valid) return
        this.$notify.success({
          title: '提示',
          message: '新增成功!',
          duration: 2 * 1000
        })
        setTimeout(() => {
          this.handleBoxVisible = false
        }, 800)
        this.handleForm = {}
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
      height: 205px;
      border: 1px solid#1EB0FC;
      padding: 8px;
      margin-bottom: 12px;
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
            text-align-last: left;
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
.case_chat {
  width: 440px;
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
      font-size: 34px;
      cursor: pointer;
      margin-top: -5px;
    }
  }
  .case_content {
    text-align: center;
    div {
      margin-top: 12px;
      font-size: 12px;
      span:nth-child(1) {
        background: #d1d1d1;
        font-size: 12px;
        border-radius: 4px;
        padding: 2px 10px;
        margin-left: 125px;
      }
      span:nth-child(2) {
        color: #10e73f;
        float: right;
        margin-right: 8px;
      }
      p {
        width: 170px;
        height: 30px;
        line-height: 30px;
        border: 1px solid#1eb0fc;
        border-radius: 4px;
        margin: 10px 0 0 260px;
      }
    }
    div:nth-child(2) {
      margin-top: 20px;
      span:nth-child(1) {
        background: transparent;
        float: left;
        margin: 0 50px 0 0;
      }
      span:nth-child(2) {
        background: #d1d1d1;
        color: #fff;
        border-radius: 4px;
        padding: 2px 10px;
        margin-bottom: 10px;
        float: left;
      }
      p {
        margin: 0;
      }
    }
  }
  .case_bottom {
    margin-top: 20px;
    /deep/.el-textarea__inner {
      height: 86px;
      border: 1px solid #0fbfe0;
      background-color: transparent;
      color: rgb(243, 243, 243);
    }
    .bottom_btn {
      position: absolute;
      right: 30px;
      bottom: 30px;
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
  }
}

.handel_box.el-dialog__wrapper {
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
          height: 86px;
          border: 1px solid #0fbfe0;
          background-color: transparent;
          color: rgb(243, 243, 243);
        }
      }
      .input {
        .el-input__inner {
          width: 760px;
          color: white;
          border: solid 1px #0fbfe0;
          background-color: transparent;
        }
      }
      .el-form-item__label {
        color: #0fbfe0;
        font-size: 15px;
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
</style>
