'use client';

import { useEffect, useState, useRef } from 'react';

export const useScrollListener = () => {
  const [onScroll, setOnScroll] = useState(false);
  const oldScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      setOnScroll(window.scrollY > oldScrollY.current);
      oldScrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { onScroll };
};
