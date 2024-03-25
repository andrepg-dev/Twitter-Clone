'use client';
import { Footer } from '@/components/react-components/footer';
import { NavBar } from '@/components/react-components/nav-bar';
import { useUser } from '@/hooks/useUser';
import Head from 'next/head';

export default function HomeLayout({ children }) {
  const user = useUser();

  const PageContent = ({ navBar, children }) => {
    return (
      <main className='flex flex-col justify-between items-center'>
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

  if (!user) {
    return <PageContent navBar={<NavBar name={"Testing user"}/>}>
      {children}
    </PageContent>
  }

  return (
    <PageContent navBar={<NavBar name={user.name} photo={user.photo} />}>
      {children}
    </PageContent>
  )
}
