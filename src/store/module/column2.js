export default {
    state: {
        allColumnList2: ["deptName", "parentName", "email", "phone"], // 所有可供选择的表格列
        selectedColumnList2: sessionStorage.getItem("selectedColumnList2"), // 需要显示的表格列
    },
    mutations: {
        // 改变需要显示的表格列
        changeSelectedColumnList2(state, data) {
            sessionStorage.setItem("selectedColumnList2", data.toString());
            state.selectedColumnList2 = data.toString();
        },
    },
    actions: {},
};