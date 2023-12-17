<template>
  <div class="home">
    <!-- 左侧菜单 -->
    <SideMenu class="home-left"></SideMenu>
    <!-- 右侧内容区 -->
    <div class="home-right" v-if="type !== 1">
      <div class="operation-wrapper" v-if="type !== 1">
        <!-- 操作按钮组件 -->
        <OperationMenu v-if="type === 2" :type="type" :pageData="pageData" :operationList="operationList"
          @getTableData="getUserDeptInfo" @handleSelect="setOperation"></OperationMenu>
        <OperationMenu @send-info="handleInfo" v-if="type === 3" :type="type" :pageData="pageData"
          :operationList="operationList" @getTableData="getNoticeInfoList" @handleSelect="setOperation"></OperationMenu>
        <OperationMenu v-if="type === 4" :type="type" :pageData="pageData" :operationList="operationList"
          @getTableData="getDeptList" @handleSelect="setOperation"></OperationMenu>
        <Search :type="type" class="searchFile" @search="onSearch"></Search>
        <SelectColumn v-if="type === 2"></SelectColumn>
        <SelectColumn1 v-if="type === 3"></SelectColumn1>
        <SelectColumn2 v-if="type === 4"></SelectColumn2>
      </div>
      <!-- 表格组件 - 文件展示区 v-if 当左侧菜单选择图片且查看模式为"列表"时显示 或 左侧菜单选择的非图片-->
      <FileTable v-if="type === 2" :pageData="pageData" @handleSelect="setOperation" :tableData="tableData"
        :loading="loading" :type="type" @getTableData="getUserDeptInfo">
      </FileTable>
      <FileTable v-if="type === 4" :pageData="pageData" @handleSelect="setOperation" :tableData2="tableData2"
        :loading="loading" :type="type" @getTableData="getDeptList">
      </FileTable>
      <FileTable :flag="flag" v-if="type === 3" :pageData="pageData" @handleSelect="setOperation" :tableData1="tableData1"
        :loading="loading" :type="type" @getTableData="getNoticeInfoList"></FileTable>
      <!-- 分页组件 -->
      <FilePagination v-if="type !== 1" :pageData="pageData" @changePageData="changePageData"></FilePagination>
    </div>
    <div class="home-right" v-if="type === 1">
      <el-card class="card1">
        <el-card class="box-card">
          <BarGraph :data="barGraphData"></BarGraph>
        </el-card>
        <el-card class="box-card" style="margin-top: 20px">
          <RankBarGraph :data="barGraphData1"></RankBarGraph>
        </el-card>
      </el-card>
    </div>
  </div>
</template>

<script>
// 引入左侧菜单组件
import SideMenu from "./components/SideMenu.vue";
// 引入文件上传组件
import OperationMenu from './components/OperationMenu.vue'
// 引入控制列显隐组件
import SelectColumn from './components/SelectColumn.vue'
// 引入搜索框组件
import Search from "./components/Search.vue";
// 引入文件表格展示区
import FileTable from "./components/FileTable.vue";
// 引入分页组件
import FilePagination from './components/FilePagination.vue';
// 引入柱形图组件
import BarGraph from './components/BarGraph.vue';
// 引入排名柱形图组件
import RankBarGraph from "./components/RankBarGraph.vue";
// 引入控制列显隐组件
import SelectColumn1 from './components/SelectColumn1.vue'


// 引入获取用户列表接口
import { getUserDeptInfo } from "@/request/user";
// 引入获取通知列表的接口
import { getNoticeInfoList } from "@/request/notice"
// 引入根据用户名模糊搜索用户部门信息的接口
import { searchUserDept } from "@/request/user";
// 引入根据通知名模糊查询通知接口
import { searchNoticeInfoByName } from "@/request/notice"
// 引入获取各分公司当日登录情接口
import { getLoginTodayCount } from "@/request/user";
// 引入下载量统计接口
import { getDeptFileDownloads } from "@/request/departmentFile"

import { getDeptList } from "@/request/department.js";
import SelectColumn2 from "./components/SelectColumn2.vue";
import { searchDeptList } from "@/request/department.js";



export default {
  name: "Home",
  components: {
    SideMenu,
    OperationMenu,
    SelectColumn,
    SelectColumn1,
    Search,
    FileTable,
    FilePagination,
    BarGraph,
    RankBarGraph,
    SelectColumn2
  },
  data() {
    return {
      flag: false,
      loading: false,
      tableData: [],
      tableData1: [],
      tableData2: [],
      pageData: {
        currentPage: 1, //   页码
        pageCount: 20, //  每页显示条目个数
        total: 0, //  总数
      },
      isBatch: false,
      operation: {}, // 单个操作的信息
      operationList: [], // 批量操作的信息
      barGraphData: [],
      barGraphData1: []
    };
  },
  computed: {
    // 左侧菜单选中的类型
    type() {
      return this.$route.query.type ? Number(this.$route.query.type) : 1
    }
  },
  watch: {
    type() {
      if (this.type === 1) {
        this.getLoginTodayCount()
        this.getDeptFileDownloads()
      }
      if (this.type === 2) {
        this.getUserDeptInfo()
      }
      if (this.type === 3) {
        this.getNoticeInfoList()
      }
      if (this.type === 4) {
        this.getDeptList()
      }
    }
  },
  mounted() {
    if (this.type === 1) {
      this.getLoginTodayCount()
      this.getDeptFileDownloads()
    }
    if (this.type === 2) {
      this.getUserDeptInfo()
    }
    if (this.type === 3) {
      this.getNoticeInfoList()
    }
    if (this.type === 4) {
      this.getDeptList()
    }
  },
  methods: {
    getUserDeptInfo() {
      getUserDeptInfo({
        currentPage: this.pageData.currentPage,
        pageCount: this.pageData.pageCount
      }).then(
        (res) => {
          this.loading = false
          if (res.success) {
            this.tableData = res.data.list
            this.pageData.total = res.data.total
          } else {
            this.$message.error(res.message)
          }
        },
        (error) => {
          this.loading = false
          console.log(error)
        }
      )
    },
    getNoticeInfoList() {
      getNoticeInfoList({
        currentPage: this.pageData.currentPage,
        pageCount: this.pageData.pageCount
      }).then(
        (res) => {
          this.loading = false //  关闭表格loading状态
          if (res.success) {
            this.tableData1 = res.data.list // 表格数据赋值
            this.pageData.total = res.data.total //  分页组件 - 文件总数赋值
          } else {
            this.$message.error(res.message)
          }
        },
        (error) => {
          this.loading = false
          console.log(error)
        }
      )
    },
    getDeptList() {
      getDeptList({
        currentPage: this.pageData.currentPage,
        pageCount: this.pageData.pageCount
      }).then(
        (res) => {
          this.loading = false //  关闭表格loading状态
          if (res.success) {
            this.tableData2 = res.data.list // 表格数据赋值
            this.pageData.total = res.data.total //  分页组件 - 文件总数赋值
          } else {
            this.$message.error(res.message)
          }
        },
        (error) => {
          this.loading = false
          console.log(error)
        }
      )
    },
    changePageData(pageData) {
      this.pageData.currentPage = pageData.currentPage // 页码赋值
      this.pageData.pageCount = pageData.pageCount //  每页条目数赋值
      if (this.type === 2) {
        this.getUserDeptInfo()
      }
      if (this.type === 3) {
        this.getNoticeInfoList()
      }
      if (this.type === 4) {
        this.getDeptList()
      }
    },
    setOperation(isBatch, dataList) {
      this.isBatch = isBatch //  保存操作类型
      if (isBatch) {
        this.operationList = dataList //  批量操作文件
      } else {
        this.operation = dataList //  单个操作文件
      }
    },
    onSearch(keyword) {
      if (this.type === 2) {
        searchUserDept({
          username: keyword,
          currentPage: this.pageData.currentPage,
          pageCount: this.pageData.pageCount
        }).then(
          (res) => {
            this.loading = false //  关闭表格loading状态
            if (res.success) {
              this.tableData = res.data.list // 表格数据赋值
              this.pageData.total = res.data.total //  分页组件 - 文件总数赋值
            } else {
              this.$message.error(res.message)
            }
          },
          (error) => {
            this.loading = false
            console.log(error)
          }
        )
      }
      if (this.type === 3) {
        searchNoticeInfoByName({
          noticeName: keyword,
          currentPage: this.pageData.currentPage,
          pageCount: this.pageData.pageCount
        }).then(
          (res) => {
            this.loading = false //  关闭表格loading状态
            if (res.success) {
              this.tableData1 = res.data.list // 表格数据赋值
              this.pageData.total = res.data.total //  分页组件 - 文件总数赋值
            } else {
              this.$message.error(res.message)
            }
          },
          (error) => {
            this.loading = false
            console.log(error)
          }
        )
      }
      if (this.type === 4) {
        searchDeptList({
          deptName: keyword,
          currentPage: this.pageData.currentPage,
          pageCount: this.pageData.pageCount
        }).then(
          (res) => {
            this.loading = false //  关闭表格loading状态
            if (res.success) {
              this.tableData2 = res.data.list // 表格数据赋值
              this.pageData.total = res.data.total //  分页组件 - 文件总数赋值
            } else {
              this.$message.error(res.message)
            }
          },
          (error) => {
            this.loading = false
            console.log(error)
          }
        )
      }
    },
    handleInfo(info) {
      this.flag = info
    },
    getLoginTodayCount() {
      getLoginTodayCount().then(
        (res) => {
          if (res.success) {
            this.barGraphData = res.data
          } else {
            this.$message.error(res.message)
          }
        }
      )
    },
    getDeptFileDownloads() {
      getDeptFileDownloads().then(
        (res) => {
          if (res) {
            this.barGraphData1 = res
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
.home {
  // 使用flex布局 菜单居左固定宽度 右侧内容区域自适应宽度
  display: flex;

  .home-left {
    box-sizing: border-box;
  }

  .card1{
    height: 630px;
    overflow: auto
  }

  .home-right {
    box-sizing: border-box;
    width: calc(100% - 200px);
    padding: 8px 24px;
    flex: 1;
    
    .operation-wrapper {
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .searchFile {
        margin-right: 200px;
      }

      // 左侧菜单按钮组 样式调整
      >>> .operation-menu-wrapper {
          flex: 1;
      }
    }
  }
}
</style>