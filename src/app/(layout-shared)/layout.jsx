'use client';
import { Footer } from '@/components/react-components/footer';
import { NavBar } from '@/components/react-components/nav-bar';
import { NavBarSkeleton } from '@/components/react-components/nav-bar-skeleton';
import { TwioContextProvider } from '@/context/twio-context';
import { useUser } from '@/hooks/useUser';
import Head from 'next/head';

export default function HomeLayout({ children }) {
  const user = useUser();

  const PageContent = ({ navBar, children }) => {
    return (
      <main className='flex flex-col justify-between'>
        <Head>
          <title>Next.js</title>
        </Head>

        {navBar}

        {children}
        <div className='pt-[50px]'></div>
        <Footer />
      </main>
    );
  };

  return user ? (
    <TwioContextProvider>
      <PageContent navBar={<NavBar name={user.name} photo={user.photo} />}>
        {children}
      </PageContent>
    </TwioContextProvider>
  ) : (
    <PageContent navBar={<NavBarSkeleton />} />
  );
}
