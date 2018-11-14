import { Base } from '../../utils/base.js'
class MineNeed extends Base {
  constructor() {
    super();
  }
  userNeeds(page,callBack) {
    var params = {
      url: 'user/needs?page='+page,
      sCallBack: function (res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }
  needsHandle(dataset, callBack) {
    var params = {
      url: 'needs/handle',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
      method: "POST",
      data: {
        needs_id: dataset.needs_id,
        handle_type: dataset.handle_type
      }
    };
    this.request(params);
  }
}
export { MineNeed }