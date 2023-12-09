import Card from 'react-bootstrap/Card';
import WeatherDay from './WeatherDay';

function Weather(props) {
  if (!props.weatherData) {
    return null;
  } else {
    props.updateStatus(false);
  }

  return (
    <Card style={{ width: '40%', marginTop: '20px', marginRight: '30px' }}>
      <Card.Body>
        <Card.Title>{props.location}</Card.Title>
        <Card.Text>Weather</Card.Text>
        <>
          {props.weatherData.map((item, index) => (
            <WeatherDay
              key={index}
              index={index}
              day={item}
              date={props.date}
            />
          ))}
        </>
      </Card.Body>
      <Card.Footer>
        Retrieved: {props.date}
      </Card.Footer>
    </Card>
  );
}
export default Weather;