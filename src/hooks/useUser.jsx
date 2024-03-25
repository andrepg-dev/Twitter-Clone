'use client';

import { useEffect, useState } from 'react';
import { CheckUserIsLogged } from '../firebase/client';
import { useRouter } from 'next/navigation';

const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined,
};

export const useUser = () => {
  const router = useRouter();
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN);

  useEffect(() => {
    CheckUserIsLogged(setUser);
  }, []);

  useEffect(() => {
    user === USER_STATES.NOT_LOGGED && router.replace('/');
  }, [user]);

  return user;
};
