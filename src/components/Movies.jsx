import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Movie from './Movie';

function Movies(props) {
  if (!props.movies) {
    return null;
  } else {
    props.updateStatus(false);
  }
  
  const filteredMovies = props.movies.filter(movie => {
    if (typeof movie === 'object') {
      return Object.values(movie).some(str => {
        if(String(str).toLowerCase().includes(String(props.location).toLowerCase())){
          return true;
        } else {
          return false;
        }
      });
    }
    return false;
  });

  return (
    <Card style={{ width: '60%', marginTop: '20px' }}>
      <Card.Body>
        <Card.Title>Movies</Card.Title>
        {filteredMovies.length > 0 ? (
          <Carousel>
            {filteredMovies.map((movie, index) => (
              <Carousel.Item key={index}>
                <Movie
                  movie={movie}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <Card.Text>No movies containing this city</Card.Text>
        )}
      </Card.Body>
      <Card.Footer>
        Retrieved: {props.date}
      </Card.Footer>
    </Card>
  )
}

export default Movies;