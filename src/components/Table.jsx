import React, { useContext, useState } from 'react';
import context from '../context/Context';
import { executeFilters } from '../services';

function Table() {
  const [column, setColumnInput] = useState('population');
  const [comparison, setComparisonInput] = useState('maior que');
  const [valueInput, setValueInput] = useState(0);
  const { data, filterByName: { name: searchNameInput }, filterByNumericValues,
    setFilterName, setFilters } = useContext(context);

  const planets = executeFilters(data, searchNameInput, filterByNumericValues);

  const handleFilterName = ({ target: { value } }) => setFilterName(value);
  const handleFilterColumn = ({ target: { value } }) => setColumnInput(value);
  const handleFilterComparison = ({ target: { value } }) => setComparisonInput(value);
  const handleFilterValue = ({ target: { value } }) => setValueInput(value);
  const handleFilterButton = () => setFilters([
    ...filterByNumericValues, { column, comparison, value: valueInput },
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
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
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
