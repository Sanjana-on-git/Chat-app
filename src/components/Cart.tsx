import React from 'react';
import { ShoppingBag, Minus, Plus, X } from 'lucide-react';
import { useCartStore } from '../store/cart';
import toast from 'react-hot-toast';

export default function Cart() {
  const { items, total, updateQuantity, removeItem, clearCart } = useCartStore();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleCheckout = () => {
    toast.success('Order placed successfully!');
    clearCart();
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative"
      >
        <ShoppingBag className="h-6 w-6 text-gray-600" />
        {items.length > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
            {items.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative h-[80vh] w-full max-w-lg rounded-lg bg-white p-6">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>

            <h2 className="text-xl font-bold">Your Cart</h2>

            {items.length === 0 ? (
              <p className="mt-4 text-gray-500">Your cart is empty</p>
            ) : (
              <>
                <div className="mt-6 flex-1 space-y-4 overflow-auto">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 rounded-lg bg-gray-50 p-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity === 1}
                          className="rounded-full bg-gray-200 p-1 text-gray-600 hover:bg-gray-300 disabled:opacity-50"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="rounded-full bg-gray-200 p-1 text-gray-600 hover:bg-gray-300"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t pt-4">
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="mt-4 w-full rounded-lg bg-primary py-3 font-medium text-white hover:bg-primary/90"
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}