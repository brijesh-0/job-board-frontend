export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password: string): string | null => {
  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }
  return null;
};

export const validateSalaryRange = (
  min: number,
  max: number,
): string | null => {
  if (min <= 0 || max <= 0) {
    return "Salary must be greater than 0";
  }
  if (min > max) {
    return "Minimum salary cannot exceed maximum salary";
  }
  return null;
};

export const validateFile = (file: File): string | null => {
  if (file.type !== "application/pdf") {
    return "Only PDF files are allowed";
  }
  if (file.size > 5 * 1024 * 1024) {
    return "File size must not exceed 5MB";
  }
  return null;
};
