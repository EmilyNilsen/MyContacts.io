const EmailIsValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailIsValid = emailRegex.test(email);
  return emailIsValid;
}

module.exports = { EmailIsValid };
