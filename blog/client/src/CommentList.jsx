import React from 'react';
import { useState, useEffect } from 'react';
import http from './http';

export default ({ id, comments }) => {
  // const [comments, setComments] = useState([]);
  // const getComments = async () => {
  //   const data = await http.getComment({id})
  //   console.log(data)
  //   setComments(data);
  // }
  // useEffect(() => {
  //   getComments()
  // }, []);

  return (
    <div className='list-group' style={{ margin: '10px 0' }}>
      {comments.map(({ id, content }) => {
        return (
          <span key={id} className='list-group-item'>
            {content}
          </span>
        );
      })}
    </div>
  );
};
