

// import React from "react"
// import { useNavigate } from "react-router-dom"
// import AccountSidebar from "../components/layouts/components/AccountSidebar"
// import Header from '../components/layouts/components/Header';
// function AddressPage() {
//   const navigate = useNavigate()

//   const handleEdit = () => {
//     navigate("/account/address/edit")
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//     <Header />
//     <div className="flex gap-8">
//       <AccountSidebar />
//       <div className="flex-1">
//         <h1 className="text-2xl font-bold mb-8">My Account</h1>
//         <h2 className="text-xl font-semibold mb-6">Address Information</h2>

//         <div className="space-y-6">
//           {[1, 2].map((i) => (
//             <div key={i} className="border rounded-lg p-4">
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <div className="font-medium">Starcity, Near Bus Stand {i === 1 && "(Default)"}</div>
//                   <div>Patia, bhuneswar -12345</div>
//                   <div>India</div>
//                   <div>Contact No. : 9800000000</div>
//                 </div>
//                 <div className="space-x-2">
//                   <button onClick={handleEdit} className="px-4 py-2 border rounded hover:bg-gray-100">
//                     Edit
//                   </button>
//                   <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Remove</button>
//                 </div>
//               </div>
//             </div>
//           ))}

//           <button onClick={handleEdit} className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
//             + Add New Address
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
//   )
// }

// export default AddressPage


// AddressPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Loader2, MapPin, Trash2, PencilIcon } from 'lucide-react';

// function AddressPage() {
//   const navigate = useNavigate();
//   const [addresses, setAddresses] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [addressToDelete, setAddressToDelete] = useState(null);

//   useEffect(() => {
//     fetchAddresses();
//   }, []);

//   const fetchAddresses = async () => {
//     try {
//       console.log('fetching addresses');
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://54.206.185.32/v1/users/me', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
      
//       if (!response) throw new Error('Failed to fetch addresses');

//       const data = response.data.user.addresses;
//       setAddresses(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDeleteAddress = async () => {
//     if (!addressToDelete) return;
    
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://54.206.185.32/v1/addresses/${addressToDelete}`, {
//         method: 'DELETE',
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!response.ok) throw new Error('Failed to delete address');
      
//       setAddresses(addresses.filter(addr => addr.id !== addressToDelete));
//       setShowDeleteModal(false);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setAddressToDelete(null);
//     }
//   };

//   const DeleteConfirmationModal = () => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
//         <h3 className="text-lg font-semibold mb-2">Delete Address</h3>
//         <p className="text-gray-600 mb-6">Are you sure you want to delete this address? This action cannot be undone.</p>
//         <div className="flex justify-end gap-3">
//           <button
//             onClick={() => setShowDeleteModal(false)}
//             className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleDeleteAddress}
//             className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <Loader2 className="w-8 h-8 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-3xl mx-auto">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold">My Addresses</h1>
//         <button 
//           onClick={() => navigate('/account/address/edit')}
//           className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
//         >
//           Add New Address
//         </button>
//       </div>

//       {error && (
//         <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
//           {error}
//         </div>
//       )}

//       <div className="space-y-4">
//         {addresses.map((address) => (
//           <div key={address.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
//             <div className="flex items-start justify-between">
//               <div className="flex items-start gap-3">
//                 <MapPin className="w-5 h-5 text-gray-400 mt-1" />
//                 <div>
//                   <h3 className="font-medium text-gray-900">
//                     {address.fullName} {address.isDefault && <span className="text-sm text-blue-600">(Default)</span>}
//                   </h3>
//                   <p className="text-gray-600 mt-1">{address.addressLine1}</p>
//                   <p className="text-gray-600">{address.city}, {address.state} {address.zipCode}</p>
//                   <p className="text-gray-600">{address.country}</p>
//                   <p className="text-gray-600 mt-2">Mobile: {address.mobile}</p>
//                 </div>
//               </div>
              
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => navigate(`/account/address/edit/${address.id}`)}
//                   className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
//                 >
//                   <PencilIcon className="w-5 h-5" />
//                 </button>
//                 <button
//                   onClick={() => {
//                     setAddressToDelete(address.id);
//                     setShowDeleteModal(true);
//                   }}
//                   className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
//                 >
//                   <Trash2 className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {showDeleteModal && <DeleteConfirmationModal />}
//     </div>
//   );
// }

// export default AddressPage;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loader2, MapPin, Trash2 } from 'lucide-react';

function AddressPage() {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      console.log('Fetching addresses...');
      const token = localStorage.getItem('token');
      const response = await axios.get('http://54.206.185.32/v1/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response || !response.data.user.addresses) throw new Error('Failed to fetch addresses');

      setAddresses(response.data.user.addresses);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAddress = async () => {
    if (!addressToDelete) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://54.206.185.32/v1/address/${addressToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAddresses((prev) => prev.filter((addr) => addr.id !== addressToDelete));
      setShowDeleteModal(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete address');
    } finally {
      setAddressToDelete(null);
    }
  };

  const DeleteConfirmationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-2">Delete Address</h3>
        <p className="text-gray-600 mb-6">Are you sure you want to delete this address? This action cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteAddress}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My Addresses</h1>
        <button 
          onClick={() => navigate('/account/address/edit')}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Add New Address
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {addresses.map((address) => (
          <div key={address.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">
                    {address.fullName} {address.isDefault && <span className="text-sm text-blue-600">(Default)</span>}
                  </h3>
                  <p className="text-gray-600 mt-1">{address.addressLine1}</p>
                  <p className="text-gray-600">{address.city}, {address.state} {address.zipCode}</p>
                  <p className="text-gray-600">{address.country}</p>
                  <p className="text-gray-600 mt-2">Mobile: {address.mobile}</p>
                </div>
              </div>
              
              <button
                onClick={() => {
                  setAddressToDelete(address.id);
                  setShowDeleteModal(true);
                }}
                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showDeleteModal && <DeleteConfirmationModal />}
    </div>
  );
}

export default AddressPage;
