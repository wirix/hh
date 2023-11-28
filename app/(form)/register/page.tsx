'use client';

import axios from 'axios';
import React from 'react';

export default function Register() {
  const onreg = async () =>
    await axios.post('/api/register', {
      email: 'basketletterz@gmail.com',
      password: 'qwerty123',
      username: 'wirix',
    });
  const onsign = async () =>
    await axios.post('/api/signIn', {
      email: 'basketletterz@gmail.com',
      password: 'qwerty123',
      username: 'wirix',
    });
  const onrefresh = async () =>
    await axios.post('/api/refresh', {
      refresh_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJhc2tldGxldHRlcnpAZ21haWwuY29tIiwiaWQiOiI2NTY1ZDgzNmZkZWI2N2Q1NGI0NDMwNDkiLCJpYXQiOjE3MDExNzM3NjUsImV4cCI6MTcwMzc2NTc2NX0.Ts8hzPuhmJEpTcP-NIFsrkuR4gmi16bjplvRtaM0qg0',
    });
  const logout = async () =>
    await axios.post('/api/logout', {
      refresh_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJhc2tldGxldHRlcnpAZ21haWwuY29tIiwiaWQiOiI2NTY1ZDgzNmZkZWI2N2Q1NGI0NDMwNDkiLCJpYXQiOjE3MDExNzM5OTEsImV4cCI6MTcwMzc2NTk5MX0.kkPT5x_WeC-rVHD5tBiBIQlowD6SZn0pDxYHEf08oZU',
    });
  return (
    <div>
      <div onClick={onreg}>reg</div>

      <div onClick={onsign}>sign</div>

      <div onClick={onrefresh}>onrefresh</div>
      <div onClick={logout}>logout</div>
    </div>
  );
}
