var app = getApp();
import {
  MineWant
} from "./minewant_model.js"
var mineWant = new MineWant;
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
  onLoad: function (options) {
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

  goodsDetail: function (e) {
    console.log(e);
    wx.navigateTo({
      url: '/pages/goodsdetail/goodsdetail?goods_id=' + e.currentTarget.dataset.goods_id,
    })
  },

  //获取商品的http请求
  userGoodsRequest: function (callBack){
    mineWant.userGoods(this.data.content.page,(res) => {
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