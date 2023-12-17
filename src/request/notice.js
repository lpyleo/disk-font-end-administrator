import { get, post } from "./http";

// 获取详细的系统通知列表接口
export const getNoticeInfoList = (p) => get("/notice/getnoticeinfolist", p);
// 发布通知接口
export const publishNotice = (p) => post("/notice/publishnotice", p);
// 删除通知接口
export const deleteNotice = (p) => get("/notice/deletenotice", p);
// 批量删除通知接口
export const deleteNoticeBatch = (p) => get("/notice/deletenoticebatch", p);
// 模糊查询通知
export const searchNoticeInfoByName = (p) => get("/notice/searchnoticeinfobyname", p);
// 更新通知
export const updateNotice = (p) => get("/notice/updatenotice", p);