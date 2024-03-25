import { useScrollListener } from '@/hooks/useScroll-listener';
import {
  IconCreateNewTweet,
  IconHome,
  IconMessage,
  IconNotification,
  IconSearch2,
} from '@/icons';
import Link from 'next/link';

const links = [
  { href: '/home', Icon: IconHome },
  { href: '/explore', Icon: IconSearch2 },
  { href: '/notifications', Icon: IconNotification },
  { href: '/messages', Icon: IconMessage },
];

export const Footer = () => {
  const { onScroll } = useScrollListener();

  return (
    <footer
      className={`flex justify-center h-[50px] w-full items-center fixed bottom-0 left-0'
        }`}
    >
      <div
        className={`flex h-[50px] md:w-[48rem] w-full border-t border-l border-r items-center relative bg-white transition ${onScroll && 'opacity-50'}`}>
        <div className='flex justify-around w-full h-full'>
          {links.map(({ href, Icon }) => (
            <Link
              href={href}
              key={href}
              className='w-full flex justify-center hover:bg-slate-200'
            >
              <Icon width='1.55rem' />
            </Link>
          ))}
        </div>

        <Link
          href={'/create/tweet'}
          className='absolute right-4 -top-[4.8rem] p-4 rounded-full w-14 h-14 bg-primaryColor text-white text-center flex justify-center items-center'
        >
          <IconCreateNewTweet className={'fill-white'} />
        </Link>
      </div>
    </footer>
  );
};
