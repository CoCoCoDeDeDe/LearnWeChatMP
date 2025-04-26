const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  console.log('进入 addAccount')
  let openidDefault = event.userInfo.openId
  let openidActively = event.record.openid
  let openidTmp
  if(openidActively != null && openidActively != ''){
    openidTmp = openidActively
    console.log('收到主动传递的openid，查找该openid:', openidTmp)
  }else{
    openidTmp = openidDefault
    console.log('没有收到主动传递的openid，默认查找调用者的openid:', openidTmp)
  }

  console.log('event.record.avatarUrl:', event.record.avatarUrl)
  console.log('event.record.createTime:', event.record.createTime)
  console.log('event.record.nickname:', event.record.nickname)
  console.log('openidTmp:', openidTmp)

  // return

  return await db.collection('iot1_users').add({
    data: {
      avatarUrl: event.record.avatarUrl,
      createTime: event.record.createTime,
      nickname: event.record.nickname,
      openid: openidTmp
    }
  })
  .then(res => {
    console.log('add then res:', res)
    return res
  })
  .catch(err => {
    console.log('add catch err:', err)
    return err
  })
}