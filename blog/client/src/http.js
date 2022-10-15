const postBaseURL = 'http://localhost:4000/posts';
const commentBaseURL = 'http://localhost:4001/posts';

const getPosts = async () => {
  const res = await fetch(postBaseURL);
  return await res.json();
};

const postTitle = async (params) => {
  const res = await fetch(postBaseURL, {
    method: 'post',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  return await res.json();
};

const getComment = async (params) => {
  const res = await fetch(`${commentBaseURL}/${params.id}/comments`);
  return await res.json();
};

const postComment = async (params) => {
  const res = await fetch(`${commentBaseURL}/${params.id}/comments`, {
    method: 'post',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  return res.json();
};

const getAllPostsAndComments = async () => {
  const res = await fetch('http://localhost:4002/posts');
  return await res.json();
}

export default {
  getPosts,
  postTitle,
  getComment,
  postComment,
  getAllPostsAndComments,
};
