import { useLoadScript } from '@react-google-maps/api';
import { useContext, useEffect, useState } from 'react';
import './App.css';
import { AutocompleteSearchBar } from './components/AutocompleteSearchBar/AutocompleteSearchBar';
import { Map } from './components/Map/Map';
import { SummarizedInfo } from './components/SummarizedInfo/SummarizedInfo';
import { WeatherData } from './components/WeatherData/WeatherData';
import WeatherDataContext from './contexts/WeatherDataProvider';
import { SunMoonClock } from './components/SunMoonClock/SunMoonClock';
import {
  WiMoonAltNew,
  WiMoonAltFull,
  WiMoonAltWaxingCrescent3,
  WiMoonAltWaxingGibbous3,
  WiMoonAltFirstQuarter,
  WiMoonAltWaningGibbous3,
  WiMoonAltThirdQuarter,
  WiMoonAltWaningCrescent3,
  // WiMoonAltWaxing6
} from "react-icons/wi"

const libraries: ["places" | "drawing" | "geometry" | "localContext" | "visualization"] = ['places'];

function App() {


  const astroData = useContext(WeatherDataContext)?.astroData;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLEMAPS_API_KEY,
    libraries
  });

  function moonPhasePicker(moon: string) {
    switch (moon) {
      case "Full Moon":
        return <WiMoonAltFull />
      case "Waning Gibbous":
        return <WiMoonAltWaningGibbous3 />
      case "Last Quarter":
        return <WiMoonAltThirdQuarter />
      case "Waning Crescent":
        return <WiMoonAltWaningCrescent3 />
      case "New Moon":
        return <WiMoonAltNew />
      case "Waxing Crescent":
        return <WiMoonAltWaxingCrescent3 />
      case "First Quarter":
        return <WiMoonAltFirstQuarter />
      case "Waxing Gibbous":
        return <WiMoonAltWaxingGibbous3 />
    }
  }


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

          <section className="sun-clock-section">
            <SunMoonClock />
            <div className="moon-icon-container">
              <img src="images/weather/moon-small.png"></img>
              <div></div>
              {
                astroData && moonPhasePicker(astroData?.astronomy.astro.moon_phase)
              }
            </div>
          </section>
        </div>
      }
    </div>
  )
}

export default App
