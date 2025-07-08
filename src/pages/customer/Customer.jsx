import React, { useState, useEffect } from 'react';
import { customerColumns } from '../../data/CustomerData';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Customer = () => {
  // Initialize with empty array
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const customerIds = (customer) => {
    localStorage.setItem('customerId', customer.id);
    localStorage.setItem('customername', customer.name);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/customer');
        console.log('GET response:', response.data);
        localStorage.setItem(
          'customerData',
          JSON.stringify(response.data.name)
        );
        setData(response.data);
        console.log(response.data.name);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <div className="flex justify-between md:px-5 py-2 font-light">
        <h3 className="md:text-2xl mb-4">Customer Page</h3>
        <Link to="/addCustomer">
          <button className=" text-black border px-4 py-2 rounded hover:bg-cyan-700 transition">
            Add Customer
          </button>
        </Link>
      </div>
      <div className="text-s md:px-5 overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
        <table className="w-full border">
          <thead className="border">
            <tr className="bg-cyan-700 text-white font-normal">
              {customerColumns.map((column) => (
                <th key={column.name} className="p-2 text-left font-light">
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((customer) => (
              <tr key={customer.id} className="border-b">
                <td className="p-2">{customer.id}</td>
                <td className="p-2">{customer.name}</td>
                <td className="p-2">{customer.email}</td>
                <td className="p-2">{customer.phone}</td>
                <td className="p-2">{customer.amount}</td>
                <td className="p-2">{customer.amountRecived}</td>
                <td className="p-2">{customer.barrow}</td>
                <td className="p-2">
                  <Link to={`/customersItem/${customer.id}`}>
                    <button
                      onClick={() => customerIds(customer)}
                      className="border border-gray-500 text-black px-3 py-1 rounded"
                    >
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-end mt-3 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === idx + 1 ? 'bg-gray-300' : ''
              }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Customer;
