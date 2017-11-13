'use strict';
module.exports = function (app) {
  app.get('/users.json', app.controller.user.create);
  app.post('/users.json', app.controller.user.create);

  app.get('/users_cn.json', app.controller.user.test_cn);
  app.post('/users_cn.json', app.controller.user.test_cn);
};
