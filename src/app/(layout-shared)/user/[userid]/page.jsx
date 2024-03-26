'use client';

import { Card } from '@/components/react-components/card';
import { GetTwiosByUser } from '@/firebase/client';
import { useEffect, useState } from 'react';

export default function UserHomePage({ params }) {
  const { userid } = params;
  const [twios, setTwios] = useState([]);

  useEffect(() => {
    const fetchTwios = async () => {
      const allTwios = await GetTwiosByUser({ userid });
      setTwios(allTwios);
    };

    fetchTwios();
  }, []);

  return (
    <article className='w-full md:w-[48rem]'>
      {/* Inicio */}
      {twios.map((twio) => (
        <Card twio={twio} key={twio.id} redirect={false} />
      ))}
    </article>
  );
}
