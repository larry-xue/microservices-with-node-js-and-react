const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', (req, res) => {
  const {
    title
  } = req.body
  const id = crypto.randomBytes(4).toString('hex');

  posts[id] = {
    id,
    title
  };

  return res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log('posts server runing on port 4000.');
});