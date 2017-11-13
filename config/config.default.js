'use strict';

exports.validate = {
  rules: {
    json(rule, value) {
      try {
        JSON.parse(value);
      } catch (err) {
        return this.t('should be json string');
      }
    },
  },
};
