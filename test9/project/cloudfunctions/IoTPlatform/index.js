const GetOpenid = require('./GetOpenid/index');
const isThereAccountByOpenid = require('./isThereAccountByOpenid/index');
const getAccountByOpenid = require('./getAccountByOpenid/index');
const addAccount = require('./addAccount/index');

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('index event:', event)
  // console.log('index context:', context)
  switch (event.type) {
    case 'GetOpenid':
      return await GetOpenid.main(event, context);
    case 'isThereAccountByOpenid':
      return await isThereAccountByOpenid.main(event, context);
    case 'getAccountByOpenid':
      return await getAccountByOpenid.main(event, context);
    case 'addAccount':
      return await addAccount.main(event, context);
  }
};