'use strict';

const request = require('supertest');
const mm = require('egg-mock');
const assert = require('assert');

describe('test/validate.test.js', () => {
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
      return request(app.callback())
      .get('/users.json')
      .type('json')
      .expect(422)
      .expect(res => {
        assert(res.body.code === 'invalid_param');
        assert(res.body.message === 'Validation Failed');
        assert.deepEqual(res.body.errors, [
          { field: 'username', code: 'missing_field', message: 'required' },
          { field: 'password', code: 'missing_field', message: 'required' },
        ]);
      });
    });

    it('should all pass', () => {
      return request(app.callback())
      .get('/users.json')
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
      return request(app.callback())
      .post('/users.json')
      .expect(422)
      .expect(res => {
        assert(res.body.code === 'invalid_param');
        assert(res.body.message === 'Validation Failed');
        assert.deepEqual(res.body.errors, [
          { field: 'username', code: 'missing_field', message: 'required' },
          { field: 'password', code: 'missing_field', message: 'required' },
        ]);
      });
    });

    it('should return invalid_param when length invaild', () => {
      return request(app.callback())
      .post('/users.json')
      .send({
        username: 'foo',
        password: '12345',
      })
      .expect(422)
      .expect(res => {
        assert(res.body.code === 'invalid_param');
        assert(res.body.message === 'Validation Failed');
        assert.deepEqual(res.body.errors, [
          { field: 'username', code: 'invalid', message: 'should be an email' },
          { field: 'password', code: 'invalid', message: 'length should bigger than 6' },
        ]);
      });
    });

    it('should return invalid_param when password not equal to re-password', () => {
      return request(app.callback())
      .post('/users.json')
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
          { field: 'password', code: 'invalid', message: 'should equal to re-password' },
        ]);
      });
    });

    it('should return invalid_param when username invaild', () => {
      return request(app.callback())
      .post('/users.json')
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
          { field: 'username', code: 'invalid', message: 'should be an email' },
        ]);
      });
    });

    it('should all pass', () => {
      return request(app.callback())
      .post('/users.json')
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
      return request(app.callback())
      .post('/users.json')
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
          { field: 'addition', code: 'invalid', message: 'must be json string' },
        ]);
      });
    });
  });
});
