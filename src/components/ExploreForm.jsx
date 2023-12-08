import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Weather from './Weather';
import Movies from './Movies';
import { useState } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_GEO_API_KEY;

function ExploreForm(props) {

  const [location, setLocation] = useState('');
  const [fullLocation, setFullLocation] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [movieData, setMovieData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const city = e.target.elements.exploreFormCity.value;
      // Make API call and update cache
      console.log('calling submit');
      const API = `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${city}&format=json`;
      const response = await axios.get(API);

      setLocation(response.data[0].display_name.split(',')[0]);
      setFullLocation(response.data[0].display_name);
      setLat(response.data[0].lat);
      setLong(response.data[0].lon);
      setFormSubmitted(true);
    } catch (error) {
      props.onError(error);
    }
  };

  const handleWeather = async (e) => {
    e.preventDefault();
    try {
      // Make API call and update cache
      console.log('calling weather');
      const weatherApi = `https://city-explorer-api-o9yy.onrender.com/weather?lat=${lat}&lon=${long}`;
      const weatherResponse = await axios.get(weatherApi);
      setWeatherData(weatherResponse.data);
    } catch (error) {
      console.log(error);
      props.onError(error);
    }
  };

  const handleMovies = async (e) => {
    e.preventDefault();
    try {
      const movieAPI = `https://city-explorer-api-o9yy.onrender.com/movies`;
      // Make API call and update cache
      console.log('calling movie');
      const movieResponse = await axios.get(movieAPI);
      setMovieData(movieResponse.data);

    } catch (error) {
      props.onError(error);
    }
  };

  const handleBoth = async (e) => {
    e.preventDefault();
    await handleWeather(e);
    await handleMovies(e);
  }

  return (
    <section className='explore-form-area'>
      <Form
        onSubmit={handleSubmit}
      >
        <Form.Group
          className='explore-form'
          controlId='exploreFormCity'
        >
          <Form.Label>Look up any city!</Form.Label>
          <Form.Control type='text' placeholder='Enter City Name' />
        </Form.Group>
        <Button variant='primary' type='submit' className='explore-form-button'>
          Explore!
        </Button>
      </Form>
      {formSubmitted && (
        <>
          <Card
            style={{ width: '40vw' }}
            className='city-card'
          >
            <Card.Body>
              <div className='card-text-container'>
                <Card.Title>{fullLocation}</Card.Title>
                <Card.Text>
                  Lat: {lat}
                </Card.Text>
                <Card.Text>
                  Long: {long}
                </Card.Text>
              </div>
              <Card.Img
                variant='bottom'
                src={`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${lat},${long}&zoom=12`}
                style={{ width: '30vw', height: '30vw' }}
                className=''
              />
            </Card.Body>
            <Button variant='info' onClick={handleBoth} >
              Get Weather
            </Button>
          </Card>
          <Weather
            weatherData={weatherData}
            location={location}
          />
          <Movies
            movies={movieData}
            location={location}
          />
        </>
      )}
    </section>
  )
}

export default ExploreForm;