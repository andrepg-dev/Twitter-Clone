'use client';

import { listenLastTwios } from '@/firebase/client';
import { useUser } from '@/hooks/useUser';
import { createContext, useEffect, useState } from 'react';

export const TwioContext = createContext(null);

export const TwioContextProvider = ({ children }) => {
  const user = useUser();
  const [twios, setTwios] = useState([]);

  useEffect(() => {
    let unsub;

    if (user) {
      unsub = listenLastTwios(setTwios);
    }
    return () => unsub && unsub();
  }, [user]);

  return (
    <TwioContext.Provider value={{ twios, setTwios }}>
      {children}
    </TwioContext.Provider>
  );
};
