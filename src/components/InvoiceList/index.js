import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header'
import InvoiceDetail from '../InvoiceDetail';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';

function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [itemFilter, setItemFilter] = useState('');

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get('https://destion-innovations-llp-assignment-1.onrender.com/invoices');
        setInvoices(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  const filteredInvoices = invoices.filter((invoice) => {
    const dateFilter =
      (!startDate || new Date(invoice.date) >= startDate) &&
      (!endDate || new Date(invoice.date) <= endDate);

    const itemFilterCheck = !itemFilter || invoice.items.some(item =>
        item.productName.toLowerCase().includes(itemFilter.toLowerCase())
    );

    return dateFilter && itemFilterCheck;
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Header/>
      <div className="invoice-list-container">
        <h2>Invoice List</h2>

        <div className="filter-controls">
          <h3>Filter List</h3>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start Date"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="End Date"
          />
          <input
              type="text"
              placeholder="Filter by Item"
              value={itemFilter}
              onChange={(e) => setItemFilter(e.target.value)}
          />
        </div>

        <ul className="invoice-list">
          {filteredInvoices.map((invoice) => (
            <React.Fragment key={invoice.orderId}>
              <li onClick={() => setSelectedInvoiceId(invoice.orderId)}>
                Order #{invoice.orderId} - {invoice.storeName} - {invoice.date}
              </li>
              {selectedInvoiceId === invoice.orderId && (
                <InvoiceDetail invoice={invoice} onClose={() => setSelectedInvoiceId(null)} />
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default InvoiceList;