// import { useState, useCallback, useEffect } from 'react';
// import { useToast } from '../context/ToastContext';
// import { getCookie } from '../utils/cookie';
// import Header from '../components/Header';
// import { useLanguage } from '../hooks/useLanguage';

// // Declaring global GeideaCheckout for TypeScript
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// declare const GeideaCheckout: any;

// interface CheckoutItemProps {
//   name: string;
//   type: string;
//   price: string;
//   description: string;
// }

// const CheckoutItem = ({ name, type, price, description }: CheckoutItemProps) => (
//   <div className="py-6 border-b border-gray-100 last:border-0">
//     <div className="flex justify-between items-start mb-1 gap-4">
//       <h3 className="text-lg font-bold text-primary-text line-clamp-1">{name}</h3>
//       <span className="text-lg font-bold text-progress-gold shrink-0">{price}$</span>
//     </div>
//     <p className="text-sm text-words-gray mb-1">{type}</p>
//     <p className="text-xs text-secondary-text leading-relaxed line-clamp-2">{description}</p>
//   </div>
// );

// const Checkout = ({ onEditCart }: { onEditCart: () => void }) => {
//   const { t, dir } = useLanguage();
//   const { title, sections, labels, errors } = t.checkout;
//   const { showToast } = useToast();

//   const [loading, setLoading] = useState(false);
//   const [pollingId, setPollingId] = useState<string | null>(null);

//   const items = t.modules.map((m: { name: string, type: string, price: number, description: string }) => ({
//     name: m.name,
//     type: m.type,
//     price: m.price.toString(),
//     description: m.description
//   }));

//   const total = items.reduce((acc: number, item: { price: string }) => acc + parseInt(item.price), 0);

//   // Poll effect - handles cleanup automatically
//   useEffect(() => {
//     if (!pollingId) return;

//     let attempts = 0;
//     const interval = setInterval(async () => {
//       try {
//         const resp = await fetch(`/api/orders/${pollingId}/`);
//         const order = await resp.json();
        
//         if (order.status === "FULFILLED") {
//           window.location.href = `/orders/${pollingId}/success/`;
//         } else if (order.status === "FAILED") {
//           window.location.href = `/orders/${pollingId}/failed/`;
//           setLoading(false);
//           setPollingId(null);
//         } else if (++attempts > 20) {
//           showToast(errors.emailCheck, 'info');
//           setLoading(false);
//           setPollingId(null);
//         }
//       } catch (error) {
//         console.error("Polling error:", error);
//       }
//     }, 2000);

//     return () => clearInterval(interval);
//   }, [pollingId, showToast, errors.emailCheck]);

//   const onSuccess = useCallback(() => {
//     const orderId = localStorage.getItem("pending_order_id");
//     if (orderId) setPollingId(orderId);
//   }, []);

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const onError = useCallback((data: any) => {
//     console.error("Payment error:", data.responseMessage);
//     setLoading(false);
//     showToast(`${errors.paymentError} ${data.responseMessage || errors.unknownError}`, 'error');
//   }, [showToast, errors]);

//   const onCancel = useCallback(() => {
//     console.log("Payment cancelled by user");
//     setLoading(false);
//   }, []);

//   const handleCheckout = async () => {
//     setLoading(true);
//     try {
//       const resp = await fetch("/api/checkout/", {
//           method: "POST",
//           headers: {
//               "Content-Type": "application/json",
//               "X-CSRFToken": getCookie("csrftoken") || "",
//           },
//           body: JSON.stringify({}),
//       });

//       if (!resp.ok) {
//           const err = await resp.json();
//           showToast(`${errors.checkoutError} ${err.error || errors.initSessionFail}`, 'error');
//           setLoading(false);
//           return;
//       }

//       const { order_id, session_id } = await resp.json();
//       localStorage.setItem("pending_order_id", order_id);

//       const payment = new GeideaCheckout(onSuccess, onError, onCancel);
//       payment.startPayment(session_id);
//     } catch (error) {
//       console.error("Checkout process error:", error);
//       showToast(errors.processError, 'error');
//       setLoading(false);
//     }
//   };


//   return (
//     <div className="min-h-screen bg-white font-inter" dir={dir}>
//       <Header />

//       <main className="max-w-[1400px] mx-auto px-6 md:px-16 py-10 md:py-14">
//         <h1 className="text-3xl md:text-4xl font-bold text-primary-text mb-10 md:mb-12 text-center md:text-left">{title}</h1>

//         <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-10 md:gap-20 items-stretch">
//           {/* Left Column - Forms */}
//           <div className="space-y-10 md:space-y-12">
//             {/* Account Info */}
//             <section>
//               <h2 className="text-xl font-bold text-primary-text mb-6">{sections.accountInfo}</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
//                 <input 
//                   type="text" 
//                   placeholder={labels.fullName} 
//                   className="w-full px-5 py-4 bg-white border border-border-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-progress-gold/20 transition-all"
//                 />
//                 <input 
//                   type="email" 
//                   placeholder={labels.email} 
//                   className="w-full px-5 py-4 bg-white border border-border-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-progress-gold/20 transition-all"
//                 />
//               </div>
//             </section>

//             {/* Payment Method */}
//             <section>
//               <h2 className="text-xl font-bold text-primary-text mb-6">{sections.paymentMethod}</h2>
//               <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 mb-8">
//                 <label className="flex items-center gap-3 cursor-pointer group">
//                   <div className="relative flex items-center justify-center">
//                     <input type="radio" name="payment" className="peer appearance-none w-5 h-5 border-2 border-border-gray rounded-full checked:border-primary-text transition-all" defaultChecked />
//                     <div className="absolute w-2.5 h-2.5 bg-primary-text rounded-full opacity-0 peer-checked:opacity-100 transition-all" />
//                   </div>
//                   <span className="font-medium text-primary-text">{labels.creditCard}</span>
//                 </label>
//                 <label className="flex items-center gap-3 cursor-pointer group">
//                   <div className="relative flex items-center justify-center">
//                     <input type="radio" name="payment" className="peer appearance-none w-5 h-5 border-2 border-border-gray rounded-full checked:border-primary-text transition-all" />
//                     <div className="absolute w-2.5 h-2.5 bg-primary-text rounded-full opacity-0 peer-checked:opacity-100 transition-all" />
//                   </div>
//                   <span className="font-medium text-primary-text">{labels.paypal}</span>
//                 </label>
//               </div>

//               <div className="space-y-4">
//                 <h3 className="text-sm font-bold text-primary-text">{sections.cardDetails}</h3>
//                 <input 
//                   type="text" 
//                   placeholder={labels.cardNumber} 
//                   className="w-full px-5 py-4 bg-white border border-border-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-progress-gold/20 transition-all"
//                 />
//                 <input 
//                   type="text" 
//                   placeholder={labels.cardholderName} 
//                   className="w-full px-5 py-4 bg-white border border-border-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-progress-gold/20 transition-all"
//                 />
//                 <div className="grid grid-cols-2 gap-4">
//                   <input 
//                     type="text" 
//                     placeholder={labels.expiryDate} 
//                     className="w-full px-5 py-4 bg-white border border-border-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-progress-gold/20 transition-all"
//                   />
//                   <input 
//                     type="text" 
//                     placeholder={labels.cvv} 
//                     className="w-full px-5 py-4 bg-white border border-border-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-progress-gold/20 transition-all"
//                   />
//                 </div>
//               </div>

//               <div className="mt-6 flex items-center gap-3">
//                  <p className="text-sm text-secondary-text">{labels.securityNote}</p>
//               </div>

//               <label className="mt-8 flex items-start gap-3 cursor-pointer group">
//                 <input type="checkbox" className="mt-1 w-5 h-5 border-2 border-border-gray rounded focus:ring-progress-gold/20 cursor-pointer" />
//                 <span className="text-sm text-secondary-text leading-relaxed">
//                   {labels.termsAgreement}
//                 </span>
//               </label>
//             </section>
//           </div>

//           {/* Right Column - Summary */}
//           <aside className="space-y-8 w-full">
//             {/* Your Modules */}
//             <div>
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-bold text-primary-text">{sections.yourModules}</h2>
//                 <button 
//                   onClick={onEditCart}
//                   className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-primary-text text-xs font-bold rounded-lg transition-colors cursor-pointer"
//                 >
//                   {labels.editCart}
//                 </button>
//               </div>
//               <div className="border border-border-gray rounded-2xl p-4 md:p-6 bg-white shadow-sm max-h-[300px] overflow-y-auto custom-scrollbar">
//                 <div className="divide-y divide-gray-100">
//                   {items.map((item: { name: string, type: string, price: string, description: string }, index: number) => (
//                     <CheckoutItem key={index} {...item} />
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Order Summary */}
//             <section>
//               <h2 className="text-xl font-bold text-primary-text mb-6">{sections.orderSummary}</h2>
//               <div className="border border-border-gray rounded-2xl p-6 md:p-8 bg-white shadow-sm overflow-hidden">
//                 <div className="space-y-3 mb-8">
//                   <div className="flex justify-between items-start text-lg">
//                     <span className="text-primary-text font-bold">{labels.license || "License"}:</span>
//                     <span className="font-normal text-primary-text text-right">{labels.regular || "Regular"}</span>
//                   </div>
//                   <div className="flex justify-between items-start text-lg">
//                     <span className="text-primary-text font-bold">{labels.support || "Access"}:</span>
//                     <span className="font-normal text-primary-text text-right">{labels.lifetime || "Lifetime"}</span>
//                   </div>
//                 </div>
                
//                 <div className="flex justify-between items-center py-6 mb-8 text-2xl font-bold border-t border-gray-100">
//                   <span>{labels.total}:</span>
//                   <span className="text-progress-gold">{total}$</span>
//                 </div>
                
//                 <button 
//                   onClick={handleCheckout}
//                   disabled={loading}
//                   className={`w-full py-4 px-6 rounded-xl font-bold text-white bg-button-gradient transition-all cursor-pointer shadow-lg shadow-progress-gold/20 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'}`}
//                 >
//                   {loading ? (
//                     <>
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                       {labels.processing}
//                     </>
//                   ) : labels.getAccess}
//                 </button>
//               </div>
//             </section>
//           </aside>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Checkout;
