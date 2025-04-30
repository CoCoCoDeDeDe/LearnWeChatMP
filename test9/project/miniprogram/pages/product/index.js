// pages/product/index.js
import { requestWithLafToken } from '../../apis/laf'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceProfileList: [
      {
        id: 'default_id',
        previewImgUrl: 'https://mp-1b9cd3c8-d666-4006-b791-11d5ce02e1be.cdn.bspapp.com/IoT1/test/previewImg_aqaq.png',
        nickname: '默认设备昵称1',
        atRegionName: '默认场所1',
        atZoneName: '默认功能区1'
      },
      {
        id: 'default_id',
        previewImgUrl: 'https://mp-1b9cd3c8-d666-4006-b791-11d5ce02e1be.cdn.bspapp.com/IoT1/test/previewImg_aqaq.png',
        nickname: '默认设备昵称2',
        atRegionName: '默认场所2',
        atZoneName: '默认功能区2'
      },
      {
        id: 'default_id',
        previewImgUrl: 'https://mp-1b9cd3c8-d666-4006-b791-11d5ce02e1be.cdn.bspapp.com/IoT1/test/previewImg_aqaq.png',
        nickname: '默认设备昵称3',
        atRegionName: '默认场所3',
        atZoneName: '默认功能区3'
      }
    ],
    advertisementSwiperItemList: [
      {
        imgUrl: 'https://mp-1b9cd3c8-d666-4006-b791-11d5ce02e1be.cdn.bspapp.com/IoT1/test/advertisementImg_1.jpg',
        navigatePath: ''
      },
      {
        imgUrl: 'https://mp-1b9cd3c8-d666-4006-b791-11d5ce02e1be.cdn.bspapp.com/IoT1/test/advertisementImg_2.jpg',
        navigatePath: ''
      },
      {
        imgUrl: 'https://mp-1b9cd3c8-d666-4006-b791-11d5ce02e1be.cdn.bspapp.com/IoT1/test/advertisementImg_3.jpg',
        navigatePath: ''
      },
      {
        imgUrl: 'https://mp-1b9cd3c8-d666-4006-b791-11d5ce02e1be.cdn.bspapp.com/IoT1/test/advertisementImg_4.jpg',
        navigatePath: ''
      },
      {
        imgUrl: 'https://mp-1b9cd3c8-d666-4006-b791-11d5ce02e1be.cdn.bspapp.com/IoT1/test/advertisementImg_5.jpg',
        navigatePath: ''
      },
      {
        imgUrl: 'https://mp-1b9cd3c8-d666-4006-b791-11d5ce02e1be.cdn.bspapp.com/IoT1/test/advertisementImg_6.jpg',
        navigatePath: ''
      },
      {
        imgUrl: 'https://mp-1b9cd3c8-d666-4006-b791-11d5ce02e1be.cdn.bspapp.com/IoT1/test/advertisementImg_7.jpg',
        navigatePath: ''
      }
    ],
    commodityCardProfileList: [
      {
        id: '1',
        previewImgUrl: 'https://mp-1b9cd3c8-d666-4006-b791-11d5ce02e1be.cdn.bspapp.com/IoT1/test/commodityPreviewImg_111111111.jpg',
        title: '默认标题默认标题默认标题默认标题默认标题默认标题默认标题默认标题',
        price: '默认价格',
        promotionList: [
          {
            id: 1,
            title_short: '促销1'
          },
          {
            id: 2,
            title_short: '促销2'
          },
          {
            id: 3,
            title_short: '促销2'
          },
          {
            id: 4,
            title_short: '促销促销4'
          },
          {
            id: 5,
            title_short: '促销促销促销c5'
          }
        ]
      },
      {
        id: '2',
        previewImgUrl: 'https://mp-1b9cd3c8-d666-4006-b791-11d5ce02e1be.cdn.bspapp.com/IoT1/test/commodityPreviewImg_222.jpg',
        title: '默认标题默认标题默认标题默认标题',
        price: '默认价格',
        promotionList: [
          {
            id: 1,
            title_short: '促销1'
          }
        ]
      },
      {
        id: '3',
        previewImgUrl: 'https://mp-1b9cd3c8-d666-4006-b791-11d5ce02e1be.cdn.bspapp.com/IoT1/test/commodityPreviewImg_222.jpg',
        title: '默认标题默认标题默认标题默认标题',
        price: '默认价格',
        promotionList: [
          {
            id: 1,
            title_short: '促销1'
          }
        ]
      },
      {
        id: '4',
        previewImgUrl: 'https://mp-1b9cd3c8-d666-4006-b791-11d5ce02e1be.cdn.bspapp.com/IoT1/test/commodityPreviewImg_111111111.jpg',
        title: '默认标题默认标题默认标题默认标题默认标题默认标题默认标题默认标题',
        price: '默认价格',
        promotionList: [
          {
            id: 1,
            title_short: '促销1'
          }
        ]
      },
      {
        id: '5',
        previewImgUrl: 'https://mp-1b9cd3c8-d666-4006-b791-11d5ce02e1be.cdn.bspapp.com/IoT1/test/commodityPreviewImg_111111111.jpg',
        title: '默认标题默认标题默认标题默认标题',
        price: '默认价格',
        promotionList: [
          {
            id: 1,
            title_short: '促销1'
          }
        ]
      }
    ],
    limit: 2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.requestPageData()
  },

  // 生命周期函数--监听页面隐藏
  async onHide() {
    this.setData({
      limit: 2  //每次离开页面重置 limit 使设备列表折叠
    })
  },
  
  // 页面重置
  reset(e) {
    this.setData({
      limit: 2  //每次离开页面重置 limit 使设备列表折叠
    })

  },

  async requestPageData(e) {

     let data = await requestWithLafToken('GET', `/iot/requestDevicesSimpleInfo?limit=${this.data.limit}`)
      .then(res => {
        console.log("requestPageData res.response.data.data:", res.response.data.data)

        switch(res.response.data.runCondition) {
          case 'find devices error':
          case 'find region error':
            on_request_error()
            return
          case 'succeed':
          // TODO: 没有设备时显示提示词
        }

        return res.response.data.data
      })
      .catch(err => {
        console.log("requestPageData err:", err)
        switch(err.runCondition) {
          case 'laf_token error':
            on_laf_token_Invalid()
            return
          case 'request error':
            on_request_error()
            return
        }
      })

      if (!data) {
        return
      }

      this.setData({
        devices: data
      })

  },

  onShowMoreDevices(e) {
    this.setData({
      limit: 0  // 不限制获取设备的数量，获取全部设备
    })

    this.requestPageData()

  },

  onAddDevice(e) {
    console.log("onAddDevice e:", e)
  },

  onToCommodityDetailPage(e) {
    console.log("onToCommodityDetailPage e:", e)
  },

  onToAdvertisementPage(e) {
    console.log("onToAdvertisementPage e:", e)
    console.log("onToAdvertisementPage")
  }

  
})