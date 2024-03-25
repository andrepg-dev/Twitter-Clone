'use client';

import { listenLastTwios } from '@/firebase/client';
import { createContext, useEffect, useState } from 'react';

export const TwioContext = createContext({ twios: [], setTwios: () => { } });

export const TwioContextProvider = ({ children }) => {
  const [twios, setTwios] = useState([]);

  useEffect(() => {
    let unsub;

    unsub = listenLastTwios(setTwios);
    return () => unsub && unsub();
    
  }, []);

  return (
    <TwioContext.Provider value={{ twios, setTwios }}>
      {children}
    </TwioContext.Provider>
  );
};
