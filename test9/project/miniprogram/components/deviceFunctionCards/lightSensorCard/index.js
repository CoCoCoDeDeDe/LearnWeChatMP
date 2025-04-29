// components/deviceFunctionCards/lightSensorCard/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    currentValue: {
      type: Number,
      value: 200
      },
    valueHistory: {
      type: Array,
      value: [
        {
          time: '',
          value: '100'
        }
      ]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})