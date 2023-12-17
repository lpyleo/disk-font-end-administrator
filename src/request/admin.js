import { get, post } from "./http";

// 登录接口
export const login = (p) => get("/admin/login", p);
// 注册接口
export const addAdmin = (p) => post("/admin/register", p);
// 获取登录状态及用户信息
export const checkAdminLoginInfo = (p) => get("/admin/checkadminlogininfo", p);
// 获取用户信息
export const getAdminInfo = (p) => get("admin/getAdminInfo", p);
// 获取企业信息
export const getCompanyInfo = (p) => get("/company/getcompanyInfo", p);
// 更新企业信息
export const updateCompanyInfo = (p) => post("/company/updatecompanyinfo", p);