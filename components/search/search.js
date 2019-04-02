// components/search/search.js
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
   * 组件的生命周期
   */
  lifetimes: {
    attached: function() {
    },
    ready: function() {
      this._getHeight()//不能在attached中获取
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showInput: function() {
      this.setData({
        inputShowed: true
      });
    },
    hideInput: function() {
      this.setData({
        inputVal: "",
        inputShowed: false
      });
    },
    clearInput: function() {
      this.setData({
        inputVal: ""
      });
    },
    inputTyping: function(e) {
      this.setData({
        inputVal: e.detail.value
      });
    },

    /**
     * 搜索框,在不同的页面触发的事件不一样
     */
    search: function() {
      var detail={
        inputVal:this.data.inputVal
      }
      this.triggerEvent('search',detail);
    },
    
    /**
     * 往父组件触发一个设置 搜索框高度的事件
     */
    _getHeight: function() { 
      var query = this.createSelectorQuery(); //在自定义组件中用this,页面中使用wx
      var that = this;
      query.select('#my-search').boundingClientRect(function(res) {
        var detail = {
          searchHeight: res.height
        }
        that.triggerEvent("setSearchHeight", detail)
      }).exec();
    }
  }
})