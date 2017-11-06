'use strict';

import { observable, action } from "mobx";

class InfoContext {
  
  @observable InfoTable = {};
}

export const infoContext = new InfoContext()
