<template>
  <div style="margin-top: -5px; padding: 20px">
    <div class="leftBox">
      <div style="height: 800px">
        <!-- 头部标题 -->
        <div class="menu_head">
          <div class="menu_head_title">关于我们</div>
        </div>
        <!-- 左容器 -->
        <div style="margin: 25px 0 0 10px">
          <leftTab
            v-for="data in leftItemData"
            :key="data.title"
            :itemData="data"
            @leftTabSelected="leftTabSelected"
          ></leftTab>
        </div>
      </div>
    </div>
    <!-- 右容器 -->
    <div class="rightBox">
      <div class="rightBoxBase webFsScroll">
        <!-- 导航标题 -->
        <div class="menu_head" @leftTabSelected="leftTabSelected">
          <div class="menu_head_title">{{ this.tabTitle }}</div>
        </div>
        <!-- 视频容器 -->
        <div class="content">
          <!-- 回放图片 -->
          <div class="fl img_wrap" v-show="this.selectedId == 0">
            <div class="imgList" ref="imgList">
              <div
                v-for="(img_item, img_index) in imgList"
                :key="img_index"
                :style="imgListStyle(9)"
              >
                <div
                  style="text-align: center"
                  @dblclick.stop="scaleImg(img_index)"
                >
                  <img :src="img_item.imgSrc" alt="" />
                  <div>{{ img_item.imgTitle }}</div>
                </div>
              </div>
            </div>
          </div>
          <!-- 回放视频 -->
          <div class="fl video_wrap" v-show="this.selectedId == 1">
            <div
              class="fl video_list"
              v-for="(video_item, video_index) in videoList"
              :key="video_index"
              @click="listChecked(video_item.id)"
            >
              <!-- <div
                style="padding: 1px"
                :class="{ active: selectClass == video_index }"
              > -->
              <LivePlayer
                :videoUrl="video_item.videlUrl"
                :show-custom-button="false"
                :muted="false"
                :controls="true"
                :autoplay="false"
                oncontextmenu="return false"
                fluent
                :stretch="true"
                :live="true"
                aspect="fullscreen"
                class="playerStyle"
              ></LivePlayer>
              <span>{{ video_item.videoTitle }}</span>
              <!-- </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 双击图片放大弹框 -->
    <el-dialog
      :visible.sync="cutDialogVisible"
      class="cutDialog"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <img :src="clickImgUrl" alt />
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          size="mini"
          @click="cutDialogVisible = false"
          style="width: 87px"
          >关闭</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import LivePlayer from '@liveqing/liveplayer'
import leftTab from './components/leftTab.vue'

export default {
  name: 'aboutUs',

  components: {
    LivePlayer,
    leftTab
  },

  data () {
    return {
      cutDialogVisible: false,
      clickImgUrl: '',
      leftItemData: [
        {
          info: [
            {
              id: 0,
              title: '禁捕政策',
              normalImgPath: require('../../assets/images/about/policy.png'),
              selectedImgPath: require('../../assets/images/about/policy-ck.png'),
              selected: true
            }
          ],
          video: []
        },
        {
          info: [
            {
              id: 1,
              title: '禁捕区域',
              normalImgPath: require('../../assets/images/about/area.png'),
              selectedImgPath: require('../../assets/images/about/area-ck.png'),
              selected: false
            }
          ],
          video: []
        }
      ],
      videoList: [
        {
          id: 0,
          videoTitle: '江滩-无人机巡航.mp4',
          videlUrl: 'http://111.47.13.103:40015/cloud-video/cjdbh/aaa.mp4'
        },
        {
          id: 1,
          videoTitle: '梁子湖-无人机禁捕.mp4',
          videlUrl: 'http://111.47.13.103:40015/cloud-video/cjdbh/bbb.mp4'
        },
        {
          id: 2,
          videoTitle: '石咀长江段-无人机禁捕.mp4',
          videlUrl: 'http://111.47.13.103:40015/cloud-video/cjdbh/ccc.mp4'
        },
        {
          id: 3,
          videoTitle: '武湖-红外监控禁捕.mp4',
          videlUrl: 'http://111.47.13.103:40015/cloud-video/cjdbh/ddd.mp4'
        }
      ],
      imgList: [
        {
          id: 0,
          imgTitle: '禁捕工作大事记',
          imgSrc: require('../../assets/images/about/dsj.jpg')
        },
        {
          id: 1,
          imgTitle: '推动禁捕工作',
          imgSrc: require('../../assets/images/about/jbgz.jpg')
        },
        {
          id: 2,
          imgTitle: '精准建档立卡',
          imgSrc: require('../../assets/images/about/jdk.jpg')
        },
        {
          id: 0,
          imgTitle: '落实补偿政策',
          imgSrc: require('../../assets/images/about/bczc.jpg')
        },
        {
          id: 1,
          imgTitle: '专项打击整治',
          imgSrc: require('../../assets/images/about/djzz.jpg')
        },
        {
          id: 2,
          imgTitle: '执法能力提升',
          imgSrc: require('../../assets/images/about/nlts.jpg')
        },
        {
          id: 0,
          imgTitle: '武汉在行动',
          imgSrc: require('../../assets/images/about/xd.jpg')
        },
        {
          id: 1,
          imgTitle: '加强舆论宣传',
          imgSrc: require('../../assets/images/about/ylxc.jpg')
        },
        {
          id: 2,
          imgTitle: '渔民转产安置',
          imgSrc: require('../../assets/images/about/zcaz.jpg')
        }
      ],
      tabTitle: '禁捕政策',
      selectClass: 0,
      selectedId: 0
    }
  },

  watch: {
    $route () {
      this.$destroy('LivePlayer')
    }
  },

  methods: {
    leftTabSelected (id) {
      //   console.log(id)
      for (let i = 0; i < this.leftItemData.length; i++) {
        const group = this.leftItemData[i]
        for (let j = 0; j < group.info.length; j++) {
          const item = group.info[j]
          //   console.log(item)
          if (item.id === id) {
            item.selected = true
            this.tabTitle = item.title
            this.selectedId = id
          } else {
            item.selected = false
          }
        }
      }
    },

    listChecked (select) {
      // console.log(select)
      this.selectClass = select
    },

    imgListStyle (n) {
      if (n === 9) {
        return {
          width: '33.33%',
          height: '33.33%'
        }
      }
    },

    scaleImg (id) {
      // alert(3553)
      this.cutDialogVisible = !this.cutDialogVisible
      this.clickImgUrl = this.imgList[id].imgSrc
    }
  }
}
</script>

<style lang="scss" scoped>
.leftBox {
  cursor: default;
  float: left;
  width: 283px;
  height: 899px;
  background: url("../../assets/images/Setting/setting-leftBox.png") no-repeat;
  background-size: 100% 100%;
}
.menu_head {
  margin-top: 26px;
  .menu_head_title {
    width: 196px;
    height: 34px;
    line-height: 34px;
    background: url(../../assets/images/device/info-title.png) no-repeat;
    padding-left: 30px;
    margin-left: 15px;
  }
}
.rightBox {
  cursor: default;
  margin-left: 293px;
  height: 899px;
  background: url("../../assets/images/Setting/setting-rightBox.png") no-repeat;
  background-size: 100% 100%;
  .rightBoxBase {
    // height: 879px;
    margin: 0 10px 10px 10px;
    overflow: auto;
    .content {
      width: 90%;
      height: 100%;
      margin: 50px 70px;
      .imgList {
        display: flex;
        flex-wrap: wrap;
        height: 710px;
        > div {
          img {
            width: 100%;
            height: 85%;
          }
          > div {
            box-sizing: border-box;
            // height: 223px;
            margin-right: 10px;
            margin-bottom: 10px;
            width: calc(100% - 10px);
            height: calc(100% - 10px);
            background: url("../../assets/images/video.png") no-repeat center
              center;
            background-color: #00497c;
            cursor: pointer;
          }
          > div.active {
            border: 2px solid rgba(255, 244, 100, 1);
          }
        }
      }
      .video_wrap {
        text-align: center;
        .video_list {
          margin-right: 20px;
          .playerStyle {
            width: 270px;
            height: 154px;
            background: rgb(152, 255, 169);
          }
        }
        .video_list > div.active {
          border: 1.5px solid #eb3030;
        }
        span {
          display: block;
          margin-top: 10px;
          font-size: 16px;
          color: #86d0e8;
        }
      }
    }
  }
}
.cutDialog {
  background: rgba(0, 0, 0, 0.6);
  img {
    width: 743px;
    height: 428px;
  }
  /deep/.el-dialog {
    width: 803px;
    height: 549px;
    background: url("../../assets/images/dialog-bg.png") no-repeat;
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      padding: 26px 30px;
    }
    .el-dialog__footer {
      padding: 0 30px;
      .remark {
        display: flex;
        justify-content: space-between;
        .replain {
          text-align: left;
          span {
            color: #fff;
          }
          .el-input {
            width: 410px;
            .el-input__inner {
              color: #fff;
              border: none;
              border-bottom: 1px solid rgb(153, 153, 153);
              background: transparent;
            }
            input::-webkit-input-placeholder {
              color: #999;
            }
          }
        }
        .el-button--default {
          background: transparent;
          color: rgba(30, 176, 252, 1);
        }
        .el-button--primary {
          background: #1eb0fc;
        }
      }
    }
  }
}
</style>
