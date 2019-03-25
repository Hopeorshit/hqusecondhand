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
    }]
  },
  /*
   *转发再次进入会重载页面，但是app.globalData确没变
   */
  onLoad: function() {
    this.initData();
    this.categoryAll((res) => {
      this.setData({
        notFirstLoad: true
      })
    });
  },

  onShow: function(options) {
    console.log(app.globalData.indexRefresh);
    if (app.globalData.indexRefresh) {
      this.initData();
      this.categoryAll((res) => {
        this.setData({
          notFirstLoad: true
        })
      });
      app.globalData.indexRefresh = false;
    }
  },
  /*
   *初始化data页面数据
   */
  initData: function() {
    this.setData({
      activeIndex: 0,
      sliderOffset: 0,
    })
  },

  /*
   *获取目录HTTP请求
   */
  categoryAll: function(callBack) {
    http.categoryAll((res) => {
      callBack && callBack();
      var tabs = res.data;
      tabs.splice(0, 0, {
        'name': "全部",
        "id": 0,
        "width": 28
      })
      tabs.forEach(function(value, index) {
        value.page = 1;
        value.hasMore = true;
        value.list = [];
        value.item = value.name;
        value.tap = false;
        if (index == 0) {
          value.tap = true;
        }
      })
      this.setData({
        tabs: tabs
      })
      this.sliderSet();
      this.categoryID();
    })
  },

  //请求目录下的商品，并进行数据绑定
  categoryID(callBack) {
    var activeIndex = this.data.activeIndex;
    var tabs = this.data.tabs;
    http.categoryID(tabs[activeIndex].id, tabs[activeIndex].page, (res) => {
      console.log(res);
      var resList = res.data;
      var dataList = tabs[activeIndex].list
      tabs[activeIndex].tap = true;
      tabs[activeIndex].list = dataList.concat(resList);
      tabs[activeIndex].page = tabs[activeIndex].page + 1;
      if (resList.length == 10) {
        tabs[activeIndex].hasMore = true;
      } else {
        tabs[activeIndex].hasMore = false;
      }
      this.setData({
        tabs: tabs
      })
      callBack && callBack(res);
    })
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

  /*
  点击tab选项卡
  */
  tabClick: function(e) {
    var activeIndex = e.currentTarget.id;
    console.log(e);
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: activeIndex
    });
    var tabs = this.data.tabs;
    if (!tabs[activeIndex].tap) {
      this.categoryID();
    }
  },
  /*
  设定下面slider的宽度
  确定下方Tab栏距离顶部的距离
  */
  sliderSet: function() {
    var that = this;
    //创建节点选择器
    var query = wx.createSelectorQuery();
    //选择id
    query.selectAll('.tab').boundingClientRect();
    // query.select('#tabs').boundingClientRect();
    // query.select('#search').boundingClientRect();
    var tabs = that.data.tabs;
    query.exec(function(res) {
      console.log(res)
      res[0].forEach(function(value, index) {
        tabs[index].width = value.width
      })
      that.setData({
        tabs: tabs,
      })
    })
  },
  /*
  设置滚动吸附效果
  */
  // onPageScroll: function(e) {
  //   var canScroll = e.scrollTop >= this.data.tabToTop

  // },

  contentScrollUp: function() {
    this.setData({
      canScroll: false
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
  /*
   *以下部分是处理搜索框逻辑
   */
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
  search: function() {
    wx.navigateTo({
      url: '/pages/search/search?text=' + this.data.inputVal
    })
  },

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

  onShareAppMessage: function() {

  },


})