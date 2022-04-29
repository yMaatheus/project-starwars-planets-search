import React, { useContext } from 'react';
import context from '../context/Context';
import Button from '../utils/components/Button';

function Filters() {
  const { filterByNumericValues: filters, setFilters } = useContext(context);

  const handleRemoveFilter = ({ target: { id } }) => (
    setFilters(filters.filter(({ column }) => id !== column))
  );

  return (
    <section>
      { filters.map(({ column, comparison, value }, index) => (
        <section key={ index } data-testid="filter">
          <span>{`${column} ${comparison} ${value}`}</span>
          <Button
            id={ column }
            value="X"
            click={ handleRemoveFilter }
          />
        </section>
      ))}
    </section>
  );
}

export default Filters;
