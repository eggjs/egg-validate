'use strict';

exports.validate = {
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
