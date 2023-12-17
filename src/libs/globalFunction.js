//全局函数 ，挂载到Vue实例上
export default function install(Vue) {
    //  加载缩略图
    Vue.prototype.downloadImgMin = function (row) {
        let fileUrl = row.fileUrl;
        if (fileUrl) {
            let index = fileUrl.lastIndexOf(".");
            fileUrl =
                "api" + fileUrl.substr(0, index) + "_min" + fileUrl.substr(index);
        }
        return fileUrl;
    };
    // 当然，你还可以在这里封装并挂载更多的全局函数在这里，示例同上
}