'use strict';
import Events from 'events';
// const emitter = new Events();
export default class ConnectionArguments extends Events {
  constructor(opts=new Object()) {
    super();
    this.options = opts;
    this.arguments = process.argv;
  }

  set _arguments(value) {
    var options = this.options;
    if (value !== null && value.length) {
      let length = value.length;
      var calls = 0;
      for (let key of value) {
        calls += 1;
        if (!key.includes('node.exe') && !key.includes('connection-tester.js')) {
          var opt = [];
          if (key.includes('=')) {
            opt = key.split('=');
          } else {
            opt[0] = 'port';
            opt[1] = key;
          }
          options[opt[0]] = opt[1];
          this.options = options;
        }
        if (length === calls) {
          this.emit('options-update', this.options);
        }
      }
    }
  }

  set options(value) {
    this._options = value;
  }

  set arguments(value) {
    this._arguments = value;
  }

  get options() {
    return this._options || {};
  }

  get arguments() {
    return this._arguments || null;
  }

}
