import { register, login, test} from "../../apis/laf"

Component({
  // 组件设置
  options: {
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
  attached: function(e) {
    this.reset()
  },


  // 组件的方法列表
  methods: {
    // 初始化组件
    reset(e) {
      console.log("reset loginPop")
      let app = getApp()
      console.log("app", app)
      this.setData({
        state: this.data.state_enum.login,
        // 同步全局的laf_token_validity
        laf_token_validity : app.globalData.laf_token_validity
      })
    },

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