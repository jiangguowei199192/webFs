(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-06c89908"],{"07cd":function(e,t,a){},"644a":function(e,t,a){"use strict";var o=a("07cd"),n=a.n(o);n.a},"9ed6":function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"login"},[a("div",{staticClass:"content"},[a("div",{staticClass:"title"},[e._v(e._s(e.loginTitle))]),a("el-input",{staticClass:"username",attrs:{placeholder:"用户名","auto-complete":"new-password",clearable:"","prefix-icon":"el-icon-user",size:"small"},model:{value:e.loginInfo.username,callback:function(t){e.$set(e.loginInfo,"username",t)},expression:"loginInfo.username"}}),a("el-input",{staticClass:"username password",attrs:{placeholder:"密码",type:e.passwordInputType,"auto-complete":"new-password",clearable:"","prefix-icon":"el-icon-lock",size:"small"},on:{focus:e.changePasswordInputType},nativeOn:{input:function(t){return e.changePasswordInputType(t)},keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.jumpToMain(t)}},model:{value:e.loginInfo.password,callback:function(t){e.$set(e.loginInfo,"password",t)},expression:"loginInfo.password"}}),a("div",{staticClass:"checkDiv"},[a("el-checkbox",{staticClass:"check",model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}},[e._v("记住密码")]),a("el-button",{staticClass:"forgot",attrs:{type:"text",size:"mini"},on:{click:function(t){e.dialogVisible=!0}}},[e._v("忘记密码？")])],1),a("el-button",{staticClass:"loginBtn",on:{click:e.jumpToMain}},[e._v("登 录")])],1),a("el-dialog",{staticClass:"dialogStyle",attrs:{title:"忘记密码",visible:e.dialogVisible,width:"30%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("p",[a("span",[e._v("普通用户请联系管理员重置密码。")])]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticClass:"trueBtn",attrs:{type:"primary"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("确 定")])],1)])],1)])},n=[],s=(a("96cf"),a("1da1")),i=a("7ded"),r=a("5c96"),l=a("0a1b"),c={name:"login",data:function(){return{loginTitle:l["a"].projectTitle||"消防救援现场指挥系统",passwordInputType:"text",loginInfo:{username:"",password:""},checked:!0,dialogVisible:!1}},methods:{changePasswordInputType:function(){this.loginInfo.password.length>0?this.passwordInputType="password":this.passwordInputType="text"},jumpToMain:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!(e.loginInfo.username.length<=0||e.loginInfo.password.length<=0)){t.next=3;break}return Object(r["Notification"])({title:"错误",message:"请输入用户名和密码",type:"error",duration:5e3}),t.abrupt("return");case 3:a={username:e.loginInfo.username,password:e.$md5(e.loginInfo.password)},e.$axios.post(i["a"].login,a).then((function(t){0===t.data.code&&(e.checked?(localStorage.setItem("username",e.loginInfo.username),localStorage.setItem("password",e.loginInfo.password),localStorage.setItem("time",Math.round(new Date/1e3))):(localStorage.removeItem("username"),localStorage.removeItem("password"),localStorage.removeItem("time")),localStorage.setItem("token","Bearer "+t.data.data.access_token),sessionStorage.setItem("token","Bearer "+t.data.data.access_token),e.$router.push({path:"/videoSystem"}))}));case 5:case"end":return t.stop()}}),t)})))()}},created:function(){},mounted:function(){var e=localStorage.getItem("time");if(e){var t=Math.round(new Date/1e3);t-e>=1209600?(localStorage.removeItem("username"),localStorage.removeItem("password"),localStorage.removeItem("time")):(this.loginInfo.username=localStorage.getItem("username"),this.loginInfo.password=localStorage.getItem("password"),this.changePasswordInputType())}}},u=c,d=(a("644a"),a("2877")),p=Object(d["a"])(u,o,n,!1,null,"302eb85c",null);t["default"]=p.exports}}]);