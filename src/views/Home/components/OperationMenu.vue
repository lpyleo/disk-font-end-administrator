<template>
    <div>
        <div class="operation-menu-wrapper">
            <!-- 按钮组 -->
            <el-button-group class="operate-group">
                <el-button v-if="type === 3" size="mini" type="primary" icon="el-icon-plus"
                    @click="handleClick">发布新通知</el-button>
                <el-button v-if="type === 2" size="mini" type="primary" icon="el-icon-plus"
                    @click="handleClick1">添加用户</el-button>
                <el-button v-if="type === 4" size="mini" type="primary" icon="el-icon-plus"
                    @click="handleClick2">添加部门</el-button>
                <!-- disabled 当表格勾选项为空时，禁用删除按钮 -->
                <el-button size="mini" type="primary" icon="el-icon-delete" :disabled="!operationList.length"
                    @click="handleDeleteClick()">删除</el-button>
            </el-button-group>
            <el-dialog :visible.sync="dialogVisible" title="添加用户">
                <AddUser @changeVisible="changeVisible" @getTableData="handleClick2"></AddUser>
            </el-dialog>
            <el-dialog title="添加部门" class="out" :visible.sync="modalVisible" width="500px">
                <el-form label-width="80px">
                    <el-form-item label="部门">
                        <el-input class="in" v-model="deptName"></el-input>
                    </el-form-item>
                    <el-form-item label="父级部门">
                        <TreeSelect class="tree in" :props="props" :options="optionData" :value="valueId"
                            :clearable="isClearable" :accordion="isAccordion" @getValue="getValue($event)"></TreeSelect>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input class="in" v-model="phone"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input class="in" v-model="email"></el-input>
                    </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="closeModal">取消</el-button>
                    <el-button type="primary" @click="saveDepartment">保存</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
  
<script>
import TreeSelect from "@/components/TreeSelect.vue";
import AddUser from "./AddUser.vue";


import { deleteUserBatch } from "@/request/user"
import { deleteNoticeBatch } from "@/request/notice";
import { deleteDeptLists } from "@/request/department";
import { getDeptTree } from "@/request/department.js";
import { addDept } from "@/request/department.js";

export default {
    name: "OperationMenu",
    components: {
        AddUser,
        TreeSelect
    },
    props: {
        type: {
            type: Number,
            required: true,
        },
        // 表格行 已选项
        operationList: {
            type: Array,
            required: true
        },
        pageData: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            dialogVisible: false,
            isClearable: true, // 可清空（可选）
            isAccordion: true, // 可收起（可选）
            valueId: 1, // 初始ID（可选）
            props: {
                // 配置项（必选）
                value: "id",
                label: "name",
                children: "children"
                // disabled:true
            },
            // 选项列表（必选）
            list: [{ id: 1, parentId: 0, name: "总公司", rank: 1 }],
            modalVisible: false,
            deptName: '',
            phone: '',
            email: ''
        };
    },
    methods: {
        // 删除按钮 - 点击事件
        handleDeleteClick() {
            let uList
            if (this.type === 2) {
                let listn = JSON.parse(JSON.stringify(this.operationList))
                uList = listn[0].telephone
                for (let i = 1; i < listn.length; i++) {
                    uList = uList + ',' + listn[i].telephone
                }
            }
            if (this.type === 3) {
                let listn = JSON.parse(JSON.stringify(this.operationList))
                uList = listn[0].noticeId
                for (let i = 1; i < listn.length; i++) {
                    uList = uList + ',' + listn[i].noticeId
                }
            }
            if (this.type === 4) {
                let listn = JSON.parse(JSON.stringify(this.operationList))
                uList = listn[0].deptId
                for (let i = 1; i < listn.length; i++) {
                    uList = uList + ',' + listn[i].deptId
                }
            }
            // 消息弹框提示用户
            this.$confirm('此操作将永久删除用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    // 确定按钮 点击事件 调用批量删除文件接口
                    if (this.type === 2) {
                        deleteUserBatch({
                            list: uList,
                            currentPage: this.pageData.currentPage,
                            pageCount: this.pageData.pageCount
                        }).then((res) => {
                            if (res.success) {
                                this.$message({
                                    message: res.message,
                                    type: 'success'
                                })
                                this.$emit('getTableData') //  刷新文件列表
                            } else {
                                this.$message.error('失败' + res.message)
                            }
                        })
                    }
                    if (this.type === 3) {
                        deleteNoticeBatch({
                            noticeIdList: uList,
                            currentPage: this.pageData.currentPage,
                            pageCount: this.pageData.pageCount
                        }).then((res) => {
                            if (res.success) {
                                this.$message({
                                    message: res.message,
                                    type: 'success'
                                })
                                this.$emit('getTableData') //  刷新文件列表
                            } else {
                                this.$message.error('失败' + res.message)
                            }
                        })
                    }
                    if (this.type === 4) {
                        deleteDeptLists({
                            deptIds: uList
                        }).then((res) => {
                            if (res.success) {
                                this.$message({
                                    message: res.message,
                                    type: 'success'
                                })
                                this.$emit('getTableData') //  刷新文件列表
                            } else {
                                this.$message.error('失败' + res.message)
                            }
                        })
                    }
                })
                .catch(() => {
                    //  取消
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
        },
        handleClick() {
            this.$emit("send-info", true)
        },
        handleClick1() {
            this.dialogVisible = true
        },
        handleClick2() {
            this.modalVisible = true
            this.$emit('getTableData')
        },
        changeVisible() {
            this.dialogVisible = false
        },
        getValue(value) {
            this.valueId = value;
        },
        closeModal() {
            this.modalVisible = false;
            this.clearForm();
        },
        saveDepartment() {
            addDept({
                deptName: this.deptName,
                email: this.email,
                parentId: this.valueId,
                phone: this.phone
            }).then((res) => {
                if (res.success) {
                    this.$emit("getTableData")
                    getDeptTree().then((res) => {
                        if (res.success) {
                            this.list = res.data
                            this.$message.success('添加成功')
                            this.valueId = 1
                        }
                    })
                } else {
                    this.$message.error(res.message)
                }
            })
            this.clearForm();
            this.modalVisible = false;
        },
        clearForm() {
            this.deptName = '';
            this.phone = '';
            this.email = ''
        }
    },
    created() {
        getDeptTree().then((res) => {
            if (res.success) {
                this.list = res.data
            }
        })
    },
    computed: {
        /* 转树形数据 */
        optionData() {
            let cloneData = JSON.parse(JSON.stringify(this.list)); // 对源数据深度克隆
            return cloneData.filter(father => {
                // 循环所有项，并添加children属性
                let branchArr = cloneData.filter(child => father.id == child.parentId); // 返回每一项的子级数组
                branchArr.length > 0 ? (father.children = branchArr) : ""; //给父级添加一个children属性，并赋值
                return father.parentId == 0; //返回第一层
            });
        }
    },
};
</script>

<style scoped>
.in {
    width: 300px;
}
</style>