(function(e){function t(t){for(var n,d,i=t[0],a=t[1],l=t[2],u=0,f=[];u<i.length;u++)d=i[u],Object.prototype.hasOwnProperty.call(r,d)&&r[d]&&f.push(r[d][0]),r[d]=0;for(n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n]);s&&s(t);while(f.length)f.shift()();return c.push.apply(c,l||[]),o()}function o(){for(var e,t=0;t<c.length;t++){for(var o=c[t],n=!0,i=1;i<o.length;i++){var a=o[i];0!==r[a]&&(n=!1)}n&&(c.splice(t--,1),e=d(d.s=o[0]))}return e}var n={},r={app:0},c=[];function d(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,d),o.l=!0,o.exports}d.m=e,d.c=n,d.d=function(e,t,o){d.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},d.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},d.t=function(e,t){if(1&t&&(e=d(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(d.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)d.d(o,n,function(t){return e[t]}.bind(null,n));return o},d.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return d.d(t,"a",t),t},d.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},d.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],a=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var s=a;c.push([0,"chunk-vendors"]),o()})({0:function(e,t,o){e.exports=o("56d7")},"56d7":function(e,t,o){"use strict";o.r(t);o("e260"),o("e6cf"),o("cca6"),o("a79d");var n=o("2b0e"),r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("v-app",[o("v-app-bar",{attrs:{app:"",color:"primary",dark:""}},[o("div",{staticClass:"d-flex align-center"},[e._v("Todo tech test")]),o("v-spacer"),o("v-text-field",{attrs:{placeholder:"Filter"},model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}})],1),o("v-main",[o("TodoList",{attrs:{filter:e.filter}})],1)],1)},c=[],d=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"todo-list"},[o("v-card",{staticClass:"mt-5 mb-5 elevation-5"},[o("v-card-title",[e._v("New Todo")]),o("v-card-text",[o("v-text-field",{attrs:{id:"newTodoTitle",placeholder:"New Todo"}})],1),o("v-card-actions",[o("v-btn",{attrs:{color:"primary",id:"createTodoBtn"},on:{click:e.createTodo}},[e._v("Add")])],1)],1),o("v-divider"),e._l(e.filteredTodos,(function(t){return o("TodoItem",{key:t.id,attrs:{title:t.title,id:t.id},on:{deleteTodo:e.deleteTodo,checkTodo:e.checkTodo}})})),o("v-snackbar",{scopedSlots:e._u([{key:"action",fn:function(t){var n=t.attrs;return[o("v-btn",e._b({attrs:{color:"red",text:""},on:{click:function(t){e.showDeleted=!1}}},"v-btn",n,!1),[e._v(" Close ")])]}}]),model:{value:e.showDeleted,callback:function(t){e.showDeleted=t},expression:"showDeleted"}},[e._v(" Deleted "+e._s(e.deletedTitle)+" ")]),o("v-snackbar",{scopedSlots:e._u([{key:"action",fn:function(t){var n=t.attrs;return[o("v-btn",e._b({attrs:{color:"primary",text:""},on:{click:function(t){e.showAdded=!1}}},"v-btn",n,!1),[e._v(" Close ")])]}}]),model:{value:e.showAdded,callback:function(t){e.showAdded=t},expression:"showAdded"}},[e._v(" Added "+e._s(e.addedTitle)+" ")]),o("v-snackbar",{scopedSlots:e._u([{key:"action",fn:function(t){var n=t.attrs;return[o("v-btn",e._b({attrs:{color:"primary",text:""},on:{click:function(t){e.showChecked=!1}}},"v-btn",n,!1),[e._v(" Close ")])]}}]),model:{value:e.showChecked,callback:function(t){e.showChecked=t},expression:"showChecked"}},[e._v(" "+e._s(e.checkedStatus?"Checked":"Unchecked")+" ")])],2)},i=[],a=o("5530"),l=(o("d3b7"),o("a434"),o("4de4"),o("c740"),o("466d"),o("ac1f"),function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("v-card",[[o("v-card-title",[o("v-checkbox",{attrs:{id:e.checkBoxId,checked:e.completed,label:e.title},on:{click:e.checkTodo}})],1),o("v-card-actions",[o("v-btn",{attrs:{id:e.deleteBtnId,color:"error"},on:{click:e.deleteTodo}},[e._v("Delete")])],1)]],2)}),s=[],u=(o("a9e3"),{name:"Todo",props:{id:Number,title:String,completed:Boolean},methods:{deleteTodo:function(){this.$emit("deleteTodo",this.id)},checkTodo:function(){this.$emit("checkTodo",{id:this.id})}},computed:{checkBoxId:function(){return"checkBox-".concat(this.id)},deleteBtnId:function(){return"deleteBtn-".concat(this.id)}}}),f=u,h=o("2877"),p=o("6544"),v=o.n(p),b=o("8336"),T=o("b0af"),m=o("99d9"),k=o("ac7c"),w=Object(h["a"])(f,l,s,!1,null,"e23b45ca",null),y=w.exports;v()(w,{VBtn:b["a"],VCard:T["a"],VCardActions:m["a"],VCardTitle:m["c"],VCheckbox:k["a"]});var _="https://jsonplaceholder.typicode.com/todos",x={name:"TodoList",props:{filter:String},components:{TodoItem:y},data:function(){return{todos:[],showDeleted:!1,showAdded:!1,showChecked:!1,deletedTitle:"",addedTitle:"",checkedStatus:""}},methods:{updateTodos:function(){var e=this;fetch(_).then((function(e){return e.json()})).then((function(t){e.todos=t}))},createTodo:function(){var e=this,t=document.querySelector("#newTodoTitle"),o=t.value;fetch(_,{method:"POST",body:JSON.stringify({title:o,completed:!1,userId:1}),headers:{"Content-type":"application/json; charset=UTF-8"}}).then((function(e){return e.json()})).then((function(o){e.todos.splice(0,0,o),e.showAdded=!0,e.addedTitle=o.title,t.value=""}))},deleteTodo:function(e){var t=this;fetch("".concat(_,"/").concat(e),{method:"DELETE"}).then((function(){t.showDeleted=!0,t.deletedTitle=t.todos.filter((function(t){return t.id==e}))[0].title,t.todos=t.todos.filter((function(t){return t.id!=e}))}))},checkTodo:function(e){var t=this,o=e.id,r=this.todos.filter((function(e){return e.id==o})).pop(),c=this.todos.findIndex((function(e){return e.id==o}));fetch("".concat(_,"/").concat(o),{method:"PUT",body:JSON.stringify(Object(a["a"])(Object(a["a"])({},r),{},{completed:!r.completed})),headers:{"Content-type":"application/json; charset=UTF-8"}}).then((function(e){return e.json()})).then((function(e){n["a"].set(t.todos,c,e),t.showChecked=!0,t.checkedStatus=e.completed}))}},computed:{filteredTodos:function(){var e=this;return this.todos.filter((function(t){return t.title.match(e.filter)}))}},mounted:function(){this.updateTodos()}},C=x,j=o("ce7e"),O=o("2db4"),S=o("8654"),V=Object(h["a"])(C,d,i,!1,null,null,null),g=V.exports;v()(V,{VBtn:b["a"],VCard:T["a"],VCardActions:m["a"],VCardText:m["b"],VCardTitle:m["c"],VDivider:j["a"],VSnackbar:O["a"],VTextField:S["a"]});var A={name:"App",components:{TodoList:g},data:function(){return{filter:""}}},B=A,D=o("7496"),P=o("40dc"),I=o("f6c4"),E=o("2fa4"),$=Object(h["a"])(B,r,c,!1,null,null,null),F=$.exports;v()($,{VApp:D["a"],VAppBar:P["a"],VMain:I["a"],VSpacer:E["a"],VTextField:S["a"]});var M=o("f309");n["a"].use(M["a"]);var N=new M["a"]({});n["a"].config.productionTip=!1,new n["a"]({vuetify:N,render:function(e){return e(F)}}).$mount("#app")}});
//# sourceMappingURL=app.192afed7.js.map