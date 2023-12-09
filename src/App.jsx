import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import ExploreForm from '../src/components/ExploreForm';
import Error from './components/Error';


function App() {
  const [error, setError] = useState(null);

  const handleAPIError = (error) => {
    setError({
      code: error?.response?.status || 'Unknown Error',
      message: error?.response?.data?.message || 'No additional error message',
    });
  };

  return (
    <>
      <ExploreForm 
        onError={handleAPIError}
      />
      {error && <Error errorCode={error.code} errorMessage={error.message} onClose={() => setError(null)} />}
    </>
  )
}

export default App;
