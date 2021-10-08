import { useState, useEffect } from 'react';
import { getStoredCart } from '../resources/utilities/fakeDb';

const useCart = (products) => {
	const [cart, setCart] = useState([]);

	useEffect(() => {
		if (products.length) {
			const savedCart = getStoredCart();
			const storedCart = [];

			for (const key in savedCart) {
				const addedProducts = products.find((product) => product.key === key);

				if (addedProducts) {
					// set quantity
					const quantity = savedCart[key];
					addedProducts.quantity = quantity;
					storedCart.push(addedProducts);
				}
			}

			setCart(storedCart);
		}
	}, [products]);
	// return cart
	return [cart, setCart];
};

export default useCart;