import { Base } from '../utils/base.js'
class Search extends Base {
  constructor() {
    super();
  }
  goodsSearch(text,page,callBack) {
    var params = {
      url: 'goods/search?text='+text+'&page='+page,
      sCallBack: function (res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }
}
export { Search }