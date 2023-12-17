<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="20">
                <el-input v-if="type === 2" v-model="searchName" placeholder="请输入用户名称" @keyup.enter.native="search"
                    clearable size="small"></el-input>
                <el-input v-if="type === 3" v-model="searchName" placeholder="请输入通知名称" @keyup.enter.native="search"
                    clearable size="small"></el-input>
                <el-input v-if="type === 4" v-model="searchName" placeholder="请输入部门名称" @keyup.enter.native="search"
                    clearable size="small"></el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" @click="search" size="small">搜索</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            searchName: '', // 搜索关键字
        }
    },
    methods: {
        search() {
            this.$emit('search', this.searchName)
        }
    }
}
</script>

<style scoped></style>