// pages/mine/index.js
import { requestWithLafToken, on_laf_token_Invalid, on_request_error } from '../../apis/laf'

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
    ],
    user_profile: {
      avatar_url: '/static/images/icons/defaultAvatar.png',
      nickname: 'default nickname',
      username: 'default username'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // console.log("onLoad options:", options)
    this.reset()

    this.requestPageData()
    // const res = await wx.getStorage({key: 'laf_token'})
    // console.log("测试 res", res)
  },
  
  // 页面重置
  reset(e) {

  },

  // 获取mine页面信息
  async requestPageData(e) {
    let userProfile
    try{
      const requestRes = await requestWithLafToken('GET', `/iot2/getUserProfile`)
      switch(requestRes.data.runCondition) {
        case 'succeed':
          userProfile = requestRes.data.userProfile
          break
        case 'db error':
          wx.showToast({
            title: '数据库错误',
            duration: 1500,
            icon: 'error',
            mask: true,
          })
          return
      }
    } catch(err) {
      console.log("API getUserProfile err:", err)
      switch(err.runCondition) {
        case 'laf_token error':
          on_laf_token_Invalid()
          return
        case 'request error':
          on_request_error()
          return
      }
    }

    // 成功的继续
    this.setData({
      user_profile: {
        avatar_url: userProfile.avatar_url ? userProfile.avatar_url : '/static/images/icons/defaultAvatar.png',
        nickname: userProfile.nickname ? userProfile.nickname : 'default nickname',
        username: userProfile.username,
      }
    })
  }


})