const postBaseURL = 'http://posts.com/posts';
const commentBaseURL = 'http://posts.com/posts';

const getPosts = async () => {
  const res = await fetch(postBaseURL);
  return await res.json();
};

const postTitle = async (params) => {
  const res = await fetch(postBaseURL + '/create', {
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
  const res = await fetch('http://posts.com/posts');
  return await res.json();
}

export default {
  getPosts,
  postTitle,
  getComment,
  postComment,
  getAllPostsAndComments,
};
