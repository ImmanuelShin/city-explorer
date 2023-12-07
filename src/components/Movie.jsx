function Movie(props) {
  return (
    <div key={props.key}>
      <p>Description: {props.movie.description}</p>
      <p>Date: {props.movie.date}</p>
    </div>
  );
}
export default Movie;