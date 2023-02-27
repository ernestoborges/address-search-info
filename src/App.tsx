import './App.css';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

function App() {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_API_KEY
  });

  return (
    <div className="App">
      {isLoaded
      ? <GoogleMap
        mapContainerStyle={{width: "1000px", height: "500px"}}
        center={{lat: -27.13329616701353, lng: -109.42732706665997}}
        zoom={20}
      ></GoogleMap>
      : <> not loaded</>}

    </div>
  )
}

export default App
