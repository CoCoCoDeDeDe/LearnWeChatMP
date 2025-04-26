const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  let openidDefault = event.userInfo.openId
  let openidActively = event.openid
  let openidTmp
  if(openidActively != null && openidActively != ''){
    openidTmp = openidActively
    console.log('收到主动传递的openid，查找该openid:', openidTmp)
  }else{
    openidTmp = openidDefault
    console.log('没有收到主动传递的openid，默认查找调用者的openid:', openidTmp)
  }

  return await db.collection('iot1_users')
  .where({
    openid: _.eq(openidTmp)
  })
  .field({
    avatarUrl: true,
    nickname: true
  })
  .get()
  // 要想让前端能接收到main返回的数据就要在main的作用域内将数据返回，在回调函数比如.get()的.then()中返回数据只是与db.collection().where().field()作为一个整体的函数返回数据，在.then()的回调函数内把数据返回只是相当于这个整体函数返回了数据，与main的返回无关，要想把这个数据返回到前端要在main()作用域内把这个整体返回的数据接收再return出去，前端的wx.cloud.callFunction()的.then()或.catch()才会接收到这个结果并作为期内的回调函数的参数。
  .then(resp => {
    console.log("查找结果 get() then resp:", resp)
    return resp
  })
  .catch(err => {
    console.log("get() catch err:", err)
    return err
  })
}