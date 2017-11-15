'use strict';

const mm = require('egg-mock');
const assert = require('assert');

describe('test/validate_cn.test.js', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: 'validate_form',
    });
    return app.ready();
  });

  after(() => app.close());

  describe('get', () => {
    it('should return invalid_param when body empty', () => {
      return app.httpRequest()
        .get('/users_cn.json?locale=zh-CN')
        .type('json')
        .expect(422)
        .expect(res => {
          assert(res.body.code === 'invalid_param');
          assert(res.body.message === 'Validation Failed');
          assert.deepEqual(res.body.errors, [
            { field: 'username', code: '缺少字段', message: '必须' },
            { field: 'password', code: '缺少字段', message: '必须' },
          ]);
        });
    });

    it('should all pass', () => {
      return app.httpRequest()
        .get('/users_cn.json?locale=zh-CN')
        .send({
          username: 'foo@gmail.com',
          password: '123456',
          're-password': '123456',
        })
        .expect({
          username: 'foo@gmail.com',
          password: '123456',
          're-password': '123456',
        })
        .expect(200);
    });

  });

  describe('post', () => {
    it('should return invalid_param when body empty', () => {
      return app.httpRequest()
        .post('/users_cn.json?locale=zh-CN')
        .expect(422)
        .expect(res => {
          assert(res.body.code === 'invalid_param');
          assert(res.body.message === 'Validation Failed');
          assert.deepEqual(res.body.errors, [
            { field: 'username', code: '缺少字段', message: '必须' },
            { field: 'password', code: '缺少字段', message: '必须' },
          ]);
        });
    });

    it('should return invalid_param when length invaild', () => {
      return app.httpRequest()
        .post('/users_cn.json?locale=zh-CN')
        .send({
          username: 'foo',
          password: '12345',
        })
        .expect(422)
        .expect(res => {
          assert(res.body.code === 'invalid_param');
          assert(res.body.message === 'Validation Failed');
          assert.deepEqual(res.body.errors, [
            { field: 'username', code: '无效', message: '应该是电子邮件' },
            { field: 'password', code: '无效', message: '长度应该大于 6' },
          ]);
        });
    });

    it('should return invalid_param when password not equal to re-password', () => {
      return app.httpRequest()
        .post('/users_cn.json?locale=zh-CN')
        .send({
          username: 'foo@gmail.com',
          password: '123456',
          're-password': '123123',
        })
        .expect(422)
        .expect(res => {
          assert(res.body.code === 'invalid_param');
          assert(res.body.message === 'Validation Failed');
          assert.deepEqual(res.body.errors, [
            { field: 'password', code: '无效', message: '应该等于 re-password' },
          ]);
        });
    });

    it('should return invalid_param when username invaild', () => {
      return app.httpRequest()
        .post('/users_cn.json?locale=zh-CN')
        .send({
          username: '.foo@gmail.com',
          password: '123456',
          're-password': '123456',
        })
        .expect(422)
        .expect(res => {
          assert(res.body.code === 'invalid_param');
          assert(res.body.message === 'Validation Failed');
          assert.deepEqual(res.body.errors, [
            { field: 'username', code: '无效', message: '应该是电子邮件' },
          ]);
        });
    });

    it('should all pass', () => {
      return app.httpRequest()
        .post('/users_cn.json?locale=zh-CN')
        .send({
          username: 'foo@gmail.com',
          password: '123456',
          're-password': '123456',
        })
        .expect({
          username: 'foo@gmail.com',
          password: '123456',
          're-password': '123456',
        })
        .expect(200);
    });
  });

  describe('addRule()', () => {
    it('should check custom rule ok', () => {
      return app.httpRequest()
        .post('/users_cn.json?locale=zh-CN')
        .send({
          username: 'foo@gmail.com',
          password: '123456',
          're-password': '123456',
          addition: 'invalid json',
        })
        .expect(422)
        .expect(res => {
          assert(res.body.code === 'invalid_param');
          assert(res.body.message === 'Validation Failed');
          assert.deepEqual(res.body.errors, [
            { field: 'addition', code: '无效', message: '应该是一个 JSON 字符串' },
          ]);
        });
    });
  });
});
