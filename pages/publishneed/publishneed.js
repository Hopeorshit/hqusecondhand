import {
  PublishNeed
} from "../../models/publishneed.js"
import {
  Config
} from '../../utils/config.js'
var http = new PublishNeed();
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    localImage: [],
    imageIndex: 0,
    pickerSelected: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.categoryAll();
  },
  //获取目录的http请求
  categoryAll: function() {
    http.categoryAll((res) => {
      this.setData({
        category: res.data
      })
    })
  },
  //点击选择图片
  addPic: function() {
    var that = this;
    wx.chooseImage({
      count: 6,
      sizeType: ['compressed'],
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        var localImage = that.data.localImage;
        tempFilePaths.forEach(function(item) {
          localImage.push(item);
        })
        that.setData({
          localImage: localImage,
        })
      },
    })
  },
  // 点击删除图片
  deletePic: function(e) {
    var localImage = this.data.localImage;
    var index = e.currentTarget.dataset.index;
    localImage.splice(index, 1);
    this.setData({
      localImage: localImage,
    })
  },
  //picker改变
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value,
      pickerSelected: true
    })
  },
  //点击获取电话号码
  phone: function(event) {
    http.encrypt(event.detail.encryptedData, event.detail.iv, (res) => {
      console.log(res);
      this.setData({
        phone: res.data.phoneNumber
      })
    });
  },
  //点击查看大图
  imagePreview: function(e) { //图片预览
    console.log(e);
    var images = [];
    var index = e.currentTarget.dataset.index;
    var localImage = this.data.localImage;
    for (var i = 0; i < localImage.length; i++) {
      images[i] = localImage[i];
    }
    wx.previewImage({
      urls: images,
      current: localImage[index]
    })
  },

  //点击提交
  submit: function(e) {
    if (this.checkSubmit(e.detail.value)) {
      this.setData({
        publishing: true
      })
      wx.showLoading({
        title: '发布中',
      })
      http.needsCreate(e.detail.value, (res) => {
        var localImage = this.data.localImage
        if (localImage.length > 0) {
          this.uploadPic(res.data)
        } else {
          this.successReturn();
        }
      });
    }
  },
  // 图片上传函数
  uploadPic: function(data) {
    var that = this;
    var localImage = that.data.localImage;
    var imageIndex = that.data.imageIndex;
    wx.showLoading({
      title: '上传第' + (imageIndex + 1) + '张图片',
    })
    wx.uploadFile({
      url: Config.restUrl + 'needs/image_upload',
      filePath: localImage[imageIndex],
      name: 'image',
      formData: {
        needs_id: data.needs_id,
        uid: data.uid,
        ishead: imageIndex == 0 ? true : false
      },
      success: function(res) {
        that.setData({
          imageIndex: imageIndex + 1,
        })
        if (localImage[imageIndex + 1]) {
          that.uploadPic(data);
        } else {
          that.successReturn();
        }
      },
      fail: function(res) {
        wx.hideLoading();
        that.setData({
          publishing: false
        })
      },
    })
  },
  //发布有效性检测
  checkSubmit: function(value) {
    var localImage = this.data.localImage;
    var description = value.description;
    var phone = value.phone;
    var categoryID = value.categoryID;
    if (!description) {
      wx.showToast({
        title: '请填写需求名称和信息',
        icon: 'none'
      })
      return false
    }
    if (!phone) {
      wx.showToast({
        title: '记得填写联系方式呦',
        icon: 'none'
      })
      return false
    }
    if (!categoryID) {
      wx.showToast({
        title: '忘记选择分类啦,亲',
        icon: 'none'
      })
      return false
    }
    return true;
  },

  successReturn: function() {
    wx.hideLoading();
    wx.showToast({
      title: '发布成功',
    })
    app.globalData.needRefresh = true;
    setTimeout(function() {
      wx.switchTab({
        url: '/pages/need/need',
      })
    }, 1500)
  }
})