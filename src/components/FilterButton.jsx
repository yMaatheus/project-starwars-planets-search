import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import context from '../context/Context';
import Button from '../utils/components/Button';

function FilterButton({ column, comparison, value }) {
  const { filterByNumericValues: filters, setFilters } = useContext(context);
  const filterButton = () => setFilters([...filters, { column, comparison, value }]);
  return (
    <Button value="Filtrar" click={ filterButton } testId="button-filter" />
  );
}

FilterButton.propTypes = {
  column: PropTypes.string,
  comparison: PropTypes.string,
  value: PropTypes.number,
}.isRequired;

export default FilterButton;
