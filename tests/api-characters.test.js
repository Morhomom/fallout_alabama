import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, unlinkSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
process.env.TEST_DB = 'file';
import handler from '../api/characters.js';
import { loadPlayers } from '../backend/data/players.js';

const tmpPath = join(tmpdir(), 'players.json');

test.beforeEach(() => {
  if (existsSync(tmpPath)) unlinkSync(tmpPath);
});

test('GET /api/characters returns list', { concurrency: false }, async () => {
  const req = { method: 'GET', query: {} };
  let statusCode;
  let data;
  const res = {
    status(code) { statusCode = code; return this; },
    json(obj) { data = obj; return this; },
    setHeader() {}
  };
  await handler(req, res);
  assert.strictEqual(statusCode, 200);
  assert.deepEqual(data, loadPlayers());
});

test('GET /api/characters?id=nonexistent returns 404', { concurrency: false }, async () => {
  const req = { method: 'GET', query: { id: 'nonexistent' } };
  let statusCode;
  let data;
  const res = {
    status(code) { statusCode = code; return this; },
    json(obj) { data = obj; return this; },
    setHeader() {}
  };
  await handler(req, res);
  assert.strictEqual(statusCode, 404);
  assert.deepEqual(data, { error: 'Character not found' });
});

test('PATCH /api/characters updates stats', { concurrency: false }, async () => {
  const req = { method: 'PATCH', query: { id: 'Engineer' }, body: { strength: 7 } };
  let statusCode;
  let data;
  const res = {
    status(code) { statusCode = code; return this; },
    json(obj) { data = obj; return this; },
    setHeader() {}
  };
  await handler(req, res);
  assert.strictEqual(statusCode, 200);
  assert.strictEqual(data.strength, 7);
});
