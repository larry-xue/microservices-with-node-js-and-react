const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};

app.post('/events', (req, res) => {
  console.log('Received Event: ', req.body.type)

  res.send({});
})

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts/create', async (req, res) => {
  const {
    title
  } = req.body
  const id = crypto.randomBytes(4).toString('hex');

  posts[id] = {
    id,
    title
  };

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'PostCreated',
    data: posts[id],
  });

  return res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log('version: 0.0.6')
  console.log('posts server runing on port 4000.');
});