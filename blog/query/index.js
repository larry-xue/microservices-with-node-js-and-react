const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const postsAndComments = {};

app.get('/posts', (req, res) => {
  res.send(postsAndComments);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  handleEvents(type, data);
  res.send({});
});

function handleEvents(type, data) {
if (type === 'PostCreated') {
  postsAndComments[data.id] = {
    id: data.id,
    title: data.title,
    comments: [],
  };
} else if (type === 'CommentCreated') {
  const { id, status, content } = data;
  postsAndComments[data.postId].comments.push({
    id,
    status,
    content,
  });
} else if (type === 'CommentUpdated') {
  const { id, status, content, postId } = data;
  console.log('query in CommentUpdated:');
  console.log(data);
  postsAndComments[postId].comments = postsAndComments[postId].comments.map(
    (comment) => {
      if (comment.id !== id) return comment;
      else return { id, status, content };
    }
  );
}
}


app.listen(4002, async () => {
  console.log('query server running on port 4002!');

  const res = await axios.get('http://localhost:4005/events')
  
  for (let event of res.data) {
    console.log('processing events!');
    handleEvents(event.type, event.data);
  }
});
