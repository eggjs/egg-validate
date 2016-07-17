'use strict';

const Parameter = require('parameter');

module.exports = function(app) {
  /**
   * Validate
   *
   * ```js
   * app.validator.addRule('jsonString', (rule, value) => {
   *   try {
   *     JSON.parse(value);
   *   } catch (err) {
   *     return 'must be json string';
   *   }
   * });
   *
   * app.validator.validate({
   * 	 name: 'string',
   * 	 info: { type: 'jsonString', required: false },
   * }, {
   *   name: 'Egg',
   *   info: '{"foo": "bar"}',
   * });
   * ```
   */
  app.validator = new Parameter();
};
