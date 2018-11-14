import { Base } from '../../utils/base.js'
class PublishErShou extends Base {
  constructor() {
    super();
  }
  categoryAll(callBack) {
    var params = {
      url: 'category/all',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }
  encrypt(encryptedData, iv, callBack, fcallBack) {
    var params = {
      url: 'user/encrypt',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
      fCallBack: function (res) {//失败的回调函数
        fcallBack && fcallBack(res);
      },
      method: 'POST',
      data: {
        encryptedData: encryptedData,
        iv: iv
      }
    };
    this.request(params);
  }

  goodsCreate(value, callBack) {
    var params = {
      url: 'goods/new',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
      method: 'POST',
      data: {
        description: value.description,
        phone: value.phone,
        price: value.isFree ? 0 : value.price,
        categoryID: value.categoryID
      }
    };
    this.request(params);
  }


}
export { PublishErShou }