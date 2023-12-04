import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_GEO_API_KEY;

function ExploreForm(props) {
  const [location, setLocation] = useState('');
  const [long, setLong] = useState('');
  const [lat, setLat] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const city = event.target.elements.exploreFormCity.value;
    const API = `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${city}&format=json`;
    const response = await axios.get(API);
    setLocation(response.data[0].display_name);
    setLat(response.data[0].lat);
    setLong(response.data[0].lon);
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
        <Button variant='primary' type='submit'>
          Explore!
        </Button>
      </Form>
      <h3>{location}</h3>
      <h3>{long}</h3>
      <h3>{lat}</h3>
    </section>
  )
}

export default ExploreForm;