<template>
  <div class="individual">
    <div class="container">
      <div style="height: 40px">
        <el-select
          placeholder="案件所属"
          v-model="search.belong"
          class="belongSel"
        >
          <el-option
            v-for="(item, index) in belongOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>

        <el-date-picker
          v-model="search.date"
          type="daterange"
          range-separator="ー"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
          class="datePickerStyle"
          @change="dateSearch"
        ></el-date-picker>

        <el-input
          placeholder="请输入举报人/举报地点/简要描述进行搜索"
          v-model="search.other"
          class="otherInput"
        ></el-input>

        <div class="searchBtn">
          <img
            :src="searchImg"
            style="
              margin-left: 18px;
              width: 17px;
              height: 22px;
              margin-top: 8px;
            "
          />
          <span
            style="
              display: inline-block;
              margin-left: 25px;
              height: 40px;
              line-height: 40px;
              vertical-align: top;
            "
            >搜索</span
          >
        </div>

        <div class="deleteBtn">批量删除</div>
        <!-- <div class="clearBtn">清空</div> -->
        <div class="chooseCount">
          已选<span style="color: #ff0000">10</span>项
        </div>
      </div>

      <div class="tableBox">
        <el-table
          class="webFsScroll"
          v-if="policeList"
          @row-click="clickTableRow"
          :data="policeList"
          empty-text="no data"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            width="60"
            align="center"
            label="序号"
            prop="xuHao"
          ></el-table-column>
          <el-table-column
            width="200"
            align="center"
            label="案件编号"
            prop="bianHao"
          ></el-table-column>
          <el-table-column
            align="center"
            label="信息来源"
            prop="source"
          ></el-table-column>
          <el-table-column
            width="105"
            align="center"
            label="举报人"
            prop="people"
          ></el-table-column>
          <el-table-column
            width="150"
            align="center"
            label="举报电话"
            prop="phone"
          ></el-table-column>
          <el-table-column
            width="250"
            align="center"
            label="举报地点"
            prop="address"
          ></el-table-column>
          <el-table-column
            width="180"
            align="center"
            label="举报时间"
            prop="time"
          ></el-table-column>
          <el-table-column
            align="center"
            label="案件所属"
            prop="belong"
          ></el-table-column>
          <el-table-column
            width="180"
            align="center"
            label="简要描述"
            prop="description"
          ></el-table-column>
          <el-table-column
            align="center"
            label="状态"
            prop="status"
          ></el-table-column>
          <el-table-column align="center" label="操作" prop="">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="resolve(scope.$index, scope.row)"
                style="width: 74px; height: 26px; background: #1EB0FC; font-size: 16px; border: none;"
                >未处置</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-pagination
          class="tablePagination"
          popper-class="pageSelect"
          :total="pageData.total"
          :page-size="pageData.pageSize"
          :current-page.sync="pageData.currentPage"
          layout="total, prev, pager, next, jumper"
          @current-change="currentPageChange"
        ></el-pagination> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'individual',
  data () {
    return {
      searchImg: require('../../assets/images/policeHistory/search.png'),
      belongOptions: [],
      search: {
        belong: '',
        date: '',
        other: ''
      },

      policeList: [
        {
          selected: true,
          xuHao: '1',
          bianHao: 'YZ63718FFB7380BL89',
          source: '群众举报',
          people: '三儿',
          phone: '88888888888',
          address: '江夏区江夏区江夏区江夏区',
          time: '8888-88-88 88:88:88',
          belong: '武汉市渔政',
          description: '疑似有非法捕捞船只',
          status: '未处置'
        },
        {
          selected: true,
          xuHao: '2',
          bianHao: 'YZ63718FFB7380BL89',
          source: '群众举报',
          people: '三儿',
          phone: '88888888888',
          address: '江夏区江夏区江夏区江夏区',
          time: '2019-11-11 11:11:11',
          belong: '武汉市渔政',
          description: '疑似有非法捕捞船只',
          status: '未处置'
        },
        {
          selected: true,
          xuHao: '3',
          bianHao: 'YZ63718FFB7380BL89',
          source: '群众举报',
          people: '三儿',
          phone: '88888888888',
          address: '江夏区江夏区江夏区江夏区',
          time: '2019-11-11 11:11:11',
          belong: '武汉市渔政',
          description: '疑似有非法捕捞船只',
          status: '未处置'
        },
        {
          selected: true,
          xuHao: '4',
          bianHao: 'YZ63718FFB7380BL89',
          source: '群众举报',
          people: '三儿',
          phone: '88888888888',
          address: '江夏区江夏区江夏区江夏区',
          time: '2019-11-11 11:11:11',
          belong: '武汉市渔政',
          description: '疑似有非法捕捞船只',
          status: '未处置'
        },
        {
          selected: true,
          xuHao: '5',
          bianHao: 'YZ63718FFB7380BL89',
          source: '群众举报',
          people: '三儿',
          phone: '88888888888',
          address: '江夏区江夏区江夏区江夏区',
          time: '2019-11-11 11:11:11',
          belong: '武汉市渔政',
          description: '疑似有非法捕捞船只',
          status: '未处置'
        }
      ],
      multipleSelection: []
    }
  },
  methods: {
    // 勾选变化
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(val)
    },
    // 处置
    resolve (index, row) {
      console.log(index, row)
    },
    // 日期搜索
    dateSearch () {
      // if (this.date1) {
      //   this.pageData.currentPage = 1
      //   var beginDate = new Date(this.date1[0])
      //   var beginTime = beginDate.getTime()
      //   var endDate = new Date(this.date1[1])
      //   var endTime = endDate.getTime()
      //   this.pageData.beginTime = beginTime
      //   this.pageData.endTime = endTime
      //   this.getFirePoliceList()
      // } else {
      //   this.pageData.beginTime = ''
      //   this.pageData.endTime = ''
      //   this.getFirePoliceList()
      // }
    },
    // 点击表格行
    clickTableRow (row) {
      // this.radio = this.firePoliceList.indexOf(row)
      // var detail = this.firePoliceList[this.radio]
      // if (detail.alarmPicList) {
      //   this.fireDetailInfo.image1 = detail.alarmPicList[0].picPath
      //   this.fireDetailInfo.image2 = detail.alarmPicList[1].picPath
      // }
      // this.fireDetailInfo.alarmTime = detail.alarmTime
      // this.fireDetailInfo.alarmTypeName = detail.alarmTypeName
      // this.fireDetailInfo.deviceName = detail.deviceName
      // this.fireDetailInfo.alarmAddress = detail.alarmAddress
      // this.fireDetailInfo.alarmStatus = detail.alarmStatus
      // this.fireDetailInfo.updateTime = detail.updateTime
      // this.fireDetailInfo.id = detail.id
      // if (detail.alarmStatus === '确认' || detail.alarmStatus === '误报') {
      //   this.fireDetailInfo.showConfirm = false
      // } else {
      //   this.fireDetailInfo.showConfirm = true
      // }
      // this.showFireDetail = true
      // const p = this
      // setTimeout(() => {
      //   const tmpMap = p.$refs.gduMap.map2D
      //   tmpMap._map.updateSize()
      //   tmpMap.zoomToCenter(detail.alarmLongitude, detail.alarmLatitude)
      //   tmpMap.customMarkerLayerManager.addMarker({
      //     lon: detail.alarmLongitude,
      //     lat: detail.alarmLatitude
      //   })
      //   tmpMap.setZoom(16)
      // }, 500)
    }
  },
  created () {}
}
</script>

<style lang="scss" scoped>
.individual {
  // min-width: 1600px;
  height: 899px;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
}
.container {
  min-width: 1560px;
  height: 800px;
  padding: 40px 48px 48px 48px;
  background: url(../../assets/images/policeHistory/box.png) no-repeat;
  background-size: 100%;
  // margin-right: 20px;
  // margin-left: 20px;
}

.belongSel {
  /deep/.el-input__inner {
    width: 287px;
    height: 40px;
    color: #c5f3ff;
    border: solid 1px #1eb0fc;
    background-color: transparent;
    font-size: 16px;
  }
}

.otherInput {
  width: 450px;
  height: 40px;
  margin-left: 27px;
  /deep/.el-input__inner {
    width: 450px;
    height: 40px;
    color: #c5f3ff;
    border: solid 1px #1eb0fc;
    background-color: transparent;
    font-size: 16px;
  }
}

.datePickerStyle {
  display: inline-block;
  background-color: transparent;
  border-color: #1eb0fc;
  width: 427px;
  height: 40px;
  margin-left: 20px;
  /deep/.el-range-separator {
    color: #00d0f9;
  }
}
/deep/.el-date-editor .el-range-input {
  color: #c5f3ff;
  background: transparent;
  font-size: 16px;
}

.searchBtn {
  display: inline-block;
  width: 127px;
  height: 40px;
  margin-left: 20px;
  background-color: #086484;
  cursor: pointer;
  vertical-align: top;
}

.deleteBtn {
  float: right;
  margin-top: 10px;
  background: #ff0000;
  color: white;
  font-size: 16px;
  width: 96px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}
// .clearBtn {
//   float: right;
//   margin-top: 10px;
//   margin-right: 22px;
//   background: #1eb0fc;
//   color: white;
//   font-size: 16px;
//   width: 54px;
//   height: 30px;
//   text-align: center;
//   line-height: 30px;
// }
.chooseCount {
  float: right;
  margin-top: 10px;
  color: white;
  font-size: 16px;
  width: 100px;
  height: 30px;
  text-align: center;
  line-height: 30px;
}

.tableBox {
  margin-top: 20px;
  // width: 1729px;
  height: 690px;
  background: #183258;
  // margin: 30px 0 0 18px;
  overflow: hidden;
  .tablePagination {
    padding-top: 30px;
    text-align: center;
  }
}
.el-table {
  color: white;
  font-size: 14px;
  background-color: transparent;
  /* 表格表头样式 */
  /deep/.el-table__header-wrapper th {
    // color: rgba(255, 255, 255, 1);
    color: #c5f3ff;
    font-size: 16px;
    height: 40px;
    padding: 0;
    // background-color: rgba(54, 143, 187, 1);
    background-color: #0c789e;
  }
  /* 表格每行高度*/
  /deep/.el-table__body td {
    height: 38px;
    padding: 0;
  }
  /deep/.el-table__body tr {
    background-color: transparent;
    color: #c5f3ff;
    font-size: 16px;
  }
  /* 鼠标hover每行的样式*/
  /deep/.el-table__body tr:hover > td {
    background-color: rgba(51, 105, 132, 1);
  }
  /deep/td,
  /deep/th {
    border: none;
  }
  /deep/.el-table__fixed {
    height: 100% !important;
  }
  // 单选框样式
  /deep/.el-checkbox__inner {
    background-color: transparent;
    border-color: #c5f3ff;
  }
  /deep/.el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    border-color: #c5f3ff;
  }
}
// /deep/.el-table .cell {
//   white-space: pre-line;
// }
</style>
