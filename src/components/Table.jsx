import React, { useContext, useEffect, useState } from 'react';
import context from '../context/Context';
import { executeFilters } from '../services';
import FilterButton from './FilterButton';
import Filter from './Filter';
import Filters from './Filters';
import Order from './Order';
import ResetFiltersButton from './ResetFiltersButton';
import SearchName from './SearchName';
import TablePlanets from './TablePlanets';

function Table() {
  const { data, filterByName, filterByNumericValues: filters } = useContext(context);
  const { name: searchNameInput } = filterByName;

  const [columnInput, setColumnInput] = useState('');
  const [comparisonInput, setComparisonInput] = useState('maior que');
  const [valueInput, setValueInput] = useState(0);

  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    setPlanets(executeFilters(data, searchNameInput, filters));
  }, [data, filters, searchNameInput]);

  return (
    <section>
      <SearchName />
      <section>
        <Filter
          valueInput={ valueInput }
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
      <Order planets={ planets } setPlanets={ setPlanets } />
      <Filters />
      <TablePlanets planets={ planets } />
    </section>
  );
}

export default Table;
