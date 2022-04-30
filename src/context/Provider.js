import React, { useState } from 'react';
import PropTypes from 'prop-types';
import context from './Context';
import usePlanets from '../hooks/usePlanets';

function Provider({ children }) {
  const [data] = usePlanets();
  const [name, setFilterName] = useState('');
  const [filterByNumericValues, setFilters] = useState([]);
  const [orderColumn, setOrderColumn] = useState('population');
  const [orderSort, setOrderSort] = useState('ASC');
  const columnsList = ['population', 'orbital_period', 'diameter', 'rotation_period',
    'surface_water'];

  const contextValue = {
    columnsList,
    data,
    filterByName: {
      name,
    },
    order: {
      column: orderColumn,
      sort: orderSort,
    },
    filterByNumericValues,
    setFilterName,
    setFilters,
    setOrderColumn,
    setOrderSort,
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
