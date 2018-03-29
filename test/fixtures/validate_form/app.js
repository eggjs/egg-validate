'use strict';


module.exports = function(app) {
  app.validator.addRule('json', function (rule, value) {
    try {
      JSON.parse(value);
    } catch (err) {
      return this.t('must be json string');
    }
  });
  app.validator.addRule('json2', function (rule, value) {
    try {
      JSON.parse(value);
    } catch (err) {
      return this.t('must be json2 string');
    }
  });
};
