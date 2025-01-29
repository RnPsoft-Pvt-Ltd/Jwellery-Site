

import React from "react"
import { useNavigate } from "react-router-dom"
import AccountSidebar from "../components/layout/AccountSidebar"
import Header from '../components/layout/Header';
function AddressPage() {
  const navigate = useNavigate()

  const handleEdit = () => {
    navigate("/account/address/edit")
  }

  return (
    <div className="min-h-screen bg-gray-100">
    <Header />
    <div className="flex gap-8">
      <AccountSidebar />
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-8">My Account</h1>
        <h2 className="text-xl font-semibold mb-6">Address Information</h2>

        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="font-medium">Starcity, Near Bus Stand {i === 1 && "(Default)"}</div>
                  <div>Patia, bhuneswar -12345</div>
                  <div>India</div>
                  <div>Contact No. : 9800000000</div>
                </div>
                <div className="space-x-2">
                  <button onClick={handleEdit} className="px-4 py-2 border rounded hover:bg-gray-100">
                    Edit
                  </button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Remove</button>
                </div>
              </div>
            </div>
          ))}

          <button onClick={handleEdit} className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
            + Add New Address
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AddressPage

