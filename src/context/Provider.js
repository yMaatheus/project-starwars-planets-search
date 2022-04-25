import React, { useState } from 'react';
import PropTypes from 'prop-types';
import context from './Context';
import usePlanets from '../hooks/usePlanets';

function Provider({ children }) {
  const [data] = usePlanets();
  const [name, setFilterName] = useState('');

  const value = {
    data,
    filterByName: {
      name,
    },
    setFilterName,
  };

  return (
    <context.Provider value={ value }>
      {children}
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.array,
}.isRequired;

export default Provider;
