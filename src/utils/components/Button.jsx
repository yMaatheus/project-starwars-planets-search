import React from 'react';
import PropTypes from 'prop-types';

function Button({ value = '', id = '', click, disabled = false, testId = '' }) {
  return (
    <button
      type="button"
      id={ id }
      onClick={ click || (() => {}) }
      data-testid={ testId }
      disabled={ disabled }
    >
      {value}
    </button>
  );
}

Button.propTypes = {
  value: PropTypes.string,
  id: PropTypes.string,
  click: PropTypes.func,
  disabled: PropTypes.bool,
  testid: PropTypes.string,
}.isRequired;

export default Button;
