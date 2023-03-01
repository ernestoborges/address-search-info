import { useLoadScript } from '@react-google-maps/api';
import { useContext, useEffect, useState } from 'react';
import './App.css';
import { AutocompleteSearchBar } from './components/AutocompleteSearchBar/AutocompleteSearchBar';
import { Map } from './components/Map/Map';
import { SummarizedInfo } from './components/SummarizedInfo/SummarizedInfo';
import { WeatherData } from './components/WeatherData/WeatherData';
import { IoIosMoon, IoIosSunny } from "react-icons/io"
import WeatherDataContext from './contexts/WeatherDataProvider';
import { SunMoonClock } from './components/SunMoonClock/SunMoonClock';

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
          <section className="map-section">
            <div className="search-container">
              <AutocompleteSearchBar />
            </div>
            <Map />
          </section>
          <SummarizedInfo />
          <section className="weather-info-section">
            <WeatherData />
          </section>
          {/* <section className="sun-position-section">
            <div>
              <div>
                <div style={
                  {
                    transform: `rotate(
                  ${astroData
                        ? sunPosDegree + "deg"
                        : "0deg"})`
                  }
                }
                >
                  <IoIosSunny />
                </div>
              </div>
            </div>
            {astroData && sunPosDegree + " " + moonPosDegree}
          </section> */}

          <section className="sun-position-section2">
            <SunMoonClock />
          </section>
        </div>
      }
    </div>
  )
}

export default App
