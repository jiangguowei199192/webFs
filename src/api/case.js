/*
 * @Descripttion: 出来混迟早是要还的
 * @version: v_2.0
 * @Author: liangkaiLee
 * @Date: 2020-12-13 14:33:06
 * @LastEditors: liangkaiLee
 * @LastEditTime: 2020-12-13 18:12:08
 */
export const caseListApi = {
  queryCaseList: '/fms-river-protection/riverCase/selectPage', // 获取报警列表
  queryDesignateUserList: '/fms-river-protection/riverDesignate/selectDesignateUserList', // 查询可指派人员列表
  designateCaseToUsers: '/fms-river-protection/riverDesignate/designateUsers', // 指派某些人员处理指定案件
  chatListPage: '/fms-river-protection/chat/listPage', // 分页查询聊天记录
  chatUploadFile: '/fms-river-protection/chat/uploadFile'// 上传聊天文件
}
