'use client';

import {
  IconAnalytics,
  IconComment,
  IconLike,
  IconLikeFill,
  IconRetweet,
  IconShare,
} from '@/icons';
import { useState } from 'react';

export const CardFooter = ({ comments, retweet, likes, analitics, id }) => {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleClick = async () => {
    try {
      await navigator.share({
        text: `${window.location.origin}/status/${id}`,
        url: `${window.location.origin}/status/${id}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = () => {
    setLike(!like);
    if (like) {
      return setLikeCount(likeCount - 1);
    }
    setLikeCount(likeCount + 1);
  };

  return (
    <footer className='flex flex-nowrap justify-between h-[25px] w-full text-gray-600 fill-gray-600 text-sm select-none'>
      <div
        className='flex gap-1 scale-90 cursor-pointer hover:fill-blue-500 hover:text-blue-500'
        title='Responder'
      >
        <IconComment className={'w-6'} />
        <span className='flex items-center'>{comments}</span>
      </div>
      <div
        className='flex gap-1 scale-90 hover:fill-[#03724d] hover:text-[#03724d] cursor-pointer group'
        title='Repostear'
      >
        <IconRetweet className={'w-6 '} />
        <span className='flex items-center'>{retweet}</span>
      </div>
      <div
        className='flex gap-1 scale-90 cursor-pointer hover:fill-[#f91880] hover:text-[#f91880]'
        title='Me gusta'
        onClick={handleLike}
      >
        {like ? (
          <IconLikeFill className={`w-6 fill-[#f91880] `} />
        ) : (
          <IconLike className={`w-6 `} />
        )}
        <span className='flex items-center'>{likeCount}</span>
      </div>
      <div
        className='flex gap-1 scale-90 cursor-pointer hover:fill-blue-500 hover:text-blue-500'
        title='Ver'
      >
        <IconAnalytics className={'w-6'} />
        <span className='flex items-center'>{analitics}</span>
      </div>
      <div
        className='flex gap-1 scale-90 cursor-pointer hover:fill-blue-500 hover:text-blue-500'
        title='Compartir'
        onClick={handleClick}
      >
        <IconShare className={'w-6 cursor-pointer'} />
      </div>
    </footer>
  );
};
