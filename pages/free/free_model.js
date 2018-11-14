import { Base } from '../../utils/base.js'
class Free extends Base {
  constructor() {
    super();
  }
  goodsFree(page,callBack) {
    var params = {
      url: 'goods/free?page='+page,
      sCallBack: function (res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }
}
export { Free }