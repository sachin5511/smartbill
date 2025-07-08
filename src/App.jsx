import Navbar from './component/Navbar';
import Sidebar from './component/Sidebar';
import Bill from './pages/bill/Bill';
import AddCustomer from './pages/customer/AddCustomer';
import Customer from './pages/customer/Customer';
import CustomerItem from './pages/customer/CustomerItem';
import Payment from './pages/payment/Payment';

import './style/App.css';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <div className="md:flex fixed w-full">
        <div className="md:w-[15%]">
          <Sidebar />
        </div>
        <div className="md:w-[84%] px-2">
          <Routes>
            <Route path="/customers" element={<Customer />} />
            <Route path="/customersItem/:id" element={<CustomerItem />} />
            <Route path="/bill" element={<Bill />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/addCustomer" element={<AddCustomer />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
