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
    }
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
        debug_openid: '',
        isLogin: getApp().globalData.isLogin,
        state: this.data.state_enum.GetOpenid,
        userPublicInfo: {
          avatarUrl: getApp().globalData.userPublicInfo.avatarUrl,
          nickname: getApp().globalData.userPublicInfo.nickname
        },
        nicknameIpt_value: null
      })
    },

    // 登录
    login(e) {
      getApp().globalData.isLogin = true
      this.setData({
        isLogin: getApp().globalData.isLogin,
        state: this.data.state_enum.GetOpenid,
        userPublicInfo: {
          avatarUrl: '/images/icons/defaultAvatar.png',
          nickname: 'default nickname'
        },
      })
    },

    // 用户按下 一键授权 bind:tap 获取用户 openid
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
      let matchAccountRsp = await wx.cloud.callFunction({
        name: 'IoTPlatform',
        data: {
          type: 'getAccountByOpenid',
          openid: this.data.debug_openid // 主动传入的openid
        }
      }).then((resp) => {
        console.log('账号查询结果 resp:', resp)
        return resp
        // TODO 接收查询结果，用于下一步判断去向
      }).catch((err) => {
        // 重置本组件
        this.reset()
        console.log('getUsersopenid err:', err)
        return err
      })
      console.log('匹配到账号的返回数据:', matchAccountRsp)

      if(matchAccountRsp.result.data.length == 1) {  // 有1个
        console.log('匹配到对应账号，找到1个')
        this.setData({
          // 数据库中有对应openid的账号，下一步去登录页面
          state: this.data.state_enum.Login
        })
        // 获取已有账号的信息
        getApp().globalData.userPublicInfo.avatarUrl = matchAccountRsp.result.data[0].avatarUrl
        getApp().globalData.userPublicInfo.nickname = matchAccountRsp.result.data[0].nickname
        // 为登录页面准备展示的信息{头像，昵称}
        this.setData({
          userPublicInfo: {
            avatarUrl: matchAccountRsp.result.data[0].avatarUrl,
            nickname: matchAccountRsp.result.data[0].nickname
          }
        })

      }else if(matchAccountRsp.result.data.length == 0) {  // 有0个
        console.log('没有匹配到对应账号，找到0个')
        this.setData({
          // 数据库中没有对应openid的账号，下一步去注册页面
          state: this.data.state_enum.Register
        })
      }else {  // 有>1个
        console.log('匹配的账号数量超过1个，错误')
        this.reset()
      }
      
      wx.hideLoading()
      // return
    },

    // 确认按键bind:tap
    onConfirm(e) {
      switch(this.data.state) {
        case 'Register':
          wx.showLoading({
            title: '创建账号中，请勿重复操作...',
          })

          console.log('确认按钮在注册状态')

          // console.log("输入的昵称的长度:", this.data.nicknameIpt_value.length)
          // 如果输入昵称为空则不继续
          if(this.data.nicknameIpt_value == '' || this.data.nicknameIpt_value == null || this.data.nicknameIpt_value.length >= 13) {
            wx.showToast({
              title: '昵称不合格',
              icon: 'error',
              duration: 900,
              mask: true
            })
            return
          }

          wx.cloud.callFunction({
            name: 'IoTPlatform',
            data: {
              type: 'addAccount',
              record: {
                avatarUrl: getApp().globalData.userPublicInfo.avatarUrl,
                createTime: new Date(),
                nickname: this.data.nicknameIpt_value,
                openid: this.data.debug_openid
              }
            }
          })
          .then(res => {
            console.log("addAccount res:", res)
            this.login()
            wx.showToast({
              title: '账号创建成功',
              icon: 'success',
              duration: 1500,
              mask: true
            })
          })
          .catch(err => {
            console.log("addAccount err:", err)
            this.reset()
            wx.showToast({
              title: '注册失败，请重试',
              icon: 'error',
              duration: 1500,
              mask: true
            })
          })

          wx.hideLoading()
          return
        case 'Login':
          console.log('确认按钮在登录状态')
          this.login()
          return
      }
    },

    // 取消按键bind:tap
    onCancel(e) {
      switch(this.data.state) {
        case 'Register':
          console.log('取消按钮在注册状态')
          getApp().resetUserPublicInfo()
          this.reset()
          return
        case 'Login':
          console.log('取消按钮在登录状态')
          getApp().resetUserPublicInfo()
          this.reset()
          return
      }
    },

    // 用户点击头像盒子 申请获取用户头像
    onGetUserWeChatAvatar(e) {
      console.log("onGetUserWeChatAvatar e", e)
      wx.showLoading({
        title: '获取信息中...',
      })

      wx.getUserProfile({
        desc: '申请获取用户微信头像',
        success: (resp) => {  // 获取成功
          console.log("getUserProfile success resp", resp)
          this.setData({
            userPublicInfo: {
              avatarUrl: resp.userInfo.avatarUrl,
            },
            nicknameIpt_value: resp.userInfo.nickName
          })
          // 将数据存入app实例
          getApp().globalData.userPublicInfo = {
            avatarUrl: resp.userInfo.avatarUrl,
            city: resp.userInfo.city,
            country: resp.userInfo.country,
            gender: resp.userInfo.gender,
            language: resp.userInfo.language
          }
          wx.showToast({
            title: '获取信息成功',
            icon: 'success',
            duration: 900,
            mask: false
          })
        }, 
        fail: (err) => {  // 获取失败
          console.log("getUserProfile fail err", err)
          wx.showToast({
            title: '获取信息失败',
            icon: 'error',
            duration: 900,
            mask: true
          })
        },
        complete: (e) => {  //获取结束
          wx.hideLoading()
          // console.log("getUserProfile complete e", e)
        }
      })

    },

    // 昵称输入框 键盘输入时或内容改变时
    onnicknameIpt_bindinput(e) {
      // console.log("onnicknameIpt_bindinput e.detail.value:", e.detail.value)
      // console.log("onnicknameIpt_bindinput 时的组件nickname:", this.data.nicknameIpt_value)
    }
  }
})