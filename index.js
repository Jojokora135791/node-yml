const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Подключаемся к базе данных PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'postgres',
  password: 'example',
  port: 5432,
});

// Обработчик GET запроса для получения всех пользователей
app.get('/users', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Обработчик POST запроса для создания нового пользователя
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    const { rows } = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
    res.json(rows[0]);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Обработчик DELETE запроса для удаления пользователя по ID
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    res.json(rows[0]);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Обработчик PUT запроса для обновления пользователя по ID
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const { rows } = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, id]);
    res.json(rows[0]);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
