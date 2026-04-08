import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';

import { createServer } from '../src/app.js';

test('GET /health returns status ok', async () => {
  const app = createServer({ clientOrigin: 'http://localhost:5173' });
  const response = await request(app).get('/health');

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.body, { status: 'ok' });
});
