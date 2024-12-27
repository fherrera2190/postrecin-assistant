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
    nombre: 'Nigiri',
    descripcion:
      'Pequeña bola de arroz de sushi sobre la que se coloca una lámina de pescado o marisco, a menudo acompañada de wasabi.',
    precio: 5.99,
    procedencia: 'Japón',
    ingredientes: ['arroz de sushi', 'pescado crudo', 'wasabi'],
    popularidad: 9,
    vegetariano: false,
    stock: 50,
    imagen: 'https://miweb.com/images/nigiri.jpg',
    calorias: 200,
    categoria: 'Nigiri',
  },
  {
    nombre: 'Maki',
    descripcion:
      'Rollos de arroz y otros ingredientes envueltos en alga nori, cortados en piezas pequeñas.',
    precio: 7.49,
    procedencia: 'Japón',
    ingredientes: ['arroz de sushi', 'alga nori', 'pescado', 'vegetales'],
    popularidad: 8,
    vegetariano: false,
    stock: 30,
    imagen: 'https://miweb.com/images/maki.jpg',
    calorias: 350,
    categoria: 'Rollos',
  },
  {
    nombre: 'Sashimi',
    descripcion: 'Finos cortes de pescado o marisco crudo, servidos sin arroz.',
    precio: 8.99,
    procedencia: 'Japón',
    ingredientes: ['pescado crudo', 'salsa de soja', 'wasabi'],
    popularidad: 7,
    vegetariano: false,
    stock: 25,
    imagen: 'https://miweb.com/images/sashimi.jpg',
    calorias: 150,
    categoria: 'Sashimi',
  },
  {
    nombre: 'California Roll',
    descripcion:
      'Rollos de sushi rellenos de cangrejo, aguacate y pepino, a menudo recubiertos de semillas de sésamo.',
    precio: 6.99,
    procedencia: 'Estados Unidos',
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
    categoria: 'Rollos',
  },
  {
    nombre: 'Temaki',
    descripcion:
      'Cono de alga nori relleno de arroz y otros ingredientes como pescado, vegetales y salsas.',
    precio: 7.99,
    procedencia: 'Japón',
    ingredientes: ['arroz de sushi', 'alga nori', 'pescado', 'vegetales'],
    popularidad: 8,
    vegetariano: false,
    stock: 20,
    imagen: 'https://miweb.com/images/temaki.jpg',
    calorias: 250,
    categoria: 'Rollos',
  },
  {
    nombre: 'Uramaki',
    descripcion:
      'Rollos de sushi donde el arroz está por fuera y el alga nori por dentro, rellenos de diversos ingredientes.',
    precio: 8.49,
    procedencia: 'Japón',
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
    categoria: 'Rollos',
  },
];
