(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3ca0bc2c"],{"30da":function(e,t,a){},"47c3":function(e,t,a){"use strict";var l=a("30da"),r=a.n(l);r.a},"9f0a":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAABUElEQVQ4T6XTzYtPYRjG8c8deQkRU1I2bEQpykIxmdWMlCzsLJQslA1/hpU05V9Q8lKKRl6yURbsLGwtZGkrikuPzugYv2NOv3k2p55zXd/u+7nvqwycJJtwvapuDGkm3dekyyRb8Agbq2p2TcAk2/EEJ/B6TcAku/AUx7qqpgcm2Y3nONxr8Qse4G37V1UfV2v/9xsm2YsXOPAfQ/AGi7hXVT8nDiXJPrxE+449reLLVfV+paGSvMLcWFJP9xWXqupu39uAe7p2D00B/YGLVXVn2bv8hjN4hqNTQL/hZFW9a94/i51kB5ZwvAf9jPvYhrYFbWj7+75O+wFHqur7X0lJshWPcWpoD5PsxDwu4AzWddprVbX4T/SSbMZDnF4tKUkO4man/dSqH8ryBrTpzYyJXpKruIXzE4Hdsq/Hlaq6PWZQSc7i3CBwDGSlJsnCL0ZYaTp7uIhrAAAAAElFTkSuQmCC"},bdab:function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"container"},[a("button",{staticClass:"back",attrs:{type:"button"},on:{click:e.back}},[a("img",{attrs:{src:e.backImg}}),e._v(" 角色权限管理 ")]),a("div",{staticClass:"container1"},[a("div",{staticClass:"leftBox"},[a("div",{staticClass:"leftTip",on:{click:e.newRole}},[a("el-button",{staticClass:"newRoleBtn"},[e._v("自定义管理角色")])],1),a("el-tree",{attrs:{data:e.treeData,props:e.defaultProps,"default-expand-all":""}})],1),a("div",{staticClass:"rightBox"},[a("button",{staticClass:"addUser",attrs:{type:"button"},on:{click:e.addUser}},[e._v("添加用户")]),a("div",{staticClass:"tableBox"},[a("el-table",{attrs:{data:e.tableData,stripe:"","empty-text":"no data","tooltip-effect":"light"},on:{"row-click":e.ClickTableRow}},[a("el-table-column",{attrs:{label:"",width:"33",align:"center",resizable:!1},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-radio",{attrs:{label:t.$index},model:{value:e.radio,callback:function(t){e.radio=t},expression:"radio"}},[e._v(e._s(""))])]}}])}),a("el-table-column",{attrs:{align:"center",label:"用户",prop:"userName"}}),a("el-table-column",{attrs:{align:"center",label:"职位",prop:"position"}}),a("el-table-column",{attrs:{align:"center",label:"所属部门",prop:"department"}}),a("el-table-column",{attrs:{align:"center",label:"分管范围",prop:"range"}}),a("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{staticStyle:{width:"55px"},attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.deleteClick(t.$index,t.row)}}},[e._v("移除")])]}}])})],1),a("el-pagination",{staticClass:"tablePagination",attrs:{"popper-class":"pageSelect",total:e.pageData.total,"page-size":e.pageData.pageSize,layout:"total, prev, pager, next, jumper"}})],1)])])]),a("el-dialog",{attrs:{title:"提示",visible:e.showDeleteTip,width:"30%"},on:{"update:visible":function(t){e.showDeleteTip=t}}},[e._v(" 是否从系统管理员角色中移除用户 "+e._s(e.radio>=0?e.tableData[e.radio].userName:"")+" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.showDeleteTip=!1}}},[e._v("确 定")])],1)]),a("el-dialog",{attrs:{title:"添加用户",visible:e.showAddUser,width:"30%"},on:{"update:visible":function(t){e.showAddUser=t}}},[a("el-form",{ref:"addUserFormRef",attrs:{model:e.addUserForm,"label-width":"80px",rules:e.addUserRules}},[a("el-form-item",{attrs:{label:"选择用户",prop:"user"}},[a("el-select",{attrs:{multiple:"",placeholder:"请添加用户"},model:{value:e.addUserForm.user,callback:function(t){e.$set(e.addUserForm,"user",t)},expression:"addUserForm.user"}},e._l(e.userOptions,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),a("el-form-item",[a("el-button",{staticStyle:{float:"right"},attrs:{type:"primary"},on:{click:e.addUserConfirm}},[e._v("保存")])],1)],1)],1),a("el-dialog",{attrs:{title:"新建角色",visible:e.showNewRole,width:"30%"},on:{"update:visible":function(t){e.showNewRole=t}}},[a("el-form",{ref:"newRoleFormRef",attrs:{model:e.newRoleForm,"label-width":"80px",rules:e.newRoleRules}},[a("el-form-item",{attrs:{label:"角色名称",prop:"name"}},[a("el-input",{model:{value:e.newRoleForm.name,callback:function(t){e.$set(e.newRoleForm,"name",t)},expression:"newRoleForm.name"}})],1),a("el-form-item",{attrs:{label:"角色标识",prop:"tag"}},[a("el-input",{model:{value:e.newRoleForm.tag,callback:function(t){e.$set(e.newRoleForm,"tag",t)},expression:"newRoleForm.tag"}})],1),a("el-form-item",{attrs:{label:"角色备注",prop:"message"}},[a("el-input",{model:{value:e.newRoleForm.message,callback:function(t){e.$set(e.newRoleForm,"message",t)},expression:"newRoleForm.message"}})],1),a("el-form-item",{attrs:{label:"初始权限",prop:"permission"}},[a("el-select",{attrs:{multiple:""},model:{value:e.newRoleForm.permission,callback:function(t){e.$set(e.newRoleForm,"permission",t)},expression:"newRoleForm.permission"}},e._l(e.permissionOptions,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),a("el-form-item",[a("el-button",{staticStyle:{float:"right"},attrs:{type:"primary"},on:{click:e.newRoleConfirm}},[e._v("保存")])],1)],1)],1)],1)},r=[],s=(a("ecb4"),a("6a61"),a("cf7f")),n={created:function(){this.pageData.total=this.tableData.length},data:function(){return{backImg:a("9f0a"),treeData:[{label:"一级 1",children:[{label:"二级 1-1",children:[{label:"三级 1-1-1"}]}]},{label:"一级 2",children:[]},{label:"一级 3",children:[]}],defaultProps:{children:"children",label:"label"},pageData:{total:0,pageSize:4},radio:-1,tableData:[{userName:"王小虎1",position:"队长",range:"",department:"炊事班",selected:!0},{userName:"王小虎2",position:"队长",range:"",department:"炊事班",selected:!0},{userName:"王小虎3",position:"队长",range:"",department:"炊事班",selected:!0}],showDeleteTip:!1,showAddUser:!1,addUserForm:{user:[]},addUserRules:{user:[{required:!0,message:"请添加用户"}]},userOptions:[{value:"val1",label:"lab1"},{value:"val2",label:"lab2"},{value:"val3",label:"lab3"},{value:"val4",label:"lab4"},{value:"val5",label:"lab5"}],showNewRole:!1,newRoleForm:{name:"",tag:"",message:"",permission:[]},newRoleRules:{name:[{required:!0,message:"请输入名称"}],tag:[{required:!0,message:"请输入标识"}],message:[{required:!0,message:"请输入角色备注"}]},permissionOptions:[{value:"val1",label:"lab1"},{value:"val2",label:"lab2"},{value:"val3",label:"lab3"},{value:"val4",label:"lab4"},{value:"val5",label:"lab5"}]}},methods:{back:function(){this.$router.push({path:"/systemSettings"})},addUser:function(){this.showAddUser=!0},ClickTableRow:function(e){this.radio=this.tableData.indexOf(e)},deleteClick:function(e,t){this.showDeleteTip=!0},newRole:function(){this.showNewRole=!0},addUserConfirm:function(){var e=this;this.$refs.addUserFormRef.validate(function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(a){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(a){t.next=2;break}return t.abrupt("return");case 2:e.showAddUser=!1;case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},newRoleConfirm:function(){var e=this;this.$refs.newRoleFormRef.validate(function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(a){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(a){t.next=2;break}return t.abrupt("return");case 2:e.showNewRole=!1;case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}}},o=n,i=(a("47c3"),a("9ca4")),u=Object(i["a"])(o,l,r,!1,null,"4d925580",null);t["default"]=u.exports}}]);