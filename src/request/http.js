import axios from "axios";
import { Message } from "element-ui";
import Cookies from "js-cookie";

// 请求超时时间
axios.defaults.timeout = 10000 * 5;
// 请求基础URL，对应后台服务接口地址
axios.defaults.baseURL = "/api";
// 自定义post请求头
axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";


// 请求拦截器
axios.interceptors.request.use(
    (config) => {
        //    自定义请求头
        config.headers["token"] = Cookies.get("token");
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

// 响应拦截器
axios.interceptors.response.use(
    (response) => {
        if (response.status === 200) {
            //    接口HTTP状态码为200时
            return Promise.resolve(response);
        }
    },
    // HTTP状态码非200的情况
    (error) => {
        if (error.response.status) {
            switch (error.response.status) {
                case 500: //    HTTP状态码500
                    Message.error("后台服务发生错误");
                    break;
                case 401: //    HTTP状态码401
                    Message.error("无权限");
                    break;
                case 404: //    HTTP状态码404
                    Message.error("当前接口不存在");
                    break;
                default: //    页面显示接口返回的错误信息
                    this.$message.error(error.response.message);
                    return Promise.reject(error.response);
            }
        }
    }
);

/**
 * get方法，对应get请求
 */
export function get(url, params, info = "") {
    return new Promise((resolve, reject) => {
        axios
            .get(url + info, {
                params: params,
            })
            .then((res) => {
                resolve(res.data); //    返回接口响应结果
            })
            .catch((err) => {
                reject(err.data);
            });
    });
}

/**
* post方法，对应post请求
* info为 true，formData格式；
* info为 undefined或false，是json格式
*/
export function post(url, data = {}, info) {
    return new Promise((resolve, reject) => {
        let newData = data;
        if (info) {
            //  转formData格式
            newData = new FormData();
            for (let i in data) {
                newData.append(i, data[i]);
            }
        }
        axios
            .post(url, newData, {
                headers: {
                    'Content-Type': 'application/json',
                    'charset': 'UTF-8'
                }
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.data);
            });
    });
}

/**
* 封装put请求
*/

export function put(url, params = {}, info = "") {
    return new Promise((resolve, reject) => {
        axios.put(url + info, params).then(
            (res) => {
                resolve(res.data);
            },
            (err) => {
                reject(err.data);
            }
        );
    });
}

/**
 * 封装delete请求
 */
export function axiosDelete(url, params = {}, info = "") {
    return new Promise((resolve, reject) => {
        axios
            .delete(url + info, {
                params: params,
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.data);
            });
    });
}