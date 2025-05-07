import { requestWithLafToken, on_laf_token_Invalid, on_request_error } from '../../apis/laf'
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onGetProductList(e) {
      try{
        requestWithLafToken('GET', 'iot2/')
      } catch(err) {
        console.log("获取产品列表失败 err:", err)
      }
    }
  }
})