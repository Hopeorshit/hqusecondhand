import { Base } from '../../utils/base.js'
class MineWant extends Base {
  constructor() {
    super();
  }
  userGoods(page,callBack) {
    var params = {
      url: 'user/want?page='+page,
      sCallBack: function (res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }
}
export { MineWant }