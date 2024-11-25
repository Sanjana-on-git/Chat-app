import React from 'react';
import { Plus } from 'lucide-react';

interface FoodCardProps {
  name: string;
  description: string;
  price: string;
  image: string;
  onAddToCart: () => void;
}

export default function FoodCard({
  name,
  description,
  price,
  image,
  onAddToCart,
}: FoodCardProps) {
  return (
    <div className="relative rounded-xl bg-white p-4 shadow-md">
      <div className="flex gap-4">
        <img
          src={image}
          alt={name}
          className="h-24 w-24 rounded-lg object-cover"
        />
        
        <div className="flex-1">
          <h3 className="font-semibold">{name}</h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{description}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-lg font-semibold">{price}</span>
            <button
              onClick={onAddToCart}
              className="rounded-full bg-primary p-2 text-white hover:bg-primary/90"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}