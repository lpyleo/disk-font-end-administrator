export default {
    state: {
        allColumnList1: ["noticeName", "sendTime", "sender"], // 所有可供选择的表格列
        selectedColumnList1: sessionStorage.getItem("selectedColumnList1"), // 需要显示的表格列
    },
    mutations: {
        // 改变需要显示的表格列
        changeSelectedColumnList1(state, data) {
            sessionStorage.setItem("selectedColumnList1", data.toString());
            state.selectedColumnList1 = data.toString();
        },
    },
    actions: {},
};