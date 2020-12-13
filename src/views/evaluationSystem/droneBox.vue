<template>
  <div class="droneBox">
    <div class="titleBox">
      <span></span>
      <span>{{dataInfo.title}}</span>
      <span @click="close"></span>
    </div>
    <div class="playerBox" @dblclick="showDialog">
      <LivePlayer
        v-if="isOnline"
        ref="playerCtrl"
        :videoUrl="streamUrl"
        :show-custom-button="false"
        :muted="false"
        :controls="false"
        :autoplay="true"
        oncontextmenu="return false"
        fluent
        :stretch="true"
        :live="true"
        aspect="fullscreen"
        :poster="poster"
      ></LivePlayer>
    </div>
    <span class="change" v-if="dataInfo.urls && dataInfo.urls.length > 1" @click="changeStream"></span>
    <div class="droneDetail">
      <ul>
        <li>
          <span>设备名称： {{dataInfo.name}}</span>
        </li>
        <li>
          <span>设备编码： {{dataInfo.id}}</span>
        </li>
        <li>
          <span>设备品牌： {{dataInfo.brand}}</span>
        </li>
        <li>
          <span>所在地区： {{dataInfo.address}}</span>
        </li>
      </ul>
    </div>
    <el-dialog
      custom-class="el-dialog-custom"
      :visible.sync="dialogVisible"
      :show-close="false"
      center
      :append-to-body="true"
    >
      <LivePlayer
        v-if="isOnline"
        ref="playerCtrl"
        :videoUrl="streamUrl"
        :show-custom-button="false"
        :muted="false"
        :controls="false"
        :autoplay="true"
        oncontextmenu="return false"
        fluent
        :stretch="true"
        :live="true"
        aspect="fullscreen"
        :poster="poster"
      ></LivePlayer>
    </el-dialog>
  </div>
</template>

<script>
import LivePlayer from '@liveqing/liveplayer'
export default {
  name: 'droneInfo',
  data () {
    return {
      streamUrl: '',
      isOnline: false,
      poster: require('../../assets/images/loading.gif'),
      dialogVisible: false
    }
  },
  props: {
    dataInfo: {
      default: () => {}
    }
  },
  components: {
    LivePlayer
  },
  mounted () {
    if (this.dataInfo.urls && this.dataInfo.urls.length > 0) {
      this.streamUrl = this.dataInfo.urls[0]
    }
  },
  methods: {
    /**
     *  显示视频放大对话框窗口
     */
    showDialog () {
      if (!this.isOnline) return
      this.dialogVisible = true
    },
    /**
     *  关闭vue overlay
     */
    close () {
      if (this.closeOverlay) {
        this.closeOverlay()
      }
    },
    updateDroneOnlineStatus (online) {
      this.isOnline = online
    },
    /**
     *  切换视频（高点监控可见光/红外切换）
     */
    changeStream () {
      const url = this.dataInfo.urls.find(u => u !== this.streamUrl)
      this.streamUrl = url
    }
  }
}
</script>

<style lang="less" scoped>
.droneBox {
  position: relative;
  width: 398px;
  height: 176px;
  box-sizing: border-box;
  background: #121e3ad8;
  border: 1px solid #1eb0fc;
  .titleBox {
    width: 369px;
    height: 35px;
    box-sizing: border-box;
    border-bottom: 1px solid #1eb0fc;
    margin-left: 17px;
    span:nth-child(1) {
      position: absolute;
      width: 21px;
      height: 16px;
      top: 10px;
      background-image: url("../../assets/images/fire_title.png");
    }
    span:nth-child(2) {
      position: absolute;
      line-height: 35px;
      left: 48px;
    }
    span:nth-child(3) {
      position: absolute;
      width: 12px;
      height: 12px;
      top: 11px;
      right: 11px;
      background-image: url("../../assets/images/3d/close.png");
      cursor: pointer;
    }
  }
  .change {
    display: inline-block;
    position: absolute;
    width: 20px;
    height: 20px;
    top: 140px;
    left: 145px;
    background-image: url("../../assets/images/change.png");
    cursor: pointer;
  }
  .playerBox {
    position: absolute;
    width: 148px;
    height: 110px;
    top: 50px;
    left: 17px;
    background-image: url("../../assets/images/droneOffline.png");
  }
  .droneDetail {
    position: absolute;
    font-size: 12px;
    top: 50px;
    left: 178px;
    line-height: 28px;
  }
}
</style>
