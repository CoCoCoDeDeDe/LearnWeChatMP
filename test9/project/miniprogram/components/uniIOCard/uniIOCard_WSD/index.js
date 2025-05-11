// components/uniIOCard/uniIO-WSD/index.js
import * as echarts from '../../../components/ec-canvas/echarts';
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    UniIOData: {
      type: Object,
      value: {
        UniIO_ExternalName: '负水位负水位负水位负水位',
        SmartLinkGroup_Name: '智联组12345678',
        Device_Name: '鱼菜共生智能鱼缸se1promax',
        LateastRecord: {
          event_time: 'default_event_time',
          value: 'DefaultValue',
        },
        UniIO_Value_Unit: 'DefaultUnit',
      },
      Records: [
        {
          event_time: 'default_event_time',
          value: 'DefaultValue',
        }
      ]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ec: {
      onInit: initChart
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, { width, height, devicePixelRatio: dpr });
  canvas.setChart(chart);
  const option = {
    // 图表配置项（参考 ECharts 官网）
    title: { text: '示例图表' },
    xAxis: { data: ['A', 'B', 'C'] },
    yAxis: {},
    series: [{ type: 'bar', data: [5, 20, 36] }]
  };
  chart.setOption(option);
  return chart;
}