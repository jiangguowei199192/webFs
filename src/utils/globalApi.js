
import $ from 'jquery'
let baseUrl = ''
let mqttServer = ''
let mqttPort = ''
let projectTitle = ''
let headImg = ''
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
  $.ajax({
    async: false, // fasle表示同步请求，true表示异步请求
    type: 'get',
    dataType: 'json',
    url: '/webFs/serverconfig.json', // 请求地址
    success: function (res) { // 请求成功
      console.log(res)
      baseUrl = res.baseUrl
      mqttServer = res.mqttServer
      mqttPort = res.mqttPort
      headImg = res.headImg
      projectTitle = res.projectTitle
    },
    error: function (err) { // 请求失败，包含具体的错误信息
      console.log(err)
    }
  })
} else {
  // 来消防办公，内网地址改外网
  baseUrl = 'http://122.112.203.178:8850'
  mqttServer = '122.112.203.178'
  mqttPort = 2883
  headImg = 'http://122.112.203.178:80'
  // baseUrl = 'http://172.16.63.148:8850'
  // mqttServer = '172.16.63.148'
  // mqttPort = 2883
  // headImg = 'http://172.16.63.148'
  projectTitle = '天地察打一体化系统'
}
export default {
  baseUrl,
  mqttServer,
  mqttPort,
  headImg,
  projectTitle
}
