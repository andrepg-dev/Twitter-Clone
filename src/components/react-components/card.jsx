'use client';

import { useTimeAgo } from '@/hooks/useTimeAgo';
import { IconVerified } from '@/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { CardFooter } from './card-footer';

export const Card = ({ twio, redirect = true }) => {
  const time = useTimeAgo(twio.timestamp);
  const refImg = useRef(null);
  const [isZoom, setIsZoom] = useState(false);
  const router = useRouter();

  const handleCardClick = (id) => {
    router.push(`/status/${id}`);
  };

  const handleZoomImage = () => {
    setIsZoom(!isZoom);
    const classList = [
      'fixed',
      'top-0',
      'left-0',
      'w-full',
      'z-50',
      'rounded-none',
    ];

    if (isZoom) {
      return refImg.current.classList.add(...classList);
    }
    return refImg.current.classList.remove(...classList);
  };

  return (
    <section className='flex gap-3 p-2 px-4 border hover:bg-slate-600/5 group'>
      <div className='h-full flex pt-2 min-w-[32px]'>
        <Image
          src={twio.photo}
          width={32}
          height={32}
          alt={`Avatar of ${'Andre'}`}
          className='rounded-full'
        />
      </div>

      <section className='flex flex-col w-full'>
        {/* Name */}
        <header className='flex justify-between'>
          <Link
            href={`/user/${twio.userid}`}
            className='flex gap-1 items-end hover:underline'
          >
            <h3
              className='font-semibold text-sm'
              style={{ textWrap: 'nowrap' }}
            >
              {twio.name}
            </h3>

            {/* Verified */}
            {twio.isVerified && (
              <IconVerified className={'w-[16px] h-[20px]'} />
            )}

            <span className='text-[12px] text-gray-500'>@{twio.username}</span>
          </Link>

          <div>
            <time className='text-[12px] text-gray-500'>{time}</time>
          </div>
        </header>

        {/* Twio */}
        <div className='flex flex-col gap-3'>
          <div
            className={`text-[15px] whitespace-pre-line flex flex-col 
            ${twio.tweetimg ? 'gap-2' : ''}
            ${redirect ? 'cursor-pointer' : ''}
            `}
            style={{ wordBreak: 'break-word' }}
            onClick={() => {
              if (redirect) {
                return handleCardClick(twio.id);
              }
              return null;
            }}
          >
            <span>{twio.content}</span>

            <p>
              {twio.tweetimg && (
                <img
                  src={twio.tweetimg}
                  alt={`Image uploades of ${twio.name}`}
                  className='rounded-lg aspect-auto'
                  ref={refImg}
                  onClick={handleZoomImage}
                />
              )}
            </p>
          </div>
          {/* Footer */}
          <CardFooter
            analitics={twio.data.analitics}
            comments={twio.data.comments}
            likes={twio.data.likes}
            retweet={twio.data.retweets}
            id={twio.id}
          />
        </div>
      </section>
    </section>
  );
};
