export interface Seller {
  id: number;
  name: string;
  avatarUrl: string;
  bio: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  description: string;
  sellerId: number;
}

export interface Category {
  id: number;
  name: string;
  imageUrl: string;
}

export interface Slide {
  id: number;
  imageUrl: string;
  title: string;
  subtitle: string;
  cta: string;
}