'use client';
import { getCurrentUser } from '@/app/actions';
import { $api } from '@/app/helpers';
import { useState } from 'react';

export default function Resume() {
  const [state, setState] = useState('');

  return (
    <div>
      <button onClick={() => {}}>test</button>
    </div>
  );
}
