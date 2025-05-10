// pages/deviceDetail/index.js
import { isValidNonEmptyString } from '../../../utils/common'
import { requestWithLafToken, on_laf_token_Invalid, on_request_error, on_db_error, on_param_error, on_unknown_error, on_common_error } from '../../../apis/laf'
Page({

  /**
   * 页面的初始数据
   */
  data: {

    "common_info": {
      "device_info": {
        "_id": "default_device_id",
        "product_id": "default_product_id",
        "huawei_device_id": "default_huawei_device_id",
        "name": "默认设备名称",
        "createdAt": "20250502T064449Z",
        "updateAt": "20250502T064449Z"
      },
      "product_info": {
        "_id": "DefaultDeviceId",
        "name": "默认产品名称",
        "previewImg_url": "https://mp-1b9cd3c8-d666-4006-b791-11d5ce02e1be.cdn.bspapp.com/IoT1/test/previewImg_aqaq.png",
        "detailPoster_url": "https://mp-1b9cd3c8-d666-4006-b791-11d5ce02e1be.cdn.bspapp.com/IoT1/test/devicePoster1x1_22213.png",
        "intro": "默认产品简介",
        "updateAt": "20250502T062058Z"
      }
    },

    UniIODataList: [

    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    console.log("options", options)
    await this.setData({
      'common_info.device_info.huawei_device_id': options.huawei_device_id,
    })

    await this.reset()
  },

  // 根据 uniIO 数组获取 uniIO 数据、生成 uniIO 卡片的程序要独立于 通过 device 获取 uniIO 数组的程序，以便根据 smartLinkGroup 等其他方式获取不同的 uniIO 数组
  async reset() {
    // 初始化各种配置
    await this.setData({

    })

    /* 获取设备和产品信息( product_profile, device_profile, ) */
    await this.GetCommonInfo(this.data.common_info.device_info.huawei_device_id)

    /* 通过 huawei_device_id 获取 uniIOCardDataList。数据由 html 的 wx:for 用于渲染卡片 */
    await this.GetUniIODataList(this.data.common_info.device_info.huawei_device_id)

    // 设置页面导航栏标题
    await wx.setNavigationBarTitle({
      title: `我的设备 ${this.data.common_info.device_info.name}`,
    })
  },

  /* 获取设备和产品信息( product_profile, device_profile, ) */
  async GetCommonInfo(huawei_device_id) {
    try{
      const resData = await requestWithLafToken('GET', '/iot2/device/getDeviceInfo', { huawei_device_id : huawei_device_id })
      // console.log("resData:", resData)
      this.setData({
        common_info: resData.common_info
      })
    } catch(err) {
      switch(err.runCondition) {
        case 'laf_token error':
          on_laf_token_Invalid()
          return
        default:
          on_common_error()
          return
      }
    }
  },
  
  /* 通过 huawei_device_id 获取 uniIOCardDataList。数据由 html 的 wx:for 用于渲染卡片 */
  async GetUniIODataList(huawei_device_id) {
    let resData
    try{
      resData = await requestWithLafToken('GET', '/iot2/uniIO/GetUniIOCardDataList', { huawei_device_id : huawei_device_id })
      // console.log("resData:", resData)
    } catch(err) {
      switch(err.runCondition) {
        case 'laf_token error':
          on_laf_token_Invalid()
          return
        default:
          on_common_error()
          return
      }
    }
    
    // 遍历每个 UniIOData 项，找到其 Records 中最近的一项 Record 并单独存放
    const UniIODataList = await Promise.all( resData.UniIODataList.map( async (item, idx, arr) => {
      
      // 找到其 Records 中最近的一项 Record 即 LateastRecord
      // 校验 Records
      let LateastRecord
      if(item.Records.length > 0) { // 获取的记录为空时不 reduce()
        LateastRecord = item.Records.reduce( (prev, current) => {
          const prevTime = new Date(prev.event_time).getTime()
          const currentTime = new Date(current.event_time).getTime()
          return currentTime > prevTime ? current : prev
        } )
      } else{
        LateastRecord = {}
      }
      // console.log("LateastRecord:", LateastRecord)
      let NewItem = item
      NewItem['LateastRecord'] = LateastRecord
      // console.log("NewItem:", NewItem)

      return NewItem
    } ) )
    this.setData({
      UniIODataList: UniIODataList,
    })
  }


})