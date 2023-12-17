<template>
    <div class="company-info">
        <h1>企业信息</h1>
        <el-form ref="form" label-width="80px" class="edit-form">
            <el-form-item label="企业名称">
                <el-input v-model="companyName"></el-input>
            </el-form-item>
            <el-form-item label="企业描述">
                <el-input :rows="8" v-model="companyDescription" type="textarea"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { getCompanyInfo, updateCompanyInfo } from '@/request/admin';

export default {
    data() {
        return {
            companyName: '企业名称',
            companyDescription: '企业描述',
        };
    },
    mounted() {
        this.getCompanyInfo()
    },
    methods: {
        save() {
            updateCompanyInfo({
                companyName: this.companyName,
                companyDetail: this.companyDescription
            }).then(
                (res) => {
                    if (res.success) {
                        this.getCompanyInfo()
                        this.$message.success("修改成功");
                        location.reload();
                    } else {
                        this.$message.error(res.message)
                    }
                }
            )
        },
        getCompanyInfo() {
            getCompanyInfo().then(
                (res) => {
                    if (res.success) {
                        this.companyName = res.data.companyName
                        this.companyDescription = res.data.companyDetail
                    } else {
                        this.$message.error(res.message)
                    }
                }
            )
        }
    },
};
</script>

<style scoped>
.company-info {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
    background-color: #f5f5f5;
    border-radius: 5px;
    margin-top: 100px;
}

h1 {
    font-size: 24px;
    margin-bottom: 10px;
}

p {
    font-size: 16px;
    margin-bottom: 20px;
}

.edit-form {
    margin-top: 30px;
}
</style>