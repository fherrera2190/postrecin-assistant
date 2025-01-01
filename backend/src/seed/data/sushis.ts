interface SeedProduct {
  nombre: string;
  descripcion: string;
  precio: number;
  procedencia: string;
  ingredientes: string[];
  popularidad: number;
  vegetariano: boolean;
  stock: number;
  imagen: string;
  calorias: number;
  categoria: string;
}

export const sushis: SeedProduct[] = [
  {
    nombre: 'nigiri',
    descripcion:
      'pequeña bola de arroz de sushi sobre la que se coloca una lámina de pescado o marisco, a menudo acompañada de wasabi.',
    precio: 5.99,
    procedencia: 'japón',
    ingredientes: ['arroz de sushi', 'pescado crudo', 'wasabi'],
    popularidad: 9,
    vegetariano: false,
    stock: 50,
    imagen: 'https://miweb.com/images/nigiri.jpg',
    calorias: 200,
    categoria: 'nigiri',
  },
  {
    nombre: 'maki tradicional',
    descripcion:
      'rollos de arroz y otros ingredientes envueltos en alga nori, cortados en piezas pequeñas.',
    precio: 7.49,
    procedencia: 'japón',
    ingredientes: ['arroz de sushi', 'alga nori', 'pescado', 'vegetales'],
    popularidad: 8,
    vegetariano: false,
    stock: 30,
    imagen: 'https://miweb.com/images/maki.jpg',
    calorias: 350,
    categoria: 'rollos',
  },

  {
    nombre: 'maki de pollo',
    descripcion:
      'rollos de arroz y otros ingredientes envueltos en alga nori, cortados en piezas pequeñas.',
    precio: 3,
    procedencia: 'japón',
    ingredientes: ['arroz de sushi', 'alga nori', 'pollo', 'vegetales'],
    popularidad: 8,
    vegetariano: false,
    stock: 10,
    imagen: 'https://miweb.com/images/maki-de-pollo.jpg',
    calorias: 200,
    categoria: 'rollos',
  },
  {
    nombre: 'sashimi',
    descripcion: 'finos cortes de pescado o marisco crudo, servidos sin arroz.',
    precio: 8.99,
    procedencia: 'japón',
    ingredientes: ['pescado crudo', 'salsa de soja', 'wasabi'],
    popularidad: 7,
    vegetariano: false,
    stock: 25,
    imagen: 'https://miweb.com/images/sashimi.jpg',
    calorias: 150,
    categoria: 'sashimi',
  },
  {
    nombre: 'california roll',
    descripcion:
      'rollos de sushi rellenos de cangrejo, aguacate y pepino, a menudo recubiertos de semillas de sésamo.',
    precio: 6.99,
    procedencia: 'estados unidos',
    ingredientes: [
      'arroz de sushi',
      'cangrejo',
      'aguacate',
      'pepino',
      'alga nori',
    ],
    popularidad: 10,
    vegetariano: true,
    stock: 40,
    imagen: 'https://miweb.com/images/california_roll.jpg',
    calorias: 300,
    categoria: 'rollos',
  },
  {
    nombre: 'temaki',
    descripcion:
      'cono de alga nori relleno de arroz y otros ingredientes como pescado, vegetales y salsas.',
    precio: 7.99,
    procedencia: 'japón',
    ingredientes: ['arroz de sushi', 'alga nori', 'pescado', 'vegetales'],
    popularidad: 8,
    vegetariano: false,
    stock: 20,
    imagen: 'https://miweb.com/images/temaki.jpg',
    calorias: 250,
    categoria: 'rollos',
  },
  {
    nombre: 'uramaki',
    descripcion:
      'rollos de sushi donde el arroz está por fuera y el alga nori por dentro, rellenos de diversos ingredientes.',
    precio: 8.49,
    procedencia: 'japón',
    ingredientes: [
      'arroz de sushi',
      'alga nori',
      'pescado',
      'vegetales',
      'semillas de sésamo',
    ],
    popularidad: 9,
    vegetariano: false,
    stock: 35,
    imagen: 'https://miweb.com/images/uramaki.jpg',
    calorias: 320,
    categoria: 'rollos',
  },
  {
    nombre: 'coca',
    descripcion: 'bebida gaseosa refrescante.',
    precio: 1.99,
    procedencia: 'méxico',
    ingredientes: ['agua', 'azúcar', 'gas carbónico'],
    popularidad: 10,
    vegetariano: true,
    stock: 100,
    imagen: 'https://miweb.com/images/coca.jpg',
    calorias: 150,
    categoria: 'bebidas',
  },
];
