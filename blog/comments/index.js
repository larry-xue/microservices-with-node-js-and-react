const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.post('/events', async (req, res) => {
  console.log('Received Event: ', req.body.type);
  const { type, data } = req.body;
  if (type === 'CommentModerated') {
    commentsByPostId[data.postId] = commentsByPostId[data.postId].map(
      (comment) => {
        if (comment.id !== data.id) return comment;
        return {
          content: data.content,
          id: data.id,
          status: data.status,
        };
      }
    );
    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentUpdated',
      data: {
        content: data.content,
        id: data.id,
        status: data.status,
        postId: data.postId
      },
    });
  }

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
    status: 'pending',
  });
  commentsByPostId[postId] = comments;

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'CommentCreated',
    data: { content, id: commentId, postId, status: 'pending' },
  });

  return res.send(comments);
});

app.listen(4001, () => {
  console.log('comments server runing on port 4001.');
});
