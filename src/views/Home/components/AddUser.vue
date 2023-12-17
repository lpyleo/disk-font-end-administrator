<template>
    <div class="registerWrapper" id="registerBackground">
        <div class="formWrapper">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                hide-required-asterisk>
                <el-form-item prop="department">
                    <TreeSelect ref="treeData" class="tree" :props="props" :options="optionData" :value="valueId"
                        :clearable="isClearable" :accordion="isAccordion" @getValue="getValue($event)"></TreeSelect>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input prefix-icon="el-icon-user" v-model="ruleForm.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="telephone">
                    <el-input prefix-icon="el-icon-mobile-phone" v-model="ruleForm.telephone" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input prefix-icon="el-icon-lock" v-model="ruleForm.password" placeholder="密码"
                        show-password></el-input>
                </el-form-item>
                <el-form-item class="registerButtonWrapper">
                    <el-button class="registerButton" type="primary" @click="submitForm('ruleForm')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
  
<script>
import { addUser } from "@/request/user.js";
import { getDeptTree } from "@/request/department.js";
import TreeSelect from "@/components/TreeSelect.vue";

export default {
    name: "Register",
    components: { TreeSelect },
    data() {
        return {
            ruleForm: {
                deptId: "",
                username: "",
                telephone: "",
                password: "",
                avatar: "",
            },
            rules: {
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur" },
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    {
                        min: 5,
                        max: 20,
                        message: "长度在 5 到 20 个字符",
                        trigger: "blur",
                    },
                ],
                telephone: [
                    { required: true, message: "请输入手机号", trigger: "blur" },
                    { min: 11, max: 11, message: "请输入11位手机号", trigger: "blur" },
                ],
            },
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
        };
    },
    created() {
        getDeptTree().then((res) => {
            if (res.success) {
                this.list = res.data
            }
        })
        let randomNum = Math.floor(Math.random() * 54)
        this.ruleForm.avatar = "https://xsgames.co/randomusers/assets/avatars/pixel/" + randomNum + ".jpg"
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
    methods: {
        // 注册按钮-点击事件
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                //    校验表单
                if (valid) {
                    this.ruleForm.deptId = this.valueId
                    //  各项校验通过-调用注册接口，传参用户名、手机号和密码
                    addUser(this.ruleForm).then((res) => {
                        if (res.success) {
                            this.$notify({
                                title: "成功",
                                message: "添加用户成功",
                                type: "success",
                            });
                            this.$refs[formName].resetFields(); // 注册成功之后清空表单
                            this.$emit('getTableData')
                            this.$emit('changeVisible')
                        } else {
                            this.$message.error(res.message); //  显示接口返回的错误信息
                        }
                    });
                } else {
                    // 表单校验没通过
                    this.$message.error("请完善信息！");
                    return false;
                }
            });
        },
        // 取值
        getValue(value) {
            this.valueId = value;
        }
    },
};
</script>
  
<style lang="stylus" scoped>
  .registerWrapper {
    height: 300px !important;
    min-height: 300px !important;
    width: 100% !important;
  
    .formWrapper {
      width: 375px;
      margin: 0 auto;
      text-align: center;
  
      .registerTitle {
        margin-bottom: 10px;
        font-weight: 300;
        font-size: 30px;
        color: #000;
      }
  
      .demo-ruleForm {
        width: 100%;
        margin-top: 20px;
  
        >>> .el-form-item__content {
          margin-left: 0 !important;
        }
  
        &>>> .el-input__inner {
          font-size: 16px;
        }
  
        .registerButtonWrapper {
          .registerButton {
            width: 100%;
          }
  
          &>>> .el-button {
            padding: 10px 90px;
            font-size: 16px;
          }
        }
      }

      .tree {
        width: 375px
      }
  
      .tip {
        width: 70%;
        margin-left: 86px;
      }
    }
  }
</style>