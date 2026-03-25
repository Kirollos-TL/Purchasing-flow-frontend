import { useState } from 'react';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import ConfigStyles from '../components/ConfigStyles';
import { ToastProvider } from '../context/ToastProvider';
import { LanguageProvider } from '../context/LanguageProvider';

const App = () => {
	const [currentPage, setCurrentPage] = useState<'cart' | 'checkout'>('cart');

	return (
		<LanguageProvider>
			<ToastProvider>
				<main>
					<ConfigStyles />
					{currentPage === 'cart' ? (
						<Cart onProceedToCheckout={() => setCurrentPage('checkout')} />
					) : (
						<Checkout onEditCart={() => setCurrentPage('cart')} />
					)}
				</main>
			</ToastProvider>
		</LanguageProvider>
	);
};

export default App;
