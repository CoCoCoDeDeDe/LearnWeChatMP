// pages/demo4/demo4.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.cloud.callFunction({
      name: 'getData',
      data: {
        limit: 10
      }
    })
    .then(res => {
      console.log(res)
    })
  }


})