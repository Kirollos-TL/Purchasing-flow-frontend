import { useState, useCallback, useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import { getCookie } from '../utils/cookie';
import { useLanguage } from '../hooks/useLanguage';

// Declaring global GeideaCheckout for TypeScript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const GeideaCheckout: any;

interface CheckoutItemProps {
  name: string;
  type: string;
  price: string;
  description: string;
}

const CheckoutItem = ({ name, type, price, description }: CheckoutItemProps) => (
  <div className="py-4 sm:py-5 border-b border-gray-100 last:border-0">
    <h3 className="text-lg sm:text-xl font-bold text-primary-text mb-1">{name}</h3>
    <p className="text-xs sm:text-sm text-secondary-text mb-0.5">{type}</p>
    <p className="text-[10px] sm:text-xs text-secondary-text leading-tight mb-2">{description}</p>
    <div className="text-base sm:text-lg font-bold text-progress-gold">{price}$</div>
  </div>
);

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEditCart: () => void;
}

const CheckoutModal = ({ isOpen, onClose, onEditCart }: CheckoutModalProps) => {
  const { t, dir } = useLanguage();
  const { title, sections, labels, errors } = t.checkout;
  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [pollingId, setPollingId] = useState<string | null>(null);

  const items = t.modules.map((m: { name: string, type: string, price: number, description: string }) => ({
    name: m.name,
    type: m.type,
    price: m.price.toString(),
    description: m.description,
  }));

  const total = items.reduce((acc: number, item: { price: string }) => acc + parseInt(item.price), 0);

  // Poll effect
  useEffect(() => {
    if (!pollingId) return;

    let attempts = 0;
    const interval = setInterval(async () => {
      try {
        const resp = await fetch(`/api/orders/${pollingId}/`);
        const order = await resp.json();
        
        if (order.status === "FULFILLED") {
          window.location.href = `/orders/${pollingId}/success/`;
        } else if (order.status === "FAILED") {
          window.location.href = `/orders/${pollingId}/failed/`;
          setLoading(false);
          setPollingId(null);
        } else if (++attempts > 20) {
          showToast(errors.emailCheck, 'info');
          setLoading(false);
          setPollingId(null);
        }
      } catch (error) {
        console.error("Polling error:", error);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [pollingId, showToast, errors.emailCheck]);

  const onSuccess = useCallback(() => {
    const orderId = localStorage.getItem("pending_order_id");
    if (orderId) setPollingId(orderId);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = useCallback((data: any) => {
    console.error("Payment error:", data.responseMessage);
    setLoading(false);
    showToast(`${errors.paymentError} ${data.responseMessage || errors.unknownError}`, 'error');
  }, [showToast, errors]);

  const onCancel = useCallback(() => {
    setLoading(false);
  }, []);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const resp = await fetch("/api/checkout/", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": getCookie("csrftoken") || "",
          },
          body: JSON.stringify({}),
      });

      if (!resp.ok) {
          const err = await resp.json();
          showToast(`${errors.checkoutError} ${err.error || errors.initSessionFail}`, 'error');
          setLoading(false);
          return;
      }

      const { order_id, session_id } = await resp.json();
      localStorage.setItem("pending_order_id", order_id);

      const payment = new GeideaCheckout(onSuccess, onError, onCancel);
      payment.startPayment(session_id);
    } catch (error) {
      console.error("Checkout process error:", error);
      showToast(errors.processError, 'error');
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-200 cursor-pointer" 
      dir={dir}
      onClick={onClose}
    >
      <div 
        className="bg-cream rounded-[20px] sm:rounded-[24px] w-full max-w-[480px] p-4 sm:p-6 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[95vh] sm:max-h-[90vh] flex flex-col items-stretch overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-3 sm:mb-4 px-1">
          <h2 className="text-xl sm:text-2xl font-bold text-primary-text">{title}</h2>
          <button 
            onClick={onEditCart}
            className="px-2.5 py-1 sm:px-3 sm:py-1 bg-white text-primary-text text-[10px] sm:text-[11px] font-bold rounded-lg border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
          >
            {labels.editCart}
          </button>
        </div>

        <div className="flex-1 px-1 overflow-y-auto sm:overflow-visible">
          {/* Modules List */}
          <div className="bg-white rounded-[14px] sm:rounded-[16px] p-4 sm:p-5 mb-4 sm:mb-6 border border-gray-100 shadow-sm max-h-[250px] sm:max-h-[300px] overflow-y-auto custom-scrollbar">
            <div className="divide-y divide-gray-100">
              {items.map((item: { name: string, type: string, price: string, description: string }, index: number) => (
                <CheckoutItem key={index} {...item} />
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <h2 className="text-lg sm:text-xl font-bold text-primary-text mb-3 sm:mb-4 px-1">{sections.orderSummary}</h2>
          <div className="bg-white rounded-[14px] sm:rounded-[16px] p-5 sm:p-6 border border-gray-100 shadow-sm mb-2">
            <div className="space-y-1 mb-4 sm:mb-6">
              <div className="flex justify-between items-center text-base sm:text-lg">
                <span className="text-primary-text font-bold">{labels.license}:</span>
                <span className="font-normal text-black text-right">{labels.regular}</span>
              </div>
              <div className="flex justify-between items-center text-base sm:text-lg">
                <span className="text-primary-text font-bold">{labels.support}:</span>
                <span className="font-normal text-black text-right">{labels.lifetime}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-4 sm:mb-6 pt-3 sm:pt-4">
              <span className="text-xl sm:text-2xl font-bold text-primary-text">{labels.total}:</span>
              <span className="text-2xl sm:text-3xl font-bold text-progress-gold">{total}$</span>
            </div>
            
            <button 
              onClick={handleCheckout}
              disabled={loading}
              className={`w-full py-3 sm:py-3.5 px-6 rounded-xl font-bold text-white bg-button-gradient transition-all cursor-pointer shadow-lg shadow-progress-gold/20 flex items-center justify-center gap-2 ${loading ? 'opacity-70' : 'hover:opacity-90'}`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : labels.getAccess}
            </button>
          </div>
        </div>

        {/* Close button for accessibility */}
        <button 
          onClick={onClose}
          className="mt-3 sm:mt-4 text-center text-secondary-text hover:text-primary-text font-medium text-xs sm:text-sm cursor-pointer"
        >
          {t.cart.confirmModal.cancel}
        </button>
      </div>
    </div>
  );
};

export default CheckoutModal;
