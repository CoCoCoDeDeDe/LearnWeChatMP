const db = wx.cloud.database()
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataObj: {},
    count: Number
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection("test1").watch({
      onChange: res => {
        console.log("watch onChange: ", res)
        this.setData({
          dataObj: res.docs
        })
      },
      onError: err => {
        console.log("watch onError: ", err)
      }
    })
  },

  // get data
  getData() {
    // 库.表.doc() 只能按id搜索，一次搜1个
    // 库.表.where() 可以按若干个目标数据的任意一个结构和键和值相同的数据项的完整值搜索，一次可搜多个
    db.collection("test1").where({
      // author: {
      //   name: "随缘吧"
      // }
      // title: "addTestTitle"
    }).get()
    .then(res => {
      console.log("getData res", res)
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
      
    })  // then()
  }, // getData()

  // addData
  async addData() {
    wx.showLoading({
      title: 'Uploading...',
      mask: true 
    })

    await db.collection("test1").add({
      data: {
        title: "addTestTitle",
        author: [{
          id: "addTestAuthor0id",
          name: "addTestAuthor0name"
        }],
        content: "addTestContent",
        id_province: "addTestid_province",
        images_url: [
          "addTestimages_url0",
          "addTestimages_url1"
        ],
        tags: [
          "tag0",
          "tag1"
        ],
        publish_time: "time"
      }
    }).then(res => {
      console.log(res)
    })

    wx.hideLoading()
  }, // addData

  // onSubmit
  onSubmit(e) {
    console.log(e.detail)
    let valuelTmp = e.detail.value
    // let {title, ip_province, content} = e.detail.value

    db.collection("test1").add({
      data: {
        title: valuelTmp.title,
        ip_province: valuelTmp.ip_province,
        content: valuelTmp.content
      }
    })
  },  // onSubmit
  
  // onUpdate
  onUpdate(e) {
    let valuelTmp = e.detail.value

    // update() 和 set() 都是用于更新的函数，当上传的数据不充足或者某些数组项少于旧的时，set() 会将旧数据全清空再倒入新数据，而 update() 会保留未覆盖到的旧数据。
    // 小程序端 .update() 不能依靠 .where() 搜索，权限低。Server 端云函数的 .update() 可以依靠 .where()。
    db.collection("test1").doc(valuelTmp._id).update({
      data: {
        title: valuelTmp.title,
        ip_province: valuelTmp.ip_province,
        content: valuelTmp.content
      }
    })


  }, // onUpdate

  // updateTest
  updateTest() {
    db.collection("test1").doc("e1cff6356809dac901c3242a060a0caa").update({
      data: {
        tags: _.push("push2")
      }
    }).then(res => {
      console.log(res)
    })
  },

  // onDelete
  onDelete(e) {
    let valuelTmp = e.detail.value

    // 小程序端只能用.doc()一次删除一个，云函数用.where()一次可删除若干个
    // 控制台和小程序端的权限不统一，是两种权限主体
    db.collection("test1")
    .doc(valuelTmp._id)
    .remove()
    .then(res => {
      console.log(res)
    })
  },

  // onCount
  onCount(e) {
    console.log(e)
    let name = e.detail.value.author_name
    console.log("name: ", name)

    db
    .collection("test1")
    .where({
      author:
      {
        name: name
      }
    })
    .count()
    .then(res => {
      console.log("count:", res)
    })
  },

  // countAllRecords
  countAllRecords() {
    db.collection("test1").count().then(res => {
      console.log("countAllRecords: ", res)
    })
  }

})