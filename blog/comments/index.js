const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const e = require('express');

const app = express();
app.use(bodyParser.json());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const postId = req.params.id;
  const commentId = crypto.randomBytes(4).toString('hex');
  const {
    content
  } = req.body;

  const comments = commentsByPostId[postId] || []
  comments.push({
    content,
    id: commentId
  })
  commentsByPostId[postId] = comments;

  return res.send(comments)
});

app.listen(4001, () => {
  console.log('comments server runing on port 4001.');
});