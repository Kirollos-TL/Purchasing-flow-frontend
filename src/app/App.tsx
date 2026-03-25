import { useState } from 'react';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import ConfigStyles from '../components/ConfigStyles';
import { ToastProvider } from '../context/ToastProvider';

const App = () => {
	const [currentPage, setCurrentPage] = useState<'cart' | 'checkout'>('cart');

	return (
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
	);
};

export default App;
