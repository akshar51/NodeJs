const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./models/user');

const app = express();
const port = 3000;

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/usercrud', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes

// Show all users
app.get('/', async (req, res) => {
  const users = await User.find();
  res.render('index', { users });
});

// Show form to add new user
app.get('/create', (req, res) => {
  res.render('create');
});

// Handle new user creation
app.post('/create', async (req, res) => {
  const { name, email, age } = req.body;
  await User.create({ name, email, age });
  res.redirect('/');
});

// Show form to edit user
app.get('/edit/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render('edit', { user });
});

// Handle update
app.post('/update/:id', async (req, res) => {
  const { name, email, age } = req.body;
  await User.findByIdAndUpdate(req.params.id, { name, email, age });
  res.redirect('/');
});

// Delete user
app.get('/delete/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
