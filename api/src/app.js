import express from 'express';
import cors from 'cors';

import { pool } from './db.js';

const app = express();

// REFERENCE: https://developer.mozilla.org/ja/docs/Glossary/CORS
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!🐕️!!');
});

app.get('/posts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM post');
    res.json(result.rows);
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.get('/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM post WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
});


// WARNING: SQL Injection Attack
// REFERENCE: https://developer.mozilla.org/ja/docs/Glossary/SQL_Injection
app.post('/posts', express.json(), async (req, res) => {
  const { body } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO post (body) VALUES ($1) RETURNING *',
      [body]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

export default app;
