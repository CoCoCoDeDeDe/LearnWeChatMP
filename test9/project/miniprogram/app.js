App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: "cloud1-9g4n5oib233e646c",
        traceUser: true,
      });
    }

    this.reset()
  },

  // 重置 app
  reset(e) {
    this.globalData = {
      isLogin: true,  // 每次launch小程序时置登录标志false  // Debug
      userPublicInfo: {
        avatarUrl: '/images/icons/defaultAvatar.png',
        city: 'default city',
        country: 'default country',
        gender: 0,
        language: 'default language',
        nickname: null
      }
    }
  },

  // 重置全局用户信息
  resetUserPublicInfo(e) {
    this.globalData.userPublicInfo = {
      avatarUrl: '/images/icons/defaultAvatar.png',
      city: 'default city',
      country: 'default country',
      gender: 0,
      language: 'default language',
      nickname: null
    }
  }

});
