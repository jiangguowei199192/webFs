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
          <div class="fl video_wrap">
            <div
              class="fl video_list"
              v-for="(video_item, video_index) in videoList"
              :key="video_index"
              @click="listChecked(video_item.id)"
            >
              <div
                style="padding: 1px"
                :class="{ active: selectClass == video_index }"
              >
                <LivePlayer
                  :videoUrl="video_item.videlUrl"
                  :show-custom-button="false"
                  :muted="false"
                  :controls="true"
                  :autoplay="true"
                  oncontextmenu="return false"
                  fluent
                  :stretch="true"
                  :live="true"
                  aspect="fullscreen"
                  class="playerStyle"
                ></LivePlayer>
                <span>{{ video_item.videoTitle }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
        },
        {
          info: [
            {
              id: 2,
              title: '工作进展',
              normalImgPath: require('../../assets/images/about/progress.png'),
              selectedImgPath: require('../../assets/images/about/progress-ck.png'),
              selected: false
            }
          ],
          video: []
        },
        {
          info: [
            {
              id: 3,
              title: '成果展示',
              normalImgPath: require('../../assets/images/about/result.png'),
              selectedImgPath: require('../../assets/images/about/result-ck.png'),
              selected: false
            }
          ],
          video: []
        }
      ],
      videoList: [
        {
          id: 0,
          videoTitle: '禁捕政策文件01.mp4',
          videlUrl: 'rtmp://58.200.131.2:1935/livetv/hunantv'
        },
        {
          id: 1,
          videoTitle: '禁捕政策文件02.mp4',
          videlUrl: 'rtmp://58.200.131.2:1935/livetv/hunantv'
        },
        {
          id: 2,
          videoTitle: '禁捕政策文件03.mp4',
          videlUrl: 'rtmp://58.200.131.2:1935/livetv/hunantv'
        },
        {
          id: 3,
          videoTitle: '禁捕政策文件04.mp4',
          videlUrl: 'rtmp://58.200.131.2:1935/livetv/hunantv'
        }
      ],
      tabTitle: '禁捕政策',
      selectClass: 0
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
          } else {
            item.selected = false
          }
        }
      }
    },

    listChecked (select) {
      console.log(select)
      this.selectClass = select
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
      margin: 30px 70px;
      .video_wrap {
        text-align: center;
        .video_list {
          margin-right: 20px;
          .playerStyle {
            width: 270px;
            height: 154px;
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
</style>
