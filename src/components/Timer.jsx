import { useState, useEffect } from 'react';

function Timer(props) {
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  useEffect(() => {
    let interval;
    if (props.status) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      setTotalSeconds(seconds);
      setSeconds(0);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [props.status]);

  return (
    <>
      {props.status ? (
        <div>
          <h5>{props.title}</h5>
          <h6>This usually takes around 20-30 seconds at startup. Don't look away!</h6>
          <p>Time: {seconds} seconds</p>
        </div>
      ) : props.status === false ? (
        <div>
          <h5>{props.title}</h5>
          <p>This call took {totalSeconds} seconds!</p>
        </div>
      ) : null}
    </>
  );
}

export default Timer;