import { checkAdminLoginInfo } from "@/request/admin.js"; // 引入获取管理员登录信息接口

export default {
    state: {
        isLogin: false, // 初始时候给一个 isLogin = false 表示用户未登录
        adminName: "",
        adminId: 0,
        adminImgUrl: "",
        adminInfoObj: {},
        loginInfo: {},
        avatar: ""
    },
    mutations: {
        changeLogin(state, data) {
            state.isLogin = data;
        },
        changeAdminName(state, data) {
            state.adminName = data;
        },
        changeAdminId(state, data) {
            state.adminId = data;
        },
        changeAdminAvatar(state, data){
            state.avatar = data
        },
        changeAdminInfoObj(state, data) {
            state.adminInfoObj = Object.assign({}, state.adminInfoObj, data);
        },
        setLoginInfo(state, data) {
            state.loginInfo = Object.assign({}, state.loginInfo, data);
        }
    },
    actions: {
        getAdminInfo(context) {
            return checkAdminLoginInfo().then((res) => {
                if (res.success) {
                    context.commit("changeLogin", res.success);
                    context.commit("changeAdminName", res.data.adminName);
                    context.commit("changeAdminId", res.data.adminId);
                    context.commit("changeAdminInfoObj", res.data);
                    context.commit("changeAdminAvatar", res.data.avatar);
                } else {
                    context.commit("changeLogin", res.success);
                }
            });
        }
    },
};