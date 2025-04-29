const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

exports.main = async (event, context) => {
  console.log("event", event)
  console.log("context", context)

  return { statusCode: 200, message: '接收成功' }
}