// components/tabs/tabs.js
import {
  Base
} from '../../utils/base.js'
let http = new Base;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    searchHeight: Number,
    tabFixed:Boolean
  },
  /**
   * 组件的初始数据
   */
  data: {
    activeIndex: 0,
    sliderOffSet: 0,
    tabs: null
  },

  lifetimes: {
    attached() {
      this.setCategory(()=>{
        this._setContent();
        this.triggerEvent('pageInited');
      })
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    
    tabClick: function(e) {
      var activeIndex = e.currentTarget.id;
      console.log(e);
      this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: activeIndex
      });
      var tabs = this.data.tabs;
      if (!tabs[activeIndex].tap) {
        this._setContent();
      }
    },

    setCategory: function(callBack) {
      this._categoryAll((res) => {
        var tabs = res.data;
        tabs.splice(0, 0, {
          'name': "全部",
          "id": 0,
          "width": 28
        })
        tabs.forEach(function(value, index) {
         
          value.goods={};
          value.goods.page = 1;
          value.goods.hasMore = true;
          value.goods.list = [];
          
          value.name = value.name;
          value.tap = false;
          if (index == 0) {
            value.tap = true;
          }
        })
        this.setData({
          tabs: tabs
        })
        this._setSlider();
        // this._setContent();
        callBack && callBack();
      })
    },

    /**
     * 根据返回的数据设置节点的宽度
     */
    _setSlider: function() {
      var that = this;
      var query = this.createSelectorQuery();
      query.selectAll('.tab').boundingClientRect();
      var tabs = that.data.tabs;
      query.exec(function(res) {
        res[0].forEach(function(value, index) {
          tabs[index].width = value.width
        })
        that.setData({
          tabs: tabs,
        })

      })
    },

    //请求目录下的商品，并进行数据绑定
    _setContent(callBack) {
      var activeIndex = this.data.activeIndex;
      var tabs = this.data.tabs;
      this._categoryID(tabs[activeIndex].id, tabs[activeIndex].page, (res) => {
        // console.log(res);
        var resList = res.data;
        var dataList = tabs[activeIndex].goods.list
        tabs[activeIndex].tap = true;
        tabs[activeIndex].goods.list = dataList.concat(resList);
        tabs[activeIndex].goods.page = tabs[activeIndex].page + 1;
        if (resList.length == 10) {
          tabs[activeIndex].goods.hasMore = true;
        } else {
          tabs[activeIndex].goods.hasMore = false;
        }
        this.setData({
          tabs: tabs
        })
        callBack && callBack(res);
      })
    },
    
    //获取目录的HTTP请求
    _categoryAll(callBack) {
      var params = {
        url: 'category/all',
        sCallBack: function(res) {
          callBack && callBack(res);
        },
      };
      http.request(params);
    },
    
    //获取当前目录下的商品HTTP请求
    _categoryID(categoryID, page, callBack) {
      var params = {
        url: 'category/id?categoryID=' + categoryID + '&page=' + page,
        sCallBack: function(res) {
          callBack && callBack(res);
        },
      };
      http.request(params);
    }
  }

    //Tabs 只控制Tab内容
    //传递给content一个ID号,content来控制List内容
})





