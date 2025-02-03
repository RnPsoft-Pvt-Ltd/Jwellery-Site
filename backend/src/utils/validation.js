// export const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };
  
//   export const validatePassword = (password) => {
//     // Minimum 8 characters, at least one uppercase, one lowercase, one number
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
//     return passwordRegex.test(password);
//   };
export const validateEmail = (email) => email.includes("@");

export const validatePassword = (password) => password.length >= 4;

export const validateShipmentStatus = (status) => {
  const validStatuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
  return validStatuses.includes(status);
};