import React, { useContext } from 'react';
import context from '../context/Context';
import Button from '../utils/components/Button';

function ResetFiltersButton() {
  const { setFilters } = useContext(context);
  const resetFilters = () => setFilters([]);
  return (
    <Button
      value="Remover Filtros"
      click={ resetFilters }
      testId="button-remove-filters"
    />
  );
}

export default ResetFiltersButton;
