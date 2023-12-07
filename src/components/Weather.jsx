import Card from 'react-bootstrap/Card';
import WeatherDay from './WeatherDay';

function Weather(props) {
  if (!props.weatherData) {
    return null;
  }
  return (
    <Card style={{ width: '20vw', marginTop: '20px' }}>
      <Card.Body>
        <Card.Title>{props.location}</Card.Title>
        <Card.Text>Weather</Card.Text>
        <Card.Text>
          {props.weatherData.map((item, index) => (
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