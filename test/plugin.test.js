'use strict';

const mm = require('egg-mock');
const assert = require('assert');

describe('test/plugin.test.js', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: 'validate_form',
    });
    return app.ready();
  });

  after(() => app.close());
  describe('Test controller', () => {
    describe('Associate', () => {
      it('ctx model associate init success', () => {
        const ctx = app.mockContext();
        assert.ok(ctx.validate);
        assert.ok(ctx.parameter);
        assert.ok(ctx.parameter.validate);
      });
    });
  });
});
