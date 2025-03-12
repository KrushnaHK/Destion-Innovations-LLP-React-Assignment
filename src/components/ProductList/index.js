import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header';
import ProductForm from '../ProductForm';
import ProductDetail from '../ProductDetail';
import './index.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [filterStore, setFilterStore] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://destion-innovations-llp-assignment-1.onrender.com/products');
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const handleAddOrUpdate = async (updatedProduct) => {
    try {
      if (updatedProduct.id) {
        // Update existing product
        const response = await axios.put(`https://destion-innovations-llp-assignment-1.onrender.com/products/${updatedProduct.id}`, updatedProduct);
        setProducts(products.map(p => (p.id === updatedProduct.id ? response.data : p)));
      } else {
        // Add new product (ensure productId is assigned)
        const newProduct = { 
          ...updatedProduct, 
          productId: products.length ? Math.max(...products.map(p => p.productId || 0)) + 1 : 1 
        };
        const response = await axios.post('https://destion-innovations-llp-assignment-1.onrender.com/products', newProduct);
        setProducts([...products, response.data]); // Store product with correct productId
      }
    } catch (err) {
      console.error('Error adding/updating product:', err);
    }
    setShowProductForm(false);
  };
  
  

  const handleEdit = (product) => {
    setProductToEdit(product);
    setShowProductForm(true);
  };

  const handleDelete = async (productId) => {
  try {
    const productToDelete = products.find(p => p.productId === productId || p.id === productId);
    if (!productToDelete) {
      console.error("Product not found for deletion");
      return;
    }

    await axios.delete(`https://destion-innovations-llp-assignment-1.onrender.com/products/${productToDelete.id}`);
    setProducts(products.filter(product => product.id !== productToDelete.id));
    console.log(`Product with ID: ${productId} deleted.`);
  } catch (err) {
    console.error('Error deleting product:', err);
  }
};

  
  const filteredProducts = products.filter(product =>
    (filterStore ? product.storeName === filterStore : true) &&
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Header />
      <div className="product-list-container">
        <h2>Product List</h2>
        <select value={filterStore} onChange={(e) => setFilterStore(e.target.value)}>
          <option value="">All Stores</option>
          <option value="Electronics Emporium">Electronics Emporium</option>
          <option value="Fashion Hub">Fashion Hub</option>
          <option value="Grocery Market">Grocery Market</option>
          <option value="Book Nook">Book Nook</option>
          <option value="Sports World">Sports World</option>
          <option value="Pet Paradise">Pet Paradise</option>
          <option value="Garden Supply">Garden Supply</option>
        </select>
        <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button onClick={() => { setShowProductForm(true); setProductToEdit(null); }}>Add Product</button>
        {showProductForm && <ProductForm onClose={() => setShowProductForm(false)} product={productToEdit} onSubmit={handleAddOrUpdate} />}
        <ul className="product-list">
          {filteredProducts.map(product => (
            <li key={product.productId} onClick={() => setSelectedProductId(product.productId)}>
              {product.productName} - ₹{product.price}
              <div className="product-list-buttons">
                <button className='edit-button' onClick={(e) => { e.stopPropagation(); handleEdit(product); }}>Edit</button>
                <button className='delete-button' onClick={(e) => { e.stopPropagation(); handleDelete(product.productId); }}>Delete</button>
              </div>
              {selectedProductId === product.productId && (
                <ProductDetail product={product} onClose={() => setSelectedProductId(null)} />
              )}
            </li>
          ))}
      </ul>
      </div>
    </div>
  );
}

export default ProductList;