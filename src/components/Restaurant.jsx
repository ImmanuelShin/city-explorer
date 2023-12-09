function restaurant(props) {
  return (
    <>
      <h5>{props.restaurant.name}</h5>
      {props.restaurant.img_url && (
        <img src={props.restaurant.img_url} alt={props.restaurant.title} style={{ width: '50%', maxHeight: '300px', objectFit: 'cover' }} />
      )}
      {props.restaurant.price ? <p>Price: {props.restaurant.price} | Rating: {props.restaurant.rating}</p> : <p>Price: NA | Rating: {props.restaurant.rating}</p>}
      <a href={props.restaurant.url}>{props.restaurant.name}</a>
    </>
  );
}

export default restaurant;