'use client';

import { useEffect, useState } from 'react';
import { CheckUserIsLogged } from '../firebase/client';

const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined,
};

export const useUser = () => {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN);

  useEffect(() => {
    CheckUserIsLogged(setUser);
  }, []);

  return user;
};
