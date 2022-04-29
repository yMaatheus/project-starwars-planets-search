import React, { useContext, useEffect, useState } from 'react';
import context from '../context/Context';
import { executeFilters } from '../services';
import Button from '../utils/components/Button';
import FilterButton from './FilterButton';
import FilterForm from './FilterForm';
import Filters from './Filters';
import ResetFiltersButton from './ResetFiltersButton';
import SearchName from './SearchName';
import TablePlanets from './TablePlanets';

function Table() {
  const { columnsList, data, filterByName,
    filterByNumericValues: filters } = useContext(context);
  const { name: searchNameInput } = filterByName;

  const [columnInput, setColumnInput] = useState('');
  const [comparisonInput, setComparisonInput] = useState('maior que');
  const [valueInput, setValueInput] = useState(0);

  const [planets, setPlanets] = useState([]);
  const [columns, setColumns] = useState([]);

  const [columnSort, setColumnSort] = useState('');

  useEffect(() => {
    const generateColumns = () => filters.reduce((acc, { column }) => (
      acc.includes(column) && acc.filter((item) => item !== column)
    ), columnsList);

    setPlanets(executeFilters(data, searchNameInput, filters));
    const columnsArray = generateColumns();
    setColumns(columnsArray);
    setColumnInput(columnsArray[0]);
  }, [columnsList, data, filters, searchNameInput]);

  const handleSortColumn = ({ target: { value } }) => setColumnSort(value);

  return (
    <section>
      <SearchName />
      <section>
        <FilterForm
          valueInput={ valueInput }
          columns={ columns }
          setColumnInput={ setColumnInput }
          setComparisonInput={ setComparisonInput }
          setValueInput={ setValueInput }
        />
        <FilterButton
          column={ columnInput }
          comparison={ comparisonInput }
          value={ valueInput }
        />
        <ResetFiltersButton />
      </section>
      <section>
        <select onChange={ handleSortColumn } data-testid="column-sort">
          { columnsList.map((columnName, index) => (
            <option key={ index }>{columnName}</option>
          ))}
        </select>
        <label htmlFor="ASC">
          <input
            type="radio"
            id="ASC"
            name="sort"
            value="ASC"
            data-testid="column-sort-input-asc"
          />
          Ascendente
        </label>
        <label htmlFor="DESC">
          <input
            type="radio"
            id="DESC"
            name="sort"
            value="DESC"
            data-testid="column-sort-input-desc"
          />
          Descendente
        </label>
        <Button value="Ordenar" testId="column-sort-button" />
      </section>
      <Filters />
      <TablePlanets planets={ planets } />
    </section>
  );
}

export default Table;
