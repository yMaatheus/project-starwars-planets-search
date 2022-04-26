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
  return planets;
};

export const test = '';
