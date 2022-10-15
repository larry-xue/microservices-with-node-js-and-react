import React, { useState } from 'react'
import http from './http';
import Toast from './Toast/Toast';

export default () => {
  const [title, setTitle] = useState('');
  const [toastControl, setToastControl] = useState({
    show: false,
    message: '',
    title: '',
  });

  const submitPost = async (e) => {
    e.preventDefault();

    let [toastMessage, toastTitle] = ['', ''];
    if (title.trim() !== '') {
      const json = await http.postTitle({title});
      console.log(json)
      setTitle('');
      toastMessage = 'add post success!';
      toastTitle = 'Success!';
    } else {
      toastMessage = 'please enter title!';
      toastTitle = 'Warning!';
    }
    setToastControl({ show: true, title: toastTitle, message: toastMessage });
  }

  return (
    <div>
      <form>
        <div className='form-group mb-3'>
          <label className='form-label'>Title</label>
          <input
            type='text'
            className='form-control'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button className='btn btn-primary mb-3' onClick={submitPost}>
          Submit
        </button>
      </form>
      <Toast
        {...toastControl}
        customClose={() => setToastControl({ show: false })}></Toast>
    </div>
  );
}