// pages/demo2/demo2.js
const db = wx.cloud.database()

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

  },

  // getData
  getData() {
    db.collection('test1')
    // limit() 配合 skip() 将要搜索的所有数据用limit(l)分为n/l页，搜第x页就用skip(l*(x-1)) omit 前l*(x-1)条数据
    // .limit(3)
    // .skip()
    // filed() 限制搜索和获取数据的哪些项，默认除了_id其他全部为false。可调节性能。可搭配.doc("id")或where({_id:"id"})用于配置检索列表还是查看详情。检索列表时用.collection('表').filed({列表中要展示的每个记录的数据})；查看详情时用.collection('表').doc('目标记录的_id')或.collection('表').where({_id:'目标记录的_id'})
    .field({
      title: true,
      author: true
    })
    // ascending: 顺序，descending: 倒序。
    .orderBy('publish_time', 'desc')
    .get()
    .then(res => {
      console.log(res)
    })


  } // getData
  
})