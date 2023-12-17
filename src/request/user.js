import { get, post } from "./http";

// 注册接口
export const addUser = (p) => post("/user/register", p);
// 获取各分公司当日登录情况的接口
export const getLoginTodayCount = (p) => get("/user/getlogintodaycount", p);
// 查询用户对应的部门信息的接口
export const getUserDeptInfo = (p) => get("/user/getuserdeptinfo", p);
// 根据用户名模糊搜索用户部门信息的接口
export const searchUserDept = (p) => get("/user/searchuserdept", p);
// 根据部门id搜索用户部门信息的接口
export const searchUserDeptByDeptId = (p) => get("/user/searchuserdeptbydeptid", p);
// 删除用户接口
export const deleteUser = (p) => get("/user/deleteuser", p);
// 批量删除用户接口
export const deleteUserBatch = (p) => get("/user/deleteuserbatch", p);
// 根据用户id修改用户部门的接口
export const updateUserDept = (p) => get("/user/updateuserdept", p);