'use client';

import LoginPage from '@/app/login/page';
import LoadingPage from '@/components/react-components/loading';
import { AddTwio, UploadImage } from '@/firebase/client';
import { useUser } from '@/hooks/useUser';
import { IconArrowDown, IconArrowLeft, IconImage } from '@/icons';
import { Globe2, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

const COMPOSE_STATE = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
};

export default function CreateTwio() {
  // Stado de usuario
  const [state, setState] = useState(COMPOSE_STATE.USER_NOT_KNOWN);
  const [text, setText] = useState('');
  // Imagenes
  const [imageUrlPrev, setImageUrlPrev] = useState(null);
  const [file, setFile] = useState(null);
  // Datos de usuario
  const user = useUser();


  // Referencia al textarea
  const textareaRef = useRef(null);
  // Router
  const router = useRouter();

  const handleSubmit = async () => {
    setState(COMPOSE_STATE.LOADING);

    const { name, photo, username, id, email } = user;

    // Subir imagen a firestorage y obtener la url
    if (file) {
      try {
        const downloadUrl = await UploadImage(file);

        const bodyToSend = {
          name,
          photo,
          content: text,
          email,
          userid: id,
          tweetimg: downloadUrl,
          username,
          isVerified: true,
          data: {
            likes: 0,
            comments: 0,
            retweets: 0,
            analitics: 0,
          },
        };

        // Send data to firestorage and redirect to home
        return await AddTwio(bodyToSend).then(() => {
          setState(COMPOSE_STATE.SUCCESS);
          router.replace('/home');
        });
      } catch (error) {
        console.log(error.message);
        setState(COMPOSE_STATE.ERROR);
        return;
      }
    }

    // Si no hay imagen
    const bodyToSend = {
      name,
      photo,
      content: text,
      email,
      userid: id,
      tweetimg: null,
      username,
      isVerified: true,
      data: {
        likes: 0,
        comments: 0,
        retweets: 0,
        analitics: 0,
      },
    };

    // Send data to firestorage and redirect to home
    return await AddTwio(bodyToSend).then(() => {
      setState(COMPOSE_STATE.SUCCESS);
      router.replace('/home');
    });
  };

  const TextLoading = () => {
    return (
      <span className='flex items-center gap-1'>
        Subiendo
        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
      </span>
    );
  };

  const onUploadImage = (event) => {
    // Get file
    const file = event.target.files[0];
    // Set file
    setFile(file);

    const url = fileReader(file);
    setImageUrlPrev(url);
  };

  const fileReader = (file) => {
    // Convertir la imagen en blob
    const blob = new Blob([file], { type: file.type });
    // Convertir el blob en url
    const url = URL.createObjectURL(blob);
    return url;
  };

  const isButtonDisabled = !text.trim() || state === COMPOSE_STATE.LOADING;

  return !user ? (
    <LoginPage />
  ) : (
    <main className='w-full min-h-[100svh] flex justify-center gap-4 bg-black/5'>
      <section className='md:w-[48rem] w-full flex flex-col gap-4 px-5 py-4 border-l border-r'>
        <div className='flex justify-between'>
          <Link href='/home'>
            <IconArrowLeft
              className={'w-[20px] h-[20px] text-black fill-black '}
            />
          </Link>

          <button
            className='p-1 px-4 rounded-full bg-blue-500 text-white disabled:opacity-50'
            onClick={handleSubmit}
            disabled={isButtonDisabled} // Disable is textarea is empty
          >
            {state === COMPOSE_STATE.LOADING ? (
              <TextLoading />
            ) : (
              <span>Postear</span>
            )}
          </button>
        </div>

        <section className='w-full min-h-28 flex gap-4 '>
          <div className='w-[50px]'>
            <Image
              src={user.photo}
              alt={`Avatar of ${user.name}`}
              width={50}
              height={50}
              className='rounded-full'
            />
          </div>

          <div className='w-full h-full flex flex-col gap-4'>
            <span className='flex gap-1 text-sm text-blue-500 p-1 border rounded-full w-fit px-3 border-white/20'>
              Todos <IconArrowDown className={'w-4 fill-blue-500'} />
            </span>
            {/* Textarea */}
            <textarea
              ref={textareaRef}
              className='resize-none w-full h-32 md:h-20 placeholder:text-gray-500 placeholder:text-xl bg-transparent outline-none'
              placeholder='¡¿Qué está pasando?!'
              autoFocus
              onChange={(e) => setText(e.target.value)}
            ></textarea>

            {imageUrlPrev && (
              <img
                src={imageUrlPrev}
                alt={`Image uploades of ${user.name}`}
                className='rounded-lg aspect-auto'
              />
            )}
          </div>
        </section>

        <span className='flex gap-2 text-blue-500 text-sm pb-3 border-b border-gray-500/30 items-center'>
          <Globe2 width={16} height={16} />
          <span>Cualquier persona puede responder</span>
        </span>
        <label className='flex items-center justify-center hover:bg-blue-500/30 transition rounded-full w-8 h-8 -ml-[0.55rem] cursor-pointer'>
          <IconImage className={'text-blue-500'} width={'1.3em'} />
          <input type='file' className='hidden' onChange={onUploadImage} />
        </label>
      </section>
    </main>
  );
}
