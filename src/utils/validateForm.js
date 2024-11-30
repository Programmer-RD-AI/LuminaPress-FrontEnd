export const validateForm = (setFormErrors, formValues) => {
  const errors = { email: "", password: "" };
  let isValid = true;

  if (!formValues.email) {
    errors.email = "Email is required";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
    errors.email = "Invalid email format";
    isValid = false;
  }

  if (!formValues.password) {
    errors.password = "Password is required";
    isValid = false;
  }

  setFormErrors(errors);
  return isValid;
};
