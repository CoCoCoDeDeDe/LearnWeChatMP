const cloud = require('wx-server-sdk');

let data

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()
const _ = db.command

// 云函数入口 
// exports: 在 Node.js 模块系统里，exports 是一个对象，其作用是将模块内部的变量或者函数暴露给外部使用。
exports.main = async (event, context) => {
  const {appId, openid} = event.userInfo

  const resp = await db.collection('iot1_users')
  .where({
    openid: _.eq(openid)
  })
  .count()
  console.log('getUsersopenid resp:', resp)

  if(resp.total == 1) {
    return true
  }else if(resp.total == 0) {
    return false
  }else {
    console.log('error: openid matched acount number more than 1')
    return false
  }
}