// init wx clout database, const means cant strightly change data but use api by rule
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataObj: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },

  // get data
  getData() {
    // 获取并处理从数据库获取的表
    db.collection("test1").get().then(res => {
      // 临时变量
      let resTmp = res
      let geneTitleLengthMax = 18

      // 处理如果没有title
      resTmp.data.forEach(item => {
        if(item.title == "") {
          if(item.content.length <= geneTitleLengthMax) {
            item.title = item.content
          } else {
            item.title = item.content.substring(0, geneTitleLengthMax) + "..."
          }
        }
      })

      // 存储为响应式数据
      this.setData({
        dataObj: resTmp.data
      })
      
    })
  }
})