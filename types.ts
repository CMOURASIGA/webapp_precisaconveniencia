
export interface User {
  id: string;
  name: string;
  points: number;
  checkInCount: number;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  rewardPoints: number;
  type: 'extra' | 'discount' | 'product';
  active: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'bebidas' | 'snacks' | 'essenciais' | 'congelados';
  imageUrl: string;
  inStock: boolean;
}

export interface Interaction {
  id: string;
  userId: string;
  type: 'check-in' | 'purchase' | 'reward';
  pointsChange: number;
  date: string;
  location: string;
}

export interface AnalyticsData {
  checkInsPerUnit: { name: string; value: number }[];
  hourlyActivity: { hour: string; count: number }[];
  conversionRate: number;
  topProducts: { name: string; count: number }[];
}

export enum AppRoute {
  HOME = '/',
  CAMPAIGNS = '/campanhas',
  PRODUCTS = '/produtos',
  PROFILE = '/perfil',
  DASHBOARD = '/dashboard'
}
