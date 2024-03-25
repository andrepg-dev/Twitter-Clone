import { IconLoading } from '@/icons';

export default function LoadingPage() {
  return (
    <article className='absolute w-screen h-[100svh] flex items-center justify-center top-0 left-0'>
      <IconLoading color="#1d9bf0"/>
    </article>
  );
}
