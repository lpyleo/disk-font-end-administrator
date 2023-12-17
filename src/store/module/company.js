import { getCompanyInfo } from "@/request/admin";

export default {
    state: {
        companyName: '1'
    },
    mutations: {
        getCompanyName(state, data) {
            state.companyName = data;
        }
    },
    actions: {
        getCompanyInfo(context) {
            return getCompanyInfo().then((res) => {
                if(res.success){
                    context.commit("getCompanyName", res.data.companyName)
                }
            })
        }
    }
}