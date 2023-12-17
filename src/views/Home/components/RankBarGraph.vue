<template>
    <div class="echart1" id="mychart1" :style="myChartStyle"></div>
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
            this.xData = this.chartData.map(item => item.downloads)
            this.yData = this.chartData.map(item => (item.fileName + '.' + item.extendName))
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
                    text: '各文件下载量统计',
                    left: 'center'
                },
                xAxis: {
                    type: 'value',
                },
                yAxis: {
                    type: 'category',
                    data: this.yData
                },
                series: [
                    {
                        type: "bar", //形状为柱状图
                        data: this.xData,
                        itemStyle: {
                            color: 'orange'
                        }
                    }
                ]
            };
            const myChart = echarts.init(document.getElementById("mychart1"));
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