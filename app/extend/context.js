'use strict';

module.exports = {
  /**
   * validate data with rules
   *
   * @param  {Object} rules  Object
   * @param  {Object} [data] default to `this.request.body`
   */
  validate(rules, data) {
    data = data || this.request.body;
    const errors = this.app.validator.validate(rules, data);
    if (errors) {
      this.throw(422, 'Validation Failed', {
        code: 'invalid_param',
        errors,
      });
    }
  },
};
