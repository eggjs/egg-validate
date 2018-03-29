'use strict';

const util = require('util');

exports.security = {
  ctoken: false,
  csrf: false,
};

exports.validate = {
  translate: function () {
    var args = Array.prototype.slice.call(arguments);
    if (args.length && args[0] === 'must be json2 string') {
      return 'json2字段必须是字符串';
    }
    return util.format.apply(util, args);
  }
}
