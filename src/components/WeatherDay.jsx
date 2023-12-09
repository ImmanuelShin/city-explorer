function WeatherDay(props) {
  return (
    <div key={props.index}>
      <p>Description: {props.day.description}</p>
      <p>Date: {props.day.date}</p>
    </div>
  );
}
export default WeatherDay;