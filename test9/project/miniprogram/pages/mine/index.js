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

    let data = await requestWithLafToken('GET', `/iot/requestAccountProfile`)
      .then(res => {
        switch(res.response.data.runCondition) {
          case 'cant find the account':
          case 'find account profile error':
          
          wx.showToast({
            title: '找不到账号',
            icon: 'error',
            mask: true,
          })

          return  // 此处退出回调函数使得 data 得 undefine，在外面判断 data 是否为 undefine 以跳出 requestWithLafToken()
        }
        console.log("requestPageData res.response:", res.response)
        console.log("requestPageData res.response.data.data:", res.response.data.data)
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
        return  // 接力 then() 的 return
      }

      this.setData({
        user_profile: {
          avatar_url: data.avatar_url ? data.avatar_url : '/static/images/icons/defaultAvatar.png',
          nickname: data.nickname ? data.nickname : '请设置昵称',
          username: data.username ? data.username : '请设置用户名'
        }
      })

  }


})