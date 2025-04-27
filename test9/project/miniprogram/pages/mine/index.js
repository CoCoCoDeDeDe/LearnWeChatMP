// pages/mine/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serviceNavigatorCardList: [
      {
        iconUrl: '/static/images/icons/icon_helpAndFeedback_block_darkBlue@2x.png',
        title: '帮助与反馈',
        navigateUrl: '/pages/mine/index'  // TODO 打造帮助与反馈页面
      },
      {
        iconUrl: '/static/images/icons/icon_shoppingOrder_block_darkBlue@2x.png',
        title: '购物记录',
        navigateUrl: '/pages/mine/index'  // TODO 打造购物记录页面
      },
      {
        iconUrl: '/static/images/icons/icon_afterService_block_darkBlue@2x.png',
        title: '产品售后',
        navigateUrl: '/pages/mine/index'  // TODO 打造产品售后页面
      }
    ],
    programNavigatorCardList: [
      {
        iconUrl: '/static/images/icons/icon_programSetting_block_darkBlue@2x.png',
        title: '设置',
        navigateUrl: '/pages/mine/index'  // TODO 打造程序设置页面
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log("onLoad options:", options)
    this.reset()
  },
  
  // 页面重置
  reset(e) {
    this.setData({
      userPublicInfo: {
        avatarUrl: getApp().globalData.userPublicInfo.avatarUrl,
        nickname: getApp().globalData.userPublicInfo.nickname,
        accountNumber: getApp().globalData.userPublicInfo.accountNumber,
        test1: 1
      }
    })
  }


})