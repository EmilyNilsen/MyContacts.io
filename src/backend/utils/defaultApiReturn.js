const defaultApiReturn = ({ response = null, error = null }) => {
  return {
    response,
    errors: [error],
  }
}

module.exports = defaultApiReturn;
