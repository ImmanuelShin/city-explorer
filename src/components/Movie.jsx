function Movie(props) {
  return (
    <div>
      <h5>{props.movie.title}</h5>
      {props.movie.img_url && (
        <img src={props.movie.img_url} alt={props.movie.title} style={{ width: '50%', maxHeight: '300px', objectFit: 'cover' }} />
      )}
      <p>{props.movie.overview}</p>
      <p>Popularity: {props.movie.pop}</p>
    </div>
  );
}
export default Movie;