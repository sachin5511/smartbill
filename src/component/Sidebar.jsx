import React, { useState } from 'react';
import {
  Notebook,
  Menu,
  X,
  ListOrderedIcon,
  LayoutDashboard,
  Settings2Icon,
  ReceiptPoundSterlingIcon,
  ListOrdered,
} from 'lucide-react';
import { Link } from 'react-router';


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Burger button - only visible on small screens */}
      <div className="md:hidden p-4">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen bg-cyan-700 text-white p-5 z-40
          transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          transition-transform duration-300 ease-in-out
          md:translate-x-0 md:static md:block
         
        `}
      >
        <X className='md:hidden' onClick={() => setIsOpen(false)}/>
        <ul className="space-y-4 mt-10 md:mt-0 overflow-auto">
          <li className="p-2 rounded flex items-center gap-2 hover:text-pink-400">
            <LayoutDashboard className="w-6 h-6" />
            <Link to="/">Dashboard</Link>
          </li>
          <li className="p-2 rounded flex gap-2 hover:text-pink-400">
            <ListOrdered />
            <Link to="#products">Products</Link>
          </li>
          <li className="p-2 rounded flex items-center gap-2 hover:text-pink-400">
            <ListOrderedIcon />
            <Link to="/order">Orders</Link>
          </li>
          <li className="p-2 rounded flex items-center gap-2 hover:text-pink-400">
            <Notebook className="w-6 h-6" />
            <Link to="/customers">Customers</Link>
          </li>
          <li className="p-2 rounded flex gap-2 hover:text-pink-400">
            <ReceiptPoundSterlingIcon className="w-6 h-6" />
            <Link to="#reports">Reports</Link>
          </li>
           <li className="p-2 rounded flex gap-2 hover:text-pink-400">
            <ReceiptPoundSterlingIcon className="w-6 h-6" />
            <Link to="/bill">bill</Link>
          </li>
           <li className="p-2 rounded flex gap-2 hover:text-pink-400">
            <ReceiptPoundSterlingIcon className="w-6 h-6" />
            <Link to="/payment">Payment</Link>
          </li>
          <li className="p-2 rounded flex gap-2 hover:text-pink-400">
            <Settings2Icon />
            <Link to="#settings">Settings</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
