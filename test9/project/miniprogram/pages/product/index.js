// pages/product/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceProfileList: [
      {
        id: 'default_id',
        previewImgUrl: '/static/images/previewImg/previewImg_aqaq.png',
        nickname: '默认设备昵称1',
        atRegionName: '默认场所1',
        atZoneName: '默认功能区1'
      },
      {
        id: 'default_id',
        previewImgUrl: '/static/images/previewImg/previewImg_aqaq.png',
        nickname: '默认设备昵称2',
        atRegionName: '默认场所2',
        atZoneName: '默认功能区2'
      },
      {
        id: 'default_id',
        previewImgUrl: '/static/images/previewImg/previewImg_aqaq.png',
        nickname: '默认设备昵称3',
        atRegionName: '默认场所3',
        atZoneName: '默认功能区3'
      }
    ],
    commodityCardProfileList: [
      {
        id: '1',
        previewImgUrl: '/static/images/previewImg/commodityPreviewImg_111111111.jpg',
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
        previewImgUrl: '/static/images/previewImg/commodityPreviewImg_111111111.jpg',
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
        previewImgUrl: '/static/images/previewImg/commodityPreviewImg_111111111.jpg',
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
        previewImgUrl: '/static/images/previewImg/commodityPreviewImg_111111111.jpg',
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
        previewImgUrl: '/static/images/previewImg/commodityPreviewImg_111111111.jpg',
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

  onToCommodityDetailPage(e) {
    console.log("onToCommodityDetailPage e:", e)
  }

  
})