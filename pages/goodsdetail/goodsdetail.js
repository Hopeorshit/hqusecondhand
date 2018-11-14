// pages/goodsdetail/goodsdetail.js
import {
  GoodsDetail
} from "./goodsdetail_model.js"
var goodsDetail = new GoodsDetail();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputFocus: false,
    msg_id: 0,
    holderText: "留言问问更多细节吧"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    this.setData({
      goods_id: options.goods_id
    })
  },

  onShow() {
    this.checkLogin(() => {
      this.goodsDetailHttp((res) => {
        this.setData({
          notFirstLoad: true,
          userInfo: wx.getStorageSync('userInfo')
        })
      });
    });
  },

  /**
   * 设置留言区域在屏幕中的位置
   */
  // pageScrollSet: function() {
  //   var that = this;
  //   //创建节点选择器
  //   var query = wx.createSelectorQuery();
  //   //选择id
  //   query.selectAll('#message').boundingClientRect();
  //   query.exec(function(res) {
  //     console.log(res)
  //     that.setData({
  //      scrollTop:res[0][0].top
  //     })
  //   })
  // },

  /**
   * 获取商品详情的HTTP请求和回调
   */
  goodsDetailHttp: function(callBack) {
    goodsDetail.goodsDetail(this.data.goods_id, (res) => {
      this.setData({
        detail: res.data,
        wantStatus: res.data.wantStatus
      })
      callBack && callBack();
    })
  },
  /**
   *点击收藏按钮 
   */
  wantTap: function() {
    this.setData({
      wantStatus: !this.data.wantStatus
    })
    goodsDetail.wantHandle(this.data.goods_id, (res) => {
      if (res.data.status) {
        wx.showToast({
          title: '收藏成功',
          icon: 'none'
        })
      }
      this.setData({
        wantStatus: res.data.status
      })
    })
  },

  /**
   * 点击留言
   */
  messageTap: function() {
    this.setData({
      inputFocus: true
    })
    wx.pageScrollTo({
      scrollTop: 10000000000,
    })
  },
  /**
   * 点击选择当前回复的留言
   */
  remsgChoose: function(e) {
    console.log(e);
    var msg_id = e.currentTarget.dataset.msg_id;
    var re_user = e.currentTarget.dataset.re_user;
    this.setData({
      msg_id: msg_id,
      holderText: '回复:' + re_user
    })
  },

  /**
   * 点击发送
   */
  send: function(e) {
    console.log(e);
    var content = e.detail.value.content;
    var detail = this.data.detail;
    if (content) {
      wx.showLoading({
        title: '发送中',
      })
      setTimeout(function() {
        wx.hideLoading();
      }, 600);
      goodsDetail.messageNew(this.data.goods_id, this.data.msg_id, content, (res) => {
        detail.messages.splice(0, 0, res.data);
        this.setData({
          detail: detail,
          holderText: "留言问问更多细节吧",
          msg_id: 0,
          inputVal: ''
        })
      })
    }
  },

  /**
   *点击联系 
   */
  copy: function() {
    wx.setClipboardData({
      data: this.data.detail.phone,
      success: function(res) {
        wx.showToast({
          title: '已复制微信号',
          icon: 'none'
        })
      }
    })
  },

  /**
   * 
   */
  checkLogin: function(callBack) {
    var app = getApp();
    this.setData({
      loginStatus: app.globalData.loginStatus
    })
    if (!app.globalData.loginStatus) {
      wx.showModal({
        title: '温馨提示',
        content: '使用这个功能，需要先登录哦',
        confirmText: "前去登陆",
        cancelText: "先逛逛~",
        confirmColor: "#ff6263",
        cancelColor: "#a9aaac",
        success: function(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          } else {
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        }
      })
    } else {
      callBack && callBack()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})