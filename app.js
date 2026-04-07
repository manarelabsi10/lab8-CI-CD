const express = require('express');
const { Pool } = require('pg');
const os = require('os');

const app = express();
app.use(express.json());
const PORT = 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Route 1: basic info
app.get('/', (req, res) => {
  res.json({
    app:  'CISC 886 Lab 8',
    mode: process.env.MODE || 'local',
    node: process.version,
    host: os.hostname(),
  });
});

// Route 2: all tasks from database
app.get('/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Route 3: add a new task
app.post('/tasks', async (req, res) => {
  const { name, status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO tasks (name, status) VALUES ($1, $2) RETURNING *',
      [name, status || 'pending']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(PORT, () => {
  console.log('--------------------------------------------------');
  console.log(`  CISC 886 Lab 8 — App started`);
  console.log(`  Port:  ${PORT}`);
  console.log(`  Node:  ${process.version}`);
  console.log(`  Host:  ${os.hostname()}`);
  console.log('--------------------------------------------------');
});