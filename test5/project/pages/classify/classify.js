import { listNav, queryProduct } from "../../api/apis"

let navid

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNavIdx: 0,
    navArr: [],
    proArr: [],
    isLoading: false,
    doesRemain: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    await this.getNavList()
    navid = this.data.navArr[0]._id
    this.getProductList()
  },

  // 获取分类导航
  async getNavList() {
    await listNav().then(res => {
      console.log(res)

      this.setData({
        navArr: res.data
      })

      this.selectComponent("#myTabs").resize()
    })
  },

  // get products list
  getProductList(size=0) {

    if(!this.data.doesRemain) return

    this.setData({
      isLoading: true
    })

    queryProduct({
      navid: navid,
      size: size
    }).then(res => {
      console.log("res", res)

      let oldArr = this.data.proArr
      let newArr = oldArr.concat(res.data) 

      this.setData({
        proArr: newArr
      })

      if(this.data.proArr.length >= res.data.total) {
        this.setData({
          doesRemain: false
        })
      }
    })

    this.setData({
      isLoading: false
    })
  },
  navChange: function (e) {
    // console.log("e", e)
    let index = e.detail.index
    navid = this.data.navArr[index]._id
    // console.log(navid)
    this.getProductList()

    this.setData({
      proArr: [],
      doesRemain: true,
      isLoading: false
    })
  },

  // 触底加载更多
  onReachBottom() {
    this.getProductList(this.data.proArr.length)
  }

})