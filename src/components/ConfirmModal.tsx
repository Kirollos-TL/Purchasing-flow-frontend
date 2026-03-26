import { Trash2, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  t?: {
    title: string;
    message: string;
    fromCart: string;
    cancel: string;
    delete: string;
  };
}

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, t }: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-200 cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-[24px] sm:rounded-[32px] w-full max-w-[360px] p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col items-center text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Stylized Icon Box */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-6 sm:mb-7 flex items-center justify-center">
          {/* Decorative back box */}
          <div className="absolute inset-1.5 bg-white rounded-[12px] sm:rounded-[14px] -rotate-12 border-[2px] border-secondary-text opacity-30" />
          
          {/* Main cream box */}
          <div className="absolute inset-0.5 bg-cream rounded-[12px] sm:rounded-[14px] rotate-6 border-[3px] border-primary-text shadow-sm" />
          
          {/* Icon */}
          <div className="relative z-10 text-primary-text">
            <Trash2 size={32} sm-size={36} strokeWidth={2.5} className="w-8 h-8 sm:w-9 sm:h-9" />
          </div>
          
          {/* Status indicator */}
          <div className="absolute top-0 right-0 bg-[#FF3B3B] text-white p-1 sm:p-1.5 rounded-full border-[2.5px] border-white shadow-lg translate-x-1.5 -translate-y-1.5">
            <X size={10} sm-size={12} strokeWidth={4} className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          </div>
        </div>
        
        <h3 className="text-xl sm:text-2xl font-bold text-primary-text mb-3">{t?.title || "Delete module?"}</h3>
        <p className="text-sm sm:text-base text-secondary-text leading-relaxed mb-8">
          {t?.message || "Are you sure you want to remove"} <span className="font-bold text-primary-text italic underline decoration-progress-gold/30">{title}</span> {t?.fromCart || "from your cart?"}
        </p>
        
        <div className="w-full space-y-3">
          <button 
            onClick={onConfirm}
            className="w-full py-3 sm:py-3.5 px-6 rounded-xl sm:rounded-2xl font-bold text-white bg-button-gradient hover:opacity-90 transition-all cursor-pointer shadow-lg shadow-progress-gold/20 text-base sm:text-lg"
          >
            {t?.delete || "Delete Module"}
          </button>
          
          <button 
            onClick={onClose}
            className="w-full py-2 px-6 rounded-xl font-bold text-secondary-text hover:text-primary-text transition-colors cursor-pointer text-sm sm:text-base"
          >
            {t?.cancel || "No, Keep it"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
