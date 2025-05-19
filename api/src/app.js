import express from 'express';
import cors from 'cors';

import { pool } from './db.js';

const app = express();

// REFERENCE: https://developer.mozilla.org/ja/docs/Glossary/CORS
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!🐕️');
});

app.get('/dogs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM dog');
    res.json(result.rows);
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

export default app;
