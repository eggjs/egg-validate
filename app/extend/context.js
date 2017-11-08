'use strict';

const Parameter = require('parameter');
const PARAMETER = Symbol('__parameter__');
module.exports = {
  get parameter() {
    if (!this[PARAMETER]) {
      this[PARAMETER] = new Parameter({
        translate: this.gettext.bind(this),
      });
      const config = this.app.config.validate || {};
      const rules = Object.assign({
        json(rule, value) {
          try {
            JSON.parse(value);
          } catch (err) {
            return this.t('must be json string');
          }
        },
      }, config.rules);
      Object.keys(rules).forEach(key => {
        this[PARAMETER].addRule(key, rules[key].bind(this[PARAMETER]));
      });
    }
    return this[PARAMETER];
  },
  /**
   * validate data with rules
   *
   * @param  {Object} rules  - validate rule object, see [parameter](https://github.com/node-modules/parameter)
   * @param  {Object} [data] - validate target, default to `this.request.body`
   */
  validate(rules, data) {
    data = data || this.request.body;
    const errors = this.parameter.validate(rules, data);
    if (errors) {
      this.throw(422, 'Validation Failed', {
        code: 'invalid_param',
        errors,
      });
    }
  },
};
