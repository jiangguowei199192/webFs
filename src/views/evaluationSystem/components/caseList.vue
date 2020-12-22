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
        <img style="cursor: pointer" class="fr" :src="chatImg" alt @click.stop="chatBoxShow" />
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
            <!-- <img
              style="cursor: pointer"
              class="fr"
              :src="chatImg"
              alt=""
              @click.stop="chatBoxShow"
            />-->
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
            <span class="btn_dispatch" @click.stop="dispatchBoxShow">分派</span>
            <span class="btn_complete" @click.stop="handleBoxShow">处置完成</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 聊天对话框 -->
    <div class="case_chat" ref="case_chat">
      <div class="case_header">
        <div class="fl">
          <img :src="titleImg" alt />
        </div>
        <h4 class="fl" style="margin-left: 15px">聊天通讯</h4>
        <div class="close fr" @click.stop="closeChatBox">×</div>
      </div>
      <div class="case_content webFsScroll">
        <div v-for="(talk,index) in talks" :key="index" class="talk_box">
          <div class="name_box">
            <span>2020-12-15 13:24:36</span>
            <span :class="[talk.isLeft ? 'left':'right']">{{talk.person}}</span>
          </div>
          <span
            :class="[talk.isLeft ? 'left_talk':'right_talk']"
            v-for="(msg,index2) in talk.messages"
            :key="index2"
            class="msg"
          >{{msg}}</span>
        </div>
        <!-- <div>
          <span>2020-12-15 13:24:36</span>
          <span>武汉渔政 刘明涛</span>
          <p>将非法捕捞预警指派给王军</p>
        </div>
        <div>
          <div style="height: 20px">
            <span>王家湾渔政 黄宏伟</span>
            <span>2020-12-15 13:24:36</span>
          </div>
          <div style="margin: 10px 0 0 10px; width: 170px">
            <p>已收到指令</p>
            <p style="margin-top: 10px">正在前往案发中心处置</p>
          </div>
        </div>
        <div>
          <span style="background: transparent"></span>
          <span>武汉渔政 刘明涛</span>
          <p>限时上报处置时间</p>
        </div>-->
      </div>
      <div class="case_bottom">
        <el-input
          style="position: relative"
          placeholder="请在此输入文字...."
          type="textarea"
          resize="none"
          v-model="msg"
        ></el-input>
        <div class="bottom_btn">
          <span class="btn_clear" @click.stop="msg = ''">清空</span>
          <span class="btn_send">发送</span>
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
        <el-input placeholder="请输入举报人/举报地点/简要描述进行搜索" class="otherInput"></el-input>
        <div class="searchBtn">
          <img :src="searchImg" style="margin-top: 7px; width: 17px; height: 22px" />
        </div>
        <div class="list webFsScroll">
          <p v-for="(dispatch_item, dispatch_index) in dispatchList" :key="dispatch_index">
            <el-checkbox></el-checkbox>
            <img :src="personImg" alt />
            {{
            dispatch_item.name
            }}
          </p>
        </div>
      </div>
      <div class="handle_bottom" style="padding: 12px 0">
        <div class="btn_cancel" @click.stop="closeDispatchBox">取消</div>
        <div class="btn_confirm" @click.stop="submitDispatchAdd">确定</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { caseListApi } from '@/api/case'
import globalApi from '@/utils/globalApi'

export default {
  name: 'caseList',

  data () {
    return {
      msg: '',
      fileTypes: ['mp4', 'png', 'jpg', 'jpeg'],
      titleImg: require('../../../assets/images/control/title.png'),
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
      dispatchList: [
        { id: 0, name: '刘守辉 江汉渔政' },
        { id: 1, name: '王明德 南岸咀渔政' },
        { id: 2, name: '张强 王家湾渔政' },
        { id: 3, name: '付文兵 青山渔政' },
        { id: 4, name: '李国庆 徐东大街渔政' }
      ],
      talks: [
        {
          isLeft: false,
          person: '武汉渔政 张三',
          messages: ['将非法捕捞预警指派给王军']
        },
        {
          isLeft: true,
          person: '青山渔政 张三',
          messages: ['已收到指令', '正在前往案发中心处置']
        }
      ]
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
        .then(res => {
          // console.log('警情信息接口返回: ', res)
          if (res && res.data && res.data.code === 0) {
            const tempData = res.data.data.records.filter(
              r => r.caseStatus === '未处置'
            )
            tempData.forEach((item, index) => {
              const info = {
                id: item.id,
                xuHao: index + 1,
                bianHao: item.caseNo,
                source: item.infoSource,
                people: item.reportMan,
                phone: item.reportTel,
                img: globalApi.headImg + item.caseImg,
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
    },
    submitDispatchAdd () {
      this.$notify.success({
        title: '提示',
        message: '分派成功!',
        duration: 2 * 1000
      })
      setTimeout(() => {
        this.dispatchBoxVisible = false
      }, 800)
    },

    chatBoxShow () {
      this.$refs.case_chat.style.display = 'block'
    },
    closeChatBox () {
      this.$refs.case_chat.style.display = 'none'
    },
    handleBoxShow () {
      this.handleBoxVisible = true
    },
    closeHandleBox () {
      this.handleBoxVisible = false
      this.handleForm = {}
      this.$refs.handleRef.resetFields()
    },
    dispatchBoxShow () {
      this.dispatchBoxVisible = true
    },
    closeDispatchBox () {
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
      const fileType = f.name
        .substring(f.name.lastIndexOf('.') + 1, f.name.length)
        .toLowerCase()
      if (this.fileTypes.indexOf(fileType) === -1) {
        this.$notify.closeAll()
        this.$notify.warning({
          title: '警告',
          message: '只能上传图片或者视频'
        })
      }
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
  display: none;
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
    text-align: center;
    height: 248px;
    overflow-y: auto;
    padding: 0px 10px 0px 0px;
    .talk_box {
      display: flex;
      flex-direction: column;
      .name_box {
        position: relative;
        margin-top: 12px;
        font-size: 12px;
        span:nth-child(1) {
          background: rgba($color: #fff, $alpha: 0.1);
          font-size: 12px;
          border-radius: 4px;
          padding: 2px 10px;
        }
        span:nth-child(2) {
          position: absolute;
          color: #10e73f;
          float: right;
        }
        .left {
          left: 8px;
        }
        .right {
          right: 8px;
        }
      }
      .msg {
        height: 28px;
        box-sizing: border-box;
        border: 1px solid#1eb0fc;
        border-radius: 4px;
        line-height: 28px;
        padding: 0px 10px;
        font-size: 12px;
        margin: auto;
        margin-top: 10px;
      }
      .left_talk {
        margin-left: 0px;
      }
      .right_talk {
        margin-right: 0px;
      }
    }
    // div {
    //   margin-top: 12px;
    //   font-size: 12px;
    //   span:nth-child(1) {
    //     background: rgba($color: #fff, $alpha: 0.1);
    //     font-size: 12px;
    //     border-radius: 4px;
    //     padding: 2px 10px;
    //     margin-left: 125px;
    //   }
    //   span:nth-child(2) {
    //     color: #10e73f;
    //     float: right;
    //     margin-right: 8px;
    //   }
    //   p {
    //     width: 170px;
    //     height: 30px;
    //     line-height: 30px;
    //     border: 1px solid#1eb0fc;
    //     border-radius: 4px;
    //     margin: 10px 0 0 260px;
    //   }
    // }
    // div:nth-child(2) {
    //   margin-top: 20px;
    //   span:nth-child(1) {
    //     background: transparent;
    //     float: left;
    //     margin: 0 50px 0 0;
    //   }
    //   span:nth-child(2) {
    //     background: rgba($color: #fff, $alpha: 0.1);
    //     color: #fff;
    //     border-radius: 4px;
    //     padding: 2px 10px;
    //     margin-bottom: 10px;
    //     float: left;
    //   }
    //   p {
    //     margin: 0;
    //   }
    // }
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
          height: 500px;
          overflow-y: auto;
          p {
            height: 35px;
            line-height: 35px;
            border-bottom: 1px solid #1eb0fc;
            color: #eee;
            margin-bottom: 20px;
          }
          p:nth-child(1) {
            margin-top: 25px;
          }
          p > img {
            margin: 0 25px 0 30px;
          }
        }
      }
    }
  }
}
</style>
