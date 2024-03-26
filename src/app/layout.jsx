import { Inter } from 'next/font/google';
import './globals.css';
import { TwioContextProvider } from '@/context/twio-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Twios - Next.js',
  description: 'Clon de Twitter creado por @andreponce. Proyecto de código abierto.',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <TwioContextProvider>
          {children}
        </TwioContextProvider>
      </body>
    </html>
  );
}
