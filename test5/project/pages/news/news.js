import {formatNum, formatTimestamp} from "../../utils/common.js"
import { queryNews } from "../../api/apis"

// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsArr: [],
    isLoading: false,
    doesRemain: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getNewsData()
  },

  // getNewsData
  getNewsData(size = 0) {

    this.setData({
      isLoading: true
    })

    queryNews({
      limit: 8,
      size
    }).then(res => {
      
      console.log(res)

      res.data.forEach(item => {
        item.view_count = formatNum(item.view_count)
        item.publish_date = formatTimestamp(item.publish_date)
      })
      
      let oldData = this.data.newsArr
      // let newData = [...oldData, ...res.data]
      let newData = oldData.concat(res.data)

      wx.stopPullDownRefresh()

      this.setData({
        newsArr: newData,
        isLoading: false
      })

      if(this.data.newsArr.length >= res.total) {
        console.log("没有更多数据了")

        this.setData({
          doesRemain: false
        })
      }
    })
  },

  // reach bottom
  onReachBottom(options) {

    if(!this.data.doesRemain) return

    console.log("options", options)

    this.getNewsData(this.data.newsArr.length);

  },

  // pull down refreash
  onPullDownRefresh() {

    this.setData({
      newsArr: [],
      isLoading: false,
      doesRemain: true
    })

    this.getNewsData()
  }

})