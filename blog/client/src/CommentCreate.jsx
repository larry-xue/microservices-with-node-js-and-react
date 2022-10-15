import React, { useState } from 'react';
import http from './http';

export default ({ postId }) => {
  const [comment, setComment] = useState('');
  const submitComment = async () => {
    if (comment.trim() === '') return;
    const res = await http.postComment({
      id: postId,
      content: comment,
    });
    console.log(res);
    setComment('');
  };
  return (
    <div className='d-flex flex-row justify-content-aroun gap-3'>
      <input
        type='text'
        className='form-control'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type='button' className='btn btn-info' onClick={submitComment}>
        comment
      </button>
    </div>
  );
};
