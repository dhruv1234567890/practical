export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/

export const validateSignup = (vals) => {
  const errors = {}
  if (!vals.fullname) errors.fullname = 'Fullname is required'
  if (!vals.email) errors.email = 'Email required'
  else if (!emailRegex.test(vals.email)) errors.email = 'Invalid email'
  if (!vals.password) errors.password = 'Password required'
  else if (!passwordRegex.test(vals.password)) errors.password = 'Password must be min 8 chars, 1 upper, 1 lower, 1 digit, 1 special'
  if (vals.password !== vals.confirmPassword) errors.confirmPassword = 'Passwords do not match'
  return errors
}
