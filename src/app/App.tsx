import { useState } from 'react';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import ConfigStyles from '../components/ConfigStyles';

const App = () => {
	const [currentPage, setCurrentPage] = useState<'cart' | 'checkout'>('cart');

	return (
		<main>
			<ConfigStyles />
			{currentPage === 'cart' ? (
				<Cart onProceedToCheckout={() => setCurrentPage('checkout')} />
			) : (
				<Checkout onEditCart={() => setCurrentPage('cart')} />
			)}
		</main>
	);
};

export default App;
