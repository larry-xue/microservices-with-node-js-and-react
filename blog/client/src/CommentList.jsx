import React from 'react';
import { useState, useEffect } from 'react';
import http from './http';

export default ({ id }) => {
  const [comments, setComments] = useState([]);
  const getComments = async () => {
    const data = await http.getComment({id})
    console.log(data)
    setComments(data);
  }
  useEffect(() => {
    getComments()
  }, []);

  return (
    <div className='list-group'>
      {comments.map(({ id, content }) => {
        return (
          <div key={id} className='list-group-item'>
            {content}
          </div>
        );
      })}
    </div>
  );
};
