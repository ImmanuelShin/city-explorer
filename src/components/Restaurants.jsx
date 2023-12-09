import Card from 'react-bootstrap/Card';
import Restaurant from './Restaurant';
import Carousel from 'react-bootstrap/Carousel';

function Restaurants(props) {
  if (!props.restaurants) {
    return null;
  } else {
    props.updateStatus(false);
  }
  return (
    <Card style={{ width: '100%', marginTop: '20px' }}>
      <Card.Body>
        <Card.Title>
          Restaurants in the area
        </Card.Title>
        <Carousel>
          {props.restaurants.map((restaurant, index) => (
            <Carousel.Item
              key={index}
            >
              <Restaurant
                restaurant={restaurant}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </Card.Body>
      <Card.Footer>
        Retrieved: {props.date}
      </Card.Footer>
    </Card>
  );
}

export default Restaurants;