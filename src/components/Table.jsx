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
  const { columnsList, data, filterByName, order,
    filterByNumericValues: filters, setOrderColumn, setOrderSort } = useContext(context);
  const { name: searchNameInput } = filterByName;
  const { column, sort } = order;

  const [columnInput, setColumnInput] = useState('');
  const [comparisonInput, setComparisonInput] = useState('maior que');
  const [valueInput, setValueInput] = useState(0);

  const [planets, setPlanets] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const generateColumns = () => filters.reduce((acc, { column: columnName }) => (
      acc.includes(columnName) && acc.filter((item) => item !== columnName)
    ), columnsList);

    setPlanets(executeFilters(data, searchNameInput, filters));

    const columnsArray = generateColumns();
    setColumnInput(columnsArray[0]);
    setColumns(columnsArray);
  }, [column, columnsList, data, filters, searchNameInput, sort]);

  const handleOrderColumn = ({ target: { value } }) => setOrderColumn(value);
  const handleOrderSort = ({ target: { value } }) => setOrderSort(value);
  const handleOrderButton = () => {
    const unknownPlanets = planets.filter((planet) => planet[column] === 'unknown');
    const otherPlanets = planets.filter((planet) => planet[column] !== 'unknown');
    otherPlanets.sort((a, b) => (sort === 'ASC'
      ? +a[column] - +b[column] : +b[column] - +a[column]));
    setPlanets([...otherPlanets, ...unknownPlanets]);
  };

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
        <select onChange={ handleOrderColumn } data-testid="column-sort">
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
            checked={ sort === 'ASC' }
            onChange={ handleOrderSort }
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
            checked={ sort === 'DESC' }
            onChange={ handleOrderSort }
            data-testid="column-sort-input-desc"
          />
          Descendente
        </label>
        <Button value="Ordenar" click={ handleOrderButton } testId="column-sort-button" />
      </section>
      <Filters />
      <TablePlanets planets={ planets } />
    </section>
  );
}

export default Table;
