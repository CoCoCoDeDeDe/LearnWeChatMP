// ./代表当前目录，../代表双亲目录，/代表根目录
import { test, register, login } from "./apis/laf"

App({
  globalData: {
  },

  onLaunch: async function () {
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

    wx.loadFontFace({
      family: 'webfont',
      source: 'url("//at.alicdn.com/t/webfont_1f7b3qbimiv.eot")',
      success: function (res) {
          console.log(res.status) //  loaded
      },
      fail: function (res) {
          console.log(res.status) //  error
      },
      complete: function (res) {
          console.log(res.status);
      }
    });

    this.reset()

    // 本地缓存调试
    // await wx.setStorage({
    //   key: 'laf_token',
    //   data: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2ODEwNjc4MjZiNDhkMzMzNGJhMDA4YzgiLCJleHAiOjE3NDY1MTA0MTksImlhdCI6MTc0NTkwNTYxOX0.s8jrxxhrX6bDUrHXF05u1iCNRJu2t4oFcakrpLDpVS4',
    //   encrypt: false,
    // }).then(res => {
    //   console.log("存储laf_token到本地缓存测试成功，res:", res)
    // })
    // wx.getStorageInfo()
    //   .then((res) => {
    //     console.log("获取本地缓存信息成功，res:", res)
    //   })

    // this.laf_tokenCheak()

    // 测试API
    // register('testuser', '123456').catch(console.error)
    // login('testuser', '123456').catch(console.error)

  },

  // 重置 app
  reset(e) {
    this.globalData = {
      laf_token_validity: false
    }
  },

  // 检查laf_token状态，当token没有或者时效时触发登录弹窗
  async laf_tokenCheak() {
    let laf_token
    try{
      laf_token = await wx.getStorage({key: 'laf_token'})
      console.log("获取到laf_token:", laf_token.data)
    }catch(err){
      console.log("读取laf_token出问题 err:", err)
      // TODO 触发登录弹窗
    }
    try{
      wx.request({
        method: 'POST',
        url: 'https://dhb91nur4r.bja.sealos.run/utils/verifyToken',
        header: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + laf_token.data
        },
        success: res => {
          console.log("本地laf_token匹配到用户id res.data", res.data)
          // 本地缓存的token作为证明登录的唯一凭证，也是用于获取在线信息时用于匹配指定用户的客户端唯一凭证
        }
      })
    }catch(err){
      console.log("验证laf_token出问题 err:", err)
      // TODO 触发登录弹窗
    }
  }

});
