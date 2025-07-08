import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerItem = () => {
  const [customerData, setCustomerData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  const customerName = localStorage.getItem('customername') || 'N/A';
  const customerId = localStorage.getItem('customerId');

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/fetchCustomer?id=${customerId}`
        );
        setCustomerData(response.data || []);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };
    if (customerId) {
      fetchCustomerData();
    }
  }, [customerId]);

  // Pagination logic
  const totalPages = Math.ceil(customerData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = customerData.slice(startIndex, startIndex + rowsPerPage);

  // Calculate totals
  const totalAmount = customerData.reduce(
    (sum, item) => sum + (item.price || 0),
    0
  );
  const paidAmount = customerData.reduce(
    (sum, item) => sum + (item.paid || 0),
    0
  );
  const remainingAmount = totalAmount - paidAmount;

  return (
    <div className="text-black md:px-4">
      {/* Customer Info */}
      <div className="">
        <div className="flex px-2 items-center justify-between border-b mb-5">
          <span className="text-lg mx-2">Name: {customerName}</span>
          <span className="py-2 text-lg">
            Phone: {customerData[0]?.phone || 'N/A'}
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-cyan-700 text-white ">
              <tr className='text-base'>
                <th className="p-2 text-left font-light">ID</th>
                <th className="p-2 text-left font-light">Date</th>
                <th className="p-2 text-left font-light">Item Name</th>
                <th className="p-2 text-left font-light">Quantity</th>
                <th className="p-2 text-left font-light">Mode</th>
                <th className="p-2 text-left font-light">Price</th>
                <th className="p-2 text-left font-light">Barrow</th>
                <th className="p-2 text-left font-light">Paid</th>
                <th className="p-2 text-left font-light">Remaining</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item,index) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2">{index+startIndex+1}</td>
                  <td className="p-2">
                    {item.date
                      ? new Date(item.date).toDateString()
                      : 'N/A'}
                  </td>
                  <td className="p-2">{item.itemName || '-'}</td>
                  <td className="p-2">{item.quantity ?? '-'}</td>
                  <td className="p-2">{item.paymentMode || '-'}</td>
                  <td className="p-2">{item.price ?? '-'}</td>
                  <td className="p-2">{item.barrow ?? '-'}</td>
                  <td className="p-2">{item.paid ?? '-'}</td>
                  <td className="p-2">{item.remainingAmount ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-end items-center gap-3 mt-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-5 py-1 border text-black text-sm disabled:cursor-not-allowed hover:bg-indigo-600"
          >
            Prev
          </button>

          <span className="text-sm font-medium text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-5 py-1 border text-black text-sm disabled:cursor-not-allowed hover:bg-indigo-600"
          >
            Next
          </button>
        </div>

        {/* Summary */}
        <div className="mt-4 text-right space-y-1 border-b border-t p-2">
          <div>
            <span className="font-medium">Total amount: </span>
            {totalAmount}
          </div>
          <div>
            <span className="font-medium">Paid amount: </span>
            {paidAmount}
          </div>
          <div>
            <span className="font-medium">Remaining amount: </span>
            {remainingAmount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerItem;
