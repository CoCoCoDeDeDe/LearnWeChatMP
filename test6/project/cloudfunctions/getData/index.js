// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()

// 云函数入口函数
// event 是接收的前端传来的数据
exports.main = async (event, context) => {
  let limit = event.limit

  return await db.collection('test1').limit(limit).get() // await 等待异步请求的完成

}