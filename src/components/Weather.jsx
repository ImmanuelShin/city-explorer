import Card from 'react-bootstrap/Card';
import WeatherDay from './WeatherDay';
import { useState } from 'react';

function Weather(props) {
  if (!props.weatherData) {
    return null;
  } else {
    props.updateStatus(false);
    
  }

  // const newDate = new Date();

  return (
    <Card style={{ width: '20vw', marginTop: '20px' }}>
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
    </Card>
  );
}
export default Weather;