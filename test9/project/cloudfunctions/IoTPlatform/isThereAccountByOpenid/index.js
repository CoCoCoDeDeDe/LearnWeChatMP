const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()
const _ = db.command

// 云函数入口 
// exports: 在 Node.js 模块系统里，exports 是一个对象，其作用是将模块内部的变量或者函数暴露给外部使用。
exports.main = async (event, context) => {
  let openidDefault = event.userInfo
  let openidTmp
  if(event.openid != null){
    openidTmp = event.openid
    console.log('收到主动传递的openid，查找该openid:', openidTmp)
  }else{
    openidTmp = openidDefault
    console.log('没有收到主动传递的openid，默认查找调用者的openid:', openidTmp)
  }

  const resp = await db.collection('iot1_users')
  .where({
    openid: _.eq(openidTmp)
  })
  .count()
  console.log('查找对应账号的个数 resp:', resp)

  if(resp.total == 1) {
    return true
  }else if(resp.total == 0) {
    return false
  }else {
    console.log('error: openid matched acount number more than 1')
    return false
  }
}