<template>
  <div class="individual">
    <div class="container">
      <div style="height: 40px">
        <el-select
          placeholder="案件所属"
          v-model="search.belong"
          class="belongSel"
          clearable
        >
          <el-option
            v-for="(item, index) in deptTree"
            :key="index"
            :label="item.deptName"
            :value="item.deptCode"
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
          value-format="yyyyMMdd"
        ></el-date-picker>

        <el-input
          placeholder="请输入举报人/举报地点/简要描述进行搜索"
          v-model="search.other"
          class="otherInput"
        ></el-input>

        <div class="searchBtn" @click="searchClick">
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

        <div class="deleteBtn" @click="deleteClick">批量删除</div>
        <!-- <div class="clearBtn">清空</div> -->
        <div class="chooseCount">
          已选<span style="color: #ff0000">{{ selectedItem.length }}</span
          >项
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
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="showDetailClick(scope.$index, scope.row)"
                style="
                  width: 200px;
                  background-color: transparent;
                  border: none;
                  font-size: 16px;
                  color: #1eb0fc;
                "
              >
                {{ scope.row.bianHao }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="信息来源"
            prop="source"
          ></el-table-column>
          <el-table-column
            align="center"
            label="举报人"
            prop="people"
          ></el-table-column>
          <el-table-column
            align="center"
            label="举报电话"
            prop="phone"
          ></el-table-column>
          <el-table-column
            align="center"
            label="举报地点"
            prop="address"
          ></el-table-column>
          <el-table-column
            align="center"
            label="举报时间"
            prop="time"
            width="170"
          ></el-table-column>
          <el-table-column
            align="center"
            label="案件所属"
            prop="belong"
          ></el-table-column>
          <el-table-column
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
                class="unHandleBtn"
                v-if="scope.row.status === '未处置'"
                >未处置</el-button
              >
              <el-button size="mini" type="danger" v-else class="handleBtn"
                >已处置</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="margin-right: 32px; text-align: right">
        <el-pagination
          class="tablePagination"
          popper-class="pageSelect"
          :total="pageData.total"
          :page-size="pageData.pageSize"
          :current-page.sync="pageData.currentPage"
          layout="total, prev, pager, next, jumper"
          @current-change="currentPageChange"
        ></el-pagination>
      </div>
    </div>

    <el-dialog :close-on-click-modal="false" :visible.sync="showDetail" width="852px" class="detailDlg">
      <div>
        <div class="detailTitle">案件信息</div>
        <div class="detailTitleLine"></div>
        <div>
          <div class="detailText1 detailText2">
            案件编号：{{ detailDlg.bianHao }}
          </div>
          <div class="detailText1">信息来源：{{ detailDlg.source }}</div>
        </div>
        <div>
          <div class="detailText1 detailText2">
            举报人：{{ detailDlg.people }}
          </div>
          <div class="detailText1">举报电话：{{ detailDlg.phone }}</div>
        </div>
        <div class="detailText3">举报地址：{{ detailDlg.address }}</div>
        <div>
          <div class="detailText1 detailText2">
            举报时间：{{ detailDlg.time }}
          </div>
          <div class="detailText1">案件所属：{{ detailDlg.belong }}</div>
        </div>
        <div class="detailText3">简要描述：{{ detailDlg.description }}</div>
        <div class="detailText3">重点记录：{{ detailDlg.mainRecord }}</div>

        <div class="detailTitle" style="margin-top: 33px">处置信息</div>
        <div class="detailTitleLine"></div>
        <div class="detailText3">处置结果：{{ detailDlg.handleResult }}</div>
        <div>
          <div class="detailText1 detailText2">
            处置时间：{{ detailDlg.handleTime }}
          </div>
          <div class="detailText1">处置人：{{ detailDlg.handlePeople }}</div>
        </div>

        <div class="npdCancel" @click="detailCancelClick">关闭</div>
      </div>
    </el-dialog>

    <el-dialog :close-on-click-modal="false" :visible.sync="showHandle" width="960px" class="newPoliceDlg">
      <div>
        <div class="npdTitleSty">处置记录</div>
        <el-form
          ref="handleRef"
          :model="handleForm"
          label-width="90px"
          :inline="true"
          :rules="handleRules"
          style="margin-top: 30px; margin-left: 46px; margin-right: 50px"
        >
          <el-form-item label="处置记录" prop="record" class="input2">
            <el-input
              placeholder="请输入"
              v-model="handleForm.record"
            ></el-input>
          </el-form-item>
          <el-form-item label="处置时间" prop="time" class="input1">
            <el-date-picker
              v-model="handleForm.time"
              type="datetime"
              placeholder="请选择"
              class="timeStyle"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="处置人" prop="people" class="input2">
            <el-input
              placeholder="请输入"
              v-model="handleForm.people"
            ></el-input>
          </el-form-item>
        </el-form>
        <div style="height: 32px">
          <div class="npdConfirm1" @click="handelConfirmClick">确定</div>
          <div class="npdCancel1" @click="handelCancelClick">取消</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { policeApi } from '@/api/police.js'
import { Notification } from 'element-ui'
import qs from 'qs'
import { loginApi } from '@/api/login'

export default {
  name: 'individual',
  created () {
    this.getList()
    this.getDeptTree()
  },
  data () {
    return {
      searchImg: require('../../assets/images/policeHistory/search.png'),
      deptTree: [],
      search: {
        belong: '',
        date: '',
        other: ''
      },

      policeList: [],
      pageData: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      },

      showDetail: false,

      showHandle: false,
      handleForm: {
        record: '',
        time: '',
        people: ''
      },
      handleRules: {
        record: [{ required: true, message: '请输入处置记录' }],
        time: [{ required: true, message: '请选择处置时间' }],
        people: [{ required: true, message: '请输入处置人' }]
      },
      handleItem: '',

      currentIndex: -1,

      selectedItem: [],

      detailDlg: {
        bianHao: '',
        source: '',
        people: '',
        phone: '',
        address: '',
        time: '',
        belong: '',
        description: '',
        mainRecord: '',
        handleResult: '',
        handleTime: '',
        handlePeople: ''
      }
    }
  },
  methods: {
    async getList () {
      var param = {
        caseBelong: this.search.belong,
        content: this.search.other,
        currentPage: this.pageData.currentPage,
        startTime: this.search.date ? this.search.date[0] : null,
        endTime: this.search.date ? this.search.date[1] : null,
        pageSize: this.pageData.pageSize
      }
      this.$axios
        .post(policeApi.selectPage, param, {
          headers: { 'Content-Type': 'application/json;charset=UTF-8' }
        })
        .then((res) => {
          if (res && res.data && res.data.code === 0) {
            var tempData = res.data.data
            this.pageData.total = tempData.total

            var tempArr = []
            tempData.records.forEach((item, index) => {
              var dict = {
                id: item.id,
                xuHao: index + 1,
                bianHao: item.caseNo,
                source: item.infoSource,
                people: item.reportMan,
                phone: item.reportTel,
                address: item.reportAddr,
                time: item.reportTime,
                belong: item.caseBelong,
                description: item.caseDesc,
                status: item.caseStatus,
                mainRecord: item.importantRecord,
                handleResult: item.dispositionRecord,
                handleTime: item.dispositionTime,
                handlePeople: item.dispositionMan
              }
              tempArr.push(dict)
            })
            this.policeList = tempArr
          }
        })
    },

    // 获取组织树
    async getDeptTree () {
      this.$axios.post(loginApi.getDeptTree).then((res) => {
        if (res && res.data && res.data.code === 0) {
          this.deptTree = res.data.data[0].children
        }
      })
    },

    searchClick () {
      console.log('searchClick')
      this.getList()
    },
    // 点击表格行
    clickTableRow (row) {},
    // 分页页数改变
    currentPageChange () {
      this.getList()
    },
    // 勾选变化
    handleSelectionChange (val) {
      this.selectedItem = val
      console.log(val)
    },
    async deleteClick () {
      if (this.selectedItem.length <= 0) {
        Notification({
          title: '提示',
          message: '请选择要删除的项目',
          type: 'warning',
          duration: 5 * 1000
        })
        return
      }

      var ids = []
      this.selectedItem.forEach((item) => {
        ids.push(item.id)
      })

      this.$axios
        .post(
          policeApi.deleteBatch,
          qs.stringify({ ids: ids }, { arrayFormat: 'comma' })
        )
        .then((res) => {
          if (res && res.data && res.data.code === 0) {
            this.getList()
            Notification({
              title: '提示',
              message: '删除成功',
              type: 'success',
              duration: 5 * 1000
            })
          }
        })
    },
    // 显示案件详情
    showDetailClick (index, row) {
      // console.log(index, row)
      this.currentIndex = index

      this.detailDlg.bianHao = this.policeList[index].bianHao
      this.detailDlg.source = this.policeList[index].source
      this.detailDlg.people = this.policeList[index].people
      this.detailDlg.phone = this.policeList[index].phone
      this.detailDlg.address = this.policeList[index].address
      this.detailDlg.time = this.policeList[index].time
      this.detailDlg.belong = this.policeList[index].belong
      this.detailDlg.description = this.policeList[index].description
      this.detailDlg.mainRecord = this.policeList[index].mainRecord
      this.detailDlg.handleResult = this.policeList[index].handleResult
      this.detailDlg.handleTime = this.policeList[index].handleTime
      this.detailDlg.handlePeople = this.policeList[index].handlePeople

      this.showDetail = true
    },
    // 关闭详情
    detailCancelClick () {
      this.showDetail = false
    },
    // 处置
    resolve (index, row) {
      // console.log(index, row)
      this.handleItem = row
      this.showHandle = true
    },
    // 处置弹窗-确定
    handelConfirmClick () {
      this.$refs.handleRef.validate((valid) => {
        if (!valid) {
          return
        }

        this.showHandle = false

        var param = {
          id: this.handleItem.id,
          dispositionMan: this.handleForm.people,
          dispositionRecord: this.handleForm.record,
          dispositionTime: this.handleForm.time
        }
        this.$axios
          .post(policeApi.dispose, param, {
            headers: { 'Content-Type': 'application/json;charset=UTF-8' }
          })
          .then((res) => {
            if (res && res.data && res.data.code === 0) {
              this.getList()
              Notification({
                title: '提示',
                message: '处置成功',
                type: 'success',
                duration: 5 * 1000
              })
            }
          })
      })
    },
    // 处置弹窗-取消
    handelCancelClick () {
      this.showHandle = false
    }
  }
}
</script>

<style lang="scss" scoped>
.individual {
  min-width: 1700px;
  height: 899px;
  padding-top: 20px;
}
.container {
  margin: 0 auto;
  width: 93%;
  height: 800px;
  padding: 40px 48px 48px 48px;
  background: url(../../assets/images/policeHistory/box.png) no-repeat;
  background-size: 100% 100%;
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
  height: 690px;
  background: #183258;
  overflow: hidden;
}
.el-table::before {
  height: 0px;
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
.unHandleBtn {
  width: 74px;
  height: 26px;
  background: #1eb0fc;
  font-size: 16px;
  border: none;
}
.handleBtn {
  width: 74px;
  height: 26px;
  background: rgba($color: #1eb0fc, $alpha: 0.5);
  font-size: 16px;
  border: none;
}

.detailDlg.el-dialog__wrapper {
  /deep/.el-dialog {
    .el-dialog__header {
      display: none;
    }
    background: transparent;
    .el-dialog__body {
      display: inline-block;
      // padding: 0px;
      padding: 45px 54px 41px 59px;
      width: 100%;
      height: 569px;
      background: url(../../assets/images/policeHistory/detailBox.png) no-repeat;
      background-size: 100% 100%;
    }
  }
}
.npdCancel {
  float: right;
  width: 87px;
  height: 32px;
  background: transparent;
  color: #1eb0fc;
  font-size: 18px;
  line-height: 32px;
  text-align: center;
  border-radius: 4px;
  border: solid 1px #1eb0fc;
  cursor: pointer;
  margin-top: 24px;
}

.detailTitle {
  color: #1eb0fc;
  font-size: 18px;
  font-style: italic;
}
.detailTitleLine {
  height: 3px;
  background: url(../../assets/images/policeHistory/detailLine.png) no-repeat;
  background-size: 100% 100%;
}
.detailText1 {
  display: inline-block;
  color: white;
  font-size: 16px;
  margin-top: 25px;
}
.detailText2 {
  width: 450px;
}
.detailText3 {
  color: white;
  font-size: 16px;
  margin-top: 25px;
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
      height: 329px;
      background: url(../../assets/images/policeHistory/handleBox.png)
        no-repeat;
      background-size: 100% 100%;
      .npdTitleSty {
        width: 166px;
        height: 34px;
        color: white;
        font-size: 18px;
        font-weight: bold;
        line-height: 42px;
        background: url(../../assets/images/header-bg.png) no-repeat;
        background-size: 100% 100%;
        padding-left: 30px;
        margin: 20px 0 0 24px;
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
.npdConfirm1 {
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
.npdCancel1 {
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
