'use strict';

exports.keys = '123456';
exports.security = {
  ctoken: false,
  csrf: false,
};

exports.validate = {
  convert: true,
  rules: {
    json(rule, value) {
      try {
        JSON.parse(value);
      } catch (err) {
        return this.gettext('should be json string');
      }
    },
  },
};
