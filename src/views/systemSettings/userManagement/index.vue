<template>
  <div>
    <div class="container">
      <button type="button" class="back" @click="back">
        <img :src="backImg">
        用户管理
      </button>
      <div class="rightBox">
        <el-input v-model="searchInput" class="searchInput">
          <template slot="prepend">用户名：</template>
        </el-input>
        <el-popover
          placement="right"
          width="150"
          trigger="click"
          popper-class="el-popover-more"
          v-model="showMorePopover">
          <div style="text-align: center;">
            <el-button class="popoverBtn" @click="userAdd">新增用户</el-button>
            <el-button class="popoverBtn" @click="userEdit">修改用户</el-button>
            <el-button class="popoverBtn" @click="userDelete">删除用户</el-button>
          </div>
          <button slot="reference" type="button" class="more"><img :src="moreImg"></button>
        </el-popover>
        <button type="button" class="more" @click="download()">
          <img :src="downloadImg">
        </button>
        <button type="button" class="more" @click="refresh()">
          <img :src="refreshImg">
        </button>
        <button type="button" class="more" @click="search()">
          <img :src="searchImg">
        </button>
        <div class="tableBox">
          <el-table @row-click="ClickTableRow" :data="userList" stripe empty-text="no data" tooltip-effect="light">
            <el-table-column label width="33" align="center" :resizable="false">
              <template slot-scope="scope">
                <el-radio v-model="radio" :label="scope.$index">{{''}}</el-radio>
              </template>
            </el-table-column>
            <el-table-column align="center" label="用户名" prop="useraccount"></el-table-column>
            <el-table-column align="center" label="用户姓名" prop="username"></el-table-column>
            <!-- <el-table-column align="center" label="所属部门" prop="deptName"></el-table-column> -->
            <el-table-column align="center" label="职务" prop="roleName"></el-table-column>
            <el-table-column align="center" label="所属组织" prop="deptName"></el-table-column>
            <el-table-column align="center" label="激活">
              <template slot-scope="scope">
                <el-switch v-model="userList[scope.$index].status"></el-switch>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="resetPasswordClick(scope.$index, scope.row)"
                  style="width: 80px;">重置密码</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
          class="tablePagination"
          popper-class="pageSelect"
          :total="pageData.total"
          :page-size="pageData.pageSize"
          :current-page.sync="pageData.currentPage"
          layout="total, prev, pager, next, jumper"
          @current-change="currentPageChange"></el-pagination>
        </div>
      </div>
    </div>

    <el-dialog
      :title="newUserTitle"
      :visible.sync="showNewUser"
      width="30%"
      class="dialogStyle">
      <el-form ref="newUserFormRef" :model="newUserForm" label-width="80px" :rules="newUserRules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="newUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" prop="name">
          <el-input v-model="newUserForm.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="newUserForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="newUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="职务">
          <el-select :popper-append-to-body="false" v-model="newUserForm.job" placeholder="请选择职务" class="selectStyle" popper-class="select-popper">
            <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.roleCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属组织">
          <el-select :popper-append-to-body="false" v-model="newUserForm.organizations" multiple placeholder="请选择组织" class="selectStyle" popper-class="select-popper">
            <el-option v-for="item in organizationOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="激活" prop="active">
          <el-switch v-model="newUserForm.active"></el-switch>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="newUserForm.six">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="初始密码">
          <el-input v-model="newUserForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="newUserConfirm" class="trueBtn">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      title="重置密码"
      :visible.sync="showResetPassword"
      width="30%"
      class="dialogStyle">
      <el-form ref="resetPasswordFormRef" :model="resetPasswordForm" label-width="80px" :rules="resetPasswordRules">
        <el-form-item label="新密码" prop="password">
          <el-input v-model="resetPasswordForm.password" placeholder="请输入重置密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetPasswordConfirm" class="trueBtn">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { Notification } from 'element-ui'
import { settingApi } from '@/api/setting'
export default {
  created () {
    this.getUserList()
    this.getRoleList()
  },
  data () {
    return {
      searchInput: '',
      backImg: require('../../../assets/images/Setting/setting-back.png'),
      moreImg: require('../../../assets/images/Setting/setting-more.png'),
      downloadImg: require('../../../assets/images/Setting/setting-download.png'),
      searchImg: require('../../../assets/images/Setting/setting-search.png'),
      refreshImg: require('../../../assets/images/Setting/setting-refresh.png'),

      showMorePopover: false, // 展示更多弹窗
      showNewUser: false, // 新建用户弹窗
      showResetPassword: false, // 重置密码弹窗

      pageData: {
        total: 0, // 总条目数
        pageSize: 10, // 每页显示条目个数
        currentPage: 1 // 当前页
      },

      userList: [],
      roleList: [],

      newUserTitle: '',
      newUserForm: {
        username: '',
        name: '',
        phone: '',
        email: '',
        job: '',
        active: true,
        six: '',
        password: '123456',
        organizations: []
      },
      newUserRules: {
        username: [
          { required: true, message: '请输入用户名' }
        ],
        name: [
          { required: true, message: '请输入姓名' }
        ],
        phone: [
          { required: true, message: '请输入手机号' }
        ],
        active: [
          { required: true }
        ]
      },

      organizationOptions: [
        { value: 'val1', label: 'lab1' },
        { value: 'val2', label: 'lab2' },
        { value: 'val3', label: 'lab3' },
        { value: 'val4', label: 'lab4' },
        { value: 'val5', label: 'lab5' }
      ],
      resetPasswordForm: {
        password: ''
      },
      resetPasswordRules: {
        password: [
          { required: true, message: '请输入密码' }
        ]
      },
      radio: -1
    }
  },
  methods: {
    back () {
      this.$router.push({ path: '/systemSettings' })
    },
    // 获取用户列表
    getUserList () {
      var param = {
        currentPage: this.pageData.currentPage,
        pageSize: this.pageData.pageSize,
        useraccount: this.searchInput
      }
      this.$axios.post(settingApi.queryUserPage, param).then(res => {
        if (res.data.code === 0) {
          this.userList = res.data.data.records
          this.pageData.total = res.data.data.total
        }
      })
    },
    // 获取职务列表
    getRoleList () {
      this.$axios.post(settingApi.getRoleList).then(res => {
        if (res.data.code === 0) {
          this.roleList = res.data.data
        }
      })
    },
    // 分页页数改变
    currentPageChange () {
      this.getUserList()
    },
    // 点击表格行
    ClickTableRow (row) {
      this.radio = this.userList.indexOf(row)
    },
    // 重置密码
    resetPasswordClick (index, row) {
      this.showResetPassword = true
    },
    // 搜索
    search () {
      if (this.searchInput.length <= 0) {
        Notification({
          title: '提示',
          message: '请输入地址后查询',
          type: 'warning',
          duration: 5 * 1000
        })
        return
      }
      this.pageData.currentPage = 1
      this.getUserList()
    },
    // 搜索
    refresh () {
      this.pageData.currentPage = 1
      this.getUserList()
    },
    download () {
      console.log('download')
    },
    userAdd () {
      this.showMorePopover = false
      this.showNewUser = true
      this.newUserTitle = '新增用户'
    },
    userEdit () {
      this.showMorePopover = false
      if (this.radio < 0) {
        Notification({
          title: '提示',
          message: '请选择用户',
          type: 'warning',
          duration: 5 * 1000
        })
        return ''
      }
      this.showNewUser = true
      this.newUserTitle = '修改用户'
    },
    userDelete () {
      this.showMorePopover = false
      if (this.radio < 0) {
        Notification({
          title: '提示',
          message: '请选择用户',
          type: 'warning',
          duration: 5 * 1000
        })
        return ''
      }
    },
    newUserConfirm () {
      this.$refs.newUserFormRef.validate(async valid => {
        if (!valid) return
        this.showNewUser = false
      })
    },
    resetPasswordConfirm () {
      this.$refs.resetPasswordFormRef.validate(async valid => {
        if (!valid) return
        this.showResetPassword = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .back {
    width: 170px;
    height: 40px;
    border: solid 1px #39a4dd;
    font-size: 18px;
    color: #ffffff;
    background-color: transparent;
    outline: none;
    display: block;
  }
  .container {
    width: 1242px;
    height: 756px;
    margin: 55px auto 0 auto;
  }
  .rightBox {
    width: 796px;
    height: 682px;
    border: solid 2px #39a4dd;
    border-radius: 10px;
    margin: 30px auto 0 auto;
    .searchInput {
      width: 253px;
      margin: 21px 0px 0px 20px;
      /deep/ .el-input__inner {
        background-color: transparent;
        font-size: 12px;
        color: white;
        border-radius: 0;
        border: 0;
        border-bottom: solid 1px #368fbb;
      }
      /deep/ .el-input-group__prepend {
        background-color: transparent;
        font-size: 12px;
        color: white;
        border-radius: 0;
        border: 0;
        border-bottom: solid 1px #368fbb;
      }
    }
    .more {
      width: 25px;
      height: 25px;
      background-color: transparent;
      outline: none;
      float: right;
      margin: 28px 20px 0px 0px;
      border: 0;
    }
    .tableBox {
      width: 760px;
      height: 598px;
      margin: 12px auto 20px auto;
    }
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
      color: rgba(255, 255, 255, 1);
      font-size: 14px;
      height: 26px;
      padding: 0;
      background-color: rgba(54, 143, 187, 1);
    }
    /* 表格每行高度*/
    /deep/.el-table__body td {
      height: 38px;
      padding: 0;
    }
    /deep/.el-table__body tr {
      background-color: rgba(51, 105, 132, 1);
    }
    /* 鼠标hover每行的样式*/
    /deep/.el-table__body tr:hover > td {
      background-color: rgba(51, 105, 132, 1);
    }
    /deep/td,
    /deep/th {
      border: none;
    }
    //单选框样式
    /deep/ .el-radio__inner {
      border: 1px solid rgba(255, 255, 255, 1);
      background: transparent;
    }

    //单选框选中样式
    /deep/ .el-radio__input.is-checked .el-radio__inner::after {
      width: 7px;
      height: 7px;
      border-radius: 100%;
      background-color: rgba(255, 255, 255, 1);
    }
  }
  /* 修改偶数行颜色*/
  /deep/.el-table--striped .el-table__body tr.el-table__row--striped td {
    background-color: rgba(54, 143, 187, 1);
  }

  .popoverBtn {
    background: transparent;
    color: white;
    border: 0;
    margin-left: 0px;
    border-radius: 0px;
  }

  .dialogStyle {
    min-width: 1500px;
    /deep/.el-dialog__header { // 头部
      background-color: #39a4dd;
    }
    /deep/.el-dialog__title { // 头部-标题
      color: white;
      font-size: 18px;
      font-weight: bold;
    }
    /deep/.el-dialog__body { // 内部
      background-color: #336984;
    }
    /deep/.el-dialog__footer { // 尾部
      background-color: #336984;
    }
    /deep/.el-icon-close:before { // 头部-关闭
      color: white;
    }
    .trueBtn { // 按钮
      background-color: #1eb0fc;
      font-size: 14px;
      color: white;
      width: 66px;
      height: 30px;
      padding: 0;
      float: right;
    }
    /deep/.el-input__inner { // 输入框
      color: white;
      background-color: #3688b1;
      border: none;
    }
    /deep/.el-form-item__label { // label
      color: white;
    }
    .el-radio {
      color: white;
    }
    .selectStyle { // 下拉框
      /deep/.el-input__inner {
        font-size: 12px;
      }
      /deep/.select-popper {
        background-color: #3688b1;
        font-size: 12px;
        color: white;
        border: none;
        .el-select-dropdown__item.selected {
          background-color: #3688b1;
        }
        .el-select-dropdown__item {
          font-size: 12px;
          color: white;
        }
        .el-select-dropdown__item.hover {
          background-color: #3688b1;
        }
        .popper__arrow {
          border-bottom-color: #3688b1;
        }
        .popper__arrow::after {
          border-bottom-color: #3688b1;
        }
      }
    }
  }
</style>
