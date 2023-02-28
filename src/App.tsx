import { useLoadScript } from '@react-google-maps/api';
import { useContext, useEffect, useState } from 'react';
import './App.css';
import { AutocompleteSearchBar } from './components/AutocompleteSearchBar/AutocompleteSearchBar';
import { Map } from './components/Map/Map';
import { WeatherData } from './components/WeatherData/WeatherData';

const libraries: ["places" | "drawing" | "geometry" | "localContext" | "visualization"] = ['places'];

function App() {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLEMAPS_API_KEY,
    libraries
  });

  return (
    <div className="App">
      {isLoaded &&
        <div className="map-search-container">
          <section className="search-section">
            <AutocompleteSearchBar />
          </section>
          <section className="map-section">
            <Map />
          </section>
          <section className="weather-info-section">
            <WeatherData />
          </section>
        </div>
      }
      
    </div>
  )
}

export default App
