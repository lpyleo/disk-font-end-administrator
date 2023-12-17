<template>
    <el-menu class="side-menu" :default-active="activeIndex" :router="true" :collapse="isCollapse"
        background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <div class="fold-wrapper">
            <!-- click事件 当点击时切换菜单的收缩状态 -->
            <i class="el-icon-s-unfold" v-if="isCollapse" title="展开" @click="isCollapse = false"></i>
            <i class="el-icon-s-fold" v-else title="收缩" @click="isCollapse = true"></i>
        </div>
        <el-menu-item class="monitoring" index="1" :route="{ name: 'Home', query: { type: 1 } }">
            <i class="el-icon-monitor"></i>
            <span slot="title">系统监测</span>
        </el-menu-item>
        <el-menu-item class="authority" index="2" :route="{ name: 'Home', query: { type: 2 } }">
            <i class="el-icon-user-solid"></i>
            <span slot="title">权限管理</span>
        </el-menu-item>
        <el-menu-item class="information" index="3" :route="{ name: 'Home', query: { type: 3 } }">
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">系统通知</span>
        </el-menu-item>
        <el-menu-item class="department" index="4" :route="{ name: 'Home', query: { type: 4 } }">
            <i class="el-icon-office-building"></i>
            <span slot="title">部门管理</span>
        </el-menu-item>
    </el-menu>
</template>
  
<script>
export default {
    name: "SideMenu",
    props: {
        
    },
    data() {
        return {
            isCollapse: false, //  控制菜单收缩展开
        };
    },
    computed: {
        // 当前激活菜单的 index
        activeIndex() {
            return String(this.$route.query.type); //  获取当前路由参数中包含的文件类型
        },
    },
    watch: {
        // 监听收缩状态变化，存储在sessionStorage中，保证页面刷新时仍然保存设置的状态
        isCollapse(newValue) {
            sessionStorage.setItem("isCollapse", newValue);
        },
    },
    created() {
        this.isCollapse = sessionStorage.getItem("isCollapse") === "true"; //  读取保存的状态
    },
    methods: {
    }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/style/mixins.styl';

.side-menu {
    position: relative;
    // 高度设置为屏幕高度减去顶部导航栏的高度
    height: calc(100vh - 61px);
    overflow: auto;
    // 调整滚动条样式
    // setScrollbar(6px, #909399, #EBEEF5);

    // 折叠图标调整样式
    .fold-wrapper {
        height: 56px;
        line-height: 56px;
        padding: 0 20px;
        text-align: right;
        color: #fff;
        font-size: 24px;

        .el-icon-s-unfold, .el-icon-s-fold {
            cursor: pointer;

            &:hover {
                opacity: 0.5;
            }
        }
    }

    // .information {
    //     margin-bottom: 100px
    // }

}

// 对展开状态下的菜单设置宽度
.side-menu:not(.el-menu--collapse) {
    width: 200px;
}
</style>