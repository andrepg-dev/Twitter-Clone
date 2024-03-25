import { Card } from '@/components/react-components/card';
import LoadingPage from '@/components/react-components/loading';
import { WithOutResults } from '@/components/react-components/without-results';
import { GetDoc } from '@/firebase/client';

async function fetchDoc({ id }) {
  return GetDoc({ id }).then((res) => {
    return res;
  });
}

export default async function TwiosStatus({ params }) {
  // Tomar parametros del [id]
  const { id } = params;
  const data = await fetchDoc({ id });

  if (!data) {
    return <WithOutResults />;
  }

  return data ? <div className='md:w-[48rem]'><Card twio={data} redirect={false} /></div> : <LoadingPage />;
}
