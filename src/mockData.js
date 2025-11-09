// Estes são os "dados falsos" (mock data).
// O ProductCatalogPage e o ProductDetailPage vão usar este ficheiro.

export const mockProducts = [
  {
    id: 1,
    name: 'Bolsa de Crochê (Verde)',
    price: 'R$ 120,00',
    image: 'https://placehold.co/600x400/008B8B/FFFFFF?text=Bolsa+MiCroche',
    description: 'Uma linda bolsa feita à mão com fio de malha premium. Perfeita para o dia a dia, combinando estilo e sustentabilidade.',
    material: 'Fio de Malha Premium (100% Algodão)',
    sizes: ['Pequena', 'Média', 'Grande'],
    category: 'bolsas' 
  },
  {
    id: 2,
    name: 'Top de Crochê (Branco)',
    price: 'R$ 89,90',
    image: 'https://placehold.co/600x400/008B8B/FFFFFF?text=Top+MiCroche',
    description: 'Top de crochê estilo "cropped", ideal para festivais ou para um look de verão. Feito com linha 100% algodão para maior conforto.',
    material: 'Linha Anne (100% Algodão)',
    sizes: ['P', 'M', 'G'],
    category: 'roupas'
  },
  {
    id: 3,
    name: 'Manta de Crochê (Bege)',
    price: 'R$ 250,00',
    image: 'https://placehold.co/600x400/008B8B/FFFFFF?text=Manta+MiCroche',
    description: 'Manta aconchegante para sofá, feita em ponto "maxi crochê". Traz um toque de conforto e design para a sua sala.',
    material: 'Lã Merino (Extra Macia)',
    sizes: ['Solteiro', 'Casal'],
    category: 'decoracao'
  },
  {
    id: 4,
    name: 'Amigurumi (Polvo)',
    price: 'R$ 75,00',
    image: 'https://placehold.co/600x400/008B8B/FFFFFF?text=Amigurumi',
    description: 'Polvo de Amigurumi, perfeito para recém-nascidos. Os tentáculos simulam o cordão umbilical, acalmando o bebé.',
    material: 'Linha Amigurumi Soft (100% Algodão)',
    sizes: ['Único'],
    category: 'amigurumi'
  },
];