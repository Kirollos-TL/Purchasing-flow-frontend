import { useState } from 'react';
import Cart from '../pages/Cart';
import ConfigStyles from '../components/ConfigStyles';
import CheckoutModal from '../components/CheckoutModal';
import { ToastProvider } from '../context/ToastProvider';
import { LanguageProvider } from '../context/LanguageProvider';

const App = () => {
	const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

	return (
		<LanguageProvider>
			<ToastProvider>
				<main>
					<ConfigStyles />
					<Cart onProceedToCheckout={() => setIsCheckoutOpen(true)} />
					<CheckoutModal 
						isOpen={isCheckoutOpen} 
						onClose={() => setIsCheckoutOpen(false)}
						onEditCart={() => setIsCheckoutOpen(false)}
					/>
				</main>
			</ToastProvider>
		</LanguageProvider>
	);
};

export default App;
