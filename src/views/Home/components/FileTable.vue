<template>
    <div>
        <el-table v-show="type === 2" class="table" :data="tableData" height="calc(100vh - 202px)" style="width: 100%"
            v-loading="loading" @selection-change="handleSelectRow">
            <!-- 勾选框 -->
            <el-table-column type="selection" width="56" align="center"></el-table-column>
            <el-table-column prop="username" label="姓名" width="300" v-if="selectedColumnList.includes('username')">
            </el-table-column>
            <el-table-column prop="deptName" label="部门" width="300" v-if="selectedColumnList.includes('deptName')">
            </el-table-column>
            <el-table-column prop="parentDeptName" label="分公司" width="300"
                v-if="selectedColumnList.includes('parentDeptName')">
            </el-table-column>
            <el-table-column>
                <!-- 自定义表格头 -->
                <template slot="header">
                    <span>操作</span>
                    <i class="el-icon-circle-plus" title="展开" @click="operaColumnIsFold = true"></i>
                    <i class="el-icon-remove" title="折叠" @click="operaColumnIsFold = false"></i>
                </template>
                <template slot-scope="scope">
                    <!-- 操作列展开状态下的按钮 -->
                    <div class="opera-unfold" v-if="operaColumnIsFold">
                        <el-button type="text" size="small" @click.native="handleClickDelete(scope.row)">删除</el-button>
                        <el-button type="text" size="small" @click.native="handleClickChange(scope.row)">修改</el-button>
                    </div>
                    <!-- 操作列收缩状态下的按钮 -->
                    <el-dropdown trigger="click" v-else>
                        <el-button size="mini">
                            操作
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="handleClickDelete(scope.row)">删除</el-dropdown-item>
                            <el-dropdown-item @click.native="handleClickChange(scope.row)">修改</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
        <el-table v-show="type === 3" class="table" :data="tableData1" height="calc(100vh - 202px)"
            style="width: 100%;cursor: pointer;user-select: none;" v-loading="loading" @row-dblclick="handleDbClick"
            @selection-change="handleSelectRow">
            <!-- 勾选框 -->
            <el-table-column type="selection" width="56" align="center"></el-table-column>
            <el-table-column prop="noticeName" label="通知名称" width="300" v-if="selectedColumnList1.includes('noticeName')">
            </el-table-column>
            <el-table-column prop="sendTime" label="通知时间" width="300" v-if="selectedColumnList1.includes('sendTime')">
            </el-table-column>
            <el-table-column prop="sender" label="通知人" width="300" v-if="selectedColumnList1.includes('sender')">
            </el-table-column>
            <el-table-column>
                <!-- 自定义表格头 -->
                <template slot="header">
                    <span>操作</span>
                    <i class="el-icon-circle-plus" title="展开" @click="operaColumnIsFold = true"></i>
                    <i class="el-icon-remove" title="折叠" @click="operaColumnIsFold = false"></i>
                </template>
                <template slot-scope="scope">
                    <!-- 操作列展开状态下的按钮 -->
                    <div class="opera-unfold" v-if="operaColumnIsFold">
                        <el-button type="text" size="small" @click.native="handleClickDelete(scope.row)">删除</el-button>
                        <el-button type="text" size="small" @click.native="handleClickChange(scope.row)">修改</el-button>
                    </div>
                    <!-- 操作列收缩状态下的按钮 -->
                    <el-dropdown trigger="click" v-else>
                        <el-button size="mini">
                            操作
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="handleClickDelete(scope.row)">删除</el-dropdown-item>
                            <el-dropdown-item @click.native="handleClickChange(scope.row)">修改</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
        <el-table v-show="type === 4" class="table" :data="tableData2" height="calc(100vh - 202px)" style="width: 100%"
            v-loading="loading" @selection-change="handleSelectRow">
            <!-- 勾选框 -->
            <el-table-column type="selection" width="56" align="center"></el-table-column>
            <el-table-column prop="deptName" label="部门" width="200" v-if="selectedColumnList2.includes('deptName')">
            </el-table-column>
            <el-table-column prop="parentName" label="父级部门" width="200" v-if="selectedColumnList2.includes('parentName')">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="200" v-if="selectedColumnList2.includes('email')">
            </el-table-column>
            <el-table-column prop="phone" label="电话" v-if="selectedColumnList2.includes('phone')">
            </el-table-column>
            <el-table-column>
                <!-- 自定义表格头 -->
                <template slot="header">
                    <span>操作</span>
                    <i class="el-icon-circle-plus" title="展开" @click="operaColumnIsFold = true"></i>
                    <i class="el-icon-remove" title="折叠" @click="operaColumnIsFold = false"></i>
                </template>
                <template slot-scope="scope">
                    <!-- 操作列展开状态下的按钮 -->
                    <div class="opera-unfold" v-if="operaColumnIsFold">
                        <el-button type="text" size="small" @click.native="handleClickDelete(scope.row)">删除</el-button>
                        <el-button type="text" size="small" @click.native="handleClickChange(scope.row)">修改</el-button>
                    </div>
                    <!-- 操作列收缩状态下的按钮 -->
                    <el-dropdown trigger="click" v-else>
                        <el-button size="mini">
                            操作
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="handleClickDelete(scope.row)">删除</el-dropdown-item>
                            <el-dropdown-item @click.native="handleClickChange(scope.row)">修改</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :visible.sync="dialogVisible" title="更改部门">
            <el-form ref="form" :model="form">
                <el-form-item label="部门" prop="department">
                    <TreeSelect class="tree" :props="props" :options="optionData" :value="valueId" :clearable="isClearable"
                        :accordion="isAccordion" @getValue="getValue($event)"></TreeSelect>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleSubmit">提交</el-button>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="dialogVisible1" title="通知详情" width="50%">
            <div v-if="selectedNotice">
                <el-card>
                    <h3 slot="header" style="text-align: center">{{ selectedNotice.noticeName }}</h3>
                    <el-row>
                        <el-col :span="24">
                            <p style="text-indent: 2em">{{ selectedNotice.noticeContent }}</p>
                        </el-col>
                    </el-row>
                </el-card>
            </div>
            <div v-else>暂无内容</div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible1 = false">关闭</el-button>
            </span>
        </el-dialog>
        <el-dialog :visible.sync="dialogVisible2" title="修改通知信息">
            <el-form ref="form" :model="form">
                <el-form-item label="通知标题" prop="noticeName">
                    <el-input v-model="form.noticeName"></el-input>
                </el-form-item>
                <el-form-item label="通知内容" prop="noticeContent">
                    <el-input :rows="8" type="textarea" v-model="form.noticeContent"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="dialogVisible2 = false">取消</el-button>
                <el-button type="primary" @click="handleSubmit1">提交</el-button>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="dialogVisible3" title="发布通知">
            <el-form ref="form" :model="form">
                <el-form-item label="通知标题" prop="noticeName">
                    <el-input v-model="form1.noticeName"></el-input>
                </el-form-item>
                <el-form-item label="通知内容" prop="noticeContent">
                    <el-input :rows="8" type="textarea" v-model="form1.noticeContent"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="dialogVisible3 = false">取消</el-button>
                <el-button type="primary" @click="handleSubmit2">提交</el-button>
            </div>
        </el-dialog>

        <el-dialog title="修改部门" class="out" :visible.sync="modalVisible" width="500px">
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
</template>
  
<script>
// 引入部门树组件
import TreeSelect from '@/components/TreeSelect.vue';

// 引入删除用户接口
import { deleteUser } from '@/request/user';
// 引入获取部门树接口
import { getDeptTree } from "@/request/department.js";
// 引入修改部门的接口
import { updateUserDept } from '@/request/user';
import { deleteDept } from '@/request/department.js';

// 引入删除通知接口
import { deleteNotice } from '@/request/notice';
// 引入更新通知接口
import { updateNotice } from '@/request/notice';
// 引入发布通知接口
import { publishNotice } from '@/request/notice';
import { updateDept } from '@/request/department.js';


export default {
    name: "FileTable",
    components: {
        TreeSelect
    },
    props: {
        // 表格数据
        tableData: {
            type: Array,
        },
        tableData1: {
            type: Array,
        },
        tableData2: {
            type: Array,
        },
        // 表格加载状态
        loading: {
            type: Boolean,
            required: true
        },
        // 文件类型
        type: {
            type: Number,
            required: true
        },
        pageData: {
            type: Object,
            required: true,
        },
        flag: {
            type: Boolean,
        }
    },
    data() {
        return {
            operaColumnIsFold: sessionStorage.getItem('operaColumnIsFold') || false,//  表格操作列-是否收缩
            dialogVisible: false,
            dialogVisible1: false,
            dialogVisible2: false,
            dialogVisible3: false,
            modalVisible: false,
            selectedNotice: null,
            form: {
                noticeContent: null,
                noticeName: null
            },
            form1: {
                noticeContent: null,
                noticeName: null
            },
            currentRow: null,
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
            deptName: '',
            phone: '',
            email: '',
            deptId: ''
        }
    },
    computed: {
        // 表格显示列
        selectedColumnList() {
            return this.$store.getters.selectedColumnList
        },
        selectedColumnList1() {
            return this.$store.getters.selectedColumnList1
        },
        selectedColumnList2() {
            return this.$store.getters.selectedColumnList2
        },
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
    watch: {
        // 监听收缩状态变化，存储在sessionStorage中，保证页面刷新时仍然保存设置的状态
        operaColumnIsFold(newValue) {
            sessionStorage.setItem('operaColumnIsFold', newValue)
        },
        flag(newValue) {
            this.dialogVisible3 = newValue
        }
    },
    created() {
        this.operaColumnIsFold = sessionStorage.getItem('operaColumnIsFold') === 'true' //  读取保存的状态
        getDeptTree().then((res) => {
            if (res.success) {
                this.list = res.data
            }
        })
    },
    methods: {
        // 表格行勾选事件
        handleSelectRow(selection) {
            this.$emit('handleSelect', true, selection) // true/false 批量移动/单文件操作；selection 勾选的表格行数据
        },
        handleDbClick(row) {
            this.selectedNotice = row
            this.dialogVisible1 = true
        },
        // 删除按钮 - 点击事件
        handleClickDelete(row) {
            // 消息弹框提示用户
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    // 确定按钮 点击事件 调用删除文件接口
                    if (this.type === 2) {
                        deleteUser({
                            tele: row.telephone,
                            currentPage: this.pageData.currentPage,
                            pageCount: this.pageData.pageCount
                        }).then((res) => {
                            if (res.success) {
                                this.$emit('getTableData') //  刷新文件列表
                                this.$message.success('删除成功')
                            } else {
                                this.$message.error(res.message)
                            }
                        })
                    }
                    if (this.type === 3) {
                        deleteNotice({
                            noticeId: row.noticeId,
                            currentPage: this.pageData.currentPage,
                            pageCount: this.pageData.pageCount
                        }).then((res) => {
                            if (res.success) {
                                this.$emit('getTableData') //  刷新文件列表
                                this.$message.success('删除成功')
                            } else {
                                this.$message.error(res.message)
                            }
                        })
                    }
                    if (this.type === 4) {
                        deleteDept(row).then((res) => {
                            if (res.success) {
                                this.$emit('getTableData') //  刷新文件列表
                                this.$message.success('删除成功')
                            } else {
                                this.$message.error(res.message)
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
        // 修改按钮 - 点击事件
        handleClickChange(row) {
            if (this.type === 2) {
                this.dialogVisible = true
                this.currentRow = row
            }
            if(this.type === 3){
                this.dialogVisible2 = true
                this.currentRow = row
                this.form.noticeContent = row.noticeContent
                this.form.noticeName = row.noticeName
            }
            if(this.type === 4) {
                this.modalVisible = true
                this.deptName = row.deptName
                this.phone = row.phone
                this.email = row.email
                this.valueId = row.parentId
                this.deptId = row.deptId
            }
        },
        handleSubmit() {
            // 提交表单
            this.$refs.form.validate(valid => {
                if (valid) {
                    updateUserDept({
                        userId: this.currentRow.userId,
                        deptId: this.valueId,
                        currentPage: this.pageData.currentPage,
                        pageCount: this.pageData.pageCount
                    }).then(
                        (res) => {
                            if (res.success) {
                                this.dialogVisible = false
                                this.$message.success("修改成功！")
                                this.$emit('getTableData') // 刷新文件列表
                            } else {
                                this.$message.error(res.message)
                            }
                        }
                    )
                }
            })
        },
        handleSubmit1() {
            // 提交表单
            this.$refs.form.validate(valid => {
                if (valid) {
                    updateNotice({
                        noticeId: this.currentRow.noticeId,
                        noticeContent: this.form.noticeContent,
                        noticeName: this.form.noticeName,
                        currentPage: this.pageData.currentPage,
                        pageCount: this.pageData.pageCount
                    }).then(
                        (res) => {
                            if (res.success) {
                                this.dialogVisible2 = false
                                this.$message.success("修改成功！")
                                this.$emit('getTableData') // 刷新文件列表
                            } else {
                                this.$message.error(res.message)
                            }
                        }
                    )
                }
            })
        },
        handleSubmit2() {
            // 提交表单
            this.$refs.form.validate(valid => {
                if (valid) {
                    publishNotice({
                        noticeContent: this.form1.noticeContent,
                        noticeName: this.form1.noticeName,
                    }).then(
                        (res) => {
                            if (res.success) {
                                this.dialogVisible3 = false
                                this.$message.success("发布成功！")
                                this.$emit('getTableData') // 刷新文件列表
                            } else {
                                this.$message.error(res.message)
                            }
                        }
                    )
                }
            })
        },
        // 取值
        getValue(value) {
            this.valueId = value;
        },
        closeModal() {
            this.modalVisible = false;
            this.clearForm();
        },
        clearForm() {
            this.deptName = '';
            this.phone = '';
            this.email = ''
        },
        saveDepartment() {
            console.log(this.deptName)
            updateDept({
                deptId: this.deptId,
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
                            this.$message.success('修改成功')
                        }
                    })
                } else {
                    this.$message.error(res.message)
                }
            })
            this.clearForm();
            this.modalVisible = false;
        }
    },
};
</script>

<style lang="stylus" scoped>
.in{
    width: 300px;
}
.table {
  // 调整滚动条样式
  >>> .el-table__body-wrapper {
    setScrollbar(8px, #EBEEF5, #909399);
  }
}
// 表格操作列-表头图标样式调整
.el-icon-circle-plus, .el-icon-remove {
    margin-left: 8px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        opacity: 0.5;
    }
}
</style>