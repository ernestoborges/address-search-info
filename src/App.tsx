import { useLoadScript } from '@react-google-maps/api';
import './App.css';
import { AutocompleteSearchBar } from './components/AutocompleteSearchBar/AutocompleteSearchBar';
import { Map } from './components/Map/Map';
import { PlaceProvider } from './contexts/PlaceProvider';

const libraries: ["places" | "drawing" | "geometry" | "localContext" | "visualization"] = ['places'];

function App() {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_API_KEY,
    libraries
  });

  return (
    <PlaceProvider>
      <div className="App">
        { isLoaded &&
          <div className="map-search-container">
            <section className="search-section">
              <AutocompleteSearchBar />
            </section>
            <section className="map=section">
              <Map />
            </section>
          </div>
        }
      </div>
    </PlaceProvider>
  )
}

export default App
