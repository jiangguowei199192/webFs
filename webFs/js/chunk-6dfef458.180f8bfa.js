(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6dfef458"],{"1c2e":function(a,e,i){"use strict";var r=i("1944"),t=i("857c"),n=i("efe2"),o=i("99ad"),s="toString",c=RegExp.prototype,l=c[s],d=n((function(){return"/a/b"!=l.call({source:"a",flags:"b"})})),g=l.name!=s;(d||g)&&r(RegExp.prototype,s,(function(){var a=t(this),e=String(a.source),i=a.flags,r=String(void 0===i&&a instanceof RegExp&&!("flags"in c)?o.call(a):i);return"/"+e+"/"+r}),{unsafe:!0})},"215e":function(a,e,i){},"3a1b":function(a,e,i){"use strict";i.d(e,"a",(function(){return r}));var r={getTodayFireAlarmInfos:"/cloud-video/deviceAlarm",getDurationFireAlarmInfos:"/cloud-video/deviceAlarm/list",confirmFireAlarmInfo:"/cloud-video/deviceAlarm/status"}},"43b0":function(a,e,i){"use strict";var r=i("215e"),t=i.n(r);t.a},"859a":function(a,e,i){"use strict";i.r(e);var r=function(){var a=this,e=a.$createElement,i=a._self._c||e;return i("div",[i("div",{staticClass:"container"},[i("button",{staticClass:"back",attrs:{type:"button"},on:{click:a.back}},[i("img",{attrs:{src:a.backImg}}),a._v(" 火情地图 ")]),i("div",{staticClass:"rightBox"},[i("div",{staticClass:"selArea"},[i("el-date-picker",{staticClass:"datePickerStyle",attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:a.dateRange,callback:function(e){a.dateRange=e},expression:"dateRange"}})],1),i("div",{staticClass:"mapArea"},[i("gMap",{ref:"gduMap",attrs:{handleType:"devMap",bShowSimpleSearchTools:!0,bShowBasic:!0,bShowMeasure:!1,bAutoLocate:!1}})],1)])]),i("span",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:a.copyCoordinate,expression:"copyCoordinate",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:a.onCopyOK,expression:"onCopyOK",arg:"success"},{name:"clipboard",rawName:"v-clipboard:error",value:a.onCopyErr,expression:"onCopyErr",arg:"error"}],ref:"copyText",staticStyle:{display:"none"}}),i("el-dialog",{attrs:{"custom-class":"el-dialog-custom",visible:a.imgDialogVisible,"show-close":!1,type:"primary",center:""},on:{"update:visible":function(e){a.imgDialogVisible=e}},nativeOn:{click:function(e){return a.closeImgDialog(e)}}},[i("img",{staticClass:"dialogImg",attrs:{src:a.imgSrc}})])],1)},t=[],n=i("e27c"),o=i("9a0d"),s={data:function(){return{backImg:i("9f0a"),bShowMarkersInMap:!0,dateRange:""}},mixins:[n["a"],o["a"]],mounted:function(){this.bAutoMove=!1},watch:{dateRange:function(a,e){if(null==a)this.fireWarningArray=[],this.markFireWarnings();else{var i=a[0].getTime(),r=a[1].getTime()+864e5;this.getDurationFireAlarmInfos(i,r)}}},methods:{back:function(){this.$router.push({path:"/systemSettings"})}}},c=s,l=(i("43b0"),i("9ca4")),d=Object(l["a"])(c,r,t,!1,null,"74e4121a",null);e["default"]=d.exports},"9a0d":function(a,e,i){"use strict";i("4194"),i("fe59"),i("ecb4"),i("ea69"),i("08ba");var r=i("3a1b"),t=i("986e"),n=i("b705"),o=i("c466"),s=i("0a1b"),c={data:function(){return{fireWarningArray:[],fireConfirmedNum:0,fireTotalNum:0,bAutoMove:!0,copyCoordinate:"",imgDialogVisible:!1,imgSrc:""}},created:function(){var a=this;this.bShowMarkersInMap&&t["a"].$on("getFireAlarmInfos_Done",(function(e){a.markFireWarnings()})),t["a"].$on("getFireAlarm",(function(e){"mistaken"!==e.alarmStatus&&(e.bConfirmed=!1,e.alarmTime=Object(o["c"])(e.alarmTime),a.handlingAlarmImgUrl(e),a.fireWarningArray.push(e),a.fireTotalNum=a.fireWarningArray.length,a.bShowMarkersInMap&&a.addNewFireWarning(e))})),this.getTodayFireAlarmInfos()},beforeDestroy:function(){this.bShowMarkersInMap&&t["a"].$off("getFireAlarmInfos_Done"),this.bRealTimeFireWarning&&t["a"].$off("getFireAlarm")},mounted:function(){this.bShowMarkersInMap&&(this.$refs.gduMap.map2D.devFireWarningLayerManager.popupCopyBtnClickEvent.addEventListener(this.copyCoordinateCB),this.$refs.gduMap.map2D.devFireWarningLayerManager.popupLeftImgClickEvent.addEventListener(this.callbackLeftImg),this.$refs.gduMap.map2D.devFireWarningLayerManager.popupOneImgClickEvent.addEventListener(this.callbackMidImg),this.$refs.gduMap.map2D.devFireWarningLayerManager.popupRightImgClickEvent.addEventListener(this.callbackRightImg),this.$refs.gduMap.map2D.devFireWarningLayerManager.popupMisreportBtnClickEvent.addEventListener(this.callbackMistaken),this.$refs.gduMap.map2D.devFireWarningLayerManager.popupConfirmBtnClickEvent.addEventListener(this.callbackConfirmed))},methods:{handlingAlarmImgUrl:function(a){a.alarmPicList&&a.alarmPicList.length>0&&a.alarmPicList.forEach((function(a){a.picPath=s["a"].baseUrl+"/video-service2"+a.picPath}))},handlingFireWarningData:function(a){var e=this;a.forEach((function(a){"mistaken"!==a.alarmStatus&&(a.bConfirmed=!1,"confirmed"===a.alarmStatus&&(a.bConfirmed=!0,e.fireConfirmedNum++),a.alarmTime=Object(o["c"])(a.alarmTime),e.handlingAlarmImgUrl(a),e.fireWarningArray.push(a))})),this.fireTotalNum=this.fireWarningArray.length,t["a"].$emit("getFireAlarmInfos_Done",!0)},getTodayFireAlarmInfos:function(){var a=this;this.fireWarningArray=[],this.$axios.get(r["a"].getTodayFireAlarmInfos).then((function(e){e&&e.data&&0===e.data.code&&a.handlingFireWarningData(e.data.data)}))},getDurationFireAlarmInfos:function(a,e){var i=this;this.fireWarningArray=[];var t={timeBegin:a,timeEnd:e};this.$axios.get(r["a"].getDurationFireAlarmInfos,{params:t}).then((function(a){a&&a.data&&0===a.data.code&&i.handlingFireWarningData(a.data.data)}))},markFireWarnings:function(){void 0!==this.$refs.gduMap&&void 0!==this.$refs.gduMap.map2D&&(this.$refs.gduMap.map2D.devFireWarningLayerManager.clear(),this.$refs.gduMap.map2D.devFireWarningLayerManager.addFireWarnings(this.fireWarningArray))},addNewFireWarning:function(a){void 0!==this.$refs.gduMap&&void 0!==this.$refs.gduMap.map2D&&this.$refs.gduMap.map2D.devFireWarningLayerManager.addOrUpdateFireWarning(a)},selectFireWarningHandler:function(a,e){this.$refs.gduMap.showLayer("fire",!0),this.$refs.gduMap.map2D.devCameraLayerManager.resetSelectedFeature(),this.$refs.gduMap.map2D.devDroneLayerManager.resetSelectedFeature();var i=this.$refs.gduMap.map2D;i.devFireWarningLayerManager.selectFeatureByID(a),this.bAutoMove&&(i.setZoom(16),setTimeout((function(){i.zoomToCenter(a.alarmLongitude,a.alarmLatitude);var e=i._map.getView().getCenter(),r=i._map.getPixelFromCoordinate(e),t=r[0]-100,n=r[1]-120,o=i._map.getCoordinateFromPixel([t,n]);i.zoomToCenter(o[0],o[1])}),10))},copyCoordinateCB:function(a){var e=this;this.copyCoordinate=a.alarmLongitude+","+a.alarmLatitude,this.$nextTick((function(){e.$refs.copyText.click(),Object(n["Message"])({message:"坐标已复制!",type:"info",duration:3e3})}))},onCopyOK:function(a){console.log(a)},onCopyErr:function(a){console.log(a)},closeImgDialog:function(){this.imgDialogVisible=!1},delayShowFireDetailInfo:function(a){var e=this;setTimeout((function(){e.selectFireWarningHandler(a)}),500)},callbackLeftImg:function(a){this.imgSrc=a.alarmPicList[0].picPath,this.imgDialogVisible=!0,this.delayShowFireDetailInfo(a)},callbackMidImg:function(a){this.imgSrc=a.alarmPicList[0].picPath,this.imgDialogVisible=!0,this.delayShowFireDetailInfo(a)},callbackRightImg:function(a){this.imgSrc=a.alarmPicList[1].picPath,this.imgDialogVisible=!0,this.delayShowFireDetailInfo(a)},callbackMistaken:function(a){var e=this,i=r["a"].confirmFireAlarmInfo+"/"+a.id+"/"+a.alarmStatus;this.$axios.post(i).then((function(i){if(i&&i.data&&0===i.data.code){var r=e.fireWarningArray.find((function(e){return e.id===a.id}));if(void 0!==r){var t=e.fireWarningArray.indexOf(r);e.fireWarningArray.splice(t,1),e.fireTotalNum--}}}))},callbackConfirmed:function(a){var e=this,i=r["a"].confirmFireAlarmInfo+"/"+a.id+"/"+a.alarmStatus;this.$axios.post(i).then((function(i){if(i&&i.data&&0===i.data.code){var r=e.fireWarningArray.find((function(e){return e.id===a.id}));void 0!==r&&(r.bConfirmed=!0,r.alarmStatus=a.alarmStatus,e.fireConfirmedNum++)}}))}}};e["a"]=c},"9f0a":function(a,e){a.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAABUElEQVQ4T6XTzYtPYRjG8c8deQkRU1I2bEQpykIxmdWMlCzsLJQslA1/hpU05V9Q8lKKRl6yURbsLGwtZGkrikuPzugYv2NOv3k2p55zXd/u+7nvqwycJJtwvapuDGkm3dekyyRb8Agbq2p2TcAk2/EEJ/B6TcAku/AUx7qqpgcm2Y3nONxr8Qse4G37V1UfV2v/9xsm2YsXOPAfQ/AGi7hXVT8nDiXJPrxE+449reLLVfV+paGSvMLcWFJP9xWXqupu39uAe7p2D00B/YGLVXVn2bv8hjN4hqNTQL/hZFW9a94/i51kB5ZwvAf9jPvYhrYFbWj7+75O+wFHqur7X0lJshWPcWpoD5PsxDwu4AzWddprVbX4T/SSbMZDnF4tKUkO4man/dSqH8ryBrTpzYyJXpKruIXzE4Hdsq/Hlaq6PWZQSc7i3CBwDGSlJsnCL0ZYaTp7uIhrAAAAAElFTkSuQmCC"},c466:function(a,e,i){"use strict";i.d(e,"b",(function(){return r})),i.d(e,"a",(function(){return t})),i.d(e,"c",(function(){return o}));i("e18c"),i("1c2e");function r(){var a=new Date,e=a.getFullYear(),i=a.getMonth()+1<10?"0"+(a.getMonth()+1):a.getMonth()+1,r=a.getDate()<10?"0"+a.getDate():a.getDate(),t=a.getDay();switch(t){case 0:t="日";break;case 1:t="一";break;case 2:t="二";break;case 3:t="三";break;case 4:t="四";break;case 5:t="五";break;case 6:t="六";break}return{year:e,month:i,day:r,weekday:"星期"+t}}function t(a){var e=parseInt(a),i=0,r=0;e>=60&&(i=parseInt(e/60),e=parseInt(e%60),i>=60&&(r=parseInt(i/60),i=parseInt(i%60)));var t=n(r)+":"+n(i)+":"+n(e);return t}function n(a){return a<10?"0"+a.toString():a.toString()}function o(a){var e=function(a){return a<10?"0"+a:a},i=new Date(a),r=i.getFullYear(),t=i.getMonth()+1,n=i.getDate(),o=i.getHours(),s=i.getMinutes(),c=i.getSeconds();return r+"-"+e(t)+"-"+e(n)+" "+e(o)+":"+e(s)+":"+e(c)}}}]);