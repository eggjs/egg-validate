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
  translate: {
    required: false,
    type: 'json2'
  },
};

exports.create = function* () {
  this.validate(createRule);
  this.body = this.request.body;
};
