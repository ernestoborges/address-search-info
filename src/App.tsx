import { useLoadScript } from '@react-google-maps/api';
import { useContext, useEffect, useState } from 'react';
import './App.css';
import { AutocompleteSearchBar } from './components/AutocompleteSearchBar/AutocompleteSearchBar';
import { DayForecast } from './components/DayForecast/DayForecast';
import { Map } from './components/Map/Map';
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

  const weatherHTTP = `http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_REACT_APP_WEATHERAPI_API_KEY}&q=${place?.lat},${place?.lng}&days=3&aqi=no&alerts=no`

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
      {isLoaded &&
        <div className="main-container">
          <section className="main-section map-section">
            <div className="search-container">
              <AutocompleteSearchBar />
            </div>
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
          <section className='main-section week-forecast-section'>
            <WeekForecast />
          </section>
          <section className='main-section day-forecast-section'>
            <DayForecast />
          </section>

          {/* <section className="main-section weather-info-section">
            <WeatherData />
          </section> */}
        </div>
      }
    </div>
  )
}

export default App
