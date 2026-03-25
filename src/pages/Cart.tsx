import { useState } from 'react';
import { Trash2, LayoutGrid } from 'lucide-react';

import ConfirmModal from '../components/ConfirmModal';
import Header from '../components/Header';
import { useLanguage } from '../hooks/useLanguage';

interface Item {
  id: number;
  name: string;
  type: string;
  price: number;
}

const CartItem = ({ 
  item, 
  onRemoveRequest 
}: { 
  item: Item; 
  onRemoveRequest: (item: Item) => void;
}) => (
  <div className="flex flex-col md:grid md:grid-cols-[1.5fr_1fr_0.5fr] items-start md:items-center py-6 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-all duration-200 group gap-4 md:gap-0">
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
  const { t, dir } = useLanguage();
  const { title, labels } = t.cart;

  const [items, setItems] = useState<Item[]>(t.modules.map((m: { id: number, name: string, type: string, price: number }) => ({ 
    id: m.id, 
    name: m.name, 
    type: m.type, 
    price: m.price 
  })));

  const [confirmDelete, setConfirmDelete] = useState<{ isOpen: boolean; item?: Item }>({
    isOpen: false,
    item: undefined
  });



  const removeItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
    setConfirmDelete({ isOpen: false });
  };

  const total = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen bg-white font-inter" dir={dir}>
      <ConfirmModal 
        isOpen={confirmDelete.isOpen}
        title={confirmDelete.item?.name || ""}
        onClose={() => setConfirmDelete({ isOpen: false })}
        onConfirm={() => confirmDelete.item && removeItem(confirmDelete.item.id)}
        t={t.cart.confirmModal}
      />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 md:px-16 py-10 md:py-14">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-text mb-8 md:mb-10">{title}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 md:gap-10">
          {/* Cart Table Container */}
          <div className="h-full border border-border-gray rounded-2xl p-6 md:p-8 bg-white overflow-hidden shadow-sm">
            {/* Header - Hidden on Mobile */}
            <div className="hidden md:grid grid-cols-[1.5fr_1fr_0.5fr] pb-6 border-b border-gray-100 mb-6 text-lg font-medium text-secondary-text">
              <div>{labels.module}</div>
              <div>{labels.price}</div>
              <div className="text-center">{labels.action}</div>
            </div>
            
            <div className="divide-y divide-gray-100 overflow-y-auto custom-scrollbar pr-2 h-[400px]">
              {items.map((item, index) => (
                <CartItem 
                  key={`${item.id}-${index}`} 
                  item={item} 
                  onRemoveRequest={(item) => setConfirmDelete({ isOpen: true, item })}
                />
              ))}
              {items.length === 0 && (
                <div className="py-20 text-center text-words-gray text-xl">
                  {labels.emptyCart}
                </div>
              )}
            </div>
          </div>
          
          {/* Order Summary */}
          <aside className="w-full">
            <div className="h-full border border-border-gray rounded-2xl p-6 md:p-8 bg-white shadow-sm flex flex-col">
              <h2 className="text-xl font-bold text-primary-text mb-6 md:mb-8">{labels.orderSummary}</h2>
              
              <div className="space-y-4 mb-8 md:mb-10">
                <div className="flex justify-between items-start text-lg">
                  <span className="text-primary-text font-bold">{labels.license}:</span>
                  <span className="font-normal text-primary-text text-right">{labels.regular}</span>
                </div>
                
                <div className="flex justify-between items-start text-lg">
                  <span className="text-primary-text font-bold">{labels.support}:</span>
                  <span className="font-normal text-primary-text text-right">{labels.lifetime}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center py-6 mb-8 text-2xl font-bold border-t border-gray-100">
                <span>{labels.total}:</span>
                <span className="text-progress-gold">{total}$</span>
              </div>
              
              <div className="mt-auto space-y-4">
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
            </div>
          </aside>
        </div>
        
        {/* Recommended Modules */}
        <section className="mt-16 md:mt-20">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold text-primary-text">{labels.recommended}</h2>
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-progress-gold bg-cream-light border border-progress-gold/20 rounded-full">
              {labels.comingSoon}
            </span>
          </div>
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
