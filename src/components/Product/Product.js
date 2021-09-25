import React from 'react';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import Rating from 'react-rating';
import './Product.css';

const Product = (props) => {
	// console.log(props.product);
	const { product } = props;
	const { name, price, stock, seller, img, star } = props.product;
	const { handleAddToCart } = props;
	const cartIcon = <FontAwesomeIcon icon={faShoppingCart} />;

	return (
		<section className="product">
			<div>
				<img src={img} alt="" />
			</div>
			<div className="productName">
				<h5>{name}</h5>
				<p>
					<small>by: {seller}</small>
				</p>
				<p>Price: {price}</p>
				<p>
					<small>only {stock} left in stock - order soon</small>
				</p>
				<p>
					<small>only {stock} left in stock - order soon</small>
				</p>
				<Rating initialRating={star} readonly emptySymbol="far fa-star icon-color" fullSymbol="fas fa-star icon-color"></Rating>
				<br />
				<Button onClick={() => handleAddToCart(product)} variant="outline-warning" size="md-lg">
					{cartIcon} add to cart
				</Button>
			</div>
		</section>
	);
};

export default Product;
