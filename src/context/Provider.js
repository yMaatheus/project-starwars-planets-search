import React, { useState } from 'react';
import PropTypes from 'prop-types';
import context from './Context';
import usePlanets from '../hooks/usePlanets';

function Provider({ children }) {
  const [data] = usePlanets();
  const [name, setFilterName] = useState('');
  const [filterByNumericValues, setFilters] = useState([]);

  const contextValue = {
    data,
    filterByName: {
      name,
    },
    filterByNumericValues,
    setFilterName,
    setFilters,
  };

  return (
    <context.Provider value={ contextValue }>
      {children}
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.array,
}.isRequired;

export default Provider;
