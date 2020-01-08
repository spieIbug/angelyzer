// tslint:disable
import { bgCyan, bgGreenBright, bgRedBright, bgYellowBright, Chalk } from 'chalk';
import { forEach } from 'lodash';

export class Logger {
  static info(message: string | Chalk, ...datas) {
    console.log(bgCyan.black('[INFO] ' + message));
    if (datas.length) {
      forEach(datas, data => {
        console.table(data);
      });
    }
  }

  static success(message: string | Chalk, ...datas) {
    console.log(bgGreenBright.black('[SUCCESS] ' + message));
    if (datas.length) {
      forEach(datas, data => {
        console.table(data);
      });
    }
  }

  static error(message: string | Chalk, ...datas) {
    console.log(bgRedBright.black('[ERROR] ' + message));
    if (datas.length) {
      forEach(datas, data => {
        console.table(data);
      });
    }
  }

  static warning(message: string | Chalk, ...datas) {
    console.log(bgYellowBright.black('[WARNING] ' + message));
    if (datas.length) {
      forEach(datas, data => {
        console.table(data);
      });
    }
  }
}
