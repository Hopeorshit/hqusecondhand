import { Base } from '../../utils/base.js'
class Need  extends Base {
  constructor() {
    super();
  }
  needsAll(page,callBack) {
    var params = {
      url: 'needs/all?page='+page,
      sCallBack: function (res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }
}
export { Need }