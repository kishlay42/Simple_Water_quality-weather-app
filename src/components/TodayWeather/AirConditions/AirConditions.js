import React from 'react';
import ErrorBox from '../../Reusable/ErrorBox';
import AirConditionsItem from './AirConditionsItem';
import Layout from '../../Reusable/Layout';

const TodayWeatherAirConditions = ({ data }) => {
  const noDataProvided =
    !data || Object.keys(data).length === 0 || data.cod === '404';

  // Function to generate a random value within the specified range
  const generateRandomAQI = () => {
    return Math.floor(Math.random() * (200 - 100 + 1)) + 100;
  };

  // Function to determine the AQI description based on the value
  const getAQIDescription = (aqi) => {
    if (aqi >= 0 && aqi < 150) {
      return 'Good';
    } else if (aqi >= 150 && aqi < 200) {
      return 'Unhealthy';
    } else if (aqi >= 200) {
      return 'Very Unhealthy';
    }
  };

  let content = <ErrorBox flex="1" type="error" />;

  if (!noDataProvided) {
    // Generate a random AQI value
    const randomAQI = generateRandomAQI();

    // Get the AQI description based on the random value
    const aqiDescription = getAQIDescription(randomAQI);

    content = (
      <>
        <AirConditionsItem
          title="Real Feel"
          value={`${Math.round(data.main.feels_like)} °C`}
          type="temperature"
        />
        <AirConditionsItem
          title="Wind"
          value={`${data.wind.speed} m/s`}
          type="wind"
        />
        <AirConditionsItem
          title="Humidity"
          value={`${Math.round(data.main.humidity)} %`}
          type="humidity"
        />
        <AirConditionsItem
          title="AQI"
          value={`${randomAQI} (${aqiDescription})`}
          type="AQI"
        />
      </>
    );
  }

  return (
    <>
      <Layout
        title="AIR CONDITIONS"
        content={content}
        mb="1rem"
        sx={{ marginTop: '2.9rem' }}
      />
    </>
  );
};

export default TodayWeatherAirConditions;
