// Esse ficheiro é o de produtos


import BolsaBranca1 from '../assets/bolsabranca1.PNG';
import BolsaBranca2 from '../assets/bolsabranca2.PNG';

import Conjunto1 from '../assets/conjunto1.jpg';
import Conjunto2 from '../assets/conjunto2.jpg';
import Conjunto3 from '../assets/conjunto3.PNG'; 

import Carregador1 from '../assets/carregadordecor1.jpg'; 

import Calopsita1 from '../assets/calopsita1.jpg';
import Calopsita2 from '../assets/calopsita2.jpg';
import Calopsita3 from '../assets/calopsita3.jpg';

import BolsaMarrom1 from '../assets/bolsamarrom1.JPG';
import BolsaMarrom2 from '../assets/bolsamarrom2.png';
import BolsaMarrom3 from '../assets/bolsamarrom3.png';

import Luffy1 from '../assets/luffy1.jpg';
import Luffy2 from '../assets/luffy2.jpg';

import placeholder from '../assets/mirinha.jpg';

const products = [
 {
 id: '1',
 name: 'Bolsa de Crochê (Branca)',
 price: 120.00,
 category: 'Bolsas',
 description: 'Uma linda bolsa feita à mão com Barbante...',
 
    
 images: [
 BolsaBranca1, 
 BolsaBranca2
 ],
 mainImage: BolsaBranca1, 
 stock: 10,
 rating: 4.8,
 reviews: 25
 },
 {
 id: '2',
 name: 'Conjunto de Crochê (Azul)',
 price: 160.00,
 category: 'Roupas',
 description: 'Conjunto de crochê, ideal para festivais na praia.',
 images: [
 Conjunto1, 
 Conjunto2, 
 Conjunto3  
 ],
 mainImage: Conjunto1,
 stock: 15,
 rating: 4.5,
 reviews: 30
 },
 {
 id: '3',
 name: 'Carregador Decorado',
 price: 100.00,
 category: 'Decoração',
 description: 'Carregador decorado em crocê ',
 images: [
 	Carregador1 
 ],
 mainImage: Carregador1, 
 stock: 5,
 rating: 4.9,
 reviews: 12
 },
 {
 id: '4',
 name: 'Amigurumi (Calopsita)',
 price: 45.00,
 category: 'Amigurumis',
 description: 'Chaveiro calopsita, perfeito para você presentear.',
 images: [
 	Calopsita1, 
 	Calopsita2,
    Calopsita3 
   
 ],
   mainImage: Calopsita1, 
   stock: 50,
    rating: 4.7,
    reviews: 50
 },
 {
   id: '5',
   name: 'Bolsa de Crochê (Marrom)',
   price: 180.00,
   category: 'Bolsas',
   description: 'Uma linda bolsa feita à mão com Barbante.',
   images: [
   	BolsaMarrom1, 
 	BolsaMarrom2, 
 	BolsaMarrom3  
 ],
 	mainImage: BolsaMarrom1, 
 	stock: 8,
 	rating: 4.6,
 	reviews: 18
 },
 {
  id: '6',
  name: 'Amigurumi (Luffy - One Piece)',
  price: 180.00,
  category: 'Amigurumis',
  description: 'Amigurumi do Luffy.',
  images: [
  	Luffy1, 
	Luffy2  
 ],
 mainImage: Luffy1, 
 stock: 7,
 rating: 5.0,
 reviews: 10
 }
];

export const placeholderImage = placeholder;
export default products;