interface SeedProduct {
  name: string;
  price: number;
  category: string;
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
}

export const sushis: SeedProduct[] = [
  {
    image: {
      thumbnail:
        'https://cdn.pixabay.com/photo/2016/03/05/19/02/salmon-sushi-1238248_640.jpg',
      mobile:
        'https://cdn.pixabay.com/photo/2016/03/05/19/02/salmon-sushi-1238248_960_720.jpg',
      tablet:
        'https://cdn.pixabay.com/photo/2016/03/05/19/02/salmon-sushi-1238248_1280_720.jpg',
      desktop:
        'https://cdn.pixabay.com/photo/2016/03/05/19/02/salmon-sushi-1238248_1920.jpg',
    },
    name: 'Salmon Sushi',
    category: 'Nigiri',
    price: 3.5,
  },
  {
    image: {
      thumbnail:
        'https://cdn.pixabay.com/photo/2020/02/07/10/16/sushi-4828700_640.jpg',
      mobile:
        'https://cdn.pixabay.com/photo/2020/02/07/10/16/sushi-4828700_960_720.jpg',
      tablet:
        'https://cdn.pixabay.com/photo/2020/02/07/10/16/sushi-4828700_1280_720.jpg',
      desktop:
        'https://cdn.pixabay.com/photo/2020/02/07/10/16/sushi-4828700_1920.jpg',
    },
    name: 'Tuna Sushi Roll',
    category: 'Roll',
    price: 4.5,
  },
  {
    image: {
      thumbnail:
        'https://cdn.pixabay.com/photo/2020/04/06/17/51/sushi-5010306_640.jpg',
      mobile:
        'https://cdn.pixabay.com/photo/2020/04/06/17/51/sushi-5010306_960_720.jpg',
      tablet:
        'https://cdn.pixabay.com/photo/2020/04/06/17/51/sushi-5010306_1280_720.jpg',
      desktop:
        'https://cdn.pixabay.com/photo/2020/04/06/17/51/sushi-5010306_1920.jpg',
    },
    name: 'Avocado Maki',
    category: 'Maki',
    price: 3.0,
  },
  {
    image: {
      thumbnail:
        'https://cdn.pixabay.com/photo/2016/03/05/19/02/sushi-1238247_640.jpg',
      mobile:
        'https://cdn.pixabay.com/photo/2016/03/05/19/02/sushi-1238247_960_720.jpg',
      tablet:
        'https://cdn.pixabay.com/photo/2016/03/05/19/02/sushi-1238247_1280_720.jpg',
      desktop:
        'https://cdn.pixabay.com/photo/2016/03/05/19/02/sushi-1238247_1920.jpg',
    },
    name: 'Shrimp Tempura Roll',
    category: 'Roll',
    price: 5.0,
  },
  {
    image: {
      thumbnail:
        'https://cdn.pixabay.com/photo/2017/01/22/19/40/sushi-2006296_640.jpg',
      mobile:
        'https://cdn.pixabay.com/photo/2017/01/22/19/40/sushi-2006296_960_720.jpg',
      tablet:
        'https://cdn.pixabay.com/photo/2017/01/22/19/40/sushi-2006296_1280_720.jpg',
      desktop:
        'https://cdn.pixabay.com/photo/2017/01/22/19/40/sushi-2006296_1920.jpg',
    },
    name: 'Vegetable Sushi',
    category: 'Vegetarian',
    price: 3.8,
  },
  {
    image: {
      thumbnail:
        'https://cdn.pixabay.com/photo/2017/09/02/20/41/sushi-2704110_640.jpg',
      mobile:
        'https://cdn.pixabay.com/photo/2017/09/02/20/41/sushi-2704110_960_720.jpg',
      tablet:
        'https://cdn.pixabay.com/photo/2017/09/02/20/41/sushi-2704110_1280_720.jpg',
      desktop:
        'https://cdn.pixabay.com/photo/2017/09/02/20/41/sushi-2704110_1920.jpg',
    },
    name: 'Dragon Roll',
    category: 'Special Roll',
    price: 6.5,
  },
  {
    image: {
      thumbnail:
        'https://cdn.pixabay.com/photo/2016/11/21/17/13/sushi-1841986_640.jpg',
      mobile:
        'https://cdn.pixabay.com/photo/2016/11/21/17/13/sushi-1841986_960_720.jpg',
      tablet:
        'https://cdn.pixabay.com/photo/2016/11/21/17/13/sushi-1841986_1280_720.jpg',
      desktop:
        'https://cdn.pixabay.com/photo/2016/11/21/17/13/sushi-1841986_1920.jpg',
    },
    name: 'California Roll',
    category: 'Roll',
    price: 4.0,
  },
  {
    image: {
      thumbnail:
        'https://cdn.pixabay.com/photo/2017/06/06/09/53/sushi-2370757_640.jpg',
      mobile:
        'https://cdn.pixabay.com/photo/2017/06/06/09/53/sushi-2370757_960_720.jpg',
      tablet:
        'https://cdn.pixabay.com/photo/2017/06/06/09/53/sushi-2370757_1280_720.jpg',
      desktop:
        'https://cdn.pixabay.com/photo/2017/06/06/09/53/sushi-2370757_1920.jpg',
    },
    name: 'Eel Sushi',
    category: 'Nigiri',
    price: 5.5,
  },
  {
    image: {
      thumbnail:
        'https://cdn.pixabay.com/photo/2018/08/01/21/11/sushi-3577897_640.jpg',
      mobile:
        'https://cdn.pixabay.com/photo/2018/08/01/21/11/sushi-3577897_960_720.jpg',
      tablet:
        'https://cdn.pixabay.com/photo/2018/08/01/21/11/sushi-3577897_1280_720.jpg',
      desktop:
        'https://cdn.pixabay.com/photo/2018/08/01/21/11/sushi-3577897_1920.jpg',
    },
    name: 'Spicy Tuna Roll',
    category: 'Roll',
    price: 5.0,
  },
];
