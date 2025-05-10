// pages/deviceDetail/index.js
import { requestWithLafToken } from '../../../apis/laf'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    device_profile: {
      device_name: '默认设备名称',
    },


    uniIOCardList: [
      {
      _id: '1',
      templateName: 'uniIOCard_WSD',
        external_name: '负水位',
        // nickname: '负水位',
        para_unit: 'cm',
        smartLinkGroup_id: '1',
        smartLinkGroup_name: '智联组1',
        currentValue: 30,
        racords: [
          {
            "event_time": "20250510T031623Z",
            "value": "1",
          },
          {
            "event_time": "20250510T031624Z",
            "value": "2",
          },
          {
            "event_time": "20250510T031625Z",
            "value": "3",
          },
        ]
      },
    ],
    
    componentData: {
      deviec_id: '',
      device_name: '',
      product_id: '',
      product_name: '',
    },

    descFunctionCardType_enum: {
      sensor_Light: 'sensor_Light',
      ctrl_lightPower: 'ctrl_lightPower',
      // nextTask: 'nextTask',
      dailyCrontab: 'dailyCrontab',
      countDownCrontab: 'countDownCrontab',
      countUpCrontab: 'countUpCrontab',
      manualEvent: 'manualEvent'
    },

    rootPageState: {
      deviceNickname: '默认设备昵称',
      devicePoster: 'https://mp-1b9cd3c8-d666-4006-b791-11d5ce02e1be.cdn.bspapp.com/IoT1/test/devicePoster1x1_22213.png',
      // TODO：根据设备产品类型，动态获取卡片
      parentFunctionList: [
        {
          title: '光',
          descFunctionList: [
            {
              cardType: 'sensor_Light',
              value: 200
            },
            {
              cardType: 'ctrl_lightPower',
              value: 66
            },
            {
              cardType: 'dailyCrontab',
              taskList: [
                {
                  id: '1',
                  time: Date(),
                  
                }
              ]
            }
          ]
        }
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {

    this.reset()
  },

  // 根据 uniIO 数组获取 uniIO 数据、生成 uniIO 卡片的程序要独立于 通过 device 获取 uniIO 数组的程序，以便根据 smartLinkGroup 等其他方式获取不同的 uniIO 数组
  async reset() {
    // 初始化各种配置
    this.setData({
      
    })

    /* 获取设备信息( device_name, product_detailPoster_url,  ) */

    /* 通过 huawei_device_id 获取 uniIOCardList */

    /* 获取 uniIOCardList 中的 uniIOCard 的数据。数据由 html 的 wx:for 渲染卡片 */

    // 设置页面导航栏标题
    await wx.setNavigationBarTitle({
      title: `我的设备 ${this.data.device_profile.device_name}`,
    })
  },



})