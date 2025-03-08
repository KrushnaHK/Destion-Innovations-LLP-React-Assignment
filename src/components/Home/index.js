import Header from '../Header'
import { Link } from 'react-router-dom';
import './index.css'

const Home = () => (
    <div>
        <Header/>
        <div className="home-container">
            <h1>Welcome to the Store Management Portal</h1>
            <p>Manage your invoices and products with ease.</p>
            <div className="home-features">
                <div className="feature-item">
                    <div>
                        <h3 className='invoice-home-heading'>Invoice Management</h3>
                        <p>Create, view, and manage invoices efficiently.</p>
                        <Link to="/invoices">
                            <button type="button" className="home-button">
                                Invoices
                            </button>
                        </Link>
                    </div>
                    <img
                        src="https://res.cloudinary.com/djifdyfkd/image/upload/v1741337182/invoice-management_yms1kl.jpg"
                        alt="invoice-management"
                        className='home-image invoice-image'
                    />
                </div>
                <div className="feature-item">
                    <div>
                        <h3>Product Management</h3>
                        <p>Add, edit, and delete products in your store.</p>\
                        <Link to="/products">
                            <button type="button" className="home-button">
                                Products
                            </button>
                        </Link>
                    </div>
                    <img
                        src="https://res.cloudinary.com/djifdyfkd/image/upload/v1741336663/Stages-in-Product-Management-Process_jhxtbs.webp"
                        alt="product-management"
                        className='home-image'
                    />
                </div>
            </div>
        </div>
    </div>
);

export default Home;