// pages/needsdetail/http.js
import {
  NeedsDetail
} from "../../models/needsdetail.js"
var http = new NeedsDetail();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      needs_id: options.needs_id
    })
    this.needsDetailHttp(options.needs_id);
  },

  /**
   * 获取商品详情的HTTP请求和回调
   */
  needsDetailHttp: function (needs_id) {
    http.needsDetail(needs_id, (res) => {
      this.setData({
        detail: res.data
      })
    })
  },

  /**
   *点击联系 
   */
  copy: function () {
    wx.setClipboardData({
      data: this.data.detail.phone,
      success: function (res) {
        wx.showToast({
          title: '已复制微信号',
          icon: 'none'
        })
      }
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})