import { get, post } from "./http";

// 获取部门树
export const getDeptTree = (p) => get("/department/departmenttree", p);
// 获取部门列表
export const getDeptList = (p) => get("/department/getdeptlist", p);
// 模糊查询部门
export const searchDeptList = (p) => get("/department/searchdeptlist", p);
// 删除部门
export const deleteDept = (p) => post("/department/deletedept", p);
// 批量删除部门
export const deleteDeptLists = (p) => post("/department/deletedeptlists", p);
// 添加部门
export const addDept = (p) => post("/department/adddept", p);
// 更新部门信息
export const updateDept = (p) => post("/department/updatedept", p);