



// import React, { useState, useEffect } from 'react';
// import AccountSidebar from '../components/layout/AccountSidebar';
// import Header from '../components/layout/Header';

// function AccountPage() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//   });

//   const [message, setMessage] = useState('');

//   // Fetch user data when the component mounts
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           setMessage('User is not authenticated.');
//           return;
//         }

//         const response = await fetch('http://localhost:5000/v1/users/me', {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           setMessage('Error fetching user data.');
//           return;
//         }

//         const result = await response.json();
//         const userData = result.user; // Ensure correct data extraction

//         if (userData) {
//           setFormData((prevData) => ({
//             ...prevData,
//             name: userData.name || prevData.name,
//             email: userData.email || prevData.email,
//             phone: userData.phone || prevData.phone,
//           }));
//         }
//       } catch (error) {
//         console.error('Fetch error:', error);
//         setMessage('Error fetching user data.');
//       }
//     };

//     fetchUserData();
//   }, []);

//   // Handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');

//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setMessage('User is not authenticated.');
//         return;
//       }

//       const response = await fetch('http://localhost:5000/v1/users/me', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           name: formData.name,
//           email: formData.email,
//           phone: formData.phone,
//         }),
//       });

//       const result = await response.json();
//       if (response.ok) {
//         setMessage('Profile updated successfully!');
//         setFormData({
//           name: result?.user?.name || '',
//           email: result?.user?.email || '',
//           phone: result?.user?.phone || '',
//           password: '',
//         });
//       } else {
//         setMessage(result.message || 'Something went wrong.');
//       }
//     } catch (error) {
//       console.error('Update error:', error);
//       setMessage('Error updating profile.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Header />
//       <div className="flex gap-8 p-6">
//         <AccountSidebar />
//         <div className="flex-1">
//           <h1 className="text-2xl font-bold mb-8">My Account</h1>
//           <h2 className="text-xl font-semibold mb-6">Overview</h2>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {['name', 'email', 'phone'].map((field) => (
//               <div key={field} className="flex flex-col">
//                 <label className="text-sm text-gray-600 capitalize">{field}</label>
//                 <input
//                   type="text"
//                   name={field}
//                   value={formData[field] || ''}
//                   onChange={handleChange}
//                   className="border p-2 rounded w-full"
//                 />
//               </div>
//             ))}

//             <div className="flex gap-4 mt-6">
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex-1"
//               >
//                 Update Profile
//               </button>
//             </div>
//           </form>

//           {message && <p className="mt-4 text-green-600">{message}</p>}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AccountPage;




import React, { useState, useEffect } from 'react';
import AccountSidebar from '../components/layout/AccountSidebar';
import Header from '../components/layout/Header';

function AccountPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    dob: '', // Date of birth field
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
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
          setFormData((prevData) => ({
            ...prevData,
            name: userData.name || prevData.name,
            email: userData.email || prevData.email,
            phone: userData.phone || prevData.phone,
            dob: userData.date_of_birth ? new Date(userData.date_of_birth).toISOString().split('T')[0] : '',
          }));
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setMessage('Error fetching user data.');
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('User is not authenticated.');
        return;
      }

      const response = await fetch('http://localhost:5000/v1/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          date_of_birth: formData.dob, // Ensure date format matches backend expectations
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Profile updated successfully!');
        setFormData({
          name: result?.user?.name || '',
          email: result?.user?.email || '',
          phone: result?.user?.phone || '',
          dob: result?.user?.date_of_birth ? new Date(result.user.date_of_birth).toISOString().split('T')[0] : '',
          password: '',
        });
      } else {
        setMessage(result.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Update error:', error);
      setMessage('Error updating profile.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex gap-8 p-6">
        <AccountSidebar />
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-8">My Account</h1>
          <h2 className="text-xl font-semibold mb-6">Overview</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {['name', 'email', 'phone', 'dob'].map((field) => {
              const label = field === 'dob' ? 'Date of Birth' : field.charAt(0).toUpperCase() + field.slice(1);
              return (
                <div key={field} className="flex flex-col">
                  <label className="text-sm text-gray-600 capitalize">{label}</label>
                  <input
                    type={field === 'dob' ? 'date' : 'text'}
                    name={field}
                    value={formData[field] || ''}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  />
                </div>
              );
            })}

            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex-1"
              >
                Update Profile
              </button>
            </div>
          </form>

          {message && <p className="mt-4 text-green-600">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
