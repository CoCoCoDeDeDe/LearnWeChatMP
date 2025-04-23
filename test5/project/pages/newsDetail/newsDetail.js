import { newsDetail } from "../../api/apis"
import { formatNum, formatTimestamp_2 } from "../../utils/common"
let id

// pages/newsDetail/newsDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: null
  },

  /**
   * 生命周期函数--监听页面加载
   * option 接收上一个页面传来的参数
   */
  onLoad: function (options) {
    console.log("options", options)
    id = options.id

    this.getDetail()

    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  // get detail data
  getDetail: function () {
    newsDetail({
      // 对象内属性名称和作为属性值的变量名称相同时直接写 属性名 即可代表 属性名: 变量名
      id
    }).then(res => {

      console.log("res", res)

      let detail = res.data

      detail.view_count = formatNum(detail.view_count)
      detail.publish_date = formatTimestamp_2(detail.publish_date)

      detail.content = detail.content.replace(/<p/gi, "<p class='pstyle'")
      detail.content = detail.content.replace(/<img/gi, "<img class='imgstyle'")

      this.setData({
        detail: detail
      })
      
    wx.setNavigationBarTitle({
      title: res.data.title
    })

    }).catch(err => {

      console.log("err", err)
    })

  },

  /*
    用户点击右上角分享
  */
  onShareAppMessage: function () {
    if (this.data.detail) {
      return {
        title: this.data.detail.title,
        path: "/pages/newsDetail/newsDetail?id=" + this.data.detail._id
      }
    }
    return {}
  },

  /*
    分享到分朋友圈
  */
 onShareTimeline: function (){
  if (this.data.detail) {
    return {
      title: this.data.detail.title,
      path: "/pages/newsDetail/newsDetail?id=" + this.data.detail._id
    }
  }
  return {}
 }

})