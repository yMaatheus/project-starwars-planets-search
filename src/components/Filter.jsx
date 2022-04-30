import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import context from '../context/Context';

function FilterForm(props) {
  const { columnsList, filterByNumericValues: filters } = useContext(context);
  const { valueInput, setColumnInput, setComparisonInput,
    setValueInput } = props;

  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const generateColumns = () => filters.reduce((acc, { column: columnName }) => (
      acc.includes(columnName) && acc.filter((item) => item !== columnName)
    ), columnsList);

    const columnsArray = generateColumns();

    setColumnInput(columnsArray[0]);
    setColumns(columnsArray);
  }, [columnsList, filters, setColumnInput]);

  const handleFilterColumn = ({ target: { value } }) => setColumnInput(value);
  const handleFilterComparison = ({ target: { value } }) => setComparisonInput(value);
  const handleFilterValue = ({ target: { value } }) => setValueInput(value);

  return (
    <>
      <select onChange={ handleFilterColumn } data-testid="column-filter">
        { columns.map((columnName, index) => (
          <option key={ index }>{columnName}</option>
        ))}
      </select>
      <select onChange={ handleFilterComparison } data-testid="comparison-filter">
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        type="number"
        value={ valueInput }
        onChange={ handleFilterValue }
        data-testid="value-filter"
      />
    </>
  );
}

FilterForm.propTypes = {
  valueInput: PropTypes.number,
  setColumnInput: PropTypes.func,
  setComparisonInput: PropTypes.func,
  setValueInput: PropTypes.func,
}.isRequired;

export default FilterForm;
