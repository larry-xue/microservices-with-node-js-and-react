import React from 'react';
import { useState, useEffect } from 'react';
import http from './http';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

export default () => {
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    const json = await http.getAllPostsAndComments();
    console.log(json);
    setPosts(Object.values(json));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <div className='d-flex flex-wrap flex-row justify-content-start'>
        {posts.map(({ id, title, comments }) => {
          return (
            <div
              className='card'
              style={{ width: '25rem', margin: '30px 30px 0 0' }}
              key={id}>
              <div className='card-body'>
                <h5 className='card-title'>{title}</h5>
                <h6 className='card-subtitle mb-2 text-muted'>Comments:</h6>
                <div className='card-text'>
                  <CommentList id={id} comments={comments}></CommentList>
                </div>
                <CommentCreate postId={id}></CommentCreate>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
