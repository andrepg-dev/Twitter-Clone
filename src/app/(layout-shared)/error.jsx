'use client';

import { Button } from '@/components/ui/button';
import { RotateCw } from 'lucide-react';

export default function Error() {
  const handleClick = () => {
    window.location.reload();
  };

  return (
    <main className='w-screen min-h-[100svh] flex items-center justify-center text-xl flex-col gap-2 fixed top-0 left-0'>
      <p>Twios cannot load 😢</p>
      <p>
        Please try again{' '}
        <Button size='icon' variant='outline' onClick={handleClick}>
          <RotateCw width={17} height={17} />
        </Button>
      </p>
    </main>
  );
}
