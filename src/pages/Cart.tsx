import { useState } from 'react';
import { Trash2, Minus, Plus, LayoutGrid } from 'lucide-react';
import { CART_CONFIG } from '../config/app-config';
import ConfirmModal from '../components/ConfirmModal';
import Header from '../components/Header';

interface Item {
  id: number;
  name: string;
  type: string;
  price: number;
  quantity: number;
}

const CartItem = ({ 
  item, 
  onUpdateQuantity, 
  onRemoveRequest 
}: { 
  item: Item; 
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemoveRequest: (item: Item) => void;
}) => (
  <div className="flex flex-col md:grid md:grid-cols-[1.5fr_1fr_1fr_0.5fr] items-start md:items-center py-6 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-all duration-200 group gap-4 md:gap-0">
    {/* Product Info */}
    <div className="flex items-center gap-4 w-full">
      <div className="bg-cream-light p-3 rounded-lg flex items-center justify-center shrink-0">
        <LayoutGrid size={24} className="text-progress-gold" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-primary-text line-clamp-1">{item.name}</h3>
        <p className="text-sm text-words-gray">{item.type}</p>
      </div>
    </div>
    
    {/* Quantity Selector */}
    <div className="flex items-center justify-between w-full md:w-fit md:block">
      <span className="md:hidden text-sm text-words-gray">Quantity</span>
      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1">
        <button 
          onClick={() => onUpdateQuantity(item.id, -1)}
          className="px-3 py-1 text-primary-text hover:bg-gray-200 rounded-md transition-colors cursor-pointer"
        >
          <Minus size={14} />
        </button>
        <span className="px-4 font-bold text-primary-text min-w-[40px] text-center">{item.quantity}</span>
        <button 
          onClick={() => onUpdateQuantity(item.id, 1)}
          className="px-3 py-1 text-primary-text hover:bg-gray-200 rounded-md transition-colors cursor-pointer"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
    
    {/* Price & Action */}
    <div className="flex items-center justify-between w-full md:contents">
      <div className="md:contents">
        <span className="md:hidden text-sm text-words-gray">Price</span>
        <div className="text-xl font-bold text-primary-text">{item.price}$</div>
      </div>
      
      <div className="flex justify-center">
        <button 
          onClick={() => onRemoveRequest(item)}
          className="text-secondary-text hover:text-red-500 transition-colors cursor-pointer p-2 rounded-lg hover:bg-red-50"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  </div>
);

const Cart = ({ onProceedToCheckout }: { onProceedToCheckout: () => void }) => {
  const { title, labels } = CART_CONFIG;

  const [items, setItems] = useState<Item[]>([
    { id: 1, name: 'Face AUTH', type: 'Backend', price: 25, quantity: 2 },
    { id: 2, name: 'Face AUTH', type: 'Backend', price: 25, quantity: 1 },
    { id: 3, name: 'Face AUTH', type: 'Backend', price: 25, quantity: 1 },
  ]);

  const [confirmDelete, setConfirmDelete] = useState<{ isOpen: boolean; item?: Item }>({
    isOpen: false,
    item: undefined
  });

  const updateQuantity = (id: number, delta: number) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
    setConfirmDelete({ isOpen: false });
  };

  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-white font-inter">
      <ConfirmModal 
        isOpen={confirmDelete.isOpen}
        title={confirmDelete.item?.name || ""}
        onClose={() => setConfirmDelete({ isOpen: false })}
        onConfirm={() => confirmDelete.item && removeItem(confirmDelete.item.id)}
      />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 md:px-16 py-10 md:py-14">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-text mb-8 md:mb-10">{title}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 md:gap-10 items-start">
          {/* Cart Table Container */}
          <div className="border border-border-gray rounded-2xl p-6 md:p-8 bg-white overflow-hidden shadow-sm">
            {/* Header - Hidden on Mobile */}
            <div className="hidden md:grid grid-cols-[1.5fr_1fr_1fr_0.5fr] pb-6 border-b border-gray-100 mb-6 text-lg font-medium text-secondary-text">
              <div>{labels.module}</div>
              <div>{labels.quantity}</div>
              <div>{labels.price}</div>
              <div className="text-center">{labels.action}</div>
            </div>
            
            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <CartItem 
                  key={item.id} 
                  item={item} 
                  onUpdateQuantity={updateQuantity}
                  onRemoveRequest={(item) => setConfirmDelete({ isOpen: true, item })}
                />
              ))}
              {items.length === 0 && (
                <div className="py-20 text-center text-words-gray text-xl">
                  Your cart is empty
                </div>
              )}
            </div>
          </div>
          
          {/* Order Summary */}
          <aside className="w-full">
            <div className="border border-border-gray rounded-2xl p-6 md:p-8 bg-white shadow-sm sticky top-8">
              <h2 className="text-xl font-bold text-primary-text mb-6 md:mb-8">{labels.orderSummary}</h2>
              
              <div className="space-y-4 mb-8 md:mb-10">
                <div className="flex justify-between items-start text-sm">
                  <span className="text-secondary-text">{labels.license}</span>
                  <span className="font-bold text-primary-text text-right max-w-[160px]">Regular</span>
                </div>
                
                <div className="flex justify-between items-start text-sm">
                  <span className="text-secondary-text">{labels.support}</span>
                  <span className="font-bold text-primary-text text-right max-w-[160px]">Lifetime Access</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center py-6 mb-8 text-2xl font-bold border-t border-gray-100">
                <span>{labels.total}</span>
                <span className="text-progress-gold">{total}$</span>
              </div>
              
              <button 
                onClick={onProceedToCheckout}
                className="w-full py-4 px-6 rounded-xl font-bold text-white bg-button-gradient hover:opacity-90 transition-opacity cursor-pointer mb-4 shadow-lg shadow-progress-gold/20"
              >
                {labels.checkout}
              </button>
              
              <button className="w-full py-4 px-6 rounded-xl font-bold text-primary-text bg-bg-gray hover:bg-gray-300 transition-colors cursor-pointer">
                {labels.keepBrowsing}
              </button>
            </div>
          </aside>
        </div>
        
        {/* Recommended Modules */}
        <section className="mt-16 md:mt-20">
          <h2 className="text-2xl font-bold text-primary-text mb-8">{labels.recommended}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="h-64 border border-border-gray rounded-2xl bg-white transition-shadow hover:shadow-md cursor-pointer"></div>
            <div className="h-64 border border-border-gray rounded-2xl bg-white transition-shadow hover:shadow-md cursor-pointer"></div>
            <div className="h-64 hidden sm:block border border-border-gray rounded-2xl bg-white transition-shadow hover:shadow-md cursor-pointer"></div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Cart;
