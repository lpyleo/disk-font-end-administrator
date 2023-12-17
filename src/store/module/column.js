export default {
    state: {
        allColumnList: ["username", "deptName", "parentDeptName"], // 所有可供选择的表格列
        selectedColumnList: sessionStorage.getItem("selectedColumnList"), // 需要显示的表格列
    },
    mutations: {
        // 改变需要显示的表格列
        changeSelectedColumnList(state, data) {
            sessionStorage.setItem("selectedColumnList", data.toString());
            state.selectedColumnList = data.toString();
        },
    },
    actions: {},
};