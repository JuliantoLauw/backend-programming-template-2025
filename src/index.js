const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000; // Menggunakan port 5000

app.use(bodyParser.json());

const usersDB = [
  { email: 'user@example.com', password: 'password123' },
  { email: 'admin@example.com', password: 'adminpass' },
];

const booksDB = Array.from({ length: 50 }, (_, i) => ({ id: i + 1, title: `Book ${i + 1}` }));
const usersList = Array.from({ length: 30 }, (_, i) => ({ id: i + 1, name: `User ${i + 1}` }));

app.post('/api/authentication/login', (req, res) => {
  const { email, password } = req.body;
  const user = usersDB.find((u) => u.email === email && u.password === password);

  if (user) {
    return res.json({ success: true, message: 'Login successful' });
  } else {
    return res.status(403).json({ success: false, message: 'INVALID_PASSWORD' });
  }
});

const paginate = (data, offset = 0, limit = 10) => {
  return data.slice(offset, offset + limit);
};

app.get('/api/users', (req, res) => {
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 10;

  res.json({
    total: usersList.length,
    offset,
    limit,
    data: paginate(usersList, offset, limit),
  });
});

app.get('/api/books', (req, res) => {
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 10;

  res.json({
    total: booksDB.length,
    offset,
    limit,
    data: paginate(booksDB, offset, limit),
  });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
