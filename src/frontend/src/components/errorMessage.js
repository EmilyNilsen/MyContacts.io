import PropTypes from 'prop-types';
import React from 'react';

export default function ErrorMessage({ requestErrorList }) {
  return (
    <div className="error-message-component">
      { requestErrorList.length === 0
        ? null : requestErrorList.map(({ message }) => (
          <span
            key={ message }
          >
            { message }
          </span>
        ))}
    </div>
  );
}

ErrorMessage.propTypes = {
  requestErrorList: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};
