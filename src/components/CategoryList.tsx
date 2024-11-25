import React from 'react';
import { Pizza, Coffee, Salad, IceCream, Beef } from 'lucide-react';

const CATEGORIES = [
  { id: 1, name: 'Pizza', icon: Pizza },
  { id: 2, name: 'Coffee', icon: Coffee },
  { id: 3, name: 'Salads', icon: Salad },
  { id: 4, name: 'Desserts', icon: IceCream },
  { id: 5, name: 'Burgers', icon: Beef },
];

export default function CategoryList() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
      {CATEGORIES.map(({ id, name, icon: Icon }) => (
        <button
          key={id}
          className="flex min-w-[100px] flex-col items-center gap-2 rounded-xl bg-gray-50 p-4 hover:bg-gray-100"
        >
          <Icon className="h-6 w-6 text-primary" />
          <span className="text-sm font-medium">{name}</span>
        </button>
      ))}
    </div>
  );
}