import {observable, action} from 'mobx';
import moment from 'moment'

/**
 * 实体基类
 */
export default class Root {
  @observable serno = '';
  //创建日期
  @observable create_date = ''; // 05.创建日期
  //修改日期
  @observable modity_date = ''; // 06.修改日期

  constructor(){
    // this.serno = genUUID()
    this.create_date = moment().format("YYYY-MM-DD HH:mm:ss")
    this.modity_date = moment().format("YYYY-MM-DD HH:mm:ss")
  }
}
