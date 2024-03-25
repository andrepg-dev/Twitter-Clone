import './coming-soon.css';

export const ComingSoon = () => {
  return (
    <article className='text-xl flex flex-col  font-bold w-full absolute left-0 top-0 h-[100svh] items-center justify-center text-center gap-2'>
      <div className='gearbox'>
        <div className='overlay'></div>
        <div className='gear one'>
          <div className='gear-inner'>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
          </div>
        </div>
        <div className='gear two'>
          <div className='gear-inner'>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
          </div>
        </div>
        <div className='gear three'>
          <div className='gear-inner'>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
          </div>
        </div>
        <div className='gear four large'>
          <div className='gear-inner'>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
          </div>
        </div>
      </div>
      <h1>Coming soon...</h1>
    </article>
  );
};
