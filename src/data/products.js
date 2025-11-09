// Esse ficheiro é o de produtos

const products = [
  {
    id: '1',
    name: 'Amigurumi de Sereia Ariel',
    price: 85.00,
    category: 'Amigurumis',
    description: 'Amigurumi artesanal da Sereia Ariel, feito com linha de algodão macia e enchimento antialérgico. Perfeito para presentear e decorar.',
    
    images: [
      'https://placehold.co/600x600/008B8B/FFFFFF?text=Ariel+1', // URL da imagem principal
      'https://placehold.co/600x600/008B8B/FFFFFF?text=Ariel+2', // URL de uma imagem de detalhe
      'https://placehold.co/600x600/008B8B/FFFFFF?text=Ariel+3'  // URL de outra imagem de detalhe
    ],
    mainImage: 'https://placehold.co/600x600/008B8B/FFFFFF?text=Ariel+1', // A imagem principal (para o catálogo)
    stock: 10,
    rating: 4.8,
    reviews: 25
  },
  {
    id: '2',
    name: 'Naninha de Urso Panda',
    price: 45.00,
    category: 'Naninhas',
    description: 'Naninha de crochê em formato de urso panda, ideal para o sono tranquilo dos bebés. Hipoalergénico e lavável.',
    images: [
      'https://placehold.co/600x600/008B8B/FFFFFF?text=Panda+1',
      'https://placehold.co/600x600/008B8B/FFFFFF?text=Panda+2'
    ],
    mainImage: 'https://placehold.co/600x600/008B8B/FFFFFF?text=Panda+1',
    stock: 15,
    rating: 4.5,
    reviews: 30
  },
  {
    id: '3',
    name: 'Caminho de Mesa Floral',
    price: 120.00,
    category: 'Decoração',
    description: 'Elegante caminho de mesa em crochê com detalhes florais, perfeito para dar um toque rústico e acolhedor à sua sala de jantar.',
    images: [
      'https://placehold.co/600x600/008B8B/FFFFFF?text=Mesa+1',
      'https://placehold.co/600x600/008B8B/FFFFFF?text=Mesa+2',
      'https://placehold.co/600x600/008B8B/FFFFFF?text=Mesa+3',
    ],
    mainImage: 'https://placehold.co/600x600/008B8B/FFFFFF?text=Mesa+1',
    stock: 5,
    rating: 4.9,
    reviews: 12
  },
  {
    id: '4',
    name: 'Chaveiro de Coração',
    price: 15.00,
    category: 'Acessórios',
    description: 'Pequeno chaveiro de coração em crochê, feito com muito carinho. Ideal para lembrancinhas ou para decorar a sua bolsa.',
    images: [
      'https://placehold.co/600x600/008B8B/FFFFFF?text=Chaveiro+1',
      'https://placehold.co/600x600/008B8B/FFFFFF?text=Chaveiro+2'
    ],
    mainImage: 'https://placehold.co/600x600/008B8B/FFFFFF?text=Chaveiro+1',
    stock: 50,
    rating: 4.7,
    reviews: 50
  },
  {
    id: '5',
    name: 'Cachepô de Fio de Malha',
    price: 60.00,
    category: 'Decoração',
    description: 'Cachepô moderno feito com fio de malha sustentável. Perfeito para plantas pequenas, organizar objetos ou como cesto decorativo.',
    images: [
      'https://placehold.co/600x600/008B8B/FFFFFF?text=Cachepo+1',
      'https://placehold.co/600x600/008B8B/FFFFFF?text=Cachepo+2'
    ],
    mainImage: 'https://placehold.co/600x600/008B8B/FFFFFF?text=Cachepo+1',
    stock: 8,
    rating: 4.6,
    reviews: 18
  },
  {
    id: '6',
    name: 'Boneca de Crochê (Personalizável)',
    price: 150.00,
    category: 'Amigurumis',
    description: 'Boneca amigurumi totalmente personalizável: escolha cor do cabelo, roupa e acessórios. Um presente único e especial.',
    images: [
      'https://placehold.co/600x600/008B8B/FFFFFF?text=Boneca+1',
      'https://placehold.co/600x600/008B8B/FFFFFF?text=Boneca+2',
      'https://placehold.co/600x600/008B8B/FFFFFF?text=Boneca+3'
    ],
    mainImage: 'https://placehold.co/600x600/008B8B/FFFFFF?text=Boneca+1',
    stock: 7,
    rating: 5.0,
    reviews: 10
  }
];

export default products;