import { observable, action } from "mobx";

export default class HomeStore {
  
  @observable hasErrored = false;
  @observable isLoading = true;
  @observable items = [];

  @action
  fetchItems(data) {
    this.items = data;
    this.isLoading = false;
  }
}
