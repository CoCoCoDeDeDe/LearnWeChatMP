const baseUrl = 'https://dhb91nur4r.bja.sealos.run'

// register
export async function register(username, password) {
  return new Promise((resolve, reject) => {
    wx.request({
      method: "POST",
      url: baseUrl + "/test/register",
      header: {
        "Content-Type": "application/json"
      },
      data: {
        username: username,
        password: password
      },
      success: res => {
        console.log("res", res)
        switch(res.data.runCondition)
        {
          case 'invalid username':
            console.log('invalid username')
            reject('无效的用户名')
            return
          case 'invalid password':
            console.log('invalid password')
            reject('无效的密码')
            return
          case 'username already existed':
            console.log('username already existed')
            reject('用户名已被注册')
            return
          case 'registered successfully':
            console.log('registered successfully')
            resolve('注册成功')
            return
        }
      },
      fail: err => {
        console.error("网络请求失败:", err)
        reject('网络请求失败')
      }
    })
  })
}

// login
export async function login(username, password) {
  // console.log("function login")
  // console.log(username)
  // console.log(password)
  return new Promise((resolve, reject) => {
    wx.request({
      method: "POST",
      url: baseUrl + "/test/login",
      header: {
        "Content-Type": "application/json"
      },
      data: {
        username: username,
        password: password,
      },
      success: res => {
        switch(res.data.runCondition){
          case 'invalid username or password':
            console.log("登录失败，账号或密码错误，errMsg:", res.data.errMsg)
            reject('账号或密码错误')
            return
          case 'login succeed':
            console.log("登录成功，token:", res.data.access_token)

            wx.setStorage({
              key: 'laf_token',
              data: res.data.access_token,
              encrypt: false
            }).catch(err => {
              console.log("token本地存储失败 err:", err)
              reject('token本地存储失败')
              return
            })

            resolve('登录成功')
            return
        }
      },
      fail: err => {
        console.log("网络请求失败 err:", err)
        reject('网络请求失败')
      }
    })
  })
}

// 读取并验证本地缓存的 laf_token
export async function verify_laf_token() {
  return new Promise((resolve, reject) => {
    // 读取本地laf_token
    wx.getStorage({
      key: 'laf_token'
    }).then(res => {
      console.log("获取到本地laf_token res.data:", res.data)
      return verify_laf_token_request(res.data)
    }).then(res => {
      console.log("本地laf_token验证成功 res:", res)
      resolve({
        runCondition: 'local storage laf_token verify succeed',
        errMsg: 'local storage laf_token verify succeed'
      })
    }).catch(err => {
      console.log("本地laf_token验证失败 err:", err)
      reject({
        runCondition: 'local storage laf_token verify failed',
        errMsg: 'local storage laf_token verify failed'
      })
    })
  })
}

// 验证 laf_token
// 输入：laf_token
// 输出：验证结果（1：成功；2：token失效；3：请求失败）
// 本地缓存的token作为证明登录的唯一凭证，也是用于获取在线信息时用于匹配指定用户的客户端唯一凭证
export async function verify_laf_token_request(laf_token) {
  
  return new Promise((resolve, reject) => {
    wx.request({
      method: 'GET',
      url: baseUrl + '/utils/verifyToken',
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + laf_token
      },
      success: res => {
        switch(res.data.runCondition) {
          case 'laf_token verify succeed':
            resolve({
              runCondition: 'laf_token verify succeed',
              errMsg: 'laf_token verify succeed'
            })
          return
          case 'token parse error':
          case 'cant find the account':
            resolve({
              runCondition: 'laf_token verify failed',
              errMsg: 'laf_token verify failed'
            })
            return
        }
      },
      fail: err => {
        console.log("laf_token验证请求失败 err:", err)
        resolve({
          runCondition: 'laf_token request failed',
          errMsg: 'laf_token request failed'
        })
        return
      }
    })




  })



}

// 前端调用laf 云函数 需要laf_token的 API 的通用函数
// 成功的返回：runCondition、errMsg、API返回的结果  // 1种成功：request succeed // 在此基础上还要解析 runCondition 云函数是不是还有错误
// 失败的返回：runCondition、errMsg // 2种失败：laf_token error、request error
export async function requestWithLafToken( method, last_url, data ) {

  if( method == null || last_url == null ) return

  let laf_token

  return await new Promise(async (resolve, reject) => {

    // 本地token有无：是否提醒登录并return
    try {
      const res = await wx.getStorage({key: 'laf_token'})
      // console.log("测试 res", res)

      if(res.data == '' || res.data == null ) {
        console.log("读取本地缓存laf_token为空")
        reject({
          runCondition: 'laf_token error',
          errMsg: 'laf_token error',
        })
        return
      } else {
        console.log("读取本地缓存laf_token成功 res.data:", res.data)
        // 继续
        laf_token = res.data
      }
    } catch(err) {
      console.log("读取本地缓存laf_token错误，可能laf_token不存在 err:", err)
      reject({
        runCondition: 'laf_token error',
        errMsg: 'laf_token error',
      })
      return
    }

    console.log("开始请求API:", baseUrl + last_url)

    // 根据参数（ method, last_url, data ）请求云函数
    wx.request({
      method: method,
      url: baseUrl + last_url,
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + laf_token,
      },
      data: data,
      success: (result) => {

        switch(result.data.runCondition) {
          case 'token parse error':
          case 'cant find the account':
            resolve({
              runCondition: 'laf_token error',
              errMsg: 'laf_token error'
            })
            return
        }

        resolve({
          runCondition: 'request succeed',
          errMsg: 'request succeed ',
          response: result  // 进一步对 response.data.runCondition 进行错误识别
        })
        return
      },
      fail: (err) => {
        console.log("网络请求失败 err:", err)
        reject({
          runCondition: 'request error',
          errMsg: 'request error',
        })
        return
      }
    })

  })
}

export async function on_laf_token_Invalid( title = '请在登录后使用' ) {
  // 提示登录
  wx.showToast({
    title: title,
    duration: 1100,
    icon: 'error',
    mask: true
  })

  // 置标志位
  let app = getApp()
  app.globalData.laf_token_validity = false
}

export async function on_request_error(title = '请求失败') {
  // 提示
  wx.showToast({
    title: title,
    duration: 1500,
    icon: 'error',
    mask: true
  })
}