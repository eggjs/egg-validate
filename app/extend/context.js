'use strict';

const Parameter = require('parameter');
const VALIDATOR = Symbol('Context#validator');
module.exports = {
  get validator() {
    if (!this[VALIDATOR]) {
      this[VALIDATOR] = new Parameter({
        translate: this.gettext.bind(this),
      });
      const config = this.app.config.validate || {};
      Object.keys(config.rules).forEach(key => {
        this[VALIDATOR].addRule(key, config.rules[key].bind(this[VALIDATOR]));
      });
    }
    return this[VALIDATOR];
  },
  /**
   * validate data with rules
   *
   * @param  {Object} rules  - validate rule object, see [parameter](https://github.com/node-modules/parameter)
   * @param  {Object} [data] - validate target, default to `this.request.body`
   */
  validate(rules, data) {
    data = data || this.request.body;
    const errors = this.validator.validate(rules, data);
    if (errors) {
      this.throw(422, 'Validation Failed', {
        code: 'invalid_param',
        errors,
      });
    }
  },
};
