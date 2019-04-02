var app = getApp();
import {
  Index
} from "../../models/index.js"
var http = new Index;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    banner: [{
      url: '/images/banner1.jpg'
    }, {
      url: '/images/banner2.jpg'
    }, {
      url: '/images/banner3.jpg'
    }],
    topHeight: null,
    tabFixed: false,
    notFirstLoad: false
  },
  /*
   *转发再次进入会重载页面，但是app.globalData却没变
   */
  onLoad: function() {

  },
   
  /**
   * 页面显示
   */
  onShow: function(options) {
    if (app.globalData.indexRefresh) {
      app.globalData.indexRefresh = false;
    }
  },
  
  /**
   * 由tabs组件触发
   */
  pageInited:function(){
    console.log("由tabs组件触发");
    this.setData({
      notFirstLoad:true
    })
    this._getTopHeight();
  },
   
  /*
   *点击goodsDetail
   */
  goodsDetail: function(e) {
    console.log(e);
    wx.navigateTo({
      url: '/pages/goodsdetail/goodsdetail?goods_id=' + e.currentTarget.dataset.goods_id,
    })
  },

  onReachBottom: function() {
    var activeIndex = this.data.activeIndex;
    var tabs = this.data.tabs;
    if (tabs[activeIndex].hasMore) {
      this.categoryID();
    }
  },

  /** 
   * 重置当前列的数据
   * 
   */
  resetData() {
    var activeIndex = this.data.activeIndex;
    var tabs = this.data.tabs;
    tabs[activeIndex].hasMore = true;
    tabs[activeIndex].page = 1;
    tabs[activeIndex].list = [];
    this.setData({
      tabs: tabs
    })
  },

  onPullDownRefresh: function() {
    this.resetData();
    this.categoryID((res) => {
      wx.stopPullDownRefresh();
    });
  },


  /**
   * 点击banner区域
   */
  bannerTap: function(e) {
    var dataSet = e.currentTarget.dataset;
    var index = dataSet.index;
    if (index == 0) {
      wx.navigateTo({
        url: '/pages/rule/rule',
      })
    }
    if (index == 1) {
      wx.navigateTo({
        url: '/pages/publishershou/publishershou',
      })
    }
    if (index == 2) {
      wx.navigateTo({
        url: '/pages/publishneed/publishneed',
      })
    }
  },

  /**
   * 分享小程序
   */
  onShareAppMessage: function() {

  },

  /**
   * 监听滑动事件
   */
  onPageScroll: function(e) {
    var topHeight = this.data.topHeight;
    this.setData({
      tabFixed: e.scrollTop > topHeight
    })
  },

  /**
   * 获取一开始的上半部分区域的高度
   */
  _getTopHeight: function() {
    var query = wx.createSelectorQuery();
    var that = this;
    query.select('#top').boundingClientRect();
    query.select('#tab').boundingClientRect();
    query.exec(function (res) {
      console.log(res);
      that.setData({
        topHeight:res[0].height,
        tabHeight:res[1].height
      })
    })
  },

  /**
   * 由search组件触发
   * 传递出search组件的高度
   */
  setSearchHeight: function(e) {
    this.setData({
      searchHeight: e.detail.searchHeight
    })
  },
  /**
   * 由search组件触发
   * 触发搜索事件
   */
  search: function(e) {
    console.log(e);
    wx.navigateTo({
      url: '/pages/search/search?text=' + e.detail.inputVal,
    })
  }
  /** 做tab的顶上吸附
   * 步骤
   * 1 获取到上半部分区域的高度
   * 2 监听滑动事件，当页面滑动高于上半区高度，将Tab栏进行Fixed处理
   * 3 Fixed处理的时候，要距离顶部一个top数值，即搜索框的高度。
   *   注意内容区不能同时fixe,只fix Tab;
   *   这样的话下面内容区也需要margin-top 一个数值，即tab的高度 
   */

  /**
   * 做页面的组件化开发
   * 1：搜索框的组件化
   * 2：tabs组件化
   * 3：商品内容组件化
   *    该组件要作为Tabs的儿子组件
   */
})