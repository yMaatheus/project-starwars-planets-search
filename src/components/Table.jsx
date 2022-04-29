import React, { useContext, useEffect, useState } from 'react';
import context from '../context/Context';
import { executeFilters } from '../services';

function Table() {
  const { columnsList, data, filterByName, filterByNumericValues,
    setFilterName, setFilters } = useContext(context);
  const { name: searchNameInput } = filterByName;

  const [columnInput, setColumnInput] = useState('');
  const [comparison, setComparisonInput] = useState('maior que');
  const [valueInput, setValueInput] = useState(0);

  const [planets, setPlanets] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const generateColumns = () => filterByNumericValues.reduce((acc, { column }) => (
      acc.includes(column) && acc.filter((item) => item !== column)
    ), columnsList);

    setPlanets(executeFilters(data, searchNameInput, filterByNumericValues));
    const columnsArray = generateColumns();
    setColumns(columnsArray);
    setColumnInput(columnsArray[0]);
  }, [columnsList, data, filterByNumericValues, searchNameInput]);

  const handleFilterName = ({ target: { value } }) => setFilterName(value);
  const handleFilterColumn = ({ target: { value } }) => setColumnInput(value);
  const handleFilterComparison = ({ target: { value } }) => setComparisonInput(value);
  const handleFilterValue = ({ target: { value } }) => setValueInput(value);
  const handleFilterButton = () => setFilters([
    ...filterByNumericValues, { column: columnInput, comparison, value: valueInput },
  ]);

  return (
    <section>
      <section>
        <input
          type="text"
          value={ searchNameInput }
          onChange={ handleFilterName }
          data-testid="name-filter"
        />
      </section>
      <section>
        <select onChange={ handleFilterColumn } data-testid="column-filter">
          { columns.map((columnName, index) => (
            <option key={ index }>{columnName}</option>))}
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
        <button
          type="button"
          onClick={ handleFilterButton }
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </section>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {planets?.map((
            { name, rotation_period: rotationPeriod, orbital_period: orbitalPeriod,
              diameter, climate, gravity, terrain, surface_water: surfaceWater,
              population, films, created, edited, url }, index,
          ) => (
            <tr key={ index }>
              <td>{name}</td>
              <td>{rotationPeriod}</td>
              <td>{orbitalPeriod}</td>
              <td>{diameter}</td>
              <td>{climate}</td>
              <td>{gravity}</td>
              <td>{terrain}</td>
              <td>{surfaceWater}</td>
              <td>{population}</td>
              <td>{films}</td>
              <td>{created}</td>
              <td>{edited}</td>
              <td>{url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Table;
