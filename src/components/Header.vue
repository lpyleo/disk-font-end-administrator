<template>
    <el-menu class="header-menu" :default-active="activeIndex" :router="true" mode="horizontal">
        <el-menu-item index="Home" :route="{ name: 'Home', query: { type: 1 } }" v-show="isLogin">首页</el-menu-item>
        <el-menu-item index="Company" :route="{ name: 'Company' }" v-show="isLogin">企业信息</el-menu-item>
        <div v-show="isLogin" class="el-menu-item companyName">{{ companyName }}</div>
        <el-menu-item class="login" index="Login" :route="{ name: 'Login' }" v-show="!isLogin">登录</el-menu-item>
        <el-menu-item class="register" index="Register" :route="{ name: 'Register' }" v-show="!isLogin">注册</el-menu-item>
        <div class="el-menu-item exit" @click="exitButton()" v-show="isLogin">
            退出
        </div>
        <div class="el-menu-item username" v-show="isLogin">
            <el-avatar id="avatar" class="avatar" :src="adminAvatar"></el-avatar>
            {{ adminName }}
        </div>
    </el-menu>
</template>
  
<script>
import Cookies from "js-cookie";
import { getCompanyInfo } from "@/request/admin";

export default {
    name: "Header",
    data() {
        return {
            companyName: ''
        };
    },
    computed: {
        // 当前激活菜单的 index
        activeIndex() {
            return this.$route.name; //  获取当前路由名称
        },
        // 登录状态
        isLogin() {
            return this.$store.getters.isLogin;
        },
        // 用户名
        adminName() {
            return this.$store.getters.adminName;
        },
        adminAvatar() {
            return this.$store.getters.adminAvatar;
        },
        // companyName() {
        //     return this.$store.getters.companyName;
        // }
    },
    mounted() {
        this.getCompanyInfo()
    },
    methods: {
        // 退出登录
        exitButton() {
            Cookies.set("token", "");
            this.$router.push({ path: "/login" }); //  退出登录后跳转到登录页面
            this.$message.success("退出登录成功！");
        },
        getCompanyInfo() {
            getCompanyInfo().then(
                (res) => {
                    if (res.success) {
                        this.companyName = res.data.companyName
                    } else {
                        this.$message.error(res.message)
                    }
                }
            )
        }
    }
};
</script>
  
<style lang="stylus" scoped>
  .header-menu {
    padding: 0 24px;
  
    .login, .register, .username, .exit {
      float: right;
    }
    .companyName {
        margin-left: 500px;
        font-weight: bold;
        font-size: 20px;
        color: black;
    }

    .username {
        .avatar {
            margin-right: 8px
        }
    }
  }
  </style>