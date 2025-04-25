// pages/demo3/demo3.js
// import { formatDate } from "../../utils/common"

const db = wx.cloud.database()
const _ = db.command

Page({
  /**
   * 页面的初始数据
   */
  data: {
    dataObj: [
      {
        author: [
          {
            id: "default",
            name: "default"
          }
        ],
        content: "default",
        title: "default",
        _id: "default",
        publish_time: "",
        PageViews: 0
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },

  // getData
  getData() {

    db.collection('test1')
    .orderBy("PageViews","desc")
    .where({
      // PageViews: _.lte(1000)

      // author: {
      //   name: '英国老妹儿Amy'
      // }

      // PageViews: _.and(_.gte(100), _.lt(10000))  // and() 的写法1

      // PageViews: _.gte(100).and(_.lt(10000)) // and() 的写法2

      // author: _.or(_.eq({name: '英国老妹儿Amy'}), _.eq({name: 'YEAHYEAH帆'}))

      // author: {
      //   name: _.in(['英国老妹儿Amy', 'YEAHYEAH帆'])
      // }

      // publish_time: _.exists(false)
    })
    .get()
    .then(res => {
      // console.log(res)
      let dataTmp = res.data
      console.log(dataTmp)

      // 处理: 如果没有title；item.publish_time.$date处理
      let geneTitleLengthMax = 18
      dataTmp.forEach(item => {
        // 处理：如果没有title
        if(item.title == "") {
          if(item.content.length <= geneTitleLengthMax) {
            item.title = item.content
          } else {
            item.title = item.content.substring(0, geneTitleLengthMax) + "..."
          }
        }
        // 处理: item.publish_time.$date
        const date = new Date(item.publish_time)
        item.publish_time = date.toLocaleDateString()
      })

      // console.log("dataTmp_store:", dataTmp)
      this.setData({
        dataObj: dataTmp
      })
    })  // then()
  },  // getData()



})