import React from 'react';
import './index.css';

function ProductDetail({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="product-detail-container">
      <h3>Product Details</h3>
      <p>Product Name: {product.productName}</p>
      <p>Description: {product.productDescription}</p>
      <p>Price: ₹{product.price}</p>
      <p>Store: {product.storeName}</p>
      <button onClick={(e) => { e.stopPropagation(); onClose(); }}>Close</button>

    </div>
  );
}

export default ProductDetail;