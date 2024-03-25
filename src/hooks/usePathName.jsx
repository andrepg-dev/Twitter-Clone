'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const ROUTESOPTIONS = {
  home: 'Inicio',
  explore: 'Explorar',
  notifications: 'Notificaciones',
  messages: 'Mensajes',
  user: 'Usuario',
  status: 'Twio',
};

export const useFirstPathName = () => {
  const [routeName, setRouteName] = useState(ROUTESOPTIONS.home);
  const pathname = usePathname();

  useEffect(() => {
    const splitRoute = pathname.split('/');
    const route = splitRoute[1];
    const routeName = ROUTESOPTIONS[route];
    setRouteName(routeName);
  }, [pathname]);

  return { routeName };
};
