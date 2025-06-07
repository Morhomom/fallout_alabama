import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/characters.js';
import characters from '../backend/data/players.js';

test('GET /api/characters returns list', () => {
  const req = { method: 'GET', query: {} };
  let statusCode;
  let data;
  const res = {
    status(code) { statusCode = code; return this; },
    json(obj) { data = obj; return this; },
    setHeader() {}
  };
  handler(req, res);
  assert.strictEqual(statusCode, 200);
  assert.deepEqual(data, characters);
});

test('GET /api/characters?id=nonexistent returns 404', () => {
  const req = { method: 'GET', query: { id: 'nonexistent' } };
  let statusCode;
  let data;
  const res = {
    status(code) { statusCode = code; return this; },
    json(obj) { data = obj; return this; },
    setHeader() {}
  };
  handler(req, res);
  assert.strictEqual(statusCode, 404);
  assert.deepEqual(data, { error: 'Character not found' });
});

test('PATCH /api/characters updates stats', () => {
  const req = { method: 'PATCH', query: { id: 'Engineer' }, body: { strength: 7 } };
  let statusCode;
  let data;
  const res = {
    status(code) { statusCode = code; return this; },
    json(obj) { data = obj; return this; },
    setHeader() {}
  };
  handler(req, res);
  assert.strictEqual(statusCode, 200);
  assert.strictEqual(data.strength, 7);
});
