export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const validatePassword = (password) => {
    // Minimum 8 characters, at least one uppercase, one lowercase, one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  };
  
// export const validateEmail = (email) => email.includes("@");

// export const validatePassword = (password) => password.length >= 4;

export const validateShipmentStatus = (status) => {
  const validStatuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
  return validStatuses.includes(status);
};

// utils/validation.js (add these functions if not already present)
export const validateTaxCategoryInput = (data) => {
  const errors = [];

  if (!data.name?.trim()) {
    errors.push('Name is required');
  }

  if (typeof data.standard_rate !== 'number' || data.standard_rate < 0 || data.standard_rate > 1) {
    errors.push('Standard rate must be a number between 0 and 1');
  }

  if (data.is_active !== undefined && typeof data.is_active !== 'boolean') {
    errors.push('is_active must be a boolean value');
  }

  return errors;
};