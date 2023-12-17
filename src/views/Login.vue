<template>
    <div>
        <div class="loginWrapper" id="loginBackground">
            <div class="formWrapper">
                <h1 class="loginTitle">登录</h1>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                    hide-required-asterisk>
                    <el-form-item prop="telephone">
                        <el-input prefix-icon="el-icon-mobile-phone" v-model="ruleForm.telephone"
                            placeholder="手机号"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input prefix-icon="el-icon-lock" v-model="ruleForm.password" placeholder="密码"
                            show-password></el-input>
                    </el-form-item>
                    <el-form-item class="loginButtonWrapper">
                        <el-button class="loginButton" type="primary" @click="submitForm('ruleForm')">
                            登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
  
<script>
import { login } from "@/request/admin.js"; // 引入登录接口
import Cookies from "js-cookie";


export default {
    name: "Login",
    data() {
        return {
            ruleForm: {
                telephone: "",
                password: "",
            },
            rules: {
                telephone: [
                    { required: true, message: "请输入手机号", trigger: "blur" },
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
            },
            admin: {
                name: "",
                avatarUrl: ""
            },
        };
    },
    created() {
        if (this.$store.getters.isLogin) {
            // 用户若已登录，自动跳转到首页
            this.$notify({
                title: '成功',
                message: '您已登录！已跳转到首页',
                type: 'success'
            })
            this.$router.replace({
                name: "Home",
                query: { type: 1 },
            });
        }
    },
    methods: {
        //  登录按钮-点击事件
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 各项校验通过-调用登录接口
                    login(this.ruleForm, true).then((res) => {
                        if (res.success) {
                            Cookies.set("token", res.data.token); // 在cookies中添加token
                            this.$message.success("登录成功！");
                            this.$refs[formName].resetFields(); // 清空表单项
                            this.admin.name = this.$store.getters.adminName;
                            this.admin.avatarUrl = this.$store.getters.adminAvatar;
                            this.$emit("login",this.admin)
                            this.$router.replace({ name: "Home" }); // 跳转到首页
                        } else {
                            this.$message.error("手机号或密码错误！");
                        }
                    });
                } else {
                    this.$message.error("请完善信息！");
                    return false;
                }
            });
        },
    },
};
</script>
  
<style lang="stylus" scoped>
  .loginWrapper {
    height: 550px !important;
    min-height: 550px !important;
    padding-top: 50px;
  
    .formWrapper {
      width: 375px;
      margin: 0 auto;
      text-align: center;
  
      .loginTitle {
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
  
        .forgetPassword {
          text-align: right;
          margin: -22px 0 0 0;
        }
  
        .loginButtonWrapper {
          .loginButton {
            width: 100%;
          }
  
          &>>> .el-button {
            padding: 10px 90px;
            font-size: 16px;
          }
        }
      }
  
      .tip {
        width: 70%;
        margin-left: 86px;
      }
    }
  }
</style>