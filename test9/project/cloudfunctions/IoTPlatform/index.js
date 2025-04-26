const GetOpenid = require('./GetOpenid/index');
const isThereOpenid = require('./isThereOpenid/index')

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('index event:', event)
  console.log('index context:', context)
  switch (event.type) {
    case 'GetOpenid':
      return await GetOpenid.main(event, context);
    case 'isThereOpenid':
      return await isThereOpenid.main(event, context);
  }
};