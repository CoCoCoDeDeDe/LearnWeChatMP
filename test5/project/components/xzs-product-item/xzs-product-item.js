// components/xzs-product-item/xzs-product-item.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {
        grade: "grade",
        picpath: "/static/images/propic.jpg",
        price: "price",
        pronum: "pronum",
        title: "title",
        weight: "weight",
        year: "year",
        _id: 0
      }
    }
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
    clickPro: function(e) {
      // 这里添加点击事件的处理逻辑
      console.log('产品项被点击', e);
      // 如果需要触发父组件的事件，可以使用：
      // this.triggerEvent('clickpro');

      let _id = e.currentTarget.dataset._id
      // console.log('_id', _id);

      wx.navigateTo({
        url: '/pages/proDetail/proDetail?id=' + _id,
      })
    }
  }
})