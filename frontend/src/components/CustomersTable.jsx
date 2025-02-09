import React, { useState, useEffect } from "react";

const CustomersTable = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [customers, setCustomers] = useState([]);  // Store fetched users
  const [loading, setLoading] = useState(true); // Loading state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); // Ensure token exists
        if (!token) {
          console.error("No auth token found!");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/v1/users/filteruser",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        console.log("Fetched users:", data);
        setCustomers(data); // Update state with fetched users
        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Fixed status filtering
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) &&
      (!status ||
        (status === "Verified" && customer.is_verified) ||
        (status === "Not Verified" && !customer.is_verified))
  );

  const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage);

  return (
    <div className="pl-60 py-10 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h1 className="text-xl font-semibold mb-4">Customers</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <>
            {/* Filter Section */}
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
              />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All</option>
                <option value="Verified">Verified</option>
                <option value="Not Verified">Not Verified</option>
              </select>
              <button
                onClick={() => {
                  setSearch("");
                  setStatus("");
                }}
                className="text-blue-600 hover:underline mt-2 md:mt-0"
              >
                Clear filter
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 p-2 text-left">
                      <input type="checkbox" />
                    </th>
                    <th className="border border-gray-200 p-2 text-left">
                      FULL NAME
                    </th>
                    <th className="border border-gray-200 p-2 text-left">
                      EMAIL
                    </th>
                    <th className="border border-gray-200 p-2 text-left">
                      STATUS
                    </th>
                    <th className="border border-gray-200 p-2 text-left">
                      CREATED AT
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers
                      .slice(
                        (currentPage - 1) * rowsPerPage,
                        currentPage * rowsPerPage
                      )
                      .map((customer, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-100 transition duration-150"
                        >
                          <td className="border border-gray-200 p-2">
                            <input type="checkbox" />
                          </td>
                          <td className="border border-gray-200 p-2">
                            {customer.name}
                          </td>
                          <td className="border border-gray-200 p-2">
                            {customer.email}
                          </td>
                          <td className="border border-gray-200 p-2">
                            {customer.is_verified ? "Verified" : "Not Verified"}
                          </td>
                          <td className="border border-gray-200 p-2">
                            {new Date(customer.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="border border-gray-200 p-4 text-center text-gray-500"
                      >
                        No customers found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-500">
                Show {rowsPerPage} per page
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className="px-3 py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                <span>
                  Page {currentPage} of {totalPages || 1}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  className="px-3 py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomersTable;
