const baseUrl = 'https://dhb91nur4r.bja.sealos.run/test'

// test
export function test() {
  console.log("laf test")
}

// register
export async function register(username, password) {
  return new Promise((resolve, reject) => {
    wx.request({
      method: "POST",
      url: baseUrl + "/register",
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
      url: baseUrl + "/login",
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