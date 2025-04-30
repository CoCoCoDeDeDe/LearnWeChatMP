// ./代表当前目录，../代表双亲目录，/代表根目录
import { register, login, verify_laf_token, on_laf_token_Invalid } from "../../apis/laf"

Component({
  // 组件设置
  options: {
    pureDataPattern: /^_/, // 指定所有 _ 开头的数据字段为纯数据字段，{{}}无法显示纯数据字段
    multipleSlots: true
  },

  // 组件的属性列表
  properties: {
  },

  // 组件的初始数据
  data: {
    state_enum: {
      login: 'login',
      register: 'register'
    },
    laf_token_validity: false
  },

  // 组件挂载时
  attached: async function(e) {
    
    // 在LoginPop组件中读取本地token并作为小程序启动时主动判断登录状态的载体
    await verify_laf_token()
      .then(res => {
        // 本地laf_token有效，设为登录状态
        getApp().globalData.laf_token_validity = true
        this.setData({
          laf_token_validity: true
        })
      })
      .catch(err => {
        // 本地laf_token无效，显示loginPop
        getApp().globalData.laf_token_validity = false
        this.setData({
          laf_token_validity: false
        })
        on_laf_token_Invalid()
      })

    this.reset()


  },


  // 组件的方法列表
  methods: {
    // 初始化组件
    reset(e) {
      let app = getApp()
      this.setData({
        state: this.data.state_enum.login,
        laf_token_validity : app.globalData.laf_token_validity  // 同步全局的laf_token_validity
      })
      console.log("loginPop读取的laf_token_validity:", app.globalData.laf_token_validity)
    },

    // observeGlobalData
    // 将全局的laf_token_validity和LoginPop的laf_token_validity双向绑定

    // 登录表单提交
    async onSubmit(e) {
      // console.log("e", e)
      let todo = e.detail.target.id
      let { user_name, user_password } = e.detail.value
      // console.log(todo)
      // console.log(user_name)
      // console.log(user_password)
      switch(todo) {
        case 'login':
          login(user_name, user_password)
          .then(res => {
            wx.showToast({
              title: '登录成功',
              duration: 1500,
              icon: 'success',
              mask: false
            })
            // 置全局和loginPop的laf_token_validity标志
            this.setData({
              laf_token_validity: true
            })
            let app = getApp()
            app.globalData.laf_token_validity = true

          }).catch(err => {
            wx.showToast({
              title: String(err),
              duration: 1500,
              icon: 'error',
              mask: false
            })
          })
          return

        case 'register':
          register(user_name, user_password)
            .then(res => {
              wx.showToast({
                title: '注册成功',
                duration: 1500,
                icon: 'success',
                mask: false
              })
              // 自动登录
              login(user_name, user_password)
              .then(res => {
                // 置全局和loginPop的laf_token_validity标志
                this.setData({
                  laf_token_validity: true
                })
                let app = getApp()
                app.globalData.laf_token_validity = true
                
              }).catch(err => {
                // 不处理注册后的自动登录的错误
              })
            })
            .catch(err => {
              wx.showToast({
                title: String(err),
                duration: 1500,
                icon: 'error',
                mask: false
              })
            })
          
          return
      }
    }
  }
})