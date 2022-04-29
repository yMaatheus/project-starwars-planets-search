import React, { useContext } from 'react';
import context from '../context/Context';

function SearchName() {
  const { filterByName, setFilterName } = useContext(context);
  const { name: searchNameInput } = filterByName;
  const handleFilterName = ({ target: { value } }) => setFilterName(value);
  return (
    <section>
      <input
        type="text"
        value={ searchNameInput }
        onChange={ handleFilterName }
        data-testid="name-filter"
      />
    </section>
  );
}

export default SearchName;
