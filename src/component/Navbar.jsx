import React, { useState } from 'react'
import { Bell, Menu, Notebook, X } from 'lucide-react'; // Make sure to install lucide-react: npm install lucide-react
import { Link } from 'react-router';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
    <nav className="bg-white px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="text-2xl font-extrabold text-blue-600">BillShop</div>
            <div className="hidden md:flex flex-2/4  p-2 items-center mx-5 ">
              <input
                type="text"
                placeholder="Search..."
                className="w-full md:w-96 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
    
            <div className="px-5">
              <Bell />
            </div>
    
            <div className="hidden md:flex items-center gap-2">
              <button className="border border-gray-500 text-grey px-10 py-1.5 rounded-md">
                Login
              </button>
              <button className="border border-gray-500 text-grey px-10 py-1.5 rounded-md">
                Sign Up
              </button>
            </div>
    
            {/* Mobile hamburger */}
            <div className="md:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
    
          {/* Mobile menu */}
          {menuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md z-50 p-4 space-y-2">
              <input
                type="text"
                placeholder="Search..."
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                Login
              </button>
              <button className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                Sign Up
              </button>
            </div>
          )}
        </nav>
    </>
  )
}

export default Navbar
