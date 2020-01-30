'use strict';

const createRule = {
  username: {
    type: 'email',
  },
  password: {
    type: 'password',
    compare: 're-password'
  },
  addition: {
    required: false,
    type: 'json'
  },
};

exports.create = function* () {
  this.validate(createRule);
  this.body = this.request.body;
};

exports.test_cn = function* () {
  const errors = this.validator.validate(createRule, this.request.body);
  if (errors) {
    this.throw(422, 'Validation Failed', {
      code: 'invalid_param',
      errors,
    });
  }
  this.body = this.request.body;
};