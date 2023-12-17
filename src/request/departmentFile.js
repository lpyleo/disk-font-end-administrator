import { get } from "./http";

export const getDeptFileDownloads = (p) => get("/departmentfile/getdeptfiledownloads", p);