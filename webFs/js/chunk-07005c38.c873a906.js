(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-07005c38"],{"0a43":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",[i("span",{staticStyle:{"font-weight":"bold"}},[t._v("单位基础信息")]),i("div",[i("span",{staticClass:"subTitle"},[t._v("单位名称")]),i("el-input",{staticClass:"textInput",attrs:{placeholder:"请输入单位名称"},model:{value:t.companyName,callback:function(e){t.companyName=e},expression:"companyName"}})],1),i("div",[i("span",{staticClass:"subTitle"},[t._v("单位类型")]),i("el-input",{staticClass:"textInput",attrs:{placeholder:"请输入单位类型"},model:{value:t.companyType,callback:function(e){t.companyType=e},expression:"companyType"}})],1),i("div",[i("span",{staticClass:"subTitle"},[t._v("单位地址")]),i("el-input",{staticClass:"textInput",attrs:{placeholder:"请输入单位地址"},model:{value:t.companyAddress,callback:function(e){t.companyAddress=e},expression:"companyAddress"}})],1),t._m(0),i("div",[i("span",{staticClass:"subTitle"},[t._v("联系电话")]),i("el-input",{staticClass:"textInput",attrs:{placeholder:"请输入联系人电话"},model:{value:t.companyPhone,callback:function(e){t.companyPhone=e},expression:"companyPhone"}}),i("el-input",{staticClass:"phoneInput",attrs:{placeholder:"请输入备用电话"},model:{value:t.companySubPhone,callback:function(e){t.companySubPhone=e},expression:"companySubPhone"}})],1)]),i("div",{staticStyle:{"margin-top":"20px",height:"280px"}},[i("span",{staticStyle:{"font-weight":"bold"}},[t._v("基本情况说明")]),i("div",{staticStyle:{"margin-top":"20px"}},t._l(t.basicSituation,(function(t,e){return i("div",{key:e,staticClass:"basicSituation"},[i("UploadImage",{attrs:{title:t.title,subTitle:t.subTitle}})],1)})),0)]),i("div",{staticStyle:{"margin-top":"20px",height:"280px"}},[i("span",{staticStyle:{"font-weight":"bold"}},[t._v("建筑平面图")]),i("div",{staticStyle:{"margin-top":"20px"}},t._l(t.buildingPlan,(function(t,e){return i("div",{key:e,staticClass:"basicSituation"},[i("UploadImage",{attrs:{title:t.title,subTitle:t.subTitle}})],1)})),0)]),i("div",{staticStyle:{"margin-top":"20px",height:"280px"}},[i("span",{staticStyle:{"font-weight":"bold"}},[t._v("作战部署图")]),i("div",{staticStyle:{"margin-top":"20px","margin-left":"50px"}},[i("UploadImage",{attrs:{title:t.operationalDeployment.title,subTitle:t.operationalDeployment.subTitle}})],1)]),i("div",{staticStyle:{"margin-top":"20px",height:"280px"}},[i("span",{staticStyle:{"font-weight":"bold"}},[t._v("三维预案")]),i("div",{staticStyle:{"margin-top":"20px","margin-left":"50px"}},[i("UploadImage",{attrs:{title:t.threeDPlan.title,subTitle:t.threeDPlan.subTitle}})],1)])])},l=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{height:"200px","margin-top":"20px"}},[i("div",{staticClass:"coordinatesTitle"},[t._v("地理坐标")]),i("div",{staticStyle:{width:"300px",height:"200px",background:"white",float:"left"}})])}],n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{width:"250px"}},[i("div",[i("span",{staticStyle:{color:"red"}},[t._v("*")]),i("span",[t._v("请上传"+t._s(t.title))]),i("button",{attrs:{title:""}},[t._v("查看示例")])]),i("div",{staticStyle:{height:"150px",background:"white","margin-top":"10px"}}),i("div",{staticStyle:{"margin-top":"10px"}},[t._v("格式要求："+t._s(t.subTitle))])])},s=[],o={props:{title:{type:String,required:!0},subTitle:{type:String,required:!0}},data:function(){return{}}},p=o,c=i("2877"),u=Object(c["a"])(p,n,s,!1,null,null,null),r=u.exports,d={data:function(){return{companyName:"",companyType:"",companyAddress:"",companyCoordinates:"",companyPhone:"",companySubPhone:"",basicSituation:[{title:"《单位基本情况》",subTitle:"JPG、JPEG、PNG单张图片大小不超过20M"},{title:"《主要消防设施》",subTitle:"JPG、JPEG、PNG单张图片大小不超过20M"},{title:"《重点部位情况》",subTitle:"JPG、JPEG、PNG单张图片大小不超过20M"},{title:"《力量调度情况》",subTitle:"JPG、JPEG、PNG单张图片大小不超过20M"},{title:"《重点提示》",subTitle:"JPG、JPEG、PNG单张图片大小不超过20M"}],buildingPlan:[{title:"《单位基本情况》",subTitle:"JPG、JPEG、PNG单张图片大小不超过20M"},{title:"《重点提示》",subTitle:"JPG、JPEG、PNG单张图片大小不超过20M"}],operationalDeployment:{title:"《作战部署图》",subTitle:"JPG、JPEG、PNG单张图片大小不超过20M"},threeDPlan:{title:"《三维预案》",subTitle:"tif单个文件大小不超过1G"}}},components:{UploadImage:r}},m=d,y=(i("d993"),Object(c["a"])(m,a,l,!1,null,"1c6995fe",null));e["default"]=y.exports},"9e79":function(t,e,i){},d993:function(t,e,i){"use strict";var a=i("9e79"),l=i.n(a);l.a}}]);