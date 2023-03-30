import { useLoadScript } from '@react-google-maps/api';
import { useContext, useEffect } from 'react';
import './App.css';
import { AutocompleteSearchBar } from './components/AutocompleteSearchBar/AutocompleteSearchBar';
import { DayForecast } from './components/DayForecast/DayForecast';
import { Map } from './components/Map/Map';
import { CenterMapButton } from './components/MapButtons/CenterMapButton';
import { LangButton } from './components/MapButtons/LangButton';
import { MetricButtons } from './components/MapButtons/MetricsButton';
import { MyLocationButton } from './components/MapButtons/MyLocationButton';
import { MiscInfo } from './components/MiscInfo/MiscInfo';
import { SummarizedInfo } from './components/SummarizedInfo/SummarizedInfo';
import { SunMoonInfo } from './components/SunMoonClock/SunMoonInfo';
import { WeekForecast } from './components/WeekForecast/WeekForecast';
import { WindInfo } from './components/WindInfo/WindInfo';
import PlaceContext from './contexts/PlaceProvider';
import WeatherDataContext from './contexts/WeatherDataProvider';

const libraries: ["places" | "drawing" | "geometry" | "localContext" | "visualization"] = ['places'];

function App() {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLEMAPS_API_KEY,
    libraries
  });

  const place = useContext(PlaceContext)?.place;
  const setWeatherData = useContext(WeatherDataContext)?.setWeatherData;

  const weatherHTTP = `/.netlify/functions/fetch-weather?lat=${place?.lat}&lng=${place?.lng}`

  async function fetchWeatherData() {
    try {
      const response = await fetch(weatherHTTP);
      const weatherData = await response.json();
      if (setWeatherData) setWeatherData(weatherData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (place?.lat !== undefined) {
      fetchWeatherData();
    }
  }, [place])

  return (
    <div className="App">
      {
        isLoaded &&
        place &&
        <div className="main-container">
          <section className="main-section map-section">
            <div className="search-container">
              <AutocompleteSearchBar />
            </div>
            <MyLocationButton />
            <CenterMapButton />
            <LangButton />
            <MetricButtons />
            <Map />
          </section>
          <section className="main-section summarized-info-section">
            <SummarizedInfo />
          </section>
          <section className="main-section sun-clock-section">
            <SunMoonInfo />
          </section>
          <section className='main-section wind-info-section'>
            <WindInfo />
          </section>
          <section  className="main-section misc-info-section">
            <MiscInfo />
          </section>
          <section className='main-section week-forecast-section'>
            <WeekForecast />
          </section>
          <section className='main-section day-forecast-section'>
            <DayForecast />
          </section>
        </div>
      }
    </div>
  )
}

export default App
