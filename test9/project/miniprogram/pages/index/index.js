Page({

  /**
   * 页面的初始数据
   */
  data: {
    isRegionPopUnfolded: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  // onLayoutRegionCard
  onUnfoldRegionPop(e) {
    this.setData({
      isRegionPopUnfolded: !this.data.isRegionPopUnfolded
    })
  }
  
})