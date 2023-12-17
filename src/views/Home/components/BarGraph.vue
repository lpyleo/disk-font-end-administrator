<template>
    <div class="echart" id="mychart" :style="myChartStyle"></div>
</template>

<script>
import * as  echarts from 'echarts'

export default {
    data() {
        return {
            chartData: [],
            xData: [], //横坐标
            yData: [], //数据
            myChartStyle: { float: "left", width: "100%", height: "400px" } //图表样式
        }
    },
    props: {
        data: {
            type: Array,
            default: () => []
        }
    },
    watch: {
        data(newValue) {
            this.chartData = newValue
            this.xData = this.chartData.map(item => item.deptName)
            this.yData = this.chartData.map(item => item.loginCount)
            this.initEcharts();
        }
    },
    mounted() {
    },
    methods: {
        initEcharts() {
            // 基本柱状图
            const option = {
                title: {
                    text: '各分公司本日登录人数统计',
                    left: 'center'
                },
                xAxis: {
                    data: this.xData
                },
                yAxis: {},
                series: [
                    {
                        type: "bar", //形状为柱状图
                        data: this.yData
                    }
                ]
            };
            const myChart = echarts.init(document.getElementById("mychart"));
            myChart.setOption(option);
            //随着屏幕大小调节图表
            window.addEventListener("resize", () => {
                myChart.resize();
            });
        }
    }
}
</script>


<style scoped></style>