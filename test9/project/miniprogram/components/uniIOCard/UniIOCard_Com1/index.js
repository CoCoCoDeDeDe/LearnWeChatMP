// components/uniIOCard/UniIOCard_Common_1/index.js
import * as echarts from '../../../components/ec-canvas/echarts';

let UniIOData

Component({

  // 组件的属性列表
  properties: {
    UniIOData: {
      type: Object,
      value: {
        UniIO_ExternalName: '负水位负水位负水位负水位',
        SmartLinkGroup_Name: '智联组12345678',
        Device_Name: '鱼菜共生智能鱼缸se1promax',
        UniIO_Value_Unit: 'DefaultUnit',
        LateastRecord: {
          event_time: 'default_event_time',
          value: 'DefaultValue',
        },
        EChartData: {
          xAxis: {
            data: [
              '00:00',
              '00:01',
              '00:08',
              '00:11',
              '10:00',
              '15:00',
              '16:00',
              '18:01',
            ]
          },
          series: [{
            name: '负载率',
            data: [5, 20, 500, 5, 20, 500, 5, 20],
            itemStyle: { color: '#FFEC71' }, // 线条颜色
          }]
        }
      },
    }
  },

  // 组件的初始数据
  data: {
    // ec: {
    //   onInit: this.initChart
    // }
  },
  
  async attached() {
    UniIOData = this.properties.UniIOData
    this.setData({      
      ec: {
        onInit: this.initChart
      }
    })
  },

  // 组件的方法列表
  methods: {
    initChart(canvas, width, height, dpr) {
      const chart = echarts.init(canvas, null, { width, height, devicePixelRatio: dpr });
      canvas.setChart(chart);
      const option = {
        // title: { text: '折线图示例' },
        tooltip: {
          trigger: 'axis' // 触发方式为坐标轴触发
        },
        xAxis: {
          type: 'category',
          data: UniIOData.EChartData.xAxis.data,
          axisLine: { show: false }, // 隐藏X轴线
          axisTick: { show: false }  // 隐藏刻度线
        },
        yAxis: {
          type: 'value',
          splitLine: { lineStyle: { color: '#e0e0e0' } } // Y轴分割线样式
        },
        series: [{
          name: UniIOData.EChartData.series[0].name,
          type: 'line',
          smooth: true, // 平滑曲线
          data: UniIOData.EChartData.series[0].data,
          itemStyle: UniIOData.EChartData.series[0].itemStyle, // 线条颜色
          lineStyle: { width: 2 }, // 线宽
          showSymbol: true, // 显示数据点标记
          symbol: 'circle', // 标记形状（circle/triangle等）
          symbolSize: 8     // 标记大小
        }]
      };
      chart.setOption(option);
      return chart;
    }
  }
})
