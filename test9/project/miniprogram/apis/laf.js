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
        if (res.statusCode === 200) {
          console.log("注册成功:", res.data)
          resolve(res.data)
        } else {
          console.error("注册失败:", res.data)
          reject(new Error(res.data.message || '注册失败'))
        }
      },
      fail: err => {
        console.error("网络请求失败:", err)
        reject(new Error('网络连接失败'))
      },
      complete: e => {
        console.log("register completed")
      }
    })
  })
}

// login
export async function login(username, password) {
  return new Promise((resolve, reject) => {
    wx.request({
      method: "POST",
      url: baseUrl + "/login",
      header: {
        "Content-Type": "application/json"
      },
      data: {
        username: username,
        password: password
      },
      success: res => {
        if (res.statusCode === 200) {
          console.log("登录成功:", res.data)
          resolve(res.data)
        } else {
          reject(new Error(res.data.message || '登录失败'))
        }
      },
      fail: err => {
        reject(new Error('网络连接失败'))
      },
      complete: e => {
        console.log("login completed")
      }
    })
  })
}