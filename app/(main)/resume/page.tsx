'use client';

import { $api } from '@/app/helpers';
import { useState } from 'react';

export default function Resume() {
  const [state, setState] = useState('');
  const onResume = async () => {
    const res = await $api.get('./resume');
    setState(res.data.data);
  };
  return (
    <div>
      <div onClick={onResume}>onResume</div>
      <div>{state}</div>
    </div>
  );
}
