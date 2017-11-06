import { observable, action } from "mobx";

import {User} from '../../domain'
import {InfoContext} from './InfoContext'

export default class UserStore {
  
  @observable hasErrored = false;
  @observable isLoading = true;
  @observable items = [];
  
  init() {
    this._initUser()
  }
  
  _initUser() {
    const user = new User('刘凯欣', '男', '25', '程序员')
    infoContext.user = user
  }

  @action
  fetchItems(data) {
    this.items = data;
    this.isLoading = false;
  }
}

export const userStore = new UserStore()
