<template>
  <div>
    <div style="width: 100%;">
      <div class="addressInfo">
        <div style="height: 70px;">
          <el-button
            style="float: right; width: 40px; margin-right: 20px;"
            type="primary"
            icon="el-icon-top-right"
            @click="goPlanSetting"
            circle
          ></el-button>
          <div style="margin-top: 30px; margin-left: 15px; font-size: 15px;">{{address}}</div>
          <div style="margin-top: 5px; margin-left: 15px; font-size: 12px;">
            {{subAddress}}
            <i class="el-icon-warning"></i>
          </div>
        </div>
        <div class="addressInfoDetail">
          <i class="el-icon-warning"></i>
          {{detailAddress}}
        </div>
        <div class="addressInfoDetail">
          <i class="el-icon-warning"></i>
          {{phoneNumber}}
        </div>
      </div>
      <el-collapse style="border: none;" v-model="coll_actives">
        <el-collapse-item>
          <template slot="title">
            <div style="margin-left: 15px;">基本情况说明</div>
          </template>
          <div class="itemContainer">
            <el-button size="mini" class="basicFactSheetBtn">单位基本情况</el-button>
            <el-button size="mini" class="basicFactSheetBtn">主要消防设施</el-button>
            <el-button size="mini" class="basicFactSheetBtn">重点部位情况</el-button>
            <el-button size="mini" class="basicFactSheetBtn">力量调集情况</el-button>
            <el-button size="mini" class="basicFactSheetBtn">重点提示</el-button>
          </div>
        </el-collapse-item>

        <el-collapse-item>
          <template slot="title">
            <div style="margin-left: 15px;">建筑平面图</div>
          </template>
          <div class="itemContainer">
            <HorCardList></HorCardList>
          </div>
        </el-collapse-item>

        <el-collapse-item>
          <template slot="title">
            <div style="margin-left: 15px;">作战部署图</div>
          </template>
          <div class="itemContainer">
            <img
              class="edit_img fl"
              src="http://img.zcool.cn/community/0146735edf53c8a801215aa09f6def.png@2o.png"
            />
            <i class="el-icon-edit-outline edit_icon fl" @click="toFightDeploy()"></i>
          </div>
        </el-collapse-item>

        <el-collapse-item>
          <template slot="title">
            <div style="margin-left: 15px;">三维预案</div>
          </template>
          <div class="itemContainer">
            <img
              src="http://img4.imgtn.bdimg.com/it/u=3773584324,1413178473&fm=214&gp=0.jpg"
              style="width: 100%; height: 200px; margin-top: 10px;"
            />
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import HorCardList from './HorizontalCardList.vue'

export default {
  data () {
    return {
      address: '武汉华夏理工学院',
      subAddress: 'XXXX-高校',
      detailAddress: '武汉市江夏区新技术开发区关山大道XXX',
      phoneNumber: '027-XXXXXXXX',

      coll_actives: [1]
    }
  },
  components: {
    HorCardList
  },
  methods: {
    goPlanSetting: function () {
      // console.log(666)
      this.$router.push({
        path: '/PlanSetting'
      })
    },

    toFightDeploy () {
      // console.log(355)
      this.$router.push({ path: '/FightDeploy' })
    }
  },

  // 设置下一个路由的meta,让列表缓存不刷新
  beforeRouteLeave (to, from, next) {
    to.meta.keepAlive = true
    next()
  }
}
</script>

<style lang="scss" scoped>
.addressInfo {
  .addressInfoDetail {
    margin-left: 15px;
    margin-right: 15px;
    height: 30px;
    line-height: 30px;
    border-top: 1px solid rgb(124, 133, 147);
    font-size: 13px;
  }
}

.basicFactSheetBtn {
  width: 105px;
  margin: 10px 10px 10px 0px;
}
.el-button + .el-button {
  margin-left: 0px;
}
.itemContainer {
  margin: 0 15px 0 15px;
  border-top: 1px solid rgb(124, 133, 147);
  .edit_img {
    width: 70%;
    height: 140px;
    margin: 10px 0 10px 35px;
  }
  .edit_icon {
    display: block;
    width: 25px;
    height: 25px;
    background-color: #fff;
    border-radius: 50%;
    font-size: 18px;
    text-align: center;
    line-height: 25px;
    cursor: pointer;
    margin: 122px 0 0 10px;
  }
}

/deep/.el-collapse-item__header {
  border-top: 1px solid rgb(124, 133, 147);
  border-bottom: none;
  background-color: rgba(21, 51, 77, 0.1);
  color: white;
}
/deep/.el-collapse-item__content {
  padding: 0;
}
/deep/.el-collapse-item__wrap {
  border: none;
  background-color: rgba(21, 51, 77, 0.1);
}
</style>
