import { NextResponse as Response } from 'next/server';

const message = [
  {
    photo:
      'https://pbs.twimg.com/profile_images/1514508406173966338/EB1FNICT_bigger.jpg',
    username: 'andreponce_',
    name: 'Andre ponce',
    message: `Dato: Al contrario de lo que mucha gente piensa, el orificio de la tapita del bolígrafo no sirve para evitar que se seque la tinta. 

    En realidad, su finalidad es mucho más importante, ya que este agujero sirve en el caso de que un niño se trague la tapita y se le quede atascado en la garganta, así pueda seguir respirando hasta que sea atendido por los equipos de emergencia.`,
    isVerified: true,
    timestamp: new Date(Date.now()).toString(),
    data: {
      likes: 40,
      comments: 24,
      retweet: 31,
      analitics: 102,
    },
  },
  {
    photo:
      'https://pbs.twimg.com/profile_images/1668784260856070147/oi-9B_2G_normal.jpg',
    username: 'josephrexme',
    name: 'Joseph Rex',
    message: `¡HOY resuelvo una Prueba Técnica de React!
    Para puesto Junior y Trainee.
    
    Lo que haremos:
    - Crear proyecto desde cero
    - Buenas prácticas y refactor
    - Estilos y accesibilidad
    - Testing de componentes y hooks
    - Despliegue a producción
    
    Usaremos y explicaremos TypeScript.
    
    ¡Y te mandaré ejercicios al final para que sigas practicando!
    
    Horario de la clase:
    18H 🇪🇸
    17H 🇮🇨
    13H 🇺🇾 🇦🇷
    12H 🇨🇱 🇵🇾 🇵🇷 🇧🇴 🇻🇪
    11H 🇨🇴 🇵🇪 🇪🇨 🇵🇦
    10H 🇲🇽 🇨🇷 🇳🇮 🇸🇻 🇭🇳
    9H 🇺🇸`,
    timestamp: new Date(Date.now()).toString(),
    isVerified: false,
    data: {
      likes: 10,
      comments: 2,
      retweet: 3,
      analitics: 20,
    },
  },
  {
    username: 'ElBuni',
    name: 'therealbuni',
    message: `Volvieron a hackear la página del gobierno Argentino 
    Ya ni es la banda del hentai
    2 chabones normales fueron
    Y massa quiere que pongas tus ahorros en su moneda digital KJJJ`,
    isVerified: true,
    timestamp: new Date(Date.now()).toString(),
    photo:
      'https://pbs.twimg.com/profile_images/1640576919354716160/V478sHjL_x96.jpg',
    data: {
      likes: 30,
      comments: 20,
      retweet: 4,
      analitics: 100,
    },
  },
  {
    photo:
      'https://pbs.twimg.com/profile_images/1470945064360812551/P2A9vFfc_x96.jpg',
    username: 'Somos Cosmos',
    name: 'InformaCosmos',
    isVerified: true,
    message: `«Después de dos meses de planificación y tres días y noches intentando lograr esta foto.
    Fases del eclipse anular del 14 de octubre sobre el templo de Kukulkán en Chichén Itzá, Patrimonio de la Humanidad de México. Esta edificación es una de las siete maravillas del mundo».
    
    Crédito imagen: Amir/IG: Amirshq`,
    timestamp: new Date(Date.now()).toString(),
    data: {
      likes: 30,
      comments: 20,
      retweet: 4,
      analitics: 100,
    },
  },
];

export function GET() {
  return Response.json(message);
}

// Create post
export async function POST(req) {
  const data = await req.json();
  message.unshift(data);

  return Response.json({ message }, { status: 200 });
}
