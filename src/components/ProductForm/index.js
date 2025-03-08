import React, { useState, useEffect } from 'react';
import './index.css';

function ProductForm({ onClose, product, onSubmit }) {
  const [productData, setProductData] = useState({
    productName: '',
    productDescription: '',
    price: '',
    storeName: '',
  });

  useEffect(() => {
    if (product) {
      setProductData(product);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: name === 'price' ? parseFloat(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(productData);
    onClose();
  };

  return (
    <form className="product-form-container" onSubmit={handleSubmit}>
      <input type="text" name="productName" value={productData.productName} onChange={handleChange} placeholder="Product Name" required />
      <input type="text" name="productDescription" value={productData.productDescription} onChange={handleChange} placeholder="Description" required />
      <input type="number" name="price" value={productData.price} onChange={handleChange} placeholder="Price" required />
      <select name="storeName" value={productData.storeName} onChange={handleChange} required>
        <option value="">Select Store</option>
        <option value="Electronics Emporium">Electronics Emporium</option>
        <option value="Fashion Hub">Fashion Hub</option>
        <option value="Grocery Market">Grocery Market</option>
        <option value="Book Nook">Book Nook</option>
        <option value="Sports World">Sports World</option>
        <option value="Pet Paradise">Pet Paradise</option>
        <option value="Garden Supply">Garden Supply</option>
      </select>
      <button type="submit">{product ? 'Update' : 'Add'} Product</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
}

export default ProductForm;
