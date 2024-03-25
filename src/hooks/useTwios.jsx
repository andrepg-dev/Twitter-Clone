'use client';

import { TwioContext } from '@/context/twio-context';
import { useContext } from 'react';

export const useTwios = () => {
  const { twios } = useContext(TwioContext);

  return { twios };
};
