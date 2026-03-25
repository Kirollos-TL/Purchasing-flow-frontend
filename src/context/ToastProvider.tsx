import React, { useState, useCallback, type ReactNode } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { ToastContext, type Toast, type ToastType } from './ToastContext';

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: number) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
  return (
    <div
      className={`
        flex items-center gap-3 p-4 rounded-xl shadow-lg border animate-slide-in
        ${toast.type === 'success' ? 'bg-green-50 border-green-100 text-green-800' : ''}
        ${toast.type === 'error' ? 'bg-red-50 border-red-100 text-red-800' : ''}
        ${toast.type === 'info' ? 'bg-blue-50 border-blue-100 text-blue-800' : ''}
      `}
    >
      <div className="shrink-0">
        {toast.type === 'success' && <CheckCircle size={20} className="text-green-500" />}
        {toast.type === 'error' && <AlertCircle size={20} className="text-red-500" />}
        {toast.type === 'info' && <Info size={20} className="text-blue-500" />}
      </div>
      <p className="text-sm font-medium flex-1">{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="p-1 hover:bg-black/5 rounded-full transition-colors cursor-pointer"
        aria-label="Close"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-md w-full sm:w-auto">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

