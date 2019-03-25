// pages/minepublish/http.js
var app = getApp();
import {
  MinePublish
} from "../../models/minepublish.js"
var http = new MinePublish;
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
    this.userGoodsRequest((res)=>{
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

  //获取商品的http请求
  userGoodsRequest: function(callBack) {
    http.userGoods(this.data.content.page,(res) => {
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
      callBack&&callBack();
    })
  },

  //点击解决或者删除
  goodsHandle: function(e) {
    console.log(e);
    var dataset = e.currentTarget.dataset;
    this.goodsHanleRequest(dataset);
  },

  //操作商品的http
  goodsHanleRequest: function(dataset) {
    http.goodsHandle(dataset, (res) => {
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

  goodsDetail: function(e) {
    console.log(e);
    wx.navigateTo({
      url: '/pages/goodsdetail/goodsdetail?goods_id=' + e.currentTarget.dataset.goods_id,
    })
  },

  onReachBottom: function () {
    if (this.data.content.hasMore) {
      this.userGoodsRequest();
    }
  },

  onPullDownRefresh: function () {
    this.initData();
    this.userGoodsRequest((res) => {
      wx.stopPullDownRefresh();
    });
  }
})