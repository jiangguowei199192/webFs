export const loginApi = {
  login: '/fms-auth-center/login', // 登录
  logout: '/fms-auth-center/logout', // 登出
  getUserDetail: '/cloud-fms/sysuser/getUserDetail', // 设置-登录后获取用户详细信息
  getDeptByDeptCode: '/cloud-fms/dept/getDeptTreeByDeptCode',
  updateHeadImg: '/cloud-fms/sysuser/updateHeadImg', // 上传头像
  updateUser: '/cloud-fms/sysuser/updateUser', // 设置-修改用户
  getDeptTree: '/cloud-fms/dept/getDeptTree' // 查询组织树
}
