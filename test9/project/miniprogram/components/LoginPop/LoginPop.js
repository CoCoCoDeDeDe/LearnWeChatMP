Component({
  // 组件设置
  options: {
    multipleSlots: true
  },

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    state_enum: {
      GetOpenId: 'GetOpenId',
      Register: 'Register',
      Confirm: 'Confirm'
    },
    state: null,
    isLogin: true,  // Debug
    // isLogin: getApp().globalData.isLogin
    haveGetOpenId: true,
    userPublicInfo: {
      avatarUrl: '/images/icons/defaultAvatar.png',
      nickname: 'default nickname'
    }
  },

  attached: function(e) {
    console.log('attached()')
    this.setData({
      state: this.data.state_enum.Register
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 用户按下 一键授权 获取用户 openId
    onGetOpenId(e) {

    },
    onConfirm(e) {

    },
    onCancel(e) {
      
    }
  }
})