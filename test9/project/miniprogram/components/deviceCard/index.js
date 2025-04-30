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
        previewImgUrl: 'https://mp-1b9cd3c8-d666-4006-b791-11d5ce02e1be.cdn.bspapp.com/IoT1/test/previewImg_aqaq.png',
        deviceName: '默认设备昵称',
        regionName: '默认场所',
        zoneName: '默认功能区'
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
    columnBtnsArr: [
      {
        imageSrc: '/static/images/icons/icon_deviceDetail_line_dekBlue@2x.png',
        bindtap: 'onToDeviceDetail'
      },
      {
        imageSrc: '/static/images/icons/icon_edit_line_darkBlue@2x.png',
        bindtap: 'onToEditDevice'
      },
      {
        imageSrc: '/static/images/icons/icon_delete_line_darkBlue@2x.png',
        bindtap: 'onToDeleteDevice'
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {

    onToDeviceDetail(e) {
      console.log("onToDeviceDetail e:", e)
    },

    onToEditDevice(e) {
      console.log("onToEditDevice e:", e)
    },

    onToDeleteDevice(e) {
      console.log("onToDeleteDevice e:", e)
    }
  }
})