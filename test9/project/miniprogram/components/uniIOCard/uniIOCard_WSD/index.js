// components/uniIOCard/uniIO-WSD/index.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})