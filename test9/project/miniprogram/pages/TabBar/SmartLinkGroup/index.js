// pages/SmartLinkGroup/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Is_GroupCmdCard_Show: true,
    SmartLinkGroup_ProfileList: [
      {
        SLGroup_Id: 'Default_SLGroup_Id',
        SLGroup_Name: '默认智联组名称',
        SLGroup_Sequence: 0,
      },
      {
        SLGroup_Id: 'Default_SLGroup_Id1',
        SLGroup_Name: '默认智联组名称1',
        SLGroup_Sequence: 1,
      },
      {
        SLGroup_Id: 'Default_SLGroup_Id2',
        SLGroup_Name: '默认智联组名称2',
        SLGroup_Sequence: 2,
      },
      {
        SLGroup_Id: 'Default_SLGroup_Id3',
        SLGroup_Name: '默认智联组名称3默认智联组名称3默认智联组名称3默认智联组名称3',
        SLGroup_Sequence: 3,
      },
    ],
    GroupCmdBtnList: [
      {
        Img_Url: '/static/images/icons/icon_deviceDetail_line_dekBlue@2x.png',
        FunctionName: '查看',
        BindTapHandlerName: 'On_BindTap_Read',
      },
      {
        Img_Url: '/static/images/icons/icon_edit_line_darkBlue@2x.png',
        FunctionName: '修改',
        BindTapHandlerName: 'On_BindTap_Update',
      },
      {
        Img_Url: '/static/images/icons/icon_delete_line_darkBlue@2x.png',
        FunctionName: '删除',
        BindTapHandlerName: 'On_BindTap_Delete',
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '快来使用我们的小程序吧！', // 分享标题
      path: '/pages/TabBar/SmartLinkGroup/index', // 分享路径，可带参数
      // imageUrl: '/images/share.png', // 自定义分享图片路径
      success(res) {
        // 分享成功的回调函数
        console.log('分享成功', res);
        // 可以在这里添加分享成功后的奖励逻辑
      },
      fail(res) {
        // 分享失败的回调函数
        console.log('分享失败', res);
      }
    };
  },

  /**
   * 用户点击右上角分享到朋友圈
   */
  onShareTimeline() {
    return {
      title: '分布式智能物联网平台',
      query: {
        // userId: '123', // 可携带的参数
      },
      imageUrl: '/path/to/share/image.jpg' // 必须是本地路径或临时路径
    }
  },

  // 智联组管理卡片的显示与隐藏开关
  On_BindTap_SwitchSLGroupCmdCardShow(e) {
    let StatusTmp = this.data.Is_GroupCmdCard_Show
    let StatusNew
    StatusNew = StatusTmp ? false : true
    this.setData({
      Is_GroupCmdCard_Show: StatusNew
    })
  },

  On_BindTap_GoToUniIOCmdPage(e) {

  }

  

})