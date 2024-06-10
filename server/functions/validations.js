//! validate password
const checkValidPassword = (password) => {
  const passwordPattern =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  return passwordPattern.test(password);
};

//! validate an email address
const checkValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

module.exports = { checkValidPassword, checkValidEmail };
