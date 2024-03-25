import { useFirstPathName } from '@/hooks/usePathName';
import { IconX } from '@/icons';
import Link from 'next/link';

export const NavBarSkeleton = () => {
  const { routeName } = useFirstPathName();

  return (
    <nav className='fixed w-full top-0 left-0 px-4 h-[55px] shadow flex items-center justify-between'>
      <div className='flex items-center gap-6'>
        <div className='w-[35px] h-[35px] bg-slate-700 animate-pulse rounded-full'></div>
        <h1 className='text-xl font-bold'>{routeName}</h1>
      </div>

      <Link href={'/home'} className='h-[35px] w-[35px] flex items-center'>
        <IconX role={'link'} />
      </Link>
    </nav>
  );
};
