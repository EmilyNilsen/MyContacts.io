const defaultApiReturn = ({ apiResponse = null, error = null }) => {
  return {
    apiResponse,
    errors: error ? [error] : [],
  }
}

module.exports = defaultApiReturn;
