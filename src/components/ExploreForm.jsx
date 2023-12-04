import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import axios from 'axios';
import { CardGroup } from 'react-bootstrap';

const API_KEY = import.meta.env.VITE_GEO_API_KEY;

function ExploreForm() {
  const [location, setLocation] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const city = event.target.elements.exploreFormCity.value;
    const API = `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${city}&format=json`;
    const response = await axios.get(API);
    setLocation(response.data[0].display_name);
    setLat(response.data[0].lat);
    setLong(response.data[0].lon);
    setFormSubmitted(true);
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
      {formSubmitted && (
        <Card 
        style={{width: '30vw'}}
        className='city-card'
        >
          <Card.Body>
            <Card.Title>{location}</Card.Title>
            <Card.Text>
              Lat: {lat}
            </Card.Text>
            <Card.Text>
              Long: {long}
            </Card.Text>
            <Card.Img 
            variant='bottom' 
            src={`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${lat},${long}&zoom=12`} 
            style={{ width: '30vw', height: '30vw' }}
            className=''
            />
          </Card.Body>
        </Card>
      )}
    </section>
  )
}

export default ExploreForm;