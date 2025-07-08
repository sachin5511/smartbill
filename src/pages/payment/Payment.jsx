import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    date: '',
    paid: '',
    paymentMode: 'Cash',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'paid' || name === 'phone') {
      const sanitizedValue = value.replace(/\D/g, '');
      setFormData((prev) => ({
        ...prev,
        [name]: sanitizedValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting:', formData);

    try {
      // Replace with your backend URL
      const response = await axios.post(
        'http://localhost:8080/customerItemRegisterd',
        [formData]
      );

      if (response.status === 200 || response.status === 201) {
        alert('Payment submitted successfully!');
        // Reset formData to initial state (array of one object)
        setFormData({
          customerName: '',
          phone: '',
          date: '',
          paid: '',
          paymentMode: 'Cash',
        });
      } else {
        alert('Error submitting payment.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting payment.');
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="max-h-[450px] border p-8 overflow-x-auto no-scrollbar w-full max-w-lg bg-white space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          💳 Payment Form
        </h2>

        <div className="space-y-4">
          <label className="flex flex-col">
            <span className="text-gray-700 font-medium mb-1">
              Customer Name
            </span>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-gray-700 font-medium mb-1">Phone</span>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-gray-700 font-medium mb-1">Date</span>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-gray-700 font-medium mb-1">Amount</span>
            <input
              type="text"
              name="paid"
              value={formData.paid}
              onChange={handleChange}
              required
              placeholder="Enter amount"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-gray-700 font-medium mb-1">
              Payment Method
            </span>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              <option>Cash</option>
              <option>Card</option>
              <option>Online</option>
            </select>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          ✅ Submit Payment
        </button>
      </form>
    </div>
  );
};

export default Payment;
