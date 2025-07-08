import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Bill = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    date: '',
    phone: '',
  });

  const [items, setItems] = useState([
    {
      itemName: '',
      quantity: '',
      price: '',
      paid: '',
      barrow: '',
      paymentMode: 'cash',
      phone: '',
      date: '',
      customerName: '',
    },
  ]);

  useEffect(() => {
    setItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        phone: formData.phone,
        date: formData.date,
        customerName: formData.customerName,
      }))
    );
  }, [formData.phone, formData.date, formData.customerName]);

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'number') {
      newValue = value.replace(/\D/g, ''); // Keep only digits
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Example: only keep numbers in 'quantity' and 'price'
    if (
      name === 'quantity' ||
      name === 'price' ||
      name === 'barrow' ||
      name === 'paid'
    ) {
      newValue = value.replace(/\D/g, '');
    }

    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, [name]: newValue } : item
      )
    );
  };

  const addNewItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      {
        itemName: '',
        quantity: '',
        price: '',
        paid: '',
        barrow: '',
        paymentMode: 'cash',
        phone: formData.phone,
        date: formData.date,
        customerName: formData.customerName,
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(items);
    try {
      const response = await axios.post(
        'http://localhost:8080/customerItemRegisterd',
        items
      );
      console.log('Server response:', response.data);
      // setFormData({ customerName: '', date: '', phone: '' });
      // setItems([
      //   {
      //     itemName: '',
      //     quantity: '',
      //     price: '',
      //     paid: '',
      //     barrow: '',
      //     paymentMode: 'cash',
      //     phone: '',
      //     date: '',
      //   },
      // ]);
    } catch (error) {
      console.error('Error submitting receipt:', error);
      // Optionally: show an error message or toast here
    }
  };

  return (
    <div className="max-h-[500px] overflow-x-auto no-scrollbar md:space-y-4  md:p-6 md:mb-10">
      <h1 className="pb-2 border-gray-700 text-3xl font-bold text-center text-gray-800">
        🧾 Receipt
      </h1>

      <form onSubmit={handleSubmit} className="">
        {/* Customer Info */}
        <div className="border md:px-4 px-2 py-5 grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-6">
          <label className="flex flex-col">
            <span className="mb-2 font-semibold text-gray-700">
              Customer Name
            </span>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleCustomerChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </label>

          <label className="flex flex-col">
            <span className="mb-2 font-semibold text-gray-700">Date</span>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleCustomerChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-2 font-semibold text-gray-700">Phone</span>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleCustomerChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </label>
        </div>

        <div className="border px-4 py-5 space-y-5">
          {/* Items */}
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            🛒 Items
          </h2>

          {items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-gray-50 p-4 rounded-xl shadow-sm"
            >
              <label className="flex flex-col">
                <span className="mb-2 font-medium text-gray-700">
                  Item Name
                </span>
                <input
                  type="text"
                  name="itemName"
                  value={item.itemName}
                  onChange={(e) => handleItemChange(index, e)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  required
                />
              </label>
              <label className="flex flex-col">
                <span className="mb-2 font-medium text-gray-700">Quantity</span>
                <input
                  type="text"
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  min="1"
                  required
                />
              </label>
              <label className="flex flex-col">
                <span className="mb-2 font-medium text-gray-700">
                  Payment Mode
                </span>
                <select
                  name="paymentMode"
                  value={item.paymentMode}
                  onChange={(e) => handleItemChange(index, e)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                >
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="Barrow">Barrow</option>
                  <option value="online">Online</option>
                </select>
              </label>
              <label className="flex flex-col">
                <span className="mb-2 font-medium text-gray-700">Price</span>
                <input
                  type="text"
                  name="price"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, e)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  min="0"
                  required
                />
              </label>
              <label className="flex flex-col">
                <span className="mb-2 font-medium text-gray-700">Paid</span>
                <input
                  type="text"
                  name="paid"
                  value={item.paid}
                  onChange={(e) => handleItemChange(index, e)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                  min="0"
                />
              </label>
              <label className="flex flex-col">
                <span className="mb-2 font-medium text-gray-700">Barrow</span>
                <input
                  type="text"
                  name="barrow"
                  value={(item.barrow = item.price - item.paid)}
                  onChange={(e) => handleItemChange(index, e)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                  min="0"
                />
              </label>
            </div>
          ))}

          {/* Buttons */}
          <div className="mt-5 flex flex-col md:flex-row items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
            <button
              type="button"
              onClick={addNewItem}
              className="w-full md:w-auto text-black border px-5 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              ➕ Add More Item
            </button>
            <button
              type="submit"
              className="w-full md:w-auto text-black border px-6 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              ✅ Submit Receipt
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Bill;
