import router from "./index.js";
import store from "@/store/index.js";

// 路由全局前置守卫
router.beforeEach((to, from, next) => {
    // 调用接口，判断当前登录状态
    store.dispatch("getAdminInfo").then(() => {
        if (to.matched.some((m) => m.meta.requireAuth)) {
            if (!store.getters.isLogin) {
                // 没有登录
                next({
                    path: "/login",
                    query: { Rurl: to.fullPath },
                });
            } else {
                next(); // 正常跳转到你设置好的页面
            }
        } else {
            next(); // 正常跳转到你设置好的页面
        }
    });
    store.dispatch("getCompanyInfo").then(() => {
        
    })
});