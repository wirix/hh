'use client';

import { $api } from '@/app/helpers';

export default function ResumePage() {
  const createResume = async () => {
    const res = await $api.post('./resume', {
      body: 'Я изучаю Frontend более 2 лет и уверен, что глубокое понимание описанных ниже технологий выделяет меня среди других претендентов.',
      country: 'Россия',
      city: 'Красноярск',
    });
  };
  return <div onClick={createResume}>Resume</div>;
}
