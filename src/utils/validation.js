const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^\+?[\d\s()-]{7,20}$/

export function validatePersonalInfo({ name, email, phone }) {
  const errors = {}

  if (!name.trim()) errors.name = 'This field is required'

  if (!email.trim()) errors.email = 'This field is required'
  else if (!EMAIL_REGEX.test(email)) errors.email = 'Invalid email format'

  if (!phone.trim()) errors.phone = 'This field is required'
  else if (!PHONE_REGEX.test(phone)) errors.phone = 'Invalid phone number'

  return errors
}