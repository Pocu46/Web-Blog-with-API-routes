export const validateEmail = (email: string): boolean => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export const validatePassword = (password: string): boolean => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return re.test(password);
}

export const validateStringLength = (value: string | undefined, length: number) => {
  if(value && value.trim().length < length) {
    return true
  }

  return false
}