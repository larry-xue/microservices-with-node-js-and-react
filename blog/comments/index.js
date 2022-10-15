const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.post('/events', (req, res) => {
  console.log('Received Event: ', req.body.type);

  res.send({});
});

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const postId = req.params.id;
  const commentId = crypto.randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[postId] || [];
  comments.push({
    content,
    id: commentId,
  });
  commentsByPostId[postId] = comments;

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: { content, id: commentId, postId },
  });

  return res.send(comments);
});

app.listen(4001, () => {
  console.log('comments server runing on port 4001.');
});
