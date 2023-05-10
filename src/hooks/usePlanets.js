import { useEffect, useState } from 'react';

function usePlanets() {
  const [planetsURL, setPlanetsURL] = useState('https://swapi.dev/api/planets/?format=json');
  const [data, setData] = useState([]);

  useEffect(() => {
    const getPlanetsData = async () => {
      const response = await fetch(planetsURL);
      const { results } = await response.json();
      setData(results);
    };

    getPlanetsData();
  }, [planetsURL]);

  return [data, setPlanetsURL];
}

export default usePlanets;
