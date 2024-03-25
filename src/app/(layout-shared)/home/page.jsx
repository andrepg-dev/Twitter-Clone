'use client';
import { Card } from '@/components/react-components/card';
import { useTwios } from '@/hooks/useTwios';

function HomePage() {
  const { twios } = useTwios();

  return (
    <article>
      {twios.map((twio) => (
        <Card twio={twio} key={twio.id} />
      ))}
    </article>
  );
}

export default HomePage;
