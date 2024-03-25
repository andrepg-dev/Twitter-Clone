import { useUser } from '@/hooks/useUser';
import Image from 'next/image';

export const Avatar = () => {
  const { photo, name } = useUser();

  return (
    <section className='w-full ronded-xl p-1 flex items-center gap-2'>
      <Image
        src={photo}
        alt={`Avatar of ${name}`}
        width={40}
        height={40}
        className='rounded-full'
      />
      <span className='font-semibold'>{name}</span>
    </section>
  );
};
