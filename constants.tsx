
export const COLORS = {
  primary: '#F2B705', // Yellow
  black: '#000000',
  white: '#FFFFFF',
  neutral: '#F2F2F2',
  gray: '#9CA3AF'
};

export const LOGO_URL = 'https://imgur.com/py9Sh8S.png';

export const MOCK_USER = {
  id: 'u1',
  name: 'João Silva',
  points: 450,
  checkInCount: 12
};

export const MOCK_CAMPAIGNS = [
  {
    id: 'c1',
    title: 'Passe na Precisa hoje!',
    description: 'Check-in após as 18h garante 50 pontos extras.',
    rewardPoints: 50,
    type: 'extra',
    active: true
  },
  {
    id: 'c2',
    title: 'Clube do Café',
    description: '5 compras de café = 1 pão de queijo grátis.',
    rewardPoints: 100,
    type: 'product',
    active: true
  },
  {
    id: 'c3',
    title: 'Sexta do Snack',
    description: 'Desconto de 20% em salgadinhos selecionados.',
    rewardPoints: 20,
    type: 'discount',
    active: false
  }
];

export const MOCK_PRODUCTS = [
  { 
    id: 'p1', 
    name: 'Refrigerante Lata 350ml', 
    price: 5.50, 
    category: 'bebidas', 
    imageUrl: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&q=80&w=400', 
    inStock: true 
  },
  { 
    id: 'p2', 
    name: 'Batata Chips Original', 
    price: 14.90, 
    category: 'snacks', 
    imageUrl: 'https://images.unsplash.com/photo-1613919113640-25732ec5e61f?auto=format&fit=crop&q=80&w=400', 
    inStock: true 
  },
  { 
    id: 'p3', 
    name: 'Cerveja Long Neck', 
    price: 8.50, 
    category: 'bebidas', 
    imageUrl: 'https://images.unsplash.com/photo-1623945227418-2d3f0f64472f?auto=format&fit=crop&q=80&w=400', 
    inStock: true 
  },
  { 
    id: 'p4', 
    name: 'Papel Higiênico (4 rolos)', 
    price: 12.00, 
    category: 'essenciais', 
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400', 
    inStock: true 
  },
  { 
    id: 'p5', 
    name: 'Chocolate ao Leite 100g', 
    price: 18.00, 
    category: 'snacks', 
    imageUrl: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&q=80&w=400', 
    inStock: true 
  },
  { 
    id: 'p6', 
    name: 'Sorvete Premium 473ml', 
    price: 39.90, 
    category: 'congelados', 
    imageUrl: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&q=80&w=400', 
    inStock: false 
  },
  { 
    id: 'p7', 
    name: 'Energético 473ml', 
    price: 10.90, 
    category: 'bebidas', 
    imageUrl: 'https://images.unsplash.com/photo-1543253687-c931c8e01820?auto=format&fit=crop&q=80&w=400', 
    inStock: true 
  },
  { 
    id: 'p8', 
    name: 'Sabonete Hidratante', 
    price: 4.50, 
    category: 'essenciais', 
    imageUrl: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&q=80&w=400', 
    inStock: true 
  },
];
