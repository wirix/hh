import { getCurrentUser } from '@/app/actions';
import { $api } from '@/app/helpers';
import { useState } from 'react';
import { getContent } from './getContent';

export default async function Resume() {
  const [state, setState] = useState('');

  const body = await getContent();

  if (!body) {
    return;
  }

  return (
    <div>
      <div>{body.body}</div>
      <button onClick={() => {}}>

      </button>
    </div>
  );
}
