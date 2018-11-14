// pages/free/free.js
var app = getApp();
import {
  Free
} from "./free_model.js"
var free = new Free;
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
    this.freeRequest((res)=>{
      this.setData({
        notFirstLoad:true
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

  freeRequest(callBack) {
    free.goodsFree(this.data.content.page, (res) => {
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

  goodsDetail: function(e) {
    console.log(e);
    wx.navigateTo({
      url: '/pages/goodsdetail/goodsdetail?goods_id=' + e.currentTarget.dataset.goods_id,
    })
  },

  onReachBottom: function() {
    if (this.data.content.hasMore) {
      this.freeRequest();
    }
  },

  onPullDownRefresh: function() {
    this.initData();
    this.freeRequest((res) => {
      wx.stopPullDownRefresh();
    });
  }

})