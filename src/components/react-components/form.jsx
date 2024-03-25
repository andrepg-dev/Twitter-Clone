'use client';

import { useUser } from '@/hooks/useUser';
import { IconX } from '@/icons';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LoginWithGitHub } from '../../firebase/client';
import { Button } from '../ui/button';

export const Form = () => {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (user) {
      router.replace('/home');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await LoginWithGitHub();
      router.replace('/home');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='w-[90%] border bg-white h-[30rem] rounded p-4 flex items-center justify-center'
    >
      <div className='flex flex-col text-center items-center gap-2'>
        <div className='w-12'>
          <IconX />
        </div>

        <div className='flex flex-col'>
          <h1 className='text-lg font-bold'>Twitter on Next.js </h1>
          <h2>
            Talk about development <br />
            with developers 🧑🏼‍💻
          </h2>
        </div>

        <Button variant='outline' className='flex gap-1'>
          Login with GitHub
        </Button>
      </div>
    </form>
  );
};
