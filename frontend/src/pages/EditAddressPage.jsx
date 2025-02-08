// import React, { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import AccountSidebar from "../components/layout/AccountSidebar"
// import Header from '../components/layout/Header';
// function EditAddressPage() {
//   const navigate = useNavigate()
//   const [formData, setFormData] = useState({
//     fullName: "Jhondoe",
//     mobile: "98900000000",
//     addressLine1: "Patia, Nandan Vihar, India",
//     zipCode: "12345",
//     country: "India",
//     state: "Odisha",
//     city: "Bhuneswar",
//     landmark: "Ram Temple",
//     isDefault: false,
//   })

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }))
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     // Handle form submission here
//     navigate("/account/address")
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//     <Header />
//     <div className="flex gap-8">
//       <AccountSidebar />
//       <div className="flex-1">
//         <h1 className="text-2xl font-bold mb-8">My Account</h1>
//         <h2 className="text-xl font-semibold mb-6">Address Information</h2>

//         <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Full Name</label>
//             <input
//               type="text"
//               name="fullName"
//               value={formData.fullName}
//               onChange={handleChange}
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Mobile No.</label>
//             <input
//               type="text"
//               name="mobile"
//               value={formData.mobile}
//               onChange={handleChange}
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Address Line 1</label>
//             <input
//               type="text"
//               name="addressLine1"
//               value={formData.addressLine1}
//               onChange={handleChange}
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">ZIP Code</label>
//             <input
//               type="text"
//               name="zipCode"
//               value={formData.zipCode}
//               onChange={handleChange}
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Country</label>
//             <input
//               type="text"
//               name="country"
//               value={formData.country}
//               onChange={handleChange}
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">State</label>
//               <input
//                 type="text"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">City</label>
//               <input
//                 type="text"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Landmark</label>
//             <input
//               type="text"
//               name="landmark"
//               value={formData.landmark}
//               onChange={handleChange}
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
//             />
//           </div>

//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               id="isDefault"
//               name="isDefault"
//               checked={formData.isDefault}
//               onChange={handleChange}
//               className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
//             />
//             <label htmlFor="isDefault" className="ml-2 block text-sm">
//               Make this Default Address
//             </label>
//           </div>

//           <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800">
//             Add Address
//           </button>
//         </form>
//       </div>
//     </div>
//     </div>
//   )
// }

// export default EditAddressPage




import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AccountSidebar from "../components/layout/AccountSidebar";
import Header from "../components/layout/Header";

function EditAddressPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    addressLine1: "",
    zipCode: "",
    country: "",
    state: "",
    city: "",
    landmark: "",
    isDefault: false,
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (id) {
      const fetchAddress = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            setMessage("User is not authenticated.");
            return;
          }

          const response = await fetch(`http://localhost:5000/v1/addresses/${id}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            setMessage("Address not found. Creating a new one.");
            return;
          }

          const result = await response.json();
          setFormData(result);
        } catch (error) {
          console.error("Fetch error:", error);
          setMessage("Error fetching address data.");
        }
      };

      fetchAddress();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("User is not authenticated.");
        return;
      }

      const method = id ? "PUT" : "POST";
      const endpoint = id ? `http://localhost:5000/v1/address/${id}` : "http://localhost:5000/v1/address";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage(id ? "Address updated successfully!" : "Address created successfully!");
        navigate("/account/address");
      } else {
        setMessage("Error saving address.");
      }
    } catch (error) {
      console.error("Save error:", error);
      setMessage("Error saving address.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex gap-8">
        <AccountSidebar />
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-8">My Account</h1>
          <h2 className="text-xl font-semibold mb-6">Address Information</h2>

          {message && <p className="text-red-600">{message}</p>}

          <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
            {Object.keys(formData).map((key) => (
              key !== "isDefault" ? (
                <div key={key}>
                  <label className="block text-sm font-medium mb-1">{key}</label>
                  <input
                    type="text"
                    name={key}
                    value={formData[key] || ""}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </div>
              ) : null
            ))}

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isDefault"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleChange}
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
              <label htmlFor="isDefault" className="ml-2 block text-sm">
                Make this Default Address
              </label>
            </div>

            <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800">
              {id ? "Update Address" : "Add Address"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditAddressPage;
