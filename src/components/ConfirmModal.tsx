import { Trash2 } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

const ConfirmModal = ({ isOpen, onClose, onConfirm, title }: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="bg-red-50 text-red-600 p-4 rounded-2xl w-fit mb-6">
          <Trash2 size={32} />
        </div>
        
        <h3 className="text-2xl font-extrabold text-primary-text mb-2">Delete module?</h3>
        <p className="text-words-gray mb-8">
          Are you sure you want to remove <span className="font-bold text-primary-text">{title}</span> from your cart?
        </p>
        
        <div className="flex gap-4">
          <button 
            onClick={onClose}
            className="flex-1 py-4 px-6 rounded-xl font-bold text-primary-text bg-bg-gray hover:bg-gray-300 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 py-4 px-6 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
