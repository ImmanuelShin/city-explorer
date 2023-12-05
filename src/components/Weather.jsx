import Card from 'react-bootstrap/Card';

function Weather(props) {
  if (!props.weatherData) {
    return null;
  }
  const { description, date } = props.weatherData;
  return (
    <Card style={{ width: '20vw', marginTop: '20px' }}>
      <Card.Body>
        <Card.Title>{props.location}</Card.Title>
        <Card.Text>Weather</Card.Text>
        <Card.Text>
          <div>
            {props.weatherData.map((item, index) => (
              <div key={index}>
                <p>Description: {item.description}</p>
                <p>Date: {item.date}</p>
              </div>
            ))}
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Weather;