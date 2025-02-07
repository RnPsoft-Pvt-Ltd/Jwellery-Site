// import React from "react"
// import AccountSidebar from "../components/layout/AccountSidebar"
// import Header from '../components/layout/Header';
// function PersonalInfoPage() {
//   const personalInfo = {
//     title: "Mr.",
//     name: "Jhondoe",
//     email: "Jhondoe@gmail.com",
//     dob: "2000/12/12",
//     mobile: "+919800000000",
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//     <Header />
//     <div className="flex gap-8">
//       <AccountSidebar />
//       <div className="flex-1">
//         <h1 className="text-2xl font-bold mb-8">My Account</h1>
//         <h2 className="text-xl font-semibold mb-6">Personal Information</h2>

//         <div className="space-y-6">
//           <div className="flex justify-between items-center">
//             <div>
//               <div className="text-sm text-gray-600">Title</div>
//               <div>{personalInfo.title}</div>
//             </div>
//             <button className="px-4 py-1 rounded-full border hover:bg-gray-50">Edit</button>
//           </div>

//           <div className="flex justify-between items-center">
//             <div>
//               <div className="text-sm text-gray-600">Name</div>
//               <div>{personalInfo.name}</div>
//             </div>
//             <button className="px-4 py-1 rounded-full border hover:bg-gray-50">Edit</button>
//           </div>

//           <div className="flex justify-between items-center">
//             <div>
//               <div className="text-sm text-gray-600">Email</div>
//               <div>{personalInfo.email}</div>
//             </div>
//             <button className="px-4 py-1 rounded-full border hover:bg-gray-50">Edit</button>
//           </div>

//           <div className="flex justify-between items-center">
//             <div>
//               <div className="text-sm text-gray-600">DOB</div>
//               <div>{personalInfo.dob}</div>
//             </div>
//             <button className="px-4 py-1 rounded-full border hover:bg-gray-50">Edit</button>
//           </div>

//           <div className="flex justify-between items-center">
//             <div>
//               <div className="text-sm text-gray-600">Primary Mobile Number</div>
//               <div>{personalInfo.mobile}</div>
//             </div>
//             <button className="px-4 py-1 rounded-full border hover:bg-gray-50">Edit</button>
//           </div>
//         </div>
//       </div>
//     </div>
//     </div>
//   )
// }

// export default PersonalInfoPage




import React, { useState, useEffect } from 'react';
import AccountSidebar from '../components/layout/AccountSidebar';
import Header from '../components/layout/Header';

function PersonalInfoPage() {
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    mobile: '',
    dob: 'Not Updated',
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setMessage('User is not authenticated.');
          return;
        }

        const response = await fetch('http://localhost:5000/v1/users/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          setMessage('Error fetching user data.');
          return;
        }

        const result = await response.json();
        const userData = result.user;

        if (userData) {
          setPersonalInfo({
            name: userData.name || '',
            email: userData.email || '',
            mobile: userData.phone || '',
            dob: userData.date_of_birth ? userData.date_of_birth.split('T')[0] : 'Not Updated',
          });
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setMessage('Error fetching user data.');
      }
    };

    fetchPersonalInfo();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex gap-8">
        <AccountSidebar />
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-8">My Account</h1>
          <h2 className="text-xl font-semibold mb-6">Personal Information</h2>

          {message && <p className="text-red-600">{message}</p>}

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-600">Name</div>
                <div>{personalInfo.name}</div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-600">Email</div>
                <div>{personalInfo.email}</div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-600">DOB</div>
                <div>{personalInfo.dob}</div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-600">Primary Mobile Number</div>
                <div>{personalInfo.mobile}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfoPage;
