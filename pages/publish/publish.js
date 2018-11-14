// pages/publish/publish.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },


  onShow:function(){
    this.setData({
      loginStatus: app.globalData.loginStatus
    })
    if(!app.globalData.loginStatus){
      wx.showModal({
        title: '温馨提示',
        content: '使用这个功能，需要先登录哦',
        confirmText: "前去登陆",
        cancelText: "先逛逛~",
        confirmColor: "#ff6263",
        cancelColor: "#a9aaac",
        success: function (res) {
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
    }
  },

  ershou:function(){
    wx.navigateTo({
      url: '/pages/publishershou/publishershou',
    })
  },

  need:function(){
    wx.navigateTo({
      url: '/pages/publishneed/publishneed',
    })
  }

})