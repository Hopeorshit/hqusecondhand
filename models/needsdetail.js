import {
  Base
} from '../utils/base.js'
class NeedsDetail extends Base {
  constructor() {
    super();
  }
  needsDetail(needs_id, callBack) {
    var params = {
      url: 'needs/detail?needs_id=' + needs_id,
      sCallBack: function(res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }
}
export {
  NeedsDetail
}