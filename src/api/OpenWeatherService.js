const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
const WEATHER_API_KEY = 'a851f4d1ae326620f1d84ab8545b9cd4';

const GEO_API_OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '4f0dcce84bmshac9e329bd55fd14p17ec6fjsnff18c2e61917',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  },
};

// Simple cache to store fetched data
const dataCache = {};

export async function fetchWeatherData(lat, lon) {
  const cacheKey = `weather_${lat}_${lon}`;

  // Check if the data is cached
  if (dataCache[cacheKey]) {
    return dataCache[cacheKey];
  }

  try {
    const [weatherPromise, forecastPromise] = await Promise.all([
      fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      ),
      fetch(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      )
    ]);

    const [weatherResponse, forecastResponse] = await Promise.all([
      weatherPromise.json(),
      forecastPromise.json()
    ]);

    // Store data in cache
    dataCache[cacheKey] = [weatherResponse, forecastResponse];

    return [weatherResponse, forecastResponse];
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error for proper error handling
  }
}

export async function fetchCities(input) {
  try {
    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${input}`,
      GEO_API_OPTIONS
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error for proper error handling
  }
}
