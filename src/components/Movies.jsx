import { useState } from 'react';
import Card from 'react-bootstrap/Card';

function Movies(props) {
  if (!props.movies) {
    return null;
  }

  const filteredMovies = props.movies.filter(movie => {
    if (typeof movie === 'object') {
      return Object.values(movie).some(str => String(str).includes(props.location));
    }
    return false;
  });

  return (
    <Card>
      <Card.Body>
        <Card.Title>Movies</Card.Title>
        {filteredMovies.length > 0 ? (
          <Card.Text>
            {filteredMovies.map((movie, index) => (
              <div key={index}>
                <p>{movie.title}</p>
              </div>
            ))}
          </Card.Text>
        ) : (
          <Card.Text>No movies containing this city</Card.Text>
        )}
      </Card.Body>
    </Card>
  )
}

export default Movies;