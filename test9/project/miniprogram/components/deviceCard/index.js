// components/deviceCard/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    deviceProfile: {
      type: Object,
      value: {
        id: 'default_id',
        previewImgUrl: '/static/images/previewImg/previewImg_aqaq.png',
        nickname: 'default_nickname',
        atRegionName: 'default_atRegionName',
        atZoneName: 'default_atZoneName'
      }
      ,
      required: false,
      observer: function(newVal, oldVal, changedPath) {}
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