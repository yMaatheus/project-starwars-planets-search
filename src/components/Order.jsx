import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import context from '../context/Context';
import Button from '../utils/components/Button';

function Order({ planets, setPlanets }) {
  const { columnsList, order, setOrderColumn, setOrderSort } = useContext(context);
  const { column, sort } = order;

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
  );
}

Order.propTypes = {
  planets: PropTypes.array,
  setPlanets: PropTypes.func,
}.isRequired;

export default Order;
