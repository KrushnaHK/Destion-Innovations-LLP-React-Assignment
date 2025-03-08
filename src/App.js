import { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import InvoiceList from './components/InvoiceList';
import ProductList from './components/ProductList';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

import './App.css';

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/login" element={<LoginForm />} />

        {/* Use ProtectedRoute with element and nested routes */}
        <Route
          path="/"
          element={<ProtectedRoute />}
        >
          <Route index element={<Home />} /> {/* Home is the default route */}
          <Route path="invoices" element={<InvoiceList />} />
          <Route path="products" element={<ProductList />} />
        </Route>

        {/* Redirect any unmatched route to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }
}

export default App;