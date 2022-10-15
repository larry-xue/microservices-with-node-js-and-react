const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const postsAndComments = {};

app.get('/posts', (req, res) => {
  res.send(postsAndComments);
});

app.post('/events', (req, res) => {
  if (req.body.type === 'PostCreated') {
    postsAndComments[req.body.data.id] = {
      id: req.body.data.id,
      title: req.body.data.title,
      comments: [],
    };
  } else if (req.body.type === 'CommentCreated') {
    postsAndComments[req.body.data.postId].comments.push({
      content: req.body.data.content,
      id: req.body.data.id,
    });
  }
  res.send({});
});

app.listen(4002, () => {
  console.log('query server running on port 4002!');
});
