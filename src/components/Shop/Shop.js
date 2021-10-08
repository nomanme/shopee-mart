import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { addToDb, getStoredCart } from '../../resources/utilities/fakeDb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);
	const [displayProducts, setDisplayProducts] = useState([]);

	// data load from fakeData
	useEffect(() => {
		const url = `./products.json`;
		try {
			const fetchData = async () => {
				const res = await fetch(url);
				const data = await res.json();
				// console.log(data);
				setProducts(data);
				setDisplayProducts(data);
			};
			fetchData();
		} catch (error) {
			console.log(error);
		}
	}, []);

	// saved cart price data laod
	useEffect(() => {
		const savedCart = getStoredCart();
		const storedCart = [];
		// console.log(savedCart);
		if (products.length) {
			for (const key in savedCart) {
				// console.log(key);
				// console.log(products);
				// console.log(key, savedCart[key]);
				const addedProducts = products.find((pd) => pd.key === key);
				// console.log(addedProducts);
				if (addedProducts) {
					const quantity = savedCart[key];
					addedProducts.quantity = quantity;
					storedCart.push(addedProducts);
				}
			}
			setCart(storedCart);
		}
	}, [products]);

	// handleAddToCart
	const handleAddToCart = (product) => {
		// console.log('add', product);
		const newCart = [...cart, product];
		setCart(newCart);
		// set data localstorage
		addToDb(product.key);
	};

	// handleSearch
	const handleSearch = (event) => {
		console.log(event.target.value);
		const searchText = event.target.value;
		const matchedProducts = products.filter((pd) => pd.name.toLowerCase().includes(searchText.toLowerCase()));
		console.log(matchedProducts.length);
		setDisplayProducts(matchedProducts);
	};

	return (
		<>
			<section>
				<div className="searchContainer">
					<input onChange={handleSearch} type="text" name="" id="" placeholder="search product" />
				</div>
			</section>
			<section className="shopContainer">
				<div className="productContainer">
					<h3>Products: {products.length} </h3>
					{displayProducts.map((product) => {
						// console.log(product);
						const { key } = product;
						return <Product key={key} product={product} handleAddToCart={handleAddToCart} />;
					})}
				</div>
				<div className="cart-container">
					<Cart cart={cart}>
						<Link to="/review">
							<Button variant="outline-warning" size="md-lg">
								Review your Order
							</Button>
						</Link>
					</Cart>
				</div>
			</section>
		</>
	);
};

export default Shop;
