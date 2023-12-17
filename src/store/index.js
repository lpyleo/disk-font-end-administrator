import Vue from "vue";
import Vuex from "vuex";

import admin from "./module/admin"; // 引入 admin 模块
import column from "./module/column"; // 引入 column 模块
import column1 from "./module/column1"; // 引入 column1 模块
import column2 from "./module/column2"; // 引入 column1 模块
import company from "./module/company";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //
  },
  getters: {
    loginInfo: (state) => state.admin.loginInfo,
    // 是否登录
    isLogin: (state) => state.admin.isLogin,
    // 用户名
    adminName: (state) => state.admin.adminName,
    // 用户id
    adminId: (state) => state.admin.adminId,
    // 用户头像
    adminAvatar: (state) => state.admin.avatar,
    // 用户详细信息
    adminInfoObj: (state) => state.admin.adminInfoObj,
    // 企业名称
    companyName: (state) => state.company.companyName,
    // 需要显示的表格列
    selectedColumnList: (state) =>
      state.column.selectedColumnList === null
        ? state.column.allColumnList
        : state.column.selectedColumnList.split(","),
    selectedColumnList1: (state) =>
      state.column1.selectedColumnList1 === null
        ? state.column1.allColumnList1
        : state.column1.selectedColumnList1.split(","),
    selectedColumnList2: (state) =>
      state.column2.selectedColumnList2 === null
        ? state.column2.allColumnList2
        : state.column2.selectedColumnList2.split(","),
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    // 注册模块
    admin,
    column,
    column1,
    column2,
    company
  },
});