const db = wx.cloud.database()

let openid = null

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
      GetOpenid: 'GetOpenid',
      Register: 'Register',
      Login: 'Login'
    },
    isLogin: null,  // 在attach生命周期中判断并置登录标志
    state: null,
    userPublicInfo: {
      avatarUrl: '/images/icons/defaultAvatar.png',
      nickname: 'default nickname'
    },
  },

  // 组件挂载时
  attached: function(e) {
    // console.log('attached()')
    // this.data 初始化
    // 每当该弹窗要被建立时都要判断一次登录状态，将app的登录状态标志复制给本组件的登录状态标志用于渲染
    this.reset()
    console.log("LoginPop挂载时检测Login标志:", this.data.isLogin)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 重置组件
    reset(e) {
      this.setData({
        isLogin: getApp().globalData.isLogin,
        state: this.data.state_enum.GetOpenid,
        userPublicInfo: {
          avatarUrl: '/images/icons/defaultAvatar.png',
          nickname: 'default nickname'
        },
      })
    },

    // 用户按下 一键授权 获取用户 openid
    async onGetOpenid(e) {
      // console.log("onGetOpenid e:", e)
      wx.showLoading({
        title: '获取 openid 中',
      })
      await wx.cloud.callFunction({
        name: 'IoTPlatform',
        data: {
          type: 'GetOpenid'
        }
      }).then((resp) => {
        console.log('GetOpenid resp:', resp)
        openid = resp.result.openid
        console.log("一键授权获取到的openid:", openid)
        // 成功获得openid，下一步判断去向
      }).catch((e) => {
        console.log('GetOpenid e:', e)
        wx.hideLoading()
        const {errCode, errMsg} = e
        if(errMsg.includes('Enviroment not found')){
          wx.showToast({
            title: '云开发环境未找到',
            duration: 2000,
            icon: 'none',
            mask: true
          })
          return false
        }
        if(errMsg.includes('FunctionName parameter could not be found')){
          wx.showToast({
            title: '找不到云函数',
          })
        }
      })

      // 判断数据库是否有为该openid的用户，决定下一步去向
      // TODO:将判断与获取已有账户信息整合，减少请求次数
      let isThereOpenid
      await wx.cloud.callFunction({
        name: 'IoTPlatform',
        data: {
          type: 'isThereOpenid',
          openid: this.data.openid,
          test1: 'test1'
        }
      }).then((resp) => {
        console.log('getUsersopenid resp:', resp)
        isThereOpenid = resp.result
      }).catch((err) => {
        // TODO:重置本组件
        console.log('getUsersopenid err:', err)
      })

      console.log("iot1_users中有没有该openid记录:", isThereOpenid)

      if(isThereOpenid) {
        this.setData({
          // 数据库中有对应openid的账号，下一步去登录页面
          state: this.data.state_enum.Login

          // TODO 获取已有账号的信息

          // TODO 为登录页面准备展示的信息{头像，昵称}

        })
      }else {
        this.setData({
          // 数据库中没有对应openid的账号，下一步去注册页面
          state: this.data.state_enum.Register
        })
      }
      
      wx.hideLoading()
    },
    onConfirm(e) {
      switch(this.data.state) {
        case 'Register':
          console.log('确认按钮进入注册状态')
          return
        case 'Login':
          console.log('取消按钮进入登录状态')
          return
      }
    },
    onCancel(e) {
      switch(this.data.state) {
        case 'Register':
          console.log('取消按钮进入注册状态')
          return
        case 'Login':
          console.log('取消按钮进入登录状态')
          return
      }
    },
  }
})