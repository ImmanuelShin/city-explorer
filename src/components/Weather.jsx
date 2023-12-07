import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import WeatherDay from './WeatherDay';
import axios from 'axios';

function Weather(props) {
  const { lat, long, cache, setCache, onError } = props;
  const [weatherData, setWeatherData] = useState(null);

  const handleWeather = async () => {
    try {
      if (cache[`${lat},${long}`]) {
        // Use cached data
        setWeatherData(cache[`${lat},${long}`]);
      } else {
        // Make API call and update cache
        const weatherApi = `https://city-explorer-api-o9yy.onrender.com/weather?lat=${lat}&lon=${long}`;
        const weatherResponse = await axios.get(weatherApi);
        setWeatherData(weatherResponse.data);

        // Update cache
        setCache((prevCache) => ({ ...prevCache, [`${lat},${long}`]: weatherResponse.data }));
      }
    } catch (error) {
      onError(error);
    }
  };

  // Call handleWeather whenever lat or long changes
  useEffect(() => {
    handleWeather();
  }, [lat, long]);
  
  return (
    <Card style={{ width: '20vw', marginTop: '20px' }}>
      <Card.Body>
        <Card.Title>{props.location}</Card.Title>
        <Card.Text>Weather</Card.Text>
        <Card.Text>
          {weatherData && weatherData.map((item, index) => (
            <WeatherDay
              key={index}
              index={index}
              day={item}
            />
          ))}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
export default Weather;