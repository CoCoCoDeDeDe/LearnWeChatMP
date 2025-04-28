// pages/product/index.js
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
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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