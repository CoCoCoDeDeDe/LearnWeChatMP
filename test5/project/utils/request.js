const baseURL = 'https://tea.qingnian8.com/xzs/';

export function request(params){
  
  let dataObj = params.data || {};
  let headerObj = {			
    'content-type': 'application/json',
    // "access-key": "160535"
  }
  
  return new Promise((resolve,reject)=>{
    wx.request({
      url: baseURL + params.url,
      method:params.method || "GET",
      data:dataObj,
      header:headerObj,
      success:res=>{
        if(res.data.errCode!=0){
          reject(res.data);
          wx.showToast({
            title: res.data.errMsg,
            mask:true,
            icon:"error"
          })
          return;
        }
        resolve(res.data)
      },
      fail:err=>{
        reject(err)
      }
    })
  })
}