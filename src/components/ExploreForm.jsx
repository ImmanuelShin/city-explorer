import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Weather from './Weather';
import Movies from './Movies';
import { useState } from 'react';
import axios from 'axios';
import Timer from './Timer';
import Restaurants from './Restaurants';

const API_KEY = import.meta.env.VITE_GEO_API_KEY;

function ExploreForm(props) {

  const [location, setLocation] = useState('');
  const [fullLocation, setFullLocation] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [weatherData, setWeatherData] = useState(null);
  const [movieData, setMovieData] = useState(null);
  const [yelpData, setYelpData] = useState(null);

  const [weatherStatus, setWeatherStatus] = useState(null);
  const [movieStatus, setMovieStatus] = useState(null);
  const [yelpStatus, setYelpStatus] = useState(null);

  const [weatherDate, setWeatherDate] = useState('');
  const [movieDate, setMovieDate] = useState('');
  const [yelpDate, setYelpDate] = useState('');

  const testError = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('https://city-explorer-api-o9yy.onrender.com/error');
    } catch (error) {
      props.onError(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const city = e.target.elements.exploreFormCity.value;
      if (String(city).toLowerCase() !== String(location).toLowerCase()) {
        // Reset data if the input has changed
        setMovieData(null);
        setWeatherData(null);
        setYelpData(null);
        setMovieStatus(null);
        setWeatherStatus(null);
        setYelpStatus(null);
      }

      // Make API call and update cache
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
    setWeatherStatus(true);
    const date = new Date();
    setWeatherDate(date.toString());
    try {
      const weatherApi = `https://city-explorer-api-o9yy.onrender.com/weather?lat=${lat}&lon=${long}`;
      const weatherResponse = await axios.get(weatherApi);
      setWeatherData(weatherResponse.data);
    } catch (error) {
      setWeatherStatus(false);
      props.onError(error);
    }
  };

  const handleMovies = async (e) => {
    e.preventDefault();
    setMovieStatus(true);
    const date = new Date();
    setMovieDate(date.toString());
    try {
      const movieAPI = `https://city-explorer-api-o9yy.onrender.com/movies`;
      // Make API call and update cache
      const movieResponse = await axios.get(movieAPI);
      setMovieData(movieResponse.data);
    } catch (error) {
      setMovieStatus(false);
      props.onError(error);
    }
  };

  const handleYelp = async (e) => {
    e.preventDefault();
    setYelpStatus(true);
    const date = new Date();
    setYelpDate(date.toString());
    try {
      const yelpAPI = `https://city-explorer-api-o9yy.onrender.com/yelp?lat=${lat}&lon=${long}`;
      const yelpResponse = await axios.get(yelpAPI);
      setYelpData(yelpResponse.data);
    } catch (error) {
      setYelpStatus(false);
      props.onError(error);
    }
  }

  return (
    <section className='explore-form-area'>
      <Form
        onSubmit={handleSubmit}
        className='explore-form'
      >
        <Form.Group
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
          </Card>
          <section className='timer-container'>
            <div className='api-timer'>
              <Button variant='info' onClick={handleWeather} >
                Get Weather
              </Button>
              <Timer
                title='Weather Timer'
                status={weatherStatus}
              />
            </div>
            <div className='api-timer'>
              <Button variant='info' onClick={handleMovies} >
                Get Movies
              </Button>
              <Timer
                title='Movie Timer'
                status={movieStatus}
              />
            </div>
            <div className='api-timer'>
              <Button variant='info' onClick={handleYelp} >
                Get Restaurants
              </Button>
              <Timer
                title='Yelp Timer'
                status={yelpStatus}
              />
            </div>
          </section>
          <section className='api-render-container'>
            <div className='weather-movie-container'>
              <Weather
                weatherData={weatherData}
                location={location}
                updateStatus={setWeatherStatus}
                date={weatherDate}
              />
              <Movies
                movies={movieData}
                location={location}
                updateStatus={setMovieStatus}
                date={movieDate}
              />
            </div>
            <Restaurants
              restaurants={yelpData}
              location={location}
              updateStatus={setYelpStatus}
              date={yelpDate}
            />
          </section>

        </>
      )}
    </section>
  )
}

export default ExploreForm;