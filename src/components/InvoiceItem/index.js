import React from 'react';
import './index.css';

function InvoiceItem({ item }) {
  return (
    <li className="invoice-item">
      {item.productName} - Quantity: {item.quantity}, Price: ₹{item.dealPrice}, Total: ₹{item.itemTotal}
    </li>
  );
}

export default InvoiceItem;