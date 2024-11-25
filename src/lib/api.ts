import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export interface Restaurant {
  id: number;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  minOrder: string;
  cuisine: string;
}

export interface MenuItem {
  id: number;
  restaurantId: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export const getRestaurants = async () => {
  const { data } = await api.get<Restaurant[]>('/restaurants');
  return data;
};

export const getRestaurant = async (id: number) => {
  const { data } = await api.get<Restaurant>(`/restaurants/${id}`);
  return data;
};

export const getMenuItems = async (restaurantId: number) => {
  const { data } = await api.get<MenuItem[]>(`/restaurants/${restaurantId}/menu`);
  return data;
};