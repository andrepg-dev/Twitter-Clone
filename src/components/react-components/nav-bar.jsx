import { useFirstPathName } from '@/hooks/usePathName';
import { useScrollListener } from '@/hooks/useScroll-listener';
import { IconX } from '@/icons';
import Image from 'next/image';
import Link from 'next/link';

export const NavBar = ({ photo, name }) => {
  const { routeName } = useFirstPathName();
  const { onScroll } = useScrollListener();

  return (
    <nav
      className={`flex justify-between px-4 h-[55px] shadow items-center sticky left-0 top-0 backdrop-blur z-20 transition duration-300 ${
        onScroll && '-translate-y-[55px]'
      }`}
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
    >
      <div className='flex gap-6 items-center'>
        <Image
          src={photo}
          alt={`Avatar of ${name}`}
          width={35}
          height={35}
          className='rounded-full'
        />
        <h1 className='text-xl font-bold'>{routeName}</h1>
      </div>
      <Link href={'/home'} className='h-[35px] w-[35px] flex items-center'>
        <IconX role={'link'} />
      </Link>
    </nav>
  );
};
