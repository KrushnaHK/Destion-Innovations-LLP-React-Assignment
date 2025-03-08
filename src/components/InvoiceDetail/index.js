// src/components/InvoiceDetail.js
import React from 'react';
import jsPDF from 'jspdf';
import './index.css';

function InvoiceDetail({ invoice, onClose }) {
  if (!invoice) return null;

  const calculateTotals = () => {
    let subtotal = 0;
    invoice.items.forEach((item) => {
      subtotal += item.itemTotal;
    });

    const taxRate = 0.10; // 10% tax (adjust as needed)
    const taxAmount = subtotal * taxRate;
    const grandTotal = subtotal + taxAmount;

    return { subtotal, taxAmount, grandTotal };
  };

  const { subtotal, taxAmount, grandTotal } = calculateTotals();

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`Invoice Details - Order #${invoice.orderId}`, 10, 10);
    doc.text(`Store: ${invoice.storeName}`, 10, 20);
    doc.text(`Date: ${invoice.date}`, 10, 30);
    doc.text('Items:', 10, 40);

    let y = 50;
    invoice.items.forEach((item) => {
      doc.text(
        `${item.productName} - Quantity: ${item.quantity} - Total: $${item.itemTotal}`,
        15,
        y
      );
      y += 10;
    });

    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 10, y + 10);
    doc.text(`Tax (10%): $${taxAmount.toFixed(2)}`, 10, y + 20);
    doc.text(`Grand Total: $${grandTotal.toFixed(2)}`, 10, y + 30);

    doc.save(`invoice-${invoice.orderId}.pdf`);
  };

  return (
    <div className="invoice-detail-container">
      <h3>Invoice Details</h3>
      <p>Order ID: {invoice.orderId}</p>
      <p>Store Name: {invoice.storeName}</p>
      <p>Date: {invoice.date}</p>
      <h4>Items:</h4>
      <ul>
        {invoice.items.map((item, index) => (
          <li key={index} className='items'>
            {item.productName} - Quantity: {item.quantity} - Total: ₹{item.itemTotal}
          </li>
        ))}
      </ul>
      <p className='total-text'>Subtotal: ₹{subtotal.toFixed(2)}</p>
      <p className='total-text'>Tax (10%): ₹{taxAmount.toFixed(2)}</p>
      <p className='total-text'>Grand Total: ₹{grandTotal.toFixed(2)}</p>
      <button className='invoice-details-button generate-pdf' onClick={generatePDF}>Generate PDF</button>
      <button className='invoice-details-button' onClick={onClose}>Close</button>
    </div>
  );
}

export default InvoiceDetail;