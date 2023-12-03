'use client';

import axios from 'axios';
import React from 'react';

export default function Register() {
  const onreg = async () => {
    const res = await axios.post('/api/register', {
      email: 'basketletterz1@gmail.com',
      password: 'qwerty123',
      username: 'wirix',
    });
    // !!!!!!!!!!!!! <generic>
    localStorage.setItem('access_token', res.data.access_token);
  };

  const onsign = async () => {
    const res = await axios.post('/api/signIn', {
      email: 'basketletterz@gmail.com',
      password: 'qwerty123',
    });
    localStorage.setItem('access_token', res.data.access_token);
  };

  const onrefresh = async () => {
    const res = await axios.get('/api/refresh');
    console.log("🚀 ~ file: page.tsx:30 ~ onrefresh ~ res:", res)
    localStorage.setItem('access_token', res.data.access_token);
  };

  const logout = async () => {
    await axios.get('/api/logout');
    localStorage.removeItem('access_token');
  };

  return (
    <div>
      <div onClick={onreg}>reg</div>

      <div onClick={onsign}>sign</div>

      <div onClick={onrefresh}>onrefresh</div>
      <div onClick={logout}>logout</div>
    </div>
  );
}
