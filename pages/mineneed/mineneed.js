// pages/mineneed/mineneed.js
var app = getApp();
import {
  MineNeed
} from "./mineneed_model.js"
var mineNeed = new MineNeed;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nothing: '/images/nothing.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initData();
    this.userNeedsRequest((res)=>{
      this.setData({
        notFirstLoad: true
      })
    });
  },


  initData() {
    this.setData({
      content: {
        list: [],
        page: 1,
        hasMore: true,
      }
    })
  },

  userNeedsRequest: function(callBack) {
    mineNeed.userNeeds(this.data.content.page,(res) => {
      var content = this.data.content;
      var resList = res.data;
      var contentList = content.list;
      content.list = contentList.concat(resList);
      content.page = content.page + 1;
      if (resList.length == 10) {
        content.hasMore = true;
      } else {
        content.hasMore = false;
      }
      this.setData({
        content: content
      })
      callBack && callBack();
    })
  },


  //点击解决或者删除
  needsHandle: function(e) {
    console.log(e);
    var dataset = e.currentTarget.dataset;
    this.needsHanleRequest(dataset);
  },

  //操作商品的http
  needsHanleRequest: function(dataset) {
    mineNeed.needsHandle(dataset, (res) => {
      wx.showToast({
        title: '操作成功',
      })
      var index = dataset.index;
      var content = this.data.content;
      content.list.splice(index, 1);
      this.setData({
        content: content
      })
    })
  },

  needsDetail: function(e) {
    console.log(e);
    wx.navigateTo({
      url: '/pages/needsdetail/needsdetail?needs_id=' + e.currentTarget.dataset.needs_id,
    })
  },

  onReachBottom: function () {
    if (this.data.content.hasMore) {
      this.userNeedsRequest();
    }
  },

  onPullDownRefresh: function () {
    this.initData();
    this.userNeedsRequest((res) => {
      wx.stopPullDownRefresh();
    });
  }

})