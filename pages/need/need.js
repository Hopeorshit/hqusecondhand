// pages/need/need.js
var app = getApp();
import {
  Need
} from "./need_model.js"
var need = new Need;

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initData();
    this.needsAllRequset((res) => {
      this.setData({
        notFirstLoad: true
      })
    });
  },

  onShow: function() {
    if (app.globalData.needRefresh) {
      this.initData();
      this.needsAllRequset((res)=>{
        this.setData({
          notFirstLoad: true
        })
      });
      app.globalData.needRefresh = false;
    }
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

  //需求数据请求
  needsAllRequset: function(callBack) {
    need.needsAll(this.data.content.page,(res) => {
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

  needsDetail: function(e) {
    console.log(e);
    wx.navigateTo({
      url: '/pages/needsdetail/needsdetail?needs_id=' + e.currentTarget.dataset.needs_id,
    })
  },

  onReachBottom: function () {
    if (this.data.content.hasMore) {
      this.needsAllRequset();
    }
  },

  onPullDownRefresh: function () {
    this.initData();
    this.needsAllRequset((res) => {
      wx.stopPullDownRefresh();
    });
  }

})