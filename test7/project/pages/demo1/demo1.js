// pages/demo1/demo1.js
let userInfo = {
  avatarUrl: 'default',
  nickname: 'default'
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    // wx.setStorageSync('userInfo', userInfo)
  },

  // onChooseAvatar
  onChooseAvatar(e) {
    console.log('onChooseAvatar e', e)
    userInfo.avatarUrl = e.detail.avatarUrl
  },

  // onNicknameSubmit
  onNicknameConfirm(e) {
    console.log('onNicknameConfirm e', e)
    userInfo.nickname = e.detail.value
  },

  // onLogIn
  onLogIn(e) {
    console.log("onLogIn e", e)

    if(!userInfo.avatarUrl||!userInfo.name) {
      wx.showToast({
        title: '信息不完整',
        duration: 1000,
        icon: 'error',
        mask: false
      })
      return
    }

    wx.setStorageSync('userInfo', userInfo)
  },

  // onLogOut
  onLogOut(e) {
    console.log('onLogOut e', e)
    this.setData({
      avatarUrl: null,
      nickname: null,
      isLogin: false
    })
  }

})