import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import ExploreForm from '../src/components/ExploreForm';
import Error from './components/Error';


function App() {
  const [error, setError] = useState(null);
  const [cache, setCache] = useState({});

  const handleAPIError = (error) => {
    setError({ code: error?.response?.status || 'Unknown Error' });
  };

  return (
    <>
      <ExploreForm 
        onError={handleAPIError}
        cache={cache}
        setCache={setCache}
      />
      {error && <Error errorCode={error.code} onClose={() => setError(null)} />}
    </>
  )
}

export default App;
