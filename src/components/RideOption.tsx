import React from 'react';
import { Car, Clock } from 'lucide-react';

interface RideOptionProps {
  type: string;
  price: string;
  time: string;
  selected: boolean;
  onClick: () => void;
}

export default function RideOption({ type, price, time, selected, onClick }: RideOptionProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-lg p-4 transition-all ${
        selected
          ? 'bg-black text-white'
          : 'bg-white text-black hover:bg-gray-50'
      } flex items-center justify-between border border-gray-200`}
    >
      <div className="flex items-center gap-4">
        <Car className={`h-8 w-8 ${selected ? 'text-white' : 'text-gray-600'}`} />
        <div className="text-left">
          <p className="font-medium">{type}</p>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4" />
            <span>{time}</span>
          </div>
        </div>
      </div>
      <span className="text-lg font-semibold">{price}</span>
    </button>
  );
}