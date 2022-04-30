export const orderDefault = (planets) => (
  planets.sort((a, b) => a.name.localeCompare(b.name)));

export const executeFilters = (data, searchNameInput, filters) => {
  let planets = data.filter(({ name }) => name.toLowerCase().includes(searchNameInput));
  if (filters.length > 0) {
    planets = filters.reduce((acc, { column, comparison, value }) => {
      const valueNumber = Number(value);
      return acc.filter((planet) => {
        const planetColumnNumber = Number(planet[column]);
        switch (comparison) {
        case 'menor que':
          return planetColumnNumber < valueNumber;
        case 'maior que':
          return planetColumnNumber > valueNumber;
        default:
          return planetColumnNumber === valueNumber;
        }
      });
    }, planets);
  }
  orderDefault(planets);
  return planets;
};
