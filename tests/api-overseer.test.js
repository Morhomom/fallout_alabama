import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, unlinkSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import handler from '../api/overseer.js';

const tmpPath = join(tmpdir(), 'players.json');

test.beforeEach(() => {
  if (existsSync(tmpPath)) unlinkSync(tmpPath);
});

test('PATCH /api/overseer updates hp', { concurrency: false }, () => {
  const req = { method: 'PATCH', query: { id: 'Engineer' }, body: { hp: 55 } };
  let statusCode;
  let data;
  const res = {
    status(code) { statusCode = code; return this; },
    json(obj) { data = obj; return this; },
    setHeader() {}
  };
  handler(req, res);
  assert.strictEqual(statusCode, 200);
  assert.strictEqual(data.hp, 55);
});

test('POST /api/overseer adds item', { concurrency: false }, () => {
  const req = { method: 'POST', query: { id: 'Engineer' }, body: { item: 'Spear' } };
  let statusCode;
  let data;
  const res = {
    status(code) { statusCode = code; return this; },
    json(obj) { data = obj; return this; },
    setHeader() {}
  };
  handler(req, res);
  assert.strictEqual(statusCode, 200);
  assert.deepEqual(data.inventory, ['Spear']);
});

test('DELETE /api/overseer removes item', { concurrency: false }, () => {
  // add item first
  let statusCode;
  let data;
  let res = {
    status(code) { statusCode = code; return this; },
    json(obj) { data = obj; return this; },
    setHeader() {}
  };
  handler({ method: 'POST', query: { id: 'Engineer' }, body: { item: 'Gun' } }, res);

  // now delete
  statusCode = undefined;
  data = undefined;
  res = {
    status(code) { statusCode = code; return this; },
    json(obj) { data = obj; return this; },
    setHeader() {}
  };
  handler({ method: 'DELETE', query: { id: 'Engineer', itemId: '0' }, body: {} }, res);
  assert.strictEqual(statusCode, 200);
  assert.deepEqual(data.inventory, []);
});
