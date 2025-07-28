const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// DB Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // your MySQL password
  database: 'testdb'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

// Routes

// READ
app.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.render('index', { users: results });
  });
});

// CREATE
app.get('/add', (req, res) => {
  res.render('form', { user: {} });
});

app.post('/save', (req, res) => {
  const { name, email } = req.body;
  db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], err => {
    if (err) throw err;
    res.redirect('/');
  });
});

// UPDATE
app.get('/edit/:id', (req, res) => {
  db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, results) => {
    if (err) throw err;
    res.render('form', { user: results[0] });
  });
});

app.post('/update/:id', (req, res) => {
  const { name, email } = req.body;
  db.query('UPDATE users SET name=?, email=? WHERE id=?', [name, email, req.params.id], err => {
    if (err) throw err;
    res.redirect('/');
  });
});

// DELETE
app.get('/delete/:id', (req, res) => {
  db.query('DELETE FROM users WHERE id=?', [req.params.id], err => {
    if (err) throw err;
    res.redirect('/');
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});