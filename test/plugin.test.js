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
    describe('controller#validator init', () => {
      it('ctx validator associate init success', () => {
        const ctx = app.mockContext();
        assert.ok(ctx.validator);
        assert.ok(ctx.validator.validate);
      });
      it('ctx validate associate init success', () => {
        const ctx = app.mockContext();
        assert.ok(ctx.validate);
      });
    });
  });


});
