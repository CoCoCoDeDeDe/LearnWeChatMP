// pages/proDetail/proDetail.js

import { proDetail } from "../../api/apis"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    resData: {},
    isLoading: true,
    pageid: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    console.log("options", options)

    this.setData({
      pageid: options.id
    })

    await this.getData(this.data.pageid)

    wx.setNavigationBarTitle({
      title: this.data.resData.title
    })
  },

  // getData
  async getData(id) {

    this.setData({
      isLoading: true
    })

    await proDetail({
      id: id
    }).then(res => {
      console.log("res", res)

      this.setData({
        resData: res.data
      })

      console.log("this.data.resData", this.data.resData)

      wx.stopPullDownRefresh()

    })

    this.setData({
      isLoading: false
    })
  },

  // onPullDownRefresh

  onPullDownRefresh() {

    this.getData(this.data.pageid)

  }
})