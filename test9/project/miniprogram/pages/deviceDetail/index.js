// pages/deviceDetail/index.js
import { requestWithLafToken } from '../../apis/laf'
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

    // TODO：获取设备信息，包括设备昵称\devicePoster
    await wx.setNavigationBarTitle({
      title: this.data.rootPageState.deviceNickname
    })

    await this.onRequestDeviceLatestProperties()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  // 获取本设备详情页面的设备所拥有的属性
  async onRequestDeviceLatestProperties(e) {
    // 通过 device_id 获取设备 uniIO 列表
    
    // 通过 uniIO 列表获取 uniIO 数据

  }
})